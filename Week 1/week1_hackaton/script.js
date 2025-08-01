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


const mobileNavLinks = document.querySelectorAll('#mobile_nav li a');

mobileNavLinks.forEach((elem)=>{
  elem.addEventListener('click',function(){
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
  })
})


const sign_up = document.getElementById('sign_up');

sign_up.addEventListener('click',function(){
  alert("Hello World!")
})


const contact = document.getElementById('contact');

contact.addEventListener('click',function(){
  alert("Hello Contact")
})


const white = document.getElementById('white');

white.addEventListener('click',function(){
  alert("Hello White list")
})
