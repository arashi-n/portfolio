function createLayout() {
	const page = document.body.dataset.page;

	const menus = {
		home: [
			{ name: "WORKS", link: "works.html" },
			{ name: "SKILLS", link: "skills.html" },
			{ name: "ABOUT", link: "about.html" },
			{ name: "CONTACT", link: "contact.html" },
		],

		works: [
			{ name: "HOME", link: "index.html" },
			{ name: "SKILLS", link: "skills.html" },
			{ name: "ABOUT", link: "about.html" },
			{ name: "CONTACT", link: "contact.html" },
		],

		skills: [
			{ name: "HOME", link: "index.html" },
			{ name: "WORKS", link: "works.html" },
			{ name: "ABOUT", link: "about.html" },

			{ name: "CONTACT", link: "contact.html" },
		],

		about: [
			{ name: "HOME", link: "index.html" },
			{ name: "WORKS", link: "works.html" },
			{ name: "SKILLS", link: "skills.html" },
			{ name: "CONTACT", link: "contact.html" },
		],

		contact: [
			{ name: "HOME", link: "index.html" },
			{ name: "WORKS", link: "works.html" },
			{ name: "SKILLS", link: "skills.html" },
			{ name: "ABOUT", link: "about.html" },
		],

		creative: [
			{ name: "HOME", link: "index.html" },
			{ name: "WORKS", link: "works.html" },
			{ name: "SKILLS", link: "skills.html" },
			{ name: "ABOUT", link: "about.html" },
			{ name: "CONTACT", link: "contact.html" },
		],
	};

	const header = document.getElementById("header");
	const footer = document.getElementById("footer");

	const nav = menus[page]
		.map((item) => `<a href="${item.link}">${item.name}</a>`)
		.join("");

	header.innerHTML = `
	<header class="game-header">
	<a class="site-brand" href="index.html">
			<span class="site-brand__name">Arashi's PORTFOLIO</span>
			<span class="site-brand__role">WEB / IT CREATOR</span>
		</a>

		<button class="menu-btn">MENU</button>

		<nav class="game-nav">
			${nav}
		</nav>
	</header>
`;

	if (footer && page !== "home") {
		footer.innerHTML = `
		<footer class="game-footer">
			<a class="game-footer__thanks" href="index.html">
				THANKS FOR PLAYING!
			</a>
			<small class="game-footer__copyright">
				© 2026 Arashi
			</small>
		</footer>
	`;
	}
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
