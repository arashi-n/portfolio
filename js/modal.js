const cards = document.querySelectorAll(".work-card, .creative-card");
const closeButtons = document.querySelectorAll(".modal-close");

cards.forEach((card) => {
	card.addEventListener("click", () => {
		const modalId = card.dataset.modal;

		if (!modalId) return;

		const modal = document.getElementById(modalId);

		if (modal) {
			modal.classList.add("open");
		}
	});
});

closeButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		btn.closest(".modal").classList.remove("open");
	});
});

document.querySelectorAll(".modal").forEach((modal) => {
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.classList.remove("open");
		}
	});
});
