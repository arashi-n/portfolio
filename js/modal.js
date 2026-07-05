const cards = document.querySelectorAll(".work-card, .creative-card");
const closeButtons = document.querySelectorAll(".modal-links button");

function openModal(id) {
	const modal = document.getElementById(id);
	if (modal) modal.classList.add("open");
}

function closeModal(modal) {
	if (modal) modal.classList.remove("open");
}

cards.forEach((card) => {
	card.addEventListener("click", () => {
		const modalId = card.dataset.modal;
		if (!modalId) return;
		openModal(modalId);
	});
});

document.querySelectorAll(".modal-links button").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		closeModal(e.target.closest(".modal"));
	});
});

document.querySelectorAll(".modal").forEach((modal) => {
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal(modal);
		}
	});
});
