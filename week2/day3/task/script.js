const menuItems = [
  {
    id: 1,
    title: "The Classic for 3",
    description:
      "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium fries",
    image: "./assets/burger_meal.png",
    price: 23.1,
    currency: "GBP",
    category: "Meals",
    type: "burger",
    available: true,
    rating: 4.6,
    tags: ["Combo", "Popular", "Family"],
  },
  {
    id: 2,
    title: "Double Big Mac",
    description: "Double Big Mac™, extra beef patties, pickles and sauce",
    image: "./assets/burger_meal.png",
    price: 10.99,
    currency: "GBP",
    category: "Main",
    type: "burger",
    available: true,
    rating: 4.4,
    tags: ["Big Mac", "Extra Beef", "Classic"],
  },
  {
    id: 3,
    title: "McChicken Deluxe",
    description: "Tender chicken fillet, lettuce, and creamy mayo",
    image: "./assets/burger_meal.png",
    price: 8.5,
    currency: "GBP",
    category: "Main",
    type: "burger",
    available: true,
    rating: 4.3,
    tags: ["Chicken", "Deluxe", "Mild"],
  },
  {
    id: 4,
    title: "Veggie Supreme Burger",
    description: "Grilled veggie patty with cheese, lettuce, and tomato",
    image: "./assets/burger_meal.png",
    price: 7.99,
    currency: "GBP",
    category: "Vegetarian",
    type: "burger",
    available: true,
    rating: 4.1,
    tags: ["Veg", "Healthy", "New"],
  },
  {
    id: 5,
    title: "Spicy Zinger Burger",
    description: "Fiery chicken patty with jalapeños and spicy sauce",
    image: "./assets/burger_meal.png",
    price: 9.25,
    currency: "GBP",
    category: "Spicy",
    type: "burger",
    available: true,
    rating: 4.5,
    tags: ["Spicy", "Chicken", "Zinger"],
  },
  {
    id: 6,
    title: "BBQ Bacon Burger",
    description: "Smoky BBQ sauce, crispy bacon, and beef patty",
    image: "./assets/burger_meal.png",
    price: 10.5,
    currency: "GBP",
    category: "BBQ",
    type: "burger",
    available: true,
    rating: 4.7,
    tags: ["BBQ", "Bacon", "Beef"],
  },
  {
    id: 7,
    title: "Classic Fries",
    description: "Golden and crispy salted fries",
    image: "./assets/fries_1.png",
    price: 2.99,
    currency: "GBP",
    category: "Sides",
    type: "fries",
    available: true,
    rating: 4.8,
    tags: ["Salted", "Classic"],
  },
  {
    id: 8,
    title: "Cheesy Fries",
    description: "Fries loaded with melted cheddar and mozzarella",
    image: "./assets/fries_2.png",
    price: 4.5,
    currency: "GBP",
    category: "Sides",
    type: "fries",
    available: true,
    rating: 4.6,
    tags: ["Cheese", "Loaded", "Snack"],
  },
  {
    id: 9,
    title: "Spicy Masala Fries",
    description: "Indian-style masala seasoned fries",
    image: "./assets/fries_3.png",
    price: 3.99,
    currency: "GBP",
    category: "Sides",
    type: "fries",
    available: true,
    rating: 4.4,
    tags: ["Spicy", "Masala", "Crispy"],
  },
  {
    id: 10,
    title: "Curly Fries",
    description: "Curly cut crispy fries with seasoning",
    image: "./assets/fries_1.png",
    price: 4.25,
    currency: "GBP",
    category: "Sides",
    type: "fries",
    available: true,
    rating: 4.5,
    tags: ["Curly", "Crispy"],
  },
  {
    id: 11,
    title: "Sweet Potato Fries",
    description: "Healthier fries made from sweet potatoes",
    image: "./assets/fries_2.png",
    price: 4.75,
    currency: "GBP",
    category: "Sides",
    type: "fries",
    available: true,
    rating: 4.2,
    tags: ["Sweet", "Healthy"],
  },
  {
    id: 12,
    title: "Truffle Parmesan Fries",
    description: "Crispy fries topped with truffle oil and parmesan",
    image: "./assets/fries_3.png",
    price: 5.99,
    currency: "GBP",
    category: "Gourmet",
    type: "fries",
    available: true,
    rating: 4.9,
    tags: ["Truffle", "Premium", "Cheesy"],
  },
  {
    id: 13,
    title: "Chocolate Shake",
    description: "Rich and creamy chocolate flavored shake",
    image: "./assets/drink_1.png",
    price: 3.99,
    currency: "GBP",
    category: "Drinks",
    type: "cold-drinks",
    available: true,
    rating: 4.6,
    tags: ["Chocolate", "Cold", "Sweet"],
  },
  {
    id: 14,
    title: "Strawberry Shake",
    description: "Fresh strawberry puree blended in smooth shake",
    image: "./assets/drink_2.png",
    price: 3.99,
    currency: "GBP",
    category: "Drinks",
    type: "cold-drinks",
    available: true,
    rating: 4.5,
    tags: ["Strawberry", "Fruity", "Sweet"],
  },
  {
    id: 15,
    title: "Mango Shake",
    description: "Tropical mango blended with milk and ice cream",
    image: "./assets/drink_3.png",
    price: 4.25,
    currency: "GBP",
    category: "Drinks",
    type: "cold-drinks",
    available: true,
    rating: 4.7,
    tags: ["Mango", "Tropical", "Cold"],
  },
  {
    id: 16,
    title: "Oreo Shake",
    description: "Cookies & cream shake with crushed Oreos",
    image: "./assets/drink_4.png",
    price: 4.5,
    currency: "GBP",
    category: "Dessert",
    type: "cold-drinks",
    available: true,
    rating: 4.9,
    tags: ["Oreo", "Creamy", "Dessert"],
  },
  {
    id: 17,
    title: "Vanilla Shake",
    description: "Classic vanilla milkshake with whipped topping",
    image: "./assets/drink_3.png",
    price: 3.75,
    currency: "GBP",
    category: "Drinks",
    type: "cold-drinks",
    available: true,
    rating: 4.3,
    tags: ["Vanilla", "Classic", "Chilled"],
  },
  {
    id: 18,
    title: "Peanut Butter Shake",
    description: "Nutty shake with real peanut butter and vanilla ice cream",
    image: "./assets/drink_1.png",
    price: 4.99,
    currency: "GBP",
    category: "Dessert",
    type: "cold-drinks",
    available: true,
    rating: 4.6,
    tags: ["Peanut Butter", "Protein", "Smooth"],
  },
];

const productContainer = document.getElementById("products");
const loader = document.getElementById("loader");
const scrollContainer = document.getElementById("tab-scroll-container");
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");
const tabButtons = document.querySelectorAll(".tab-btn");

const scrollAmount = 200;

function toggleScrollButtons() {
  scrollLeftBtn.classList.toggle("hidden", scrollContainer.scrollLeft === 0);
  scrollRightBtn.classList.toggle(
    "hidden",
    scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
      scrollContainer.scrollWidth - 10
  );
}

scrollLeftBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});
scrollRightBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

scrollContainer.addEventListener("scroll", toggleScrollButtons);
window.addEventListener("resize", toggleScrollButtons);
window.addEventListener("load", () => {
  renderProducts("offer");
  toggleScrollButtons();
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();

  const filteredItems = menuItems.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  });

  renderFilteredProducts(filteredItems);
});

function renderFilteredProducts(items) {
  productContainer.innerHTML = "";

  const itemsByType = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  for (const [type, typeItems] of Object.entries(itemsByType)) {
    let sectionHTML = `
      <section id="${type}" class="custom-max-w my-8">
        <h2 class="${
          type === "fries" || type === "cold-drinks" || type === "pizza"
            ? "text-light-brand"
            : ""
        }">
          ${type.toUpperCase()}
        </h2>
        <div class="product-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    `;

    typeItems.forEach((item) => {
      sectionHTML += `
        <div class="card group flex sm:items-center sm:justify-between gap-2 relative cursor-pointer">
          <div class="flex flex-col sm:justify-center sm:gap-6 gap-1">
            <h3 class="text-xl font-semibold">${item.title}</h3>
            <p>${item.description}</p>
            <p class="text-brand font-bold">${item.currency} ${item.price}</p>
          </div>
          <div class="img relative ${item.type === "pizza" ? "pizza" : ""}">
            <img src="${item.image}" alt="${item.title}" />
            <div
              class="add-to-cart w-[88px] h-[81px] rounded-tl-[45px] rounded-br-[12px] bg-white absolute right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div onclick='addToCart(${
                item.id
              }, this)' class="plus w-[45px] h-[45px] rounded-full text-white flex items-center justify-center bg-light-darkbg text-2xl cursor-pointer transition-transform duration-300">
                +
              </div>
            </div>
          </div>
        </div>
      `;
    });

    sectionHTML += `</div></section>`;
    productContainer.innerHTML += sectionHTML;
  }


  if (items.length === 0) {
    productContainer.innerHTML = `<p class="text-center text-gray-500 mt-8">No matching items found.</p>`;
  }
}

function renderProducts(selectedType) {
  productContainer.innerHTML = "";
  loader.style.display = "flex";

  setTimeout(() => {
    loader.style.display = "none";

    const typesToRender =
      selectedType === "offer"
        ? [...new Set(menuItems.map((item) => item.type))]
        : [selectedType];

    typesToRender.forEach((type) => {
      const itemsOfType = menuItems.filter((item) => item.type === type);

      let sectionHTML = `
        <section id="${type}" class="custom-max-w my-8">
          <h2 class="${
            type === "fries" || type === "cold-drinks" || type === "pizza"
              ? "text-light-brand"
              : ""
          }">
            ${type.toUpperCase()}
          </h2>
          <div class="product-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      `;

      if (itemsOfType.length === 0) {
        sectionHTML += `<p class="col-span-full text-center text-gray-500">No items to show for this.</p>`;
      } else {
        itemsOfType.forEach((item) => {
          sectionHTML += `
            <div class="card group flex sm:items-center sm:justify-between gap-2 relative cursor-pointer">
              <div class="flex flex-col sm:justify-center sm:gap-6 gap-1">
                <h3 class="text-xl font-semibold">${item.title}</h3>
                <p>${item.description}</p>
                <p class="text-brand font-bold">${item.currency} ${
            item.price
          }</p>
              </div>
              <div class="img relative ${item.type === "pizza" ? "pizza" : ""}">
                <img src="${item.image}" alt="${item.title}" />
                <div
                  class="add-to-cart w-[88px] h-[81px] rounded-tl-[45px] rounded-br-[12px] bg-white absolute right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div onclick='addToCart(${
                    item.id
                  }, this)' class="plus w-[45px] h-[45px] rounded-full text-white flex items-center justify-center bg-light-darkbg text-2xl cursor-pointer transition-transform duration-300" >
                      +
                  </div>

                </div>
              </div>
            </div>
          `;
        });
      }

      sectionHTML += `</div></section>`;
      productContainer.innerHTML += sectionHTML;
    });
  }, 800);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedType = button.dataset.type;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    renderProducts(selectedType);
  });
});

const customerReviews = [
  {
    id: 1,
    name: "St Gix",
    location: "South London",
    date: "24th September, 2023",
    rating: 5,
    comment:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    avatar: "./assets/review_user.png",
  },
  {
    id: 2,
    name: "Amelia Clark",
    location: "East London",
    date: "12th October, 2023",
    rating: 4,
    comment:
      "Really loved the service speed and the crispy fries! A great experience overall, though the seating was a bit tight during rush hour.",
    avatar: "./assets/review_user.png",
  },
  {
    id: 3,
    name: "Liam Patel",
    location: "Birmingham",
    date: "5th November, 2023",
    rating: 5,
    comment:
      "Came in with low expectations and left impressed. The burgers were hot, the drinks cold, and everything came out in under 10 minutes.",
    avatar: "./assets/review_user.png",
  },
  {
    id: 4,
    name: "Zara Khan",
    location: "Manchester",
    date: "8th December, 2023",
    rating: 3,
    comment:
      "Average experience. The nuggets were lukewarm and the drink machine wasn't working. Staff tried to help but the delay was annoying.",
    avatar: "./assets/review_user.png",
  },
  {
    id: 5,
    name: "Noah Smith",
    location: "Leeds",
    date: "15th January, 2024",
    rating: 4,
    comment:
      "Good customer service and very clean environment. Loved how attentive the team was even during busy hours.",
    avatar: "./assets/review_user.png",
  },
  {
    id: 6,
    name: "Emily Brown",
    location: "Bristol",
    date: "1st February, 2024",
    rating: 5,
    comment:
      "Best McDonald's experience I’ve had in a while! The order was accurate, fresh, and staff was cheerful.",
    avatar: "./assets/review_user.png",
  },
];

const reviewsSlider = document.querySelector("#reviews-slider ul");
customerReviews.forEach((review) => {
  reviewsSlider.innerHTML += `
    <li class="splide__slide">
                  <div
                    class="review w-full h-full bg-white rounded-md p-4 py-8 flex flex-col shadow-md"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                    >
                      <div class="flex gap-2 items-center">
                        <img
                          src="./assets/review_user.png"
                          class="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-full"
                          alt="Reviewer"
                        />
                        <div
                          class="divider w-px h-10 bg-light-brand hidden sm:block"
                        ></div>
                        <div>
                          <h3
                            class="text-base sm:text-lg font-semibold text-light-darkbg"
                          >
                            ${review.name}
                          </h3>
                          <p class="text-sm -mt-1 sm:text-base text-light-brand">
                            ${review.location}
                          </p>
                        </div>
                      </div>
                      <div class="flex flex-col items-start sm:items-end gap-1">
                        <div class="flex gap-1.5">
                          <img src="./assets/star.png" alt="Star" />
                          <img src="./assets/star.png" alt="Star" />
                          <img src="./assets/star.png" alt="Star" />
                          <img src="./assets/star.png" alt="Star" />
                          <img src="./assets/star.png" alt="Star" />
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                          <img src="./assets/time_span.png" alt="Date" />
                          <p class="sm:text-[13px] text-sm">${review.date}</p>
                        </div>
                      </div>
                    </div>
                    <div class="r mt-6 sm:mt-8">
                      <p
                        class="text-sm  leading-relaxed "
                      >
                       ${review.comment}
                      </p>
                    </div>
                  </div>
                </li>
    `;
});
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");

openModalBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("hidden");
  modalOverlay.classList.add("flex");
  document.body.classList.add("overflow-hidden");
});

modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.add("hidden");
    modalOverlay.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
});

function hideCart() {
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}
// Cart

const cart = [];

function addToCart(itemId, el) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  const existingItem = cart.find((cartItem) => cartItem.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  renderCart();
  updateCartCount();

  el.innerHTML = "&#10003;";
  el.classList.add("success", "scale-110");

  Toastify({
    text: `${item.title} added to cart!`,
    duration: 2500,
    gravity: "top",
    position: "right",
    backgroundColor: "#22c55e",
    close: true,
    stopOnFocus: true,
  }).showToast();
  setTimeout(() => {
    el.innerHTML = "+";
    el.classList.remove("success", "scale-110");
  }, 1500);
}

function increaseQuantity(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity++;
    renderCart();
  }
}

function decreaseQuantity(id) {
  const item = cart.find((i) => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(id);
  }
  renderCart();
}

function removeFromCart(id) {
  const index = cart.findIndex((i) => i.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  renderCart();
}

function renderTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalElement = document.createElement("div");
  totalElement.className = "text-right text-xl font-bold mt-4";
  totalElement.textContent = `Total: £${total.toFixed(2)}`;
  document.getElementById("cart-list").appendChild(totalElement);
}

function updateCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;
  if (totalCount === 0) {
    cartCountEl.classList.add("hidden");
  } else {
    cartCountEl.classList.remove("hidden");
  }
}

function renderCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='text-center text-base md:text-lg text-gray-500 py-8'>Your cart is empty.</p>";
    return;
  }

  const ul = document.createElement("ul");
  ul.id = "cart-list";
  ul.className =
    "flex flex-col lg:gap-4 md:gap-3 sm:gap-2 gap-1 max-h-[45vh] overflow-y-auto w-full sm:w-[95%] md:w-[90%] max-w-[1045px] mx-auto md:py-4 lg:py-6 md:px-4 p-2 lg:px-6 rounded-lg bg-gray-50";

  cart.forEach((item) => {
    ul.innerHTML += `
      <li class="group transition-all duration-150 ease-out hover:bg-light-darkbg flex flex-col sm:flex-row rounded-xl h-auto sm:h-[90px] items-start sm:items-center justify-between border border-[#00000066] bg-[#D9D9D999] p-3 sm:px-6 sm:mb-4 mb-2 space-y-2 sm:space-y-0">
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <div class="img h-[60px] w-[60px] rounded-full overflow-hidden flex items-center justify-center">
            <img src="${item.image}" alt="${item.title}" class="h-full w-full object-cover object-center">
          </div>
          <div class="divider group-hover:bg-light-gray bg-[#00000066] w-0.5 h-14 sm:h-20 rounded-md hidden sm:block"></div>
          <h4 class="text-base sm:text-lg group-hover:text-light-brand text-light-darkbg font-bold line-clamp-1">
            ${item.title}
          </h4>
        </div>

        <div class="flex items-center gap-3 self-end sm:self-auto">
          <button onclick="decreaseQuantity(${item.id})"
            class="minus h-9 w-9 group-hover:bg-light-gray group-hover:text-light-darkbg bg-light-darkbg text-white rounded-full flex items-center justify-center text-xl cursor-pointer">-</button>

          <div class="h-[50px] w-[48px] rounded-md bg-white text-xl text-center p-2 flex items-center justify-center">
            ${item.quantity}
          </div>

          <button onclick="increaseQuantity(${item.id})"
            class="plus h-9 w-9 group-hover:bg-light-gray group-hover:text-light-darkbg bg-light-darkbg text-white rounded-full flex items-center justify-center text-xl cursor-pointer">+</button>
        </div>
      </li>
    `;
  });

  cartContainer.appendChild(ul);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const summary = document.createElement("div");
  summary.innerHTML = `
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between md:py-4 py-2 md:gap-4 gap-2">
      <div class="bg-light-brand md:px-4 md:py-4 p-2 gap-4 flex items-start md:items-center justify-between rounded-md text-white w-full md:w-auto">
        <span class="text-sm md:text-base">Total to pay</span>
        <span class="text-base md:text-xl font-bold">RS ${total.toFixed(
          2
        )}</span>
      </div>
      <p class="text-sm text-gray-600">Delivery & Tax will be calculated in the next step</p>
    </div>

    <div class="flex  py-4 justify-end items-end gap-2">
      <a  class="text-sm cursor-pointer underline text-gray-600" onclick="hideCart()">Take me back</a>
      <a href="https://developer.mozilla.org/" class="bg-[#028643] text-white rounded-md px-6 py-3 flex items-center justify-center">
        Next Step
      </a>
    </div>
  `;

  cartContainer.appendChild(summary);
}

renderCart();

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobile");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("translate-y-0");

  if (isOpen) {
    // Close menu
    mobileMenu.classList.replace("translate-y-0", "-translate-y-full");
    // mobileMenu.classList.replace("top-[100px]", "top-0");
    overlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    menuToggle.textContent = "☰";
  } else {
    // Open menu
    mobileMenu.classList.replace("-translate-y-full", "translate-y-0");
    // mobileMenu.classList.replace("top-0", "top-[100px]");
    overlay.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    menuToggle.textContent = "✖";
  }
});

// Close on overlay click
overlay.addEventListener("click", () => {
  mobileMenu.classList.replace("translate-y-0", "-translate-y-full");
  overlay.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
  menuToggle.textContent = "☰";
});

const restaurants = [
  {
    id: 1,
    name: "McDonald's London",
    logo: "./assets/macdonalds.png",
  },
  {
    id: 2,
    name: "Papa Johns",
    logo: "./assets/papa_johns.png",
  },
  {
    id: 3,
    name: "KFC West London",
    logo: "./assets/kfc.png",
  },
  {
    id: 4,
    name: "Texas Chicken",
    logo: "./assets/texas.png",
  },
  {
    id: 5,
    name: "Burger King",
    logo: "./assets/burger_king.png",
  },
  {
    id: 6,
    name: "Shaurma 1",
    logo: "./assets/one_shaurma.png",
  },
];

const restaurantsGrid = document.getElementsByClassName("restaurants-grid")[0];

restaurants.forEach((restaurant) => {
  restaurantsGrid.innerHTML += `
  <div class="restaurant-card">
                <img src=${restaurant.logo} alt="" />
                <span class="">${restaurant.name}</span>
  </div>
  `;
});

const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    scrollToTopBtn.classList.remove("hidden");
  } else {
    scrollToTopBtn.classList.add("hidden");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 100) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("bg-light-brand", "text-white", "rounded");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("bg-light-brand", "text-white", "rounded");
    }
  });
});

// Restaurant Info Section

const restaurantInfo = {
  deliveryInformation: {
    timings: [
      { day: "Monday", time: "12:00 AM–3:00 AM, 8:00 AM–3:00 AM" },
      { day: "Tuesday", time: "8:00 AM–3:00 AM" },
      { day: "Wednesday", time: "8:00 AM–3:00 AM" },
      { day: "Thursday", time: "8:00 AM–3:00 AM" },
      { day: "Friday", time: "8:00 AM–3:00 AM" },
      { day: "Saturday", time: "8:00 AM–3:00 AM" },
      { day: "Sunday", time: "8:00 AM–12:00 AM" },
    ],
    estimatedDelivery: "20 min",
  },
  contactInformation: {
    note: "If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.",
    phone: "+934443-43",
    website: "http://mcdonalds.uk/",
  },
  operationalTimes: [
    { day: "Monday", time: "8:00 AM–3:00 AM" },
    { day: "Tuesday", time: "8:00 AM–3:00 AM" },
    { day: "Wednesday", time: "8:00 AM–3:00 AM" },
    { day: "Thursday", time: "8:00 AM–3:00 AM" },
    { day: "Friday", time: "8:00 AM–3:00 AM" },
    { day: "Saturday", time: "8:00 AM–3:00 AM" },
    { day: "Sunday", time: "8:00 AM–3:00 AM" },
  ],
};

const infoSection = document.getElementById("res_info");

const dInfo = document.querySelector(".d_list");

restaurantInfo.deliveryInformation.timings.forEach((timing) => {
  dInfo.innerHTML += `
    <li class="flex items-start gap-2">
      <span class="text-light-darkbg font-semibold text-[14px]">${timing.day}:</span>
      <p class="text-[14px]">${timing.time}</p>
    </li>
  `;
});

const opInfo = document.querySelector(".op_list");

restaurantInfo.operationalTimes.forEach((timing) => {
  opInfo.innerHTML += `
    <li class="flex items-center gap-2">
      <span class="text-[14px] font-semibold">${timing.day}:</span>
      <p class="text-[14px]">${timing.time}</p>
    </li>
  `;
});

const tabLinks = document.querySelectorAll(".tab-link");

tabLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    tabLinks.forEach((tab) =>
      tab.classList.remove(
        "active-tab",
        "p-6",
        "border",
        "border-light-brand",
        "rounded-[40px]",
        "font-semibold"
      )
    );

    this.classList.add(
      "active-tab",
      "p-6",
      "border",
      "border-light-brand",
      "rounded-[40px]",
      "font-semibold"
    );
  });
});

const tabs = document.querySelectorAll(".tab-item");

tabs.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();

    tabs.forEach((t) => t.classList.remove("bg-light-brand", "text-black"));

    this.classList.add("bg-light-brand", "text-black");
    this.classList.remove("hover:underline");
  });
});

const tabsData = [
  {
    mainTab: "Frequent Questions",
    subTabs: [
      {
        question: "How does Order.UK work?",
        content: {
          gridItems: [
            {
              title: "Place an Order!",
              image: "./assets/order-food 1.png",
              description: "Place order through our website or Mobile app",
            },
            {
              title: "Track Progress",
              image: "./assets/food 1.png",
              description: "Double check your address and order items",
            },
            {
              title: "Get Your Order",
              image: "./assets/order 1.png",
              description: "Get your food at your doorstep with live tracking",
            },
          ],
          paragraph:
            "Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!",
        },
      },
      {
        question: "What payment methods are accepted?",
        content: {
          gridItems: [
            {
              title: "Credit/Debit Cards",
              image: "./assets/food 1.png",
              description: "Visa, Mastercard, and more accepted",
            },
            {
              title: "Cash on Delivery",
              image: "./assets/order-food 1.png",
              description: "Pay with cash when your order arrives",
            },
            {
              title: "Mobile Wallets",
              image: "./assets/order 1.png",
              description: "JazzCash, EasyPaisa, and other wallets supported",
            },
          ],
          paragraph:
            "We support all major payment methods including cards, wallets, and cash to make your experience seamless.",
        },
      },
      {
        question: "Can I track my order in real-time?",
        content: {
          gridItems: [
            {
              title: "Live Order Updates",
              image: "./assets/order 1.png",
              description: "Track your food with GPS in real-time",
            },
            {
              title: "Delivery ETA",
              image: "./assets/food 1.png",
              description: "Estimated arrival time shown live",
            },
            {
              title: "Driver Contact",
              image: "./assets/order-food 1.png",
              description: "Get in touch with the driver if needed",
            },
          ],
          paragraph:
            "Yes, you can track your food from preparation to delivery with our live order tracking system.",
        },
      },

      {
        question: "Is Order.UK available in my area?",
        content: {
          gridItems: [
            {
              title: "Live Order Updates",
              image: "./assets/order-food 1.png",
              description: "Track your food with GPS in real-time",
            },
            {
              title: "Delivery ETA",
              image: "./assets/food 1.png",
              description: "Estimated arrival time shown live",
            },
            {
              title: "Driver Contact",
              image: "./assets/order 1.png",
              description: "Get in touch with the driver if needed",
            },
          ],
          paragraph:
            "Yes, you can track your food from preparation to delivery with our live order tracking system.",
        },
      },
    ],
  },
  {
    mainTab: "Who we are?",
    subTabs: [
      {
        question: "Our Mission",
        content: {
          gridItems: [
            {
              title: "Local Focus",
              image: "./assets/order 1.png",
              description: "Empowering local restaurants",
            },
            {
              title: "Reliable Delivery",
              image: "./assets/order-food 1.png",
              description: "Delivering quality every time",
            },
            {
              title: "Community Driven",
              image: "./assets/food 1.png",
              description: "Serving with responsibility",
            },
          ],
          paragraph:
            "Our mission is to connect people with great food and support the local economy by enabling restaurant growth.",
        },
      },
      {
        question: "Our Values",
        content: {
          gridItems: [
            {
              title: "Integrity",
              image: "./assets/food 1.png",
              description: "We are transparent and honest",
            },
            {
              title: "Innovation",
              image: "./assets/order 1.png",
              description: "Constantly evolving with technology",
            },
            {
              title: "Customer First",
              image: "./assets/order-food 1.png",
              description: "Every decision revolves around our users",
            },
          ],
          paragraph:
            "We believe in integrity, innovation, and putting customers at the center of everything we do.",
        },
      },
      {
        question: "Our History",
        content: {
          gridItems: [
            {
              title: "Founded in 2020",
              image: "./assets/order-food 1.png",
              description: "Started with a small team in Lahore",
            },
            {
              title: "Growing Fast",
              image: "./assets/order 1.png",
              description: "Now serving in 10+ cities",
            },
            {
              title: "Award-Winning",
              image: "./assets/food 1.png",
              description: "Recognized for best food delivery experience",
            },
          ],
          paragraph:
            "From a small startup to a nationwide delivery platform, our journey is defined by hard work and community support.",
        },
      },
    ],
  },
  {
    mainTab: "Partner Program",
    subTabs: [
      {
        question: "Why partner with us?",
        content: {
          gridItems: [
            {
              title: "Increased Reach",
              image: "./assets/food 1.png",
              description: "Tap into a wide customer base",
            },
            {
              title: "Easy Integration",
              image: "./assets/order-food 1.png",
              description: "Join with minimal setup",
            },
            {
              title: "Marketing Boost",
              image: "./assets/order 1.png",
              description: "We promote your restaurant",
            },
          ],
          paragraph:
            "Partnering with Order.UK gives you access to more customers, robust support, and growth opportunities.",
        },
      },
      {
        question: "How to get started?",
        content: {
          gridItems: [
            {
              title: "Sign Up Online",
              image: "./assets/order 1.png",
              description: "Fill out our simple onboarding form",
            },
            {
              title: "Verify Details",
              image: "./assets/food 1.png",
              description: "We review your business details",
            },
            {
              title: "Start Selling",
              image: "./assets/order-food 1.png",
              description: "List your menu and begin receiving orders",
            },
          ],
          paragraph:
            "Getting started is easy. Just sign up, verify your details, and you'll be ready to serve more customers.",
        },
      },
      {
        question: "Success Stories",
        content: {
          gridItems: [
            {
              title: "Fast Growth",
              image: "./assets/order-food 1.png",
              description: "40% order increase within 3 months",
            },
            {
              title: "Strong Branding",
              image: "./assets/food 1.png",
              description: "Brand visibility across the city",
            },
            {
              title: "Positive Reviews",
              image: "./assets/order 1.png",
              description: "Thousands of happy customers",
            },
          ],
          paragraph:
            "Hundreds of partners have scaled their business and reached new customers with our platform.",
        },
      },
    ],
  },
  {
    mainTab: "Help & Support",
    subTabs: [
      {
        question: "Need help with an order?",
        content: {
          gridItems: [
            {
              title: "Live Chat",
              image: "./assets/order 1.png",
              description: "Get support from our agents instantly",
            },
            {
              title: "Call Support",
              image: "./assets/order-food 1.png",
              description: "Available 9am–12am every day",
            },
            {
              title: "Order History",
              image: "./assets/food 1.png",
              description: "Find and manage previous orders",
            },
          ],
          paragraph:
            "We’re always here to help. Use our live chat, call support, or review your order history for solutions.",
        },
      },
      {
        question: "Having payment issues?",
        content: {
          gridItems: [
            {
              title: "Refund Requests",
              image: "./assets/food 1.png",
              description: "Submit refund within 24 hours",
            },
            {
              title: "Payment Status",
              image: "./assets/order 1.png",
              description: "Track success or failure of payment",
            },
            {
              title: "Support Center",
              image: "./assets/order-food 1.png",
              description: "Find answers to common issues",
            },
          ],
          paragraph:
            "Facing a payment issue? Contact our support and get fast resolution or apply for a refund easily.",
        },
      },
      {
        question: "Can’t log in?",
        content: {
          gridItems: [
            {
              title: "Forgot Password",
              image: "./assets/order-food 1.png",
              description: "Reset via SMS or email",
            },
            {
              title: "Account Lock",
              image: "./assets/food 1.png",
              description: "Contact support if your account is locked",
            },
            {
              title: "Security Settings",
              image: "./assets/order 1.png",
              description: "Keep your account safe with 2FA",
            },
          ],
          paragraph:
            "If you're having trouble logging in, reset your password or contact our support to unlock your account.",
        },
      },
    ],
  },
];

const mainTabsContainer = document.getElementById("mainTabs");
const subTabsContainer = document.getElementById("subTabs");
const tabContentContainer = document.getElementById("tabContent");

let currentMainIndex = 0;
let currentSubIndex = 0;

function renderMainTabs() {
  mainTabsContainer.innerHTML = "";
  tabsData.forEach((tab, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = tab.mainTab;
    a.className = `tab-link md:text-[14px] text-[12px] p-2 font-semibold xl:p-6 sm:p-3 rounded-[40px] border ${
      index === currentMainIndex
        ? "active-tab border-light-brand"
        : "hover:text-light-darkbg hover:underline"
    }`;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentMainIndex = index;
      currentSubIndex = 0;
      renderMainTabs();
      renderSubTabs();
      renderContent();
    });

    li.appendChild(a);
    mainTabsContainer.appendChild(li);
  });
}

function renderSubTabs() {
  subTabsContainer.innerHTML = "";
  const subTabs = tabsData[currentMainIndex].subTabs;
  subTabs.forEach((sub, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = sub.question;
    a.className =
      "tab-item xl:text-[14px] text-[13px] font-semibold xl:p-4 p-2 rounded-[40px] text-center text-wrap " +
      (index === currentSubIndex
        ? "bg-light-brand text-black"
        : "hover:underline");

    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentSubIndex = index;
      renderSubTabs();
      renderContent();
    });

    li.appendChild(a);
    subTabsContainer.appendChild(li);
  });
}

function renderContent() {
  const content = tabsData[currentMainIndex].subTabs[currentSubIndex].content;

  tabContentContainer.innerHTML = `
    <div class="g grid md:grid-cols-[repeat(3,_1fr)] grid-cols-1 gap-4 sm:px-8 px-3">
      ${content.gridItems
        .map(
          (item) => `
        <div class="flex flex-col items-center gap-4 bg-light-gray text-black p-6 rounded-[12px]">
          <h4 class="text-center text-[15px] font-semibold">${item.title}</h4>
          <img src="${item.image}" alt="${item.title}">
          <p class="text-center sm:text-[14px] text-[12px]">${item.description}</p>
        </div>
      `
        )
        .join("")}
    </div>
    <p class="mt-4 text-center">${content.paragraph}</p>
  `;
}

// Initialize
renderMainTabs();
renderSubTabs();
renderContent();

const mainTabsWrapper = document.getElementById("mainTabsWrapper");
const mainTabsScrollLeftBtn = document.getElementById("mainTabsScrollLeft");
const mainTabsScrollRightBtn = document.getElementById("mainTabsScrollRight");

const checkMainTabsScroll = () => {
  mainTabsScrollLeftBtn.style.display =
    mainTabsWrapper.scrollLeft > 0 ? "flex" : "none";

  const maxScrollLeft =
    mainTabsWrapper.scrollWidth - mainTabsWrapper.clientWidth;
  mainTabsScrollRightBtn.style.display =
    mainTabsWrapper.scrollLeft < maxScrollLeft ? "flex" : "none";
};

mainTabsScrollLeftBtn.addEventListener("click", () => {
  mainTabsWrapper.scrollBy({ left: -150, behavior: "smooth" });
});

mainTabsScrollRightBtn.addEventListener("click", () => {
  mainTabsWrapper.scrollBy({ left: 150, behavior: "smooth" });
});

mainTabsWrapper.addEventListener("scroll", checkMainTabsScroll);
window.addEventListener("resize", checkMainTabsScroll);

checkMainTabsScroll();

const back = document.getElementById("back");

back.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
});
