import { rmSync, mkdirSync, cpSync } from "fs";

rmSync("_site", { recursive: true, force: true });
mkdirSync("_site");
cpSync("content", "_site", { recursive: true });
cpSync("lib", "_site/lib", { recursive: true });
cpSync("public", "_site", { recursive: true });

console.log("_site/ assembled.");
