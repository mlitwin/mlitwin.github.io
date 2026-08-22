import { mkdirSync, rmSync, cpSync, copyFileSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nodeModules = path.join(root, "node_modules");
const lib = path.join(root, "lib");

rmSync(lib, { recursive: true, force: true });
mkdirSync(lib, { recursive: true });

function read(relPath) {
	return readFileSync(path.join(nodeModules, relPath), "utf8");
}

// esbuild-bundle a single entry to a JS string, in memory (no intermediate files).
async function bundleToString(contents) {
	const result = await esbuild.build({
		stdin: { contents, resolveDir: nodeModules, loader: "js" },
		bundle: true,
		minify: true,
		format: "iife",
		write: false,
	});
	return result.outputFiles[0].text;
}

// --- PicoCSS: standalone, for plain pages (home/blog/resume/404) ---
const picoCss = read("@picocss/pico/css/pico.min.css");
writeFileSync(path.join(lib, "pico.min.css"), picoCss);

// --- KaTeX fonts: referenced by relative "fonts/..." url()s in katex.min.css,
// so they must sit next to whatever CSS file embeds those rules. ---
cpSync(
	path.join(nodeModules, "katex/dist/fonts"),
	path.join(lib, "fonts"),
	{ recursive: true }
);

// --- post.css: pico + katex + prism theme, concatenated for post pages.
// Order matters for cascade: pico first (base), then katex/prism on top. ---
const katexCss = read("katex/dist/katex.min.css");
const prismCss = read("prismjs/themes/prism-okaidia.css");
writeFileSync(
	path.join(lib, "post.css"),
	[picoCss, katexCss, prismCss].join("\n")
);

// --- vendor.js: katex + katex-auto-render + prism + heading-anchors,
// concatenated for post pages. Order matters:
//   1. katex.min.js before katex-auto-render.min.js (auto-render needs
//      window.katex to already exist).
//   2. the heading-id-assignment snippet before heading-anchors: the
//      HeadingAnchors custom element only picks up headings that already
//      have an [id] at the moment it's defined (customElements.define
//      upgrades already-parsed elements synchronously), so ids must be
//      assigned before that line runs.
const katexJs = read("katex/dist/katex.min.js");
const katexAutoRenderJs = read("katex/dist/contrib/auto-render.min.js");

const prismJs = await bundleToString(`
	import "prismjs";
	import "prismjs/components/prism-bash.js";
	import "prismjs/components/prism-python.js";
	import "prismjs/components/prism-json.js";
	import "prismjs/components/prism-yaml.js";
	import "prismjs/components/prism-hcl.js";
`);

// heading-anchors.js ends in `export { HeadingAnchors }`, which is a syntax
// error outside a module. Bundling it to iife drops the export (nothing
// in this entry consumes it) and yields a plain script that still
// self-registers via its own top-level `HeadingAnchors.register()` call.
const headingAnchorsJs = await bundleToString(
	`import "@zachleat/heading-anchors/heading-anchors.js";`
);

const assignHeadingIds = `
(function () {
	document.querySelectorAll("heading-anchors h2, heading-anchors h3, heading-anchors h4, heading-anchors h5, heading-anchors h6")
		.forEach(function (heading) {
			if (!heading.id) {
				heading.id = heading.textContent
					.trim()
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/(^-|-$)/g, "");
			}
		});
})();
`;

writeFileSync(
	path.join(lib, "vendor.js"),
	[katexJs, katexAutoRenderJs, prismJs, assignHeadingIds, headingAnchorsJs].join("\n;\n")
);

console.log("lib/ built.");
