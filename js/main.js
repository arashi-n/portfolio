// ====================
// DOM取得
// ====================
const player = document.querySelector(".player");
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
const speed = 1.5;

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

// ====================
// 関数
// ====================
function resizeGame() {
	const game = document.querySelector(".game-world");

	const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);

	game.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", resizeGame);
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

function update() {
	// プレイヤー移動
	let prevX = x;

	if (keys["ArrowUp"] || keys["w"]) y -= speed;
	if (keys["ArrowDown"] || keys["s"]) y += speed;
	if (keys["ArrowLeft"] || keys["a"]) x -= speed;
	if (keys["ArrowRight"] || keys["d"]) x += speed;

	player.style.left = x + "px";
	player.style.top = y + "px";

	// 向き変更
	if (x < prevX) {
		player.classList.remove("left");
	} else if (x > prevX) {
		player.classList.add("left");
	}

	// 吹き出し更新
	if (speech && !speechHidden) {
		speech.style.left = x + "px";
		speech.style.top = y - 70 + "px";
	}

	// 移動判定
	const isMoving =
		keys["ArrowUp"] ||
		keys["ArrowDown"] ||
		keys["ArrowLeft"] ||
		keys["ArrowRight"] ||
		keys["w"] ||
		keys["a"] ||
		keys["s"] ||
		keys["d"];

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

	// 次フレーム更新
	requestAnimationFrame(update);
}

// ====================
// 演出
// ====================
setInterval(animateBuildings, 1500);

// ====================
// 初期化
// ====================
update();
