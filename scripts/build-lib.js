import { existsSync, mkdirSync, rmSync, cpSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nodeModules = path.join(root, "node_modules");
const lib = path.join(root, "lib");

rmSync(lib, { recursive: true, force: true });
mkdirSync(lib, { recursive: true });

// PicoCSS
copyFileSync(
	path.join(nodeModules, "@picocss/pico/css/pico.min.css"),
	path.join(lib, "pico.min.css")
);

// KaTeX
copyFileSync(
	path.join(nodeModules, "katex/dist/katex.min.css"),
	path.join(lib, "katex.min.css")
);
cpSync(
	path.join(nodeModules, "katex/dist/fonts"),
	path.join(lib, "fonts"),
	{ recursive: true }
);
copyFileSync(
	path.join(nodeModules, "katex/dist/katex.min.js"),
	path.join(lib, "katex.min.js")
);
copyFileSync(
	path.join(nodeModules, "katex/dist/contrib/auto-render.min.js"),
	path.join(lib, "katex-auto-render.min.js")
);

// heading-anchors (ES module — kept as-is, loaded with type="module")
copyFileSync(
	path.join(nodeModules, "@zachleat/heading-anchors/heading-anchors.js"),
	path.join(lib, "heading-anchors.js")
);

// Prism: bundle core + a fixed set of language grammars into one file
await esbuild.build({
	stdin: {
		contents: `
			import "prismjs";
			import "prismjs/components/prism-bash.js";
			import "prismjs/components/prism-python.js";
			import "prismjs/components/prism-json.js";
			import "prismjs/components/prism-yaml.js";
			import "prismjs/components/prism-hcl.js";
		`,
		resolveDir: nodeModules,
		loader: "js",
	},
	bundle: true,
	minify: true,
	outfile: path.join(lib, "prism.min.js"),
});
copyFileSync(
	path.join(nodeModules, "prismjs/themes/prism-okaidia.css"),
	path.join(lib, "prism-okaidia.min.css")
);

console.log("lib/ built.");
