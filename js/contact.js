const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const subjectError = document.getElementById("subject-error");
const messageError = document.getElementById("message-error");

function clearErrors() {
	nameError.textContent = "";
	emailError.textContent = "";
	subjectError.textContent = "";
	messageError.textContent = "";
}

function clearFieldError(input, error) {
	input.addEventListener("input", () => {
		error.textContent = "";
		input.classList.remove("error");
	});
}

clearFieldError(nameInput, nameError);
clearFieldError(emailInput, emailError);
clearFieldError(subjectInput, subjectError);
clearFieldError(messageInput, messageError);

function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();

	clearErrors();

	const name = nameInput.value.trim();
	const email = emailInput.value.trim();
	const subject = subjectInput.value.trim();
	const message = messageInput.value.trim();

	let hasError = false;
	let firstError = null;

	if (name === "") {
		nameError.textContent = "Please enter your name.";
		nameInput.classList.add("error");
		hasError = true;

		if (!firstError) firstError = nameInput;
	}

	if (email === "") {
		emailError.textContent = "Please enter your email address.";
		emailInput.classList.add("error");
		hasError = true;

		if (!firstError) firstError = emailInput;
	} else if (!isValidEmail(email)) {
		emailError.textContent = "Please enter a valid email address.";
		emailInput.classList.add("error");
		hasError = true;

		if (!firstError) firstError = emailInput;
	}

	if (subject.length > 100) {
		subjectError.textContent = "Subject must be 100 characters or less.";
		hasError = true;

		if (!firstError) firstError = subjectInput;
	}

	if (message === "") {
		messageError.textContent = "Please enter your message.";
		messageInput.classList.add("error");
		hasError = true;

		if (!firstError) firstError = messageInput;
	} else if (message.length < 10) {
		messageError.textContent = "Message must be at least 10 characters.";
		messageInput.classList.add("error");
		hasError = true;

		if (!firstError) firstError = messageInput;
	}

	if (hasError) {
		firstError.focus();
		return;
	}

	console.log("Validation OK");
});
