const cards = document.querySelectorAll(".work-card, .creative-card");
const closeButtons = document.querySelectorAll(".modal-links button");

function openModal(id) {
	const modal = document.getElementById(id);
	if (modal) modal.classList.add("open");
}

cards.forEach((card) => {
	card.addEventListener("click", () => {
		const modalId = card.dataset.modal;
		if (!modalId) return;
		openModal(modalId);
	});
});

function closeModal(modal) {
	if (!modal || !modal.classList) return;
	modal.classList.remove("open");
}

document.querySelectorAll(".modal-close").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const modal = e.target.closest(".modal");
		closeModal(modal);
	});
});

document.querySelectorAll(".modal-links button").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const modal = e.target.closest(".modal");
		closeModal(modal);
	});
});

document.querySelectorAll(".modal").forEach((modal) => {
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal(modal);
		}
	});
});
