const menuItems = document.querySelectorAll(".status-menu__item");

function selectPanel(selectedItem) {
	menuItems.forEach((item) => {
		const isSelected = item === selectedItem;
		const panelId = item.getAttribute("aria-controls");
		const panel = document.getElementById(panelId);

		item.classList.toggle("is-active", isSelected);
		item.setAttribute("aria-selected", isSelected);
		item.tabIndex = isSelected ? 0 : -1;

		if (panel) {
			panel.hidden = !isSelected;
		}
	});
}

menuItems.forEach((item, index) => {
	item.addEventListener("click", () => {
		selectPanel(item);
	});

	item.addEventListener("keydown", (event) => {
		let nextIndex = index;

		if (event.key === "ArrowDown" || event.key === "ArrowRight") {
			nextIndex = (index + 1) % menuItems.length;
		} else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
			nextIndex = (index - 1 + menuItems.length) % menuItems.length;
		} else if (event.key === "Home") {
			nextIndex = 0;
		} else if (event.key === "End") {
			nextIndex = menuItems.length - 1;
		} else {
			return;
		}

		event.preventDefault();

		const nextItem = menuItems[nextIndex];
		nextItem.focus();
		selectPanel(nextItem);
	});
});
