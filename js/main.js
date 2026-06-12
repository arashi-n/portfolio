const player = document.querySelector(".player");
const playerImg = document.querySelector(".player img");

const walkFrames = ["./assets/player_walk1.png", "./assets/player_walk2.png"];

let x = 916;
let y = 595;

let frameTimer = 0;
let frameIndex = 0;

const keys = {};

document.addEventListener("keydown", (e) => {
	keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
	keys[e.key] = false;
});

const buildings = [
	{ el: document.querySelector(".castle-hit"), link: "works.html" },
	{ el: document.querySelector(".house-hit"), link: "about.html" },
	{ el: document.querySelector(".skill-tree-hit"), link: "skills.html" },
	{ el: document.querySelector(".mailbox-hit"), link: "contact.html" },
];

function getDistance(a, b) {
	const ar = a.getBoundingClientRect();
	const br = b.getBoundingClientRect();

	const ax = ar.left + ar.width / 2;
	const ay = ar.top + ar.height;

	const bx = br.left + br.width / 2;
	const by = br.top + br.height;

	const dx = ax - bx;
	const dy = ay - by;

	return Math.sqrt(dx * dx + dy * dy);
}

let isTransitioning = false;

function update() {
	const speed = 1.5;

	let prevX = x;

	if (keys["ArrowUp"] || keys["w"]) y -= speed;
	if (keys["ArrowDown"] || keys["s"]) y += speed;
	if (keys["ArrowLeft"] || keys["a"]) x -= speed;
	if (keys["ArrowRight"] || keys["d"]) x += speed;

	player.style.left = x + "px";
	player.style.top = y + "px";

	if (x < prevX) {
		player.classList.remove("left");
	} else if (x > prevX) {
		player.classList.add("left");
	}

	const isMoving =
		keys["ArrowUp"] ||
		keys["ArrowDown"] ||
		keys["ArrowLeft"] ||
		keys["ArrowRight"] ||
		keys["w"] ||
		keys["a"] ||
		keys["s"] ||
		keys["d"];

	if (isMoving) {
		frameTimer++;

		if (frameTimer > 20) {
			frameTimer = 0;
			frameIndex = (frameIndex + 1) % walkFrames.length;

			playerImg.src = walkFrames[frameIndex];
		}
	} else {
		playerImg.src = "./assets/player_idle.png";
	}

	buildings.forEach((b) => {
		const distance = getDistance(player, b.el);

		if (distance < 80 && !isTransitioning) {
			isTransitioning = true;
			document.body.style.transition = "opacity 0.3s";
			document.body.style.opacity = "0";

			setTimeout(() => {
				window.location.href = b.link;
			}, 300);
		}
	});

	requestAnimationFrame(update);
}

function drawDebugBox(el) {
	const rect = el.getBoundingClientRect();

	const box = document.createElement("div");

	box.style.position = "absolute";
	box.style.left = rect.left + "px";
	box.style.top = rect.top + "px";
	box.style.width = rect.width + "px";
	box.style.height = rect.height + "px";

	box.style.border = "2px solid red";
	box.style.pointerEvents = "none";
	box.style.zIndex = "9999";

	document.body.appendChild(box);
}

update();
