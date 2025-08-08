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
const tabContainer = document.getElementById("tabContainer");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

const updateScrollButtons = () => {
  const scrollLeft = tabContainer.scrollLeft;
  const maxScrollLeft = tabContainer.scrollWidth - tabContainer.clientWidth;

  // Use Math.ceil for reliable comparison
  scrollLeftBtn.style.display = scrollLeft > 0 ? "block" : "none";
  scrollRightBtn.style.display =
    Math.ceil(scrollLeft) < maxScrollLeft ? "block" : "none";
};

scrollLeftBtn.addEventListener("click", () => {
  tabContainer.scrollBy({ left: -150, behavior: "smooth" });
});

scrollRightBtn.addEventListener("click", () => {
  tabContainer.scrollBy({ left: 150, behavior: "smooth" });
});

tabContainer.addEventListener("scroll", updateScrollButtons);

// Initial check on load and resize
window.addEventListener("load", updateScrollButtons);
window.addEventListener("resize", updateScrollButtons);

const tabs = [
  "All",
  "HTML Basics",
  "CSS Grid & Flexbox",
  "JavaScript Essentials",
  "Python Fundamentals",
  "UI/UX Principles",
];

const tabList = document.getElementById("tabList");

tabs.forEach((tab) => {
  tabList.innerHTML += `
     <li>
                <a
                  href="#"
                  class="px-4 tab-btn h-8 w-full text-nowrap py-2  inline-flex items-center justify-center bg-light-gray text-light-dark rounded-lg text-sm font-medium"
                  data-tab="${tab}"
                  >${tab}</a
                >
              </li>
    `;
});

const featureCards = [
  {
    title: "HTML Basics",
    description: "Learn the structure of web pages using HTML.",
    image:
      "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHRtbHxlbnwwfHwwfHx8MA%3D%3D",
    category: "HTML",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "Hyperlinking Text Made Logical",
        ],
        correctOption: 0,
      },
      {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        correctOption: 0,
      },
      {
        question: "Which HTML element is used to define a paragraph?",
        options: ["<p>", "<para>", "<pg>", "<text>"],
        correctOption: 0,
      },
      {
        question: "Which attribute is used to provide an image source?",
        options: ["href", "src", "link", "img"],
        correctOption: 1,
      },
      {
        question: "How do you insert a line break in HTML?",
        options: ["<break>", "<lb>", "<br>", "<hr>"],
        correctOption: 2,
      },
      {
        question: "Which HTML element defines the title of a document?",
        options: ["<meta>", "<head>", "<title>", "<header>"],
        correctOption: 2,
      },
      {
        question: "What is the correct HTML for adding a background color?",
        options: [
          "<body style='bgcolor:yellow;'>",
          "<body bgcolor='yellow'>",
          "<background>yellow</background>",
          "<body color='yellow'>",
        ],
        correctOption: 1,
      },
      {
        question: "Which tag is used to display a list of items in bullets?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        correctOption: 1,
      },
      {
        question: "How can you make text bold in HTML?",
        options: ["<strong>", "<bold>", "<bld>", "<text-bold>"],
        correctOption: 0,
      },
      {
        question: "Which doctype declaration is correct for HTML5?",
        options: [
          "<!DOCTYPE html>",
          "<doctype html>",
          "<!HTML5>",
          "<!DOCTYPE HTML5>",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "CSS Flexbox",
    description: "Master layout techniques with CSS Flexbox.",
    image:
      "https://images.unsplash.com/photo-1610986603166-f78428624e76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNzc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "CSS",
    questions: [
      {
        question: "What is the default value of the flex-direction property?",
        options: ["row", "column", "row-reverse", "column-reverse"],
        correctOption: 0,
      },
      {
        question:
          "Which property defines how flex items are aligned along the main axis?",
        options: [
          "justify-content",
          "align-items",
          "flex-direction",
          "flex-wrap",
        ],
        correctOption: 0,
      },
      {
        question: "Which property sets how items wrap in a flex container?",
        options: ["flex-flow", "wrap", "flex-wrap", "align-wrap"],
        correctOption: 2,
      },
      {
        question: "Which value aligns flex items to the center horizontally?",
        options: [
          "align-items: center",
          "justify-content: center",
          "text-align: center",
          "center",
        ],
        correctOption: 1,
      },
      {
        question: "What does the `align-items` property do?",
        options: [
          "Aligns items vertically",
          "Aligns text inside items",
          "Sets margin",
          "Wraps items",
        ],
        correctOption: 0,
      },
      {
        question: "Which value makes all flex items take equal width?",
        options: ["flex: 1", "flex: auto", "width: 100%", "flex-grow: 0"],
        correctOption: 0,
      },
      {
        question: "Which direction is not a valid value for flex-direction?",
        options: ["row", "column", "top", "row-reverse"],
        correctOption: 2,
      },
      {
        question: "What is the default display value for a flex container?",
        options: ["block", "inline-flex", "flex", "grid"],
        correctOption: 2,
      },
      {
        question: "Which property allows spacing between items?",
        options: ["gap", "space-between", "margin", "padding"],
        correctOption: 0,
      },
      {
        question:
          "Which shorthand property combines flex-grow, flex-shrink, and flex-basis?",
        options: ["flex", "flex-flow", "flex-group", "flex-wrap"],
        correctOption: 0,
      },
    ],
  },
  {
    title: "JavaScript DOM",
    description: "Manipulate web pages dynamically using JavaScript DOM.",
    image:
      "https://images.unsplash.com/photo-1592609931041-40265b692757?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8anN8ZW58MHx8MHx8fDA%3D",
    category: "JavaScript",
    questions: [
      {
        question: "Which method is used to select an element by ID?",
        options: [
          "document.querySelector()",
          "document.getElementById()",
          "document.getElement()",
          "document.selectById()",
        ],
        correctOption: 1,
      },
      {
        question: "How do you create a new element in the DOM?",
        options: [
          "document.createElement()",
          "document.newElement()",
          "create.element()",
          "document.appendElement()",
        ],
        correctOption: 0,
      },
      {
        question: "Which method adds a child node to a parent?",
        options: ["appendChild()", "addChild()", "append()", "childAppend()"],
        correctOption: 0,
      },
      {
        question: "What does `innerText` do?",
        options: [
          "Sets HTML",
          "Sets style",
          "Sets visible text only",
          "Returns full markup",
        ],
        correctOption: 2,
      },
      {
        question: "Which method removes an element from the DOM?",
        options: [
          "removeElement()",
          "deleteElement()",
          "element.remove()",
          "element.delete()",
        ],
        correctOption: 2,
      },
      {
        question:
          "Which property gets or sets the HTML content inside an element?",
        options: ["innerHTML", "text", "content", "htmlContent"],
        correctOption: 0,
      },
      {
        question: "How do you listen for an event on an element?",
        options: [
          "addEventListener()",
          "attachEvent()",
          "listenEvent()",
          "onEvent()",
        ],
        correctOption: 0,
      },
      {
        question: "What does `querySelectorAll()` return?",
        options: [
          "A single element",
          "An array",
          "A NodeList",
          "A jQuery object",
        ],
        correctOption: 2,
      },
      {
        question: "Which DOM method changes the class of an element?",
        options: [
          "className",
          "classList.add()",
          "classList.remove()",
          "All of the above",
        ],
        correctOption: 3,
      },
      {
        question: "How do you change the value of an input field in JS?",
        options: [
          "input.value = 'new'",
          "input.setValue('new')",
          "input.innerText = 'new'",
          "input.content = 'new'",
        ],
        correctOption: 0,
      },
    ],
  },
];

const featuredContainer = document.getElementById("featuredContainer");

featureCards.forEach((card) => {
  featuredContainer.innerHTML += `
    <div 
      class="feature-card cursor-pointer flex flex-col sm:w-[254.67px] sm:h-[225px] gap-2"
      data-title="${card.title}"
    >
      <img
        src=${card.image}
        alt=""
        class="w-full sm:h-[143px] h-[170px] object-cover object-center rounded-lg"
      />
      <div>
        <h3 class="text-base font-medium text-light-dark leading-6">
          ${card.title}
        </h3>
        <p class="text-sm leading-5 text-light-darkGray">
         ${card.description}
        </p>
      </div>
    </div>
  `;
});

// Assume you have access to quizData (imported or defined above)
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("click", () => {
    const selectedTitle = card.getAttribute("data-title");

    // Find matching quiz data
    const selectedQuiz = quizData.find((quiz) => quiz.title === selectedTitle);

    if (selectedQuiz) {
      localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
      // Redirect to quiz page (change `quiz.html` to your file name)
      window.location.href = "quiz.html";
    } else {
      alert("Quiz not found for selected card.");
    }
  });
});

const quizData = [
  {
    title: "HTML Basics",
    description: "Test your knowledge of HTML fundamentals.",
    image:
      "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHRtbHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Web Development",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "Hyperlinking Text Made Logical",
        ],
        correctOption: 0,
      },
      {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        correctOption: 0,
      },
      {
        question: "Which HTML element is used to define a paragraph?",
        options: ["<p>", "<para>", "<pg>", "<text>"],
        correctOption: 0,
      },
      {
        question: "Which attribute is used to provide an image source?",
        options: ["href", "src", "link", "img"],
        correctOption: 1,
      },
      {
        question: "How do you insert a line break in HTML?",
        options: ["<break>", "<lb>", "<br>", "<hr>"],
        correctOption: 2,
      },
      {
        question: "Which HTML element defines the title of a document?",
        options: ["<meta>", "<head>", "<title>", "<header>"],
        correctOption: 2,
      },
      {
        question: "What is the correct HTML for adding a background color?",
        options: [
          "<body style='bgcolor:yellow;'>",
          "<body bgcolor='yellow'>",
          "<background>yellow</background>",
          "<body color='yellow'>",
        ],
        correctOption: 1,
      },
      {
        question: "Which tag is used to display a list of items in bullets?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        correctOption: 1,
      },
      {
        question: "How can you make text bold in HTML?",
        options: ["<strong>", "<bold>", "<bld>", "<text-bold>"],
        correctOption: 0,
      },
      {
        question: "Which doctype declaration is correct for HTML5?",
        options: [
          "<!DOCTYPE html>",
          "<doctype html>",
          "<!HTML5>",
          "<!DOCTYPE HTML5>",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "CSS Grid & Flexbox",
    description: "Understand layout systems in modern CSS.",
    image:
      "https://images.unsplash.com/photo-1610986603166-f78428624e76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNzc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Web Development",
    questions: [
      {
        question: "Which property is used to create a flex container?",
        options: [
          "display: block",
          "display: inline",
          "display: flex",
          "display: grid",
        ],
        correctOption: 2,
      },
      {
        question: "Which CSS property aligns items in a flex container?",
        options: [
          "align-items",
          "justify-items",
          "align-content",
          "justify-self",
        ],
        correctOption: 0,
      },
      {
        question: "Which value enables a grid layout?",
        options: [
          "display: flex",
          "display: block",
          "display: grid",
          "display: inline-grid",
        ],
        correctOption: 2,
      },
      {
        question: "What does `fr` stand for in CSS Grid?",
        options: ["Fraction", "Free", "Flexible Ratio", "Flex Unit"],
        correctOption: 0,
      },
      {
        question: "Which property defines the spacing between grid items?",
        options: ["grid-spacing", "gap", "grid-gap", "spacing"],
        correctOption: 1,
      },
    ],
  },
  {
    title: "JavaScript Essentials",
    description: "Explore the core concepts of JavaScript.",
    image:
      "https://images.unsplash.com/photo-1592609931041-40265b692757?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8anN8ZW58MHx8MHx8fDA%3D",
    category: "Programming",
    questions: [
      {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["let", "var", "const", "define"],
        correctOption: 2,
      },
      {
        question: "What is the result of '2' + 2 in JavaScript?",
        options: ["4", "'4'", "'22'", "NaN"],
        correctOption: 2,
      },
      {
        question: "Which method is used to parse a string to an integer?",
        options: ["parseInt()", "toInteger()", "Number()", "parseFloat()"],
        correctOption: 0,
      },
      {
        question: "How do you write a comment in JavaScript?",
        options: [
          "<!-- comment -->",
          "// comment",
          "/* comment */",
          "Both B and C",
        ],
        correctOption: 3,
      },
      {
        question: "Which symbol is used for strict equality?",
        options: ["==", "!=", "===", "!=="],
        correctOption: 2,
      },
    ],
  },
  {
    title: "Python Fundamentals",
    description: "Get started with Python basics.",
    image:
      "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHl0aG9ufGVufDB8fDB8fHww",
    category: "Programming",
    questions: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "define", "fun"],
        correctOption: 1,
      },
      {
        question: "Which data type is immutable?",
        options: ["list", "dict", "set", "tuple"],
        correctOption: 3,
      },
      {
        question: "How do you write a comment in Python?",
        options: [
          "// comment",
          "# comment",
          "/* comment */",
          "<!-- comment -->",
        ],
        correctOption: 1,
      },
      {
        question: "What is the output of 3 ** 2?",
        options: ["6", "9", "8", "5"],
        correctOption: 1,
      },
      {
        question: "Which function is used to get input from a user?",
        options: ["get()", "read()", "input()", "scan()"],
        correctOption: 2,
      },
    ],
  },
  {
    title: "UI/UX Principles",
    description: "Understand the core principles of good UI/UX design.",
    image:
      "https://plus.unsplash.com/premium_photo-1720903984909-04be5b4cda06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dWklMkZ1eHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Design",
    questions: [
      {
        question: "What does UX stand for?",
        options: [
          "User Xperience",
          "Unified Experience",
          "User Experience",
          "User Exchange",
        ],
        correctOption: 2,
      },
      {
        question: "Which principle focuses on making interfaces intuitive?",
        options: ["Consistency", "Affordance", "Accessibility", "Feedback"],
        correctOption: 1,
      },
      {
        question: "What color contrast ratio is recommended for readability?",
        options: ["2:1", "3:1", "4.5:1", "1:1"],
        correctOption: 2,
      },
      {
        question: "Which of these enhances usability?",
        options: [
          "Hidden features",
          "Complex navigation",
          "Clear CTAs",
          "Long forms",
        ],
        correctOption: 2,
      },
      {
        question: "What is the goal of responsive design?",
        options: [
          "Faster performance",
          "Desktop-only layout",
          "Content adapts to any screen size",
          "Fancy animations",
        ],
        correctOption: 2,
      },
    ],
  },
];

const quizContainer = document.getElementById("quizContainer");

const quizCards = document.querySelector("#quizContainer .q");
const quizHeading = document.querySelector("#quizContainer h2");

tabList.addEventListener("click", (e) => {
  if (e.target.matches(".tab-btn")) {
    const selectedTab = e.target.dataset.tab;

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("bg-light-dark", "text-white");
      btn.classList.add("bg-light-gray", "text-light-dark");
    });

    e.target.classList.remove("bg-light-gray", "text-light-dark");
    e.target.classList.add("bg-light-dark", "text-white");

    const filteredData =
      selectedTab === "All"
        ? quizData
        : quizData.filter((quiz) => quiz.title === selectedTab);

    quizHeading.textContent =
      selectedTab === "All" ? "All Quizzes" : selectedTab;

    renderQuizCards(filteredData);
  }
});

function renderQuizCards(data) {
  quizCards.innerHTML = "";

  data.forEach((quiz) => {
    quizCards.innerHTML += `
      <div 
        class="quiz-card p-4 flex justify-between gap-3 md:flex-row flex-col cursor-pointer w-full"
        data-title="${quiz.title}"
      >
        <div>
          <h3 class="text-base font-bold leading-5 text-light-dark">
            ${quiz.title}
          </h3>
          <p class="text-sm leading-5 text-light-darkGray">
            ${quiz.description}
          </p>
        </div>
        <div>
          <img
            src=${quiz.image}
            alt=""
            class="md:w-[320px] w-full h-[171px] object-cover object-center rounded-lg"
          />
        </div>
      </div>
    `;
  });
  document.querySelectorAll(".quiz-card").forEach((card) => {
    card.addEventListener("click", () => {
      const selectedTitle = card.getAttribute("data-title");
      const selectedQuiz = data.find((q) => q.title === selectedTitle);

      if (selectedQuiz) {
        localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
        window.location.href = "quiz.html";
      } else {
        alert("Quiz not found.");
      }
    });
  });
}

document.querySelector('[data-tab="All"]').click();




const tabSearchInput = document.getElementById("tabSearch");
const tabButtons = document.querySelectorAll(".tab-btn");

tabSearchInput.addEventListener("input", () => {
  const query = tabSearchInput.value.toLowerCase().trim();

  if (!query) {
    // If empty, show all quizzes (default to "All")
    const allTabData = quizzesData; // assuming quizzesData is your full data array
    renderQuizCards(allTabData);
    return;
  }

  const matchedQuizzes = quizzesData.filter((quiz) => {
    const titleMatch = quiz.title.toLowerCase().includes(query);
    const tabMatch = quiz.category.toLowerCase().includes(query); // Make sure you have `category` in your data
    return titleMatch || tabMatch;
  });

  if (matchedQuizzes.length > 0) {
    renderQuizCards(matchedQuizzes);
  } else {
    quizCards.innerHTML = `
      <p class="text-center text-lg font-semibold text-red-500">
        No matching quizzes found.
      </p>`;
  }
});

