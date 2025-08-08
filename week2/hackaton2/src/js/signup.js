const toggleBtn = document.getElementById("toggleBtn");
const btnIcon = document.querySelector("#toggleBtn > i");
const mobileMenu = document.getElementsByClassName("mobileMenu")[0];
toggleBtn.addEventListener("click", function () {
  if (btnIcon.classList.contains("fa-bars")) {
    btnIcon.classList.replace("fa-bars", "fa-xmark");
    mobileMenu.classList.replace("-translate-y-full", "translate-y-0");
  } else if (btnIcon.classList.contains("fa-xmark")) {
    btnIcon.classList.replace("fa-xmark", "fa-bars");
    mobileMenu.classList.replace("translate-y-0", "-translate-y-full");
  }
});


document.getElementById("name").addEventListener("input", () => {
  hideError("nameError");
});

document.getElementById("email").addEventListener("input", () => {
  hideError("emailError");
});

document.getElementById("password").addEventListener("input", () => {
  hideError("passwordError");
});

document.getElementById("cpassword").addEventListener("input", () => {
  hideError("cpasswordError");
});

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;

  let isValid = true;

  // Name validation
  if (name === "") {
    showError("nameError", "Name is required");
    isValid = false;
  } else if (name.length < 3) {
    showError("nameError", "Name must be at least 3 characters");
    isValid = false;
  } else {
    hideError("nameError");
  }

  // Email validation
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

  // Password validation
  if (password === "") {
    showError("passwordError", "Password is required");
    isValid = false;
  } else if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters");
    isValid = false;
  } else {
    hideError("passwordError");
  }

  // Confirm Password validation
  if (cpassword === "") {
    showError("cpasswordError", "Confirm Password is required");
    isValid = false;
  } else if (password !== cpassword) {
    showError("cpasswordError", "Passwords do not match");
    isValid = false;
  } else {
    hideError("cpasswordError");
  }

  if (isValid) {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some((u) => u.email === email);

    if (emailExists) {
      showError("emailError", "Email is already registered");
      return;
    }

    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    window.location.href = "login.html";
  }
});

function shakeElement(el) {
  el.classList.add("shake");
  setTimeout(() => {
    el.classList.remove("shake");
  }, 400);
}

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
