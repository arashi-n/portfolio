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

		about: [
			{ name: "Home", link: "index.html" },
			{ name: "Works", link: "works.html" },
			{ name: "Skills", link: "skills.html" },
			{ name: "Contact", link: "contact.html" },
		],

		contact: [
			{ name: "Home", link: "index.html" },
			{ name: "Works", link: "works.html" },
			{ name: "Skills", link: "skills.html" },
			{ name: "About", link: "about.html" },
		],

		creative: [
			{ name: "Home", link: "index.html" },
			{ name: "Works", link: "works.html" },
			{ name: "Skills", link: "skills.html" },
			{ name: "About", link: "about.html" },
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
		<button class="menu-btn">MENU</button>

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

const menuBtn = document.querySelector(".menu-btn");
const gameNav = document.querySelector(".game-nav");

menuBtn.addEventListener("click", () => {
	gameNav.classList.toggle("open");

	if (gameNav.classList.contains("open")) {
		menuBtn.textContent = "CLOSE";
	} else {
		menuBtn.textContent = "MENU";
	}
});

document.addEventListener("click", (e) => {
	const clickedMenu = gameNav.contains(e.target) || menuBtn.contains(e.target);

	if (!clickedMenu && gameNav.classList.contains("open")) {
		gameNav.classList.remove("open");
		menuBtn.textContent = "MENU";
	}
});

gameNav.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		gameNav.classList.remove("open");
		menuBtn.textContent = "MENU";
	});
});
