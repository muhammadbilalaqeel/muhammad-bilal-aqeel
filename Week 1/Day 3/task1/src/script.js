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

// Header Background Color change on scroll to top

// const header = document.querySelector('header');

// window.addEventListener('scroll',function(){
// if(window.scrollY > 10){
//     header.classList.add('bg-black','text-white');
//     AOS.refresh()
// }
// else{
//      header.classList.remove('bg-black')
// }
// })
