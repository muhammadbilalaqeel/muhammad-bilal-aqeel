const home = document.getElementById("home");

const ToggleMenu = document.querySelector(".toggle_btn");
const menu = document.getElementById("menu");
const cross = document.getElementById("cross");
const mbNav = document.getElementById("mb_nav");

const featuresToggle = document.getElementById("features_toggle");
const featuresMenu = document.getElementById("features_menu");

const servicesToggle = document.getElementById("services_toggle");
const servicesMenu = document.getElementById("services_menu");

const adsToggle = document.getElementById("ads_toggle");
const adsMenu = document.getElementById("ads_menu");

const mobileFeatures = document.getElementById("mobile_features_toggle");
const mobileFeaturesMenu = document.getElementById("mobile_features_menu");

const mobileServices = document.getElementById("mobile_services_toggle");
const mobileServicesMenu = document.getElementById("mobile_services_menu");

const mobileAds = document.getElementById("mobile_ads_toggle");
const mobileAdsMenu = document.getElementById("mobile_ads_menu");

const links = document.querySelectorAll("header ul li a");

// Get all icons inside toggles
const featuresIcon = featuresToggle.querySelector(".icon");
const servicesIcon = servicesToggle.querySelector(".icon");
const adsIcon = adsToggle.querySelector(".icon");

const mobileFeaturesIcon = mobileFeatures.querySelector(".icon");
const mobileServicesIcon = mobileServices.querySelector(".icon");
const mobileAdsIcon = mobileAds.querySelector(".icon");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    links.forEach((el) => el.classList.remove("active"));
    this.classList.add("active");

    if (
      ![
        "features_toggle",
        "services_toggle",
        "ads_toggle",
        "mobile_features_toggle",
        "mobile_services_toggle",
        "mobile_ads_toggle",
      ].includes(this.id)
    ) {
      closeDesktopMenus();
      closeMobileMenus();
    }
  });
});

function closeDesktopMenus() {
  featuresMenu.classList.add("hidden");
  servicesMenu.classList.add("hidden");
  adsMenu.classList.add("hidden");

  // Reset icon rotation
  featuresIcon.classList.remove("rotate-180");
  servicesIcon.classList.remove("rotate-180");
  adsIcon.classList.remove("rotate-180");
}

function closeMobileMenus() {
  [mobileFeaturesMenu, mobileServicesMenu, mobileAdsMenu].forEach((menu) => {
    menu.classList.add("hidden");
    menu.classList.remove("p-3");
  });

  // Reset icon rotation
  mobileFeaturesIcon.classList.remove("rotate-180");
  mobileServicesIcon.classList.remove("rotate-180");
  mobileAdsIcon.classList.remove("rotate-180");
}

function toggleMobileMenu(targetMenu, targetIcon, ...otherMenus) {
  targetMenu.classList.toggle("hidden");
  targetMenu.classList.toggle("p-3");

  // Toggle rotation on the clicked one
  targetIcon.classList.toggle("rotate-180");

  otherMenus.forEach((menu) => {
    menu.classList.add("hidden");
    menu.classList.remove("p-3");
  });

  // Remove rotation from others
  [mobileFeaturesIcon, mobileServicesIcon, mobileAdsIcon].forEach((icon) => {
    if (icon !== targetIcon) icon.classList.remove("rotate-180");
  });
}

if (home) home.classList.add("active");

ToggleMenu.addEventListener("click", function () {
  const menuHidden = menu.classList.contains("hidden");
  menu.classList.toggle("hidden", !menuHidden);
  cross.classList.toggle("hidden", menuHidden);
  mbNav.classList.replace(
    menuHidden ? "-translate-y-0" : "-translate-y-full",
    menuHidden ? "-translate-y-full" : "-translate-y-0"
  );
});

featuresToggle.addEventListener("click", () => {
  featuresMenu.classList.toggle("hidden");
  featuresIcon.classList.toggle("rotate-180");

  servicesMenu.classList.add("hidden");
  adsMenu.classList.add("hidden");

  servicesIcon.classList.remove("rotate-180");
  adsIcon.classList.remove("rotate-180");
});

servicesToggle.addEventListener("click", () => {
  servicesMenu.classList.toggle("hidden");
  servicesIcon.classList.toggle("rotate-180");

  featuresMenu.classList.add("hidden");
  adsMenu.classList.add("hidden");

  featuresIcon.classList.remove("rotate-180");
  adsIcon.classList.remove("rotate-180");
});

adsToggle.addEventListener("click", () => {
  adsMenu.classList.toggle("hidden");
  adsIcon.classList.toggle("rotate-180");

  featuresMenu.classList.add("hidden");
  servicesMenu.classList.add("hidden");

  featuresIcon.classList.remove("rotate-180");
  servicesIcon.classList.remove("rotate-180");
});

mobileFeatures.addEventListener("click", function (e) {
  e.preventDefault();
  toggleMobileMenu(mobileFeaturesMenu, mobileFeaturesIcon, mobileServicesMenu, mobileAdsMenu);
});

mobileServices.addEventListener("click", function (e) {
  e.preventDefault();
  toggleMobileMenu(mobileServicesMenu, mobileServicesIcon, mobileFeaturesMenu, mobileAdsMenu);
});

mobileAds.addEventListener("click", function (e) {
  e.preventDefault();
  toggleMobileMenu(mobileAdsMenu, mobileAdsIcon, mobileFeaturesMenu, mobileServicesMenu);
});
