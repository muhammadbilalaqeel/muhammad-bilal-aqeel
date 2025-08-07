// Toggle Button

  const toggleBtn = document.querySelector(".toggleBtn");

  toggleBtn.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }



const billInput = document.getElementById("bill");
const numberOfPeopleInput = document.getElementById("number-of-people");
const tipButtons = document.querySelectorAll("#tip-btn-container button");
const customTipInput = document.getElementById("custom-tip");
const tipPerPersonDisplay = document.getElementById("tip-per-person");
const totalPerPersonDisplay = document.getElementById("tip-total");
const resetButton = document.getElementById("reset-btn");

const billError = document.getElementById("bill-error");
const peopleError = document.getElementById("number-of-people-error");

let selectedTipPercent = 0;
let lastToast = null;


function formatAmount(amount) {
  return amount.toFixed(2);
}


function showErrorToast(message) {
  if (lastToast) lastToast.hideToast();
  lastToast = Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "#e53935",
    stopOnFocus: true,
  });
  lastToast.showToast();
}


function showSuccessToast(message = "Calculation successful!") {
  if (lastToast) lastToast.hideToast();
  lastToast = Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "#10b981",
    stopOnFocus: true,
  });
  lastToast.showToast();
}


function validateInput(input, errorElement, inputName) {
  const value = parseFloat(input.value);


  errorElement.textContent = "";
  errorElement.classList.add("hidden");
  input.classList.remove("border-red-400", "animate-shake");

  if (isNaN(value)) {
    const msg = `${inputName} is required`;
    errorElement.textContent = msg;
    errorElement.classList.remove("hidden");
    input.classList.add("border-red-400", "animate-shake");
    showErrorToast(msg);
    return false;
  } else if (value <= 0) {
    const msg = `${inputName} must be a positive number`;
    errorElement.textContent = msg;
    errorElement.classList.remove("hidden");
    input.classList.add("border-red-400", "animate-shake");
    showErrorToast(msg);
    return false;
  }

  return true;
}

// Reset all error states
function resetErrors() {
  billError.textContent = "";
  peopleError.textContent = "";
  billError.classList.add("hidden");
  peopleError.classList.add("hidden");

  billInput.classList.remove("border-red-400", "animate-shake");
  numberOfPeopleInput.classList.remove("border-red-400", "animate-shake");
}


function calculateTip() {
  resetErrors();

  const billValid = validateInput(billInput, billError, "Bill");
  const peopleValid = validateInput(
    numberOfPeopleInput,
    peopleError,
    "Number of people"
  );


  setTimeout(() => {
    billInput.classList.remove("animate-shake");
    numberOfPeopleInput.classList.remove("animate-shake");
  }, 300);

  if (!billValid || !peopleValid) {
    tipPerPersonDisplay.textContent = "0.00";
    totalPerPersonDisplay.textContent = "0.00";
    return;
  }

  const bill = parseFloat(billInput.value);
  const people = parseInt(numberOfPeopleInput.value);
  const tipAmount = bill * (selectedTipPercent / 100);
  const tipPerPerson = tipAmount / people;
  const totalPerPerson = (bill + tipAmount) / people;

  tipPerPersonDisplay.textContent = formatAmount(tipPerPerson);
  totalPerPersonDisplay.textContent = formatAmount(totalPerPerson);


  showSuccessToast();
}


tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tipButtons.forEach((b) =>
      b.classList.remove("bg-[#9ee7df]", "text-[#155a57]")
    );
    btn.classList.add("bg-[#9ee7df]", "text-[#155a57]");

    selectedTipPercent = parseInt(btn.textContent);
    customTipInput.value = "";
    calculateTip();
  });
});


customTipInput.addEventListener("input", () => {
  tipButtons.forEach((b) =>
    b.classList.remove("bg-[#9ee7df]", "text-[#155a57]")
  );
  selectedTipPercent = parseFloat(customTipInput.value) || 0;
  calculateTip();
});


billInput.addEventListener("input", () => {
  billError.textContent = "";
  billError.classList.add("hidden");
  billInput.classList.remove("border-red-400", "animate-shake");

  const value = parseFloat(billInput.value);
  if (value < 0) {
    billInput.value = "";
    const msg = "Bill must be a positive number";
    billError.textContent = msg;
    billError.classList.remove("hidden");
    showErrorToast(msg);
  }
});

numberOfPeopleInput.addEventListener("input", () => {
  peopleError.textContent = "";
  peopleError.classList.add("hidden");
  numberOfPeopleInput.classList.remove("border-red-400", "animate-shake");

  const value = parseFloat(numberOfPeopleInput.value);
  if (value < 0) {
    numberOfPeopleInput.value = "";
    const msg = "Number of people must be a positive number";
    peopleError.textContent = msg;
    peopleError.classList.remove("hidden");
    showErrorToast(msg);
  }
});


resetButton.addEventListener("click", () => {
  billInput.value = "";
  numberOfPeopleInput.value = "";
  customTipInput.value = "";
  selectedTipPercent = 0;

  tipPerPersonDisplay.textContent = "0.00";
  totalPerPersonDisplay.textContent = "0.00";

  resetErrors();

  tipButtons.forEach((b) =>
    b.classList.remove("bg-[#9ee7df]", "text-[#155a57]")
  );
});
