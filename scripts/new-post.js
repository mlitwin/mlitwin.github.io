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

const [year, month, day] = date.split("-");
const monthName = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
	month: "long",
	timeZone: "UTC",
});
const displayDate = `${monthName} ${Number(day)}, ${year}`;

let html = readFileSync("templates/post.html", "utf8");
html = html
	.replace("Post Title – Matthew Litwin", `${title} – Matthew Litwin`)
	.replace('content="YYYY-MM-DD"', `content="${date}"`)
	.replace(">Post Title<", `>${title}<`)
	.replace('datetime="YYYY-MM-DD"', `datetime="${date}"`)
	.replace(">Month DD, YYYY<", `>${displayDate}<`);

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
console.log("Next: fill in the body, then check content/blog.html if needed.");
