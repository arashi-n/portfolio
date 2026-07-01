// ====================
// DOM取得
// ====================
const input = {
	up: false,
	down: false,
	left: false,
	right: false,
};

let dragging = false;
let startX = 0;
let startY = 0;

const player = document.querySelector(".player");
const map = document.querySelector(".game-world");
const playerImg = document.querySelector(".player img");
const speech = document.querySelector(".player-speech");

// ====================
// 状態管理
// ====================
let speechHidden = false;

let x = 916;
let y = 595;

let frameTimer = 0;
let frameIndex = 0;

let isTransitioning = false;

let currentBuilding = 0;

// ====================
// 定数
// ====================
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const speed = 3;
let lastTime = performance.now();

const keys = {};

const walkFrames = ["./assets/player_walk1.png", "./assets/player_walk2.png"];

// ====================
// 建物データ
// ====================
const buildings = [
	{ el: document.querySelector(".castle-hit"), link: "works.html" },
	{ el: document.querySelector(".house-hit"), link: "about.html" },
	{ el: document.querySelector(".skill-tree-hit"), link: "skills.html" },
	{ el: document.querySelector(".mailbox-hit"), link: "contact.html" },
];

if (!player) console.error("player not found");

const animatedBuildings = [
	document.querySelector(".castle"),
	document.querySelector(".house"),
	document.querySelector(".skill-tree"),
	document.querySelector(".mailbox"),
];

// ====================
// イベント
// ====================
document.addEventListener("keydown", (e) => {
	keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
	keys[e.key] = false;
});

if (isTouchDevice && map) {
	map.addEventListener("pointerdown", (e) => {
		dragging = true;
		startX = e.clientX;
		startY = e.clientY;
	});

	// if (map) {
	// 	map.addEventListener("pointerdown", (e) => {
	// 		dragging = true;
	// 		startX = e.clientX;
	// 		startY = e.clientY;
	// 	});

	map.addEventListener("pointermove", (e) => {
		if (!dragging) return;

		const dx = e.clientX - startX;
		const dy = e.clientY - startY;

		const deadZone = 25;

		input.up = false;
		input.down = false;
		input.left = false;
		input.right = false;

		if (dx > deadZone) input.right = true;
		if (dx < -deadZone) input.left = true;

		if (dy > deadZone) input.down = true;
		if (dy < -deadZone) input.up = true;
	});

	map.addEventListener("pointerup", () => {
		dragging = false;

		input.up = false;
		input.down = false;
		input.left = false;
		input.right = false;
	});

	map.addEventListener("pointerleave", () => {
		dragging = false;

		input.up = false;
		input.down = false;
		input.left = false;
		input.right = false;
	});
}
// ====================
// 関数
// ====================
function resizeGame() {
	const game = document.querySelector(".game-world");

	const vw = window.innerWidth;
	const vh = window.innerHeight;

	const scale = Math.min(vw / 1920, vh / 1080);

	game.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener("resize", resizeGame);
window.addEventListener("load", resizeGame);
resizeGame();

function hideSpeech() {
	if (!speechHidden && speech) {
		speech.style.display = "none";
		speechHidden = true;
	}
}

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

function animateBuildings() {
	const building = animatedBuildings[currentBuilding];

	building.classList.add("bounce");

	setTimeout(() => {
		building.classList.remove("bounce");
	}, 800);

	currentBuilding = (currentBuilding + 1) % animatedBuildings.length;
}

function clampPlayer() {
	const playerWidth = player.offsetWidth;
	const playerHeight = player.offsetHeight;

	x = Math.min(1920 - playerWidth, Math.max(0, x));
	y = Math.min(1080 - playerHeight, Math.max(0, y));
}

function update(timestamp) {
	const delta = (timestamp - lastTime) / 16.67;
	lastTime = timestamp;

	// プレイヤー移動
	const prevX = x;

	if (input.up) y -= speed * delta;
	if (input.down) y += speed * delta;
	if (input.left) x -= speed * delta;
	if (input.right) x += speed * delta;

	if (x < prevX) {
		player.classList.remove("left");
	} else if (x > prevX) {
		player.classList.add("left");
	}

	if (keys["ArrowLeft"] || keys["a"]) {
		player.classList.remove("left");
	} else if (keys["ArrowRight"] || keys["d"]) {
		player.classList.add("left");
	}

	clampPlayer();

	player.style.left = x + "px";
	player.style.top = y + "px";

	// 吹き出し更新
	if (speech && !speechHidden) {
		speech.style.left = x + "px";
		speech.style.top = y - 70 + "px";
	}

	// 移動判定
	const isMoving =
		input.up || input.down || input.left || input.right || dragging;

	if (isMoving && speech) {
		hideSpeech();
	}

	// 歩行アニメーション
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

	// 建物入口判定
	buildings.forEach((b) => {
		const playerRect = player.getBoundingClientRect();
		const footRect = {
			left: playerRect.left + playerRect.width * 0.35,
			right: playerRect.left + playerRect.width * 0.65,
			top: playerRect.bottom - 10,
			bottom: playerRect.bottom,
		};
		const buildingRect = b.el.getBoundingClientRect();

		const hit =
			footRect.right > buildingRect.left &&
			footRect.left < buildingRect.right &&
			footRect.bottom > buildingRect.top &&
			footRect.top < buildingRect.bottom;

		if (hit && !isTransitioning) {
			isTransitioning = true;
			document.body.style.opacity = "0";

			setTimeout(() => {
				window.location.href = b.link;
			}, 300);
		}
	});

	// 次フレーム更新
	requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
	if (e.key === "ArrowUp" || e.key === "w") input.up = true;
	if (e.key === "ArrowDown" || e.key === "s") input.down = true;
	if (e.key === "ArrowLeft" || e.key === "a") input.left = true;
	if (e.key === "ArrowRight" || e.key === "d") input.right = true;
});

window.addEventListener("keyup", (e) => {
	if (e.key === "ArrowUp" || e.key === "w") input.up = false;
	if (e.key === "ArrowDown" || e.key === "s") input.down = false;
	if (e.key === "ArrowLeft" || e.key === "a") input.left = false;
	if (e.key === "ArrowRight" || e.key === "d") input.right = false;
});

// ====================
// 演出
// ====================
setInterval(animateBuildings, 1500);

// ====================
// 初期化
// ====================
requestAnimationFrame(update);
