import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { marked } from "marked";

marked.use({ gfm: true });

const posts = [
	{ src: "content/blog/tensor-calculus/index.md", dir: "content/blog/tensor-calculus" },
	{ src: "content/blog/the-dual-basis/index.md", dir: "content/blog/the-dual-basis" },
	{ src: "content/blog/the-einstein-summation-convention/index.md", dir: "content/blog/the-einstein-summation-convention" },
	{ src: "content/blog/the-gradient/index.md", dir: "content/blog/the-gradient" },
	{ src: "content/blog/the-metric-tensor/index.md", dir: "content/blog/the-metric-tensor" },
	{ src: "content/blog/the-skew-tanget-space/index.md", dir: "content/blog/the-skew-tanget-space" },
	{ src: "content/blog/the-tangent-space/index.md", dir: "content/blog/the-tangent-space" },
	{ src: "content/blog/interlude-svg/index.md", dir: "content/blog/interlude-svg" },
	{ src: "content/blog/arrow-of-time/arrow-of-time.md", dir: "content/blog/arrow-of-time" },
	{ src: "content/blog/preliminaries-to-a-software-testing-manifesto.md", dir: "content/blog/preliminaries-to-a-software-testing-manifesto" },
	{ src: "content/blog/terraform-is-a-json-transformation-language.md", dir: "content/blog/terraform-is-a-json-transformation-language" },
	{ src: "content/blog/web-sketchpad.md", dir: "content/blog/web-sketchpad" },
];

// Private-use-area delimiters: never occur in authored markdown, so they
// survive marked's escaping/table/emphasis parsing untouched.
const TOKEN_OPEN = "";
const TOKEN_CLOSE = "";
const TOKEN_RE = new RegExp(`${TOKEN_OPEN}(\\d+)${TOKEN_CLOSE}`, "g");

function parseFrontMatter(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
	if (!m) return { data: {}, body: raw };
	const data = {};
	for (const line of m[1].split(/\r?\n/)) {
		const kv = line.match(/^(\w+):\s*(.*)$/);
		if (!kv) continue;
		let [, key, value] = kv;
		value = value.trim().replace(/^"(.*)"$/, "$1");
		data[key] = value;
	}
	return { data, body: raw.slice(m[0].length) };
}

// Pull out ```mermaid fences, $$...$$, and $...$ before running the body
// through marked, so markdown's emphasis/table parsing never touches them.
function protectSpecialBlocks(md) {
	const placeholders = [];
	function stash(html) {
		const token = `${TOKEN_OPEN}${placeholders.length}${TOKEN_CLOSE}`;
		placeholders.push(html);
		return token;
	}

	let hasMermaid = false;
	let text = md.replace(/```mermaid\r?\n([\s\S]*?)```/g, (_, code) => {
		hasMermaid = true;
		return stash(`<pre class="mermaid">\n${code.trim()}\n</pre>`);
	});

	text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => stash(`$$${expr}$$`));
	text = text.replace(/\$([^\n$]+?)\$/g, (_, expr) => stash(`$${expr}$`));

	return {
		text,
		hasMermaid,
		restore(html) {
			return html.replace(TOKEN_RE, (_, i) => placeholders[Number(i)]);
		},
	};
}

function formatDate(iso) {
	const d = new Date(iso);
	if (isNaN(d)) return { datetime: iso, display: iso };
	const datetime = iso.slice(0, 10);
	const display = d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
	return { datetime, display };
}

function renderShell({ title, datetime, display, bodyHtml, hasMermaid, hasWsp }) {
	const mermaidScript = hasMermaid
		? `\n  <script type="module">\n    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";\n    mermaid.initialize({ startOnLoad: true });\n  </script>`
		: "";
	const wspScripts = hasWsp
		? `\n  <script src="/wsp/jquery-2.1.0.min.js"></script>\n  <script src="/wsp/wsp-min.js"></script>\n  <script src="/wsp/wsp-runner.js"></script>`
		: "";

	return `<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – Matthew Litwin</title>
  <meta name="date" content="${datetime}">
  <link rel="stylesheet" href="/lib/pico.min.css">
  <link rel="stylesheet" href="/lib/katex.min.css">
  <link rel="stylesheet" href="/lib/prism-okaidia.min.css">
  <link rel="stylesheet" href="/css/site.css">
  <script src="/js/site-components.js"></script>  <!-- synchronous: no defer, no async -->
</head>
<body>
  <site-nav></site-nav>

  <main class="container">
    <article>
      <header>
        <h1>${title}</h1>
        <p><time datetime="${datetime}">${display}</time></p>
      </header>

      <heading-anchors>
${bodyHtml}
      </heading-anchors>
    </article>
  </main>

  <site-footer></site-footer>

  <script src="/lib/katex.min.js"></script>
  <script src="/lib/katex-auto-render.min.js"></script>
  <script src="/lib/prism.min.js"></script>
  <script type="module" src="/js/site-runtime.js"></script>${mermaidScript}${wspScripts}
</body>
</html>
`;
}

for (const post of posts) {
	const raw = readFileSync(post.src, "utf8");
	const { data, body } = parseFrontMatter(raw);
	const bodyNoExcerpt = body.replace("<!-- more -->", "");

	const { text, hasMermaid, restore } = protectSpecialBlocks(bodyNoExcerpt);
	const html = restore(marked.parse(text))
		.replace(/<p>(<pre class="mermaid">[\s\S]*?<\/pre>)<\/p>/g, "$1");

	const { datetime, display } = formatDate(data.date || "");

	const shell = renderShell({
		title: data.title || post.dir.split("/").pop(),
		datetime,
		display,
		bodyHtml: html,
		hasMermaid,
		hasWsp: data.wsp === "true",
	});

	if (!existsSync(post.dir)) mkdirSync(post.dir, { recursive: true });
	const outPath = path.join(post.dir, "index.html");
	writeFileSync(outPath, shell);
	console.log("wrote", outPath);
}
