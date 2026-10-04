import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const title = process.argv[2];
if (!title) {
	console.error("Usage: npm run new-post -- \"Post Title\" [YYYY-MM-DD]");
	process.exit(1);
}

const date = process.argv[3] ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
	console.error(`Invalid date "${date}" — expected YYYY-MM-DD.`);
	process.exit(1);
}

const slug = title
	.toLowerCase()
	.replace(/[^a-z0-9]+/g, "-")
	.replace(/^-+|-+$/g, "");

const postDir = `content/blog/${slug}`;
const postPath = `${postDir}/index.html`;
if (existsSync(postPath)) {
	console.error(`${postPath} already exists.`);
	process.exit(1);
}

// Only <title> needs filling in; the visible title and dates are rendered by
// <post-header> from config.json.
const html = readFileSync("templates/post.html", "utf8")
	.replace("Post Title – Matthew Litwin", `${title} – Matthew Litwin`);

mkdirSync(postDir, { recursive: true });
writeFileSync(postPath, html);

const configPath = "content/config.json";
const config = JSON.parse(readFileSync(configPath, "utf8"));
const entry = { title, date, path: `/blog/${slug}/` };
const insertAt = config.posts.findIndex((p) => p.date < date);
if (insertAt === -1) {
	config.posts.push(entry);
} else {
	config.posts.splice(insertAt, 0, entry);
}
writeFileSync(configPath, JSON.stringify(config, null, "\t") + "\n");

console.log(`Created ${postPath}`);
console.log(`Added entry to ${configPath}`);
console.log("Next: fill in the body. Set \"date\" in config.json to the publish date when it goes live.");
