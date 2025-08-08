const features = [
  {
    img: "./assets/icons/clock.png",
    title: "Timed Quizzes",
    description:
      "Challenge yourself with timed quizzes to test your speed and accuracy.",
  },
  {
    img: "./assets/icons/trophy.png",
    title: "Leaderboard",
    description:
      "Compete with friends and other users to see who can achieve the highest scores.",
  },
  {
    img: "./assets/icons/graph_line.png",
    title: "Progress Tracking",
    description:
      "Track your progress and see how you improve over time with detailed performance reports.",
  },
];

const featuresBox = document.getElementById("features_box");

features.forEach((feature) => {
  featuresBox.innerHTML += `
    <div class="md:p-4 p-3 border border-light-boxborder rounded-lg h-[157px] flex flex-col sm:w-[301px] w-full flex-1 gap-2">
                <img src=${feature.img} alt=${feature.title} class="h-5 w-5">
                <h3 class="text-light-dark text-base font-bold
                ">${feature.title}</h3>
                <p class="text-light-darkGray text-sm ">${feature.description}</p>
    </div>
    `;
});

const toggleBtn = document.getElementById("toggleBtn");
const btnIcon = document.querySelector("#toggleBtn > i");
const mobileMenu = document.getElementsByClassName('mobileMenu')[0];
toggleBtn.addEventListener("click", function () {
  if (btnIcon.classList.contains("fa-bars")) {
    btnIcon.classList.replace("fa-bars", "fa-xmark");
    mobileMenu.classList.replace('-translate-y-full','translate-y-0')
  } else if (btnIcon.classList.contains("fa-xmark")) {
    btnIcon.classList.replace("fa-xmark", "fa-bars");
        mobileMenu.classList.replace('translate-y-0','-translate-y-full')
  }
});
