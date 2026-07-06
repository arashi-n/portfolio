const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const subjectError = document.getElementById("subject-error");
const messageError = document.getElementById("message-error");

const submitButton = form.querySelector('button[type="submit"]');
const defaultButtonText = submitButton.textContent;

document.getElementById("success-close")?.addEventListener("click", () => {
	const modal = document.getElementById("contact-success");
	closeModal(modal);

	document.getElementById("contact-form")?.scrollIntoView({
		behavior: "smooth",
		block: "start",
	});
});

document.getElementById("retry-send")?.addEventListener("click", () => {
	closeModal(document.getElementById("contact-error"));

	document.getElementById("contact-form")?.scrollIntoView({
		behavior: "smooth",
		block: "start",
	});
});

const GAS_URL =
	"https://script.google.com/macros/s/AKfycbzzrsFMwJxpGv9iT2pZ2Y6cgc2OuE1aqmWGgL6bLi0O1nGFGkAMGTNMsrCj1NnwWh3F/exec";

let isSubmitting = false;

// ----------------------
// エラー関連
// ----------------------
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

// ----------------------
// バリデーション
// ----------------------
function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

// ----------------------
// UI状態管理
// ----------------------
function setLoadingState(isLoading) {
	isSubmitting = isLoading;

	submitButton.disabled = isLoading;
	submitButton.textContent = isLoading ? "SENDING..." : defaultButtonText;
}

// ----------------------
// モーダル
// ----------------------
function showSuccessModal() {
	openModal("contact-success");
	window.scrollTo({ top: 0, behavior: "smooth" });
}

function showErrorModal() {
	openModal("contact-error");
}

// ----------------------
// 通信処理（GAS）
// ----------------------
async function sendContact(formData) {
	const res = await fetch(GAS_URL, {
		method: "POST",
		body: JSON.stringify(formData),
	});

	if (!res.ok) {
		throw new Error("Request failed");
	}

	return res;
}

// ----------------------
// メイン送信処理
// ----------------------
form.addEventListener("submit", async (event) => {
	event.preventDefault();

	if (isSubmitting) return;

	clearErrors();

	const name = nameInput.value.trim();
	const email = emailInput.value.trim();
	const subject = subjectInput.value.trim();
	const message = messageInput.value.trim();

	let hasError = false;
	let firstError = null;

	// validation
	if (name === "") {
		nameError.textContent = "Please enter your name.";
		nameInput.classList.add("error");
		hasError = true;
		firstError = firstError || nameInput;
	}

	if (email === "") {
		emailError.textContent = "Please enter your email address.";
		emailInput.classList.add("error");
		hasError = true;
		firstError = firstError || emailInput;
	} else if (!isValidEmail(email)) {
		emailError.textContent = "Please enter a valid email address.";
		emailInput.classList.add("error");
		hasError = true;
		firstError = firstError || emailInput;
	}

	if (subject.length > 100) {
		subjectError.textContent = "Subject must be 100 characters or less.";
		hasError = true;
		firstError = firstError || subjectInput;
	}

	if (message === "") {
		messageError.textContent = "Please enter your message.";
		messageInput.classList.add("error");
		hasError = true;
		firstError = firstError || messageInput;
	} else if (message.length < 10) {
		messageError.textContent = "Message must be at least 10 characters.";
		messageInput.classList.add("error");
		hasError = true;
		firstError = firstError || messageInput;
	}

	if (hasError) {
		firstError.focus();
		return;
	}

	const data = {
		name,
		email,
		subject,
		message,
	};

	try {
		setLoadingState(true);

		await sendContact(data);

		form.reset();
		clearErrors();
		openModal("contact-success");
	} catch (error) {
		console.error(error);
		openModal("contact-error");
	} finally {
		setLoadingState(false);
	}
});
