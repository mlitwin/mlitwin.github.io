import { LinkChecker } from "linkinator";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { sep, join } from "node:path";

// linkinator doesn't execute JavaScript, so it can't discover links that are
// only rendered by our client-side <site-nav>/<site-footer>/<recent-posts>/
// <post-archive>/<post-nav> components (they emit real <a> tags, but only in
// the browser). We work around the two ways that shows up:
//
// 1. Page discovery: rather than crawling from a single entry point, we
//    enumerate every built page ourselves and hand linkinator the full
//    explicit list.
// 2. Chrome links: <site-nav>/<site-footer> hardcode a fixed handful of
//    hrefs, checked below with a plain HTTP request rather than through
//    linkinator — feeding a third-party URL to linkinator as an entry point
//    makes it scan *that page's* outbound links too (its "shallow scan"
//    default checks the given page's own links), which floods the report
//    with GitHub/LinkedIn's unrelated internal URLs. <recent-posts>/
//    <post-archive>/<post-nav> all derive their hrefs solely from
//    content/config.json's `path` field, so we verify each of those
//    resolves to a real file instead of trying to render the widgets.

const SITE_DIR = "_site";
const DEPLOY_BASE = "https://antoninus.org";

// Hardcoded in public/js/site-components.js — not derived from anything, so
// checked directly rather than re-parsed out of the JS.
const CHROME_LINKS = [
	"https://github.com/mlitwin",
	"https://www.linkedin.com/in/matthewlitwin/",
];

const args = new Set(process.argv.slice(2));
const deployed = args.has("--deployed");
const external = args.has("--external");

function findHtmlFiles(dir) {
	return readdirSync(dir, { recursive: true })
		.filter((f) => f.endsWith(".html"))
		.map((f) => f.split(sep).join("/"))
		.sort();
}

function checkConfigPaths() {
	const config = JSON.parse(readFileSync("content/config.json", "utf8"));
	const missing = config.posts.filter(
		(post) => !existsSync(join(SITE_DIR, post.path, "index.html")),
	);
	for (const post of missing) {
		console.log(`  [missing] config.json path "${post.path}" (${post.title})`);
	}
	return missing.length === 0;
}

// Sites that block non-browser user agents with 403/429 regardless of
// whether the link is actually broken (GitHub, LinkedIn, Medium all do
// this) — treated as a warning, not a failure.
async function checkChromeLinks() {
	let brokenCount = 0;
	for (const url of CHROME_LINKS) {
		let status;
		try {
			const res = await fetch(url, { redirect: "follow" });
			status = res.status;
		} catch (err) {
			status = 0;
		}
		const botBlocked = status === 403 || status === 429;
		const broken = status === 0 || (status >= 400 && !botBlocked);
		if (broken) {
			console.log(`  [${status}] ${url}`);
			brokenCount++;
		} else if (botBlocked) {
			console.log(`  [${status}, treated as OK — bot-blocked] ${url}`);
		}
	}
	return brokenCount;
}

const configPathsOk = checkConfigPaths();

const pages = findHtmlFiles(SITE_DIR);
const path = deployed ? pages.map((p) => `${DEPLOY_BASE}/${p}`) : pages;

// "Internal" means same-site: localhost for a local build, our own domains
// when checking the deployed site (some pages link back to
// mlitwin.github.io/... by absolute URL rather than a relative path).
const internalHost = deployed
	? /^https?:\/\/([^/]*\.)?(antoninus\.org|mlitwin\.github\.io)(\/|$)/
	: /^https?:\/\/localhost(:\d+)?(\/|$)/;

const nonHttpLink = /^(mailto|tel):/;

function linksToSkip(link) {
	if (nonHttpLink.test(link)) return Promise.resolve(true);
	if (!external && !internalHost.test(link)) return Promise.resolve(true);
	return Promise.resolve(false);
}

// Sites that block non-browser user agents with 403/429 regardless of
// whether the link is actually broken (GitHub, LinkedIn, Medium all do
// this) — treated as a warning, not a failure, same as checkChromeLinks().
function isBotBlocked(result) {
	return result.status === 403 || result.status === 429;
}

const checker = new LinkChecker();
checker.on("link", (result) => {
	if (result.state !== "BROKEN") return;
	if (external && isBotBlocked(result)) {
		console.log(`  [${result.status}, treated as OK — bot-blocked] ${result.url}`);
	} else {
		console.log(`  [${result.status}] ${result.url}`);
	}
});

const results = await checker.check({
	path,
	serverRoot: deployed ? undefined : SITE_DIR,
	linksToSkip,
	timeout: external || deployed ? 10_000 : undefined,
});

const realBroken = results.links.filter(
	(l) => l.state === "BROKEN" && !(external && isBotBlocked(l)),
);

const chromeBroken = external ? await checkChromeLinks() : 0;

const scanned = results.links.length + (external ? CHROME_LINKS.length : 0);
const broken = realBroken.length + chromeBroken;
console.log(
	`\n${deployed ? "deployed" : "local"} / ${external ? "internal+external" : "internal-only"}: ` +
		`scanned ${scanned} links, ${broken} broken.`,
);

if (broken > 0 || !configPathsOk) {
	process.exitCode = 1;
}
