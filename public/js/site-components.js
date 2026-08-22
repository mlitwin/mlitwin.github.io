class SiteNav extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<header class="container">
				<nav>
					<ul><li><strong><a href="/">Matthew Litwin</a></strong></li></ul>
					<ul>
						<li><a href="/blog.html">Blog</a></li>
						<li><a href="/resume.html">Resume</a></li>
					</ul>
				</nav>
			</header>`;
	}
}

class SiteFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<footer class="container">
				<small>
					<a href="https://github.com/mlitwin">GitHub</a> ·
					<a href="https://www.linkedin.com/in/matthewlitwin/">LinkedIn</a>
				</small>
			</footer>`;
	}
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
