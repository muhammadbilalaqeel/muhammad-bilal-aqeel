const toggleBtn = document.getElementById("toggleBtn");
const menuIcon = toggleBtn.querySelector("i");
const sidebar = document.getElementById("sidebar");
const closeSidebarBtn = document.querySelector(".closeSidebar");

// Toggle menu button click
toggleBtn.addEventListener("click", function () {
  if (menuIcon.classList.contains("fa-bars")) {
    // Open sidebar
    menuIcon.classList.replace("fa-bars", "fa-xmark");
    sidebar.classList.remove("translate-x-full");
  } else if (menuIcon.classList.contains("fa-xmark")) {
    // Close sidebar
    menuIcon.classList.replace("fa-xmark", "fa-bars");
    sidebar.classList.add("translate-x-full");
  }
});

// Close button click
closeSidebarBtn.addEventListener("click", function () {
  sidebar.classList.add("translate-x-full");
  menuIcon.classList.replace("fa-xmark", "fa-bars"); // Reset icon
});

const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const sunIcon = sun.querySelector("img");
const moonIcon = moon.querySelector("img");

const themeToggler = document.getElementById("themeToggler");
themeToggler.addEventListener("click", function () {
  if (sunIcon.classList.contains("hidden")) {
    sunIcon.classList.remove("hidden");
    sun.classList.remove("otherMode");
    moonIcon.classList.add("hidden");
    moon.classList.add("otherMode");
    document.documentElement.classList.remove('dark')
  } else if (moonIcon.classList.contains("hidden")) {
    sunIcon.classList.add("hidden");
    sun.classList.add("otherMode");
    moonIcon.classList.remove("hidden");
    moon.classList.remove("otherMode");
        document.documentElement.classList.add('dark')
  }
});



const downloadBtn = document.getElementById('downloadBtn');



const sun1 = document.getElementById("sun1");
const moon1 = document.getElementById("moon1");
const sunIcon1 = sun1.querySelector("img");
const moonIcon1 = moon1.querySelector("img");

const themeToggler1 = document.getElementById("themeToggler1");
themeToggler1.addEventListener("click", function () {
  if (sunIcon1.classList.contains("hidden")) {
    sunIcon1.classList.remove("hidden");
    sun1.classList.remove("otherMode");
    moonIcon1.classList.add("hidden");
    moon1.classList.add("otherMode");
    document.documentElement.classList.remove('dark');
  } else if (moonIcon1.classList.contains("hidden")) {
    sunIcon1.classList.add("hidden");
    sun1.classList.add("otherMode");
    moonIcon1.classList.remove("hidden");
    moon1.classList.remove("otherMode");
    document.documentElement.classList.add('dark');
  }
});
