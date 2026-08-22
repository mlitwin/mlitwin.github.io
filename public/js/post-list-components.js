let configPromise;
function getConfig() {
	configPromise ??= fetch("/config.json").then((res) => res.json());
	return configPromise;
}

function postLink(post) {
	return `<li><a href="${post.path}">${post.title}</a> — <time datetime="${post.date}">${formatDate(post.date)}</time></li>`;
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

class PostNav extends HTMLElement {
	async connectedCallback() {
		const { posts } = await getConfig();
		const i = posts.findIndex((p) => p.path === location.pathname);
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
