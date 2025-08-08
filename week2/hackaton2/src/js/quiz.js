if (!localStorage.getItem("currentQuiz")) {
  localStorage.setItem("currentQuiz", JSON.stringify(quizData));
}

const quiz = JSON.parse(localStorage.getItem("currentQuiz"));
const questions = quiz.questions;
let currentQuestion = 0;
let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];

const questionText = document.querySelector("#h");
const optionsContainer = document.querySelector(".options");
const progressText = document.querySelector(".quiz p");
const progressBar = document.querySelector(".quiz .relative .bg-light-dark");
const prevBtn = document.querySelector("button.bg-light-gray");
const nextBtn = document.querySelector("button.bg-light-blue");

function renderQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.question;
  progressText.textContent = `Question ${index + 1} of ${questions.length}`;
  optionsContainer.innerHTML = "";

  q.options.forEach((option, i) => {
    const isChecked = userAnswers[index] === i;
    const optionId = `option-${index}-${i}`;
    const optionHTML = `
      <label for="${optionId}" class="option flex gap-4 rounded-lg p-4 border border-light-boxborder">
        <input
          type="radio"
          class="h-5 w-5 rounded-full"
          id="${optionId}"
          name="option"
          value="${i}"
          ${isChecked ? 'checked' : ''}
        />
        <span class="text-sm font-medium text-light-dark">${option}</span>
      </label>
    `;
    optionsContainer.innerHTML += optionHTML;
  });

  const percent = ((index + 1) / questions.length) * 100;
  progressBar.style.width = `${percent}%`;

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? "Submit" : "Next";
}

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
});

nextBtn.addEventListener("click", () => {
  // Get all radio buttons for the current question
  const radioButtons = document.querySelectorAll(`input[name="option"]`);
  let selectedOption = null;

  // Find which one is checked
  radioButtons.forEach(radio => {
    if (radio.checked) {
      selectedOption = radio.value;
    }
  });

  if (selectedOption === null) {
    alert("Please select an option to continue.");
    return;
  }

  // Save the answer
  userAnswers[currentQuestion] = parseInt(selectedOption);
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

  // Move to next question or submit
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  } else {
    localStorage.setItem("finalAnswers", JSON.stringify(userAnswers));
    window.location.href = "completed.html";
  }
});


// Initial render
renderQuestion(currentQuestion);
