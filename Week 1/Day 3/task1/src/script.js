const darkIconBox = document.querySelector(".dark");
const darkIcon = darkIconBox.querySelector("i");
const lightIconBox = document.querySelector(".light");
const lightIcon = lightIconBox.querySelector("i");

// Set mode from localStorage on load
const theme = localStorage.getItem("theme");

if (theme === "dark") {
  enableDarkMode();
} else {
  enableLightMode();
}

darkIconBox.addEventListener("click", () => {
  enableDarkMode();
  localStorage.setItem("theme", "dark");
});

lightIconBox.addEventListener("click", () => {
  enableLightMode();
  localStorage.setItem("theme", "light");
});

function enableDarkMode() {
  document.documentElement.classList.add("dark");

  darkIconBox.classList.add("bg-black");
  darkIcon.classList.remove("text-black");
  darkIcon.classList.add("text-white");

  lightIconBox.classList.remove("bg-black");
  lightIcon.classList.remove("text-white");
  lightIcon.classList.add("text-black");
}

function enableLightMode() {
  document.documentElement.classList.remove("dark");

  lightIconBox.classList.add("bg-black");
  lightIcon.classList.remove("text-black");
  lightIcon.classList.add("text-white");

  darkIconBox.classList.remove("bg-black");
  darkIcon.classList.remove("text-white");
  darkIcon.classList.add("text-black");
}

// Mobile Menu

const menu_btn = document.querySelector(".mobile_menu");
const menu_icon = menu_btn.querySelector("i");
const nav_menu = document.getElementById("mobile_nav");
menu_btn.addEventListener("click", function () {
  // console.log(menu_icon);
  if (menu_icon.classList.contains("fa-bars")) {
    menu_icon.classList.remove("fa-bars");
    menu_icon.classList.add("fa-xmark");
    nav_menu.classList.remove("translate-x-[100%]");
    nav_menu.classList.add("mobile_nav");
  } else if (menu_icon.classList.contains("fa-xmark")) {
    menu_icon.classList.add("fa-bars");
    menu_icon.classList.remove("fa-xmark");
    nav_menu.classList.add("translate-x-[100%]");
    nav_menu.classList.remove("mobile_nav");
  }
});



// Scroll TO Top

 // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      scrollToTopBtn.classList.remove('opacity-0', 'invisible');
      scrollToTopBtn.classList.add('opacity-100', 'visible');
    } else {
      scrollToTopBtn.classList.add('opacity-0', 'invisible');
      scrollToTopBtn.classList.remove('opacity-100', 'visible');
    }
  });

  // Smooth scroll to top
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });