import { spawnSync } from "child_process";
import chokidar from "chokidar";
import browserSync from "browser-sync";

function run(script) {
	const result = spawnSync("node", [`scripts/${script}.js`], { stdio: "inherit" });
	if (result.status !== 0) {
		console.error(`scripts/${script}.js failed`);
	}
}

run("build-lib");
run("assemble");

const bs = browserSync.create();
bs.init({
	server: "_site",
	files: "_site/**/*",
	open: false,
	notify: false,
	logLevel: "silent",
	ui: false,
});

let pending = false;
function reassemble() {
	if (pending) return;
	pending = true;
	setTimeout(() => {
		pending = false;
		run("assemble");
	}, 100);
}

chokidar
	.watch(["content", "public", "Cyclades"], { ignoreInitial: true })
	.on("all", reassemble);

console.log("Watching content/, public/, Cyclades/ — dev server at http://localhost:3000");
