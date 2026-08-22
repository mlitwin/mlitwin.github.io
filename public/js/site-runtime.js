document.querySelectorAll("heading-anchors h2, heading-anchors h3, heading-anchors h4, heading-anchors h5, heading-anchors h6")
	.forEach((heading) => {
		if (!heading.id) {
			heading.id = heading.textContent
				.trim()
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, "");
		}
	});

// Assign heading ids before defining the custom element: connectedCallback
// only picks up headings that already have an [id].
await import("/lib/heading-anchors.js");

if (window.renderMathInElement) {
	renderMathInElement(document.body, {
		delimiters: [
			{ left: "$$", right: "$$", display: true },
			{ left: "$", right: "$", display: false },
		],
	});
}
