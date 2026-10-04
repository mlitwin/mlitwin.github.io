// config.json is the single source of truth for each post's title, `date`
// (publication — drives ordering) and optional `updated` (informational only,
// never affects ordering). Posts are sorted newest-first here, so the file's
// own order doesn't matter.
let configPromise;
function getConfig() {
	configPromise ??= fetch("/config.json")
		.then((res) => res.json())
		.then((config) => {
			config.posts.sort((a, b) => b.date.localeCompare(a.date));
			return config;
		});
	return configPromise;
}

// Tolerate /blog/x, /blog/x/ and /blog/x/index.html.
function normalizePath(path) {
	return path.replace(/index\.html$/, "").replace(/\/?$/, "/");
}

async function findCurrentPost() {
	const { posts } = await getConfig();
	const here = normalizePath(location.pathname);
	const i = posts.findIndex((p) => normalizePath(p.path) === here);
	return { posts, i, post: posts[i] };
}

function timeTag(iso) {
	return `<time datetime="${iso}">${formatDate(iso)}</time>`;
}

function postLink(post) {
	return `<li><a href="${post.path}">${post.title}</a> — ${timeTag(post.date)}</li>`;
}

function formatDate(iso) {
	const d = new Date(iso + "T00:00:00Z");
	return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

class RecentPosts extends HTMLElement {
	async connectedCallback() {
		const count = Number(this.getAttribute("count")) || 3;
		const { posts } = await getConfig();
		this.innerHTML = `<ul>${posts.slice(0, count).map(postLink).join("")}</ul>`;
	}
}

class PostArchive extends HTMLElement {
	async connectedCallback() {
		const { posts } = await getConfig();
		this.innerHTML = `<ul>${posts.map(postLink).join("")}</ul>`;
	}
}

class PostHeader extends HTMLElement {
	async connectedCallback() {
		const { post } = await findCurrentPost();
		if (!post) return;
		const updated = post.updated
			? ` · <span class="post-updated">Updated ${timeTag(post.updated)}</span>`
			: "";
		this.innerHTML = `
			<header>
				<h1>${post.title}</h1>
				<p>${timeTag(post.date)}${updated}</p>
			</header>`;
	}
}

class PostNav extends HTMLElement {
	async connectedCallback() {
		const { posts, i } = await findCurrentPost();
		if (i === -1) return;
		const prev = posts[i + 1]; // older
		const next = posts[i - 1]; // newer
		if (!prev && !next) return;
		this.innerHTML = `
			<nav class="links-nextprev">
				${prev ? `<a href="${prev.path}">← ${prev.title}</a>` : "<span></span>"}
				${next ? `<a href="${next.path}">${next.title} →</a>` : "<span></span>"}
			</nav>`;
	}
}

customElements.define("recent-posts", RecentPosts);
customElements.define("post-archive", PostArchive);
customElements.define("post-header", PostHeader);
customElements.define("post-nav", PostNav);

// No-op on pages without math (window.renderMathInElement only exists
// after /lib/vendor.js has loaded, which only post pages include).
if (window.renderMathInElement) {
	renderMathInElement(document.body, {
		delimiters: [
			{ left: "$$", right: "$$", display: true },
			{ left: "$", right: "$", display: false },
		],
	});
}
