function createLayout() {
	const page = document.body.dataset.page;

	const menus = {
		works: [
			{ name: "Home", link: "index.html" },
			{ name: "Skills", link: "skills.html" },
			{ name: "About", link: "about.html" },
			{ name: "Contact", link: "contact.html" },
		],

		skills: [
			{ name: "Home", link: "index.html" },
			{ name: "Works", link: "works.html" },
			{ name: "About", link: "about.html" },

			{ name: "Contact", link: "contact.html" },
		],

		contact: [
			{ name: "Home", link: "index.html" },
			{ name: "Works", link: "works.html" },
			{ name: "Skills", link: "skills.html" },
			{ name: "About", link: "about.html" },
		],

		about: [
			{ name: "Home", link: "index.html" },
			{ name: "Works", link: "works.html" },
			{ name: "Skills", link: "skills.html" },

			{ name: "Contact", link: "contact.html" },
		],
	};

	const header = document.getElementById("header");
	const footer = document.getElementById("footer");

	const nav = menus[page]
		.map((item) => `<a href="${item.link}">${item.name}</a>`)
		.join("");

	header.innerHTML = `
		<header class="game-header">
			<nav class="game-nav">
				${nav}
			</nav>
		</header>
	`;

	footer.innerHTML = `
		<footer class="game-footer">
			<a href="index.html">A：Home</a>
		</footer>
	`;
}

createLayout();
