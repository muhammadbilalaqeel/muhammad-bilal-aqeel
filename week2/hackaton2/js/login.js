document.getElementById("email").addEventListener("input", () => {
  hideError("emailError");
});

document.getElementById("password").addEventListener("input", () => {
  hideError("passwordError");
});

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  let isValid = true;


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError("emailError", "Email is required");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError("emailError", "Invalid email format");
    isValid = false;
  } else {
    hideError("emailError");
  }

  if (password === "") {
    showError("passwordError", "Password is required");
    isValid = false;
  } else {
    hideError("passwordError");
  }

  if (!isValid) return;


  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email);

  if (!user) {
    showError("emailError", "Email is not registered");
    return;
  }

  if (user.password !== password) {
    showError("passwordError", "Invalid password");
    return;
  }

  window.location.href = "selectQuiz.html"; 
});

function showError(errorId, message) {
  const errorEl = document.getElementById(errorId);
  const inputEl = document.getElementById(errorId.replace("Error", ""));

  errorEl.textContent = message;
  errorEl.classList.remove("hidden");

  inputEl.classList.add("input-error", "shake");

  setTimeout(() => {
    inputEl.classList.remove("shake");
  }, 400);
}

function hideError(errorId) {
  const errorEl = document.getElementById(errorId);
  const inputEl = document.getElementById(errorId.replace("Error", ""));

  errorEl.textContent = "";
  errorEl.classList.add("hidden");

  inputEl.classList.remove("input-error", "shake");
}
