/* --- Flash-Sale CountDown */
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const flashSaleDate = new Date(`Dec 1, 2025 00:00:00`);

function updateCountdown() {
  const currentDate = new Date().getTime();
  const timeleft = flashSaleDate - currentDate;

  const d = Math.floor(timeleft / 1000 / 60 / 60 / 24);
  const hr = Math.floor(timeleft / 1000 / 60 / 60) % 24;
  const m = Math.floor(timeleft / 1000 / 60) % 60;
  const s = Math.floor(timeleft / 1000) % 60;

  daysEl.innerHTML = d < 10 ? "0" + d : d;
  hoursEl.innerHTML = hr < 10 ? "0" + hr : hr;
  minutesEl.innerHTML = m < 10 ? "0" + m : m;
  secondsEl.innerHTML = s < 10 ? "0" + s : s;
}

setInterval(updateCountdown, 1000);
updateCountdown();
/* --- End of Flash-Sale CountDown */

/* --- Scroll Animation --- */
document.addEventListener("DOMContentLoaded", () => {
  const itemCardsContainer = document.querySelector(".item-cards-container");
  const scrollLeft = document.getElementById("scroll-left");
  const scrollRight = document.getElementById("scroll-right");

  const scrollAmount = 478;

  if (itemCardsContainer && scrollLeft && scrollRight) {
    scrollLeft.addEventListener("click", () => {
      itemCardsContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    scrollRight.addEventListener("click", () => {
      itemCardsContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  } else {
    console.warn("Scroll elements not found. Check your HTML selectors.");
  }
});

/* --- VIEW ALL Functionality --- */
const viewAllBtn = document.querySelectorAll(".view-all");
const itemCardsContainer = document.querySelector(".item-cards-container");
const scrollButtonsWrapper = document.querySelector(".card-and-scroll-wrapper");
const scrollArrows = document.querySelectorAll(".scroll");

viewAllBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    itemCardsContainer.classList.toggle("view-all-enabled");

    if (itemCardsContainer.classList.contains("view-all-enabled")) {
      btn.textContent = "VIEW LESS";
      scrollButtonsWrapper.style.justifyContent = "flex-start";
      scrollArrows.forEach((button) => (button.style.display = "none"));
    } else {
      btn.textContent = "VIEW ALL";
      scrollButtonsWrapper.style.justifyContent = "center";
      scrollArrows.forEach((button) => (button.style.display = "flex"));
    }
  });
});

const viewAllCategoryContainer = document.querySelector(".category-container");
const categoryWrapper = document.querySelector(".category-wrap");
const scroll2Arrows = document.querySelectorAll(".scroll2");

viewAllBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    viewAllCategoryContainer.classList.toggle("view-all-enabled");

    if (viewAllCategoryContainer.classList.contains("view-all-enabled")) {
      btn.textContent = "VIEW LESS";
      categoryWrapper.style.justifyContent = "flex-start";
      scroll2Arrows.forEach((button) => (button.style.display = "none"));
    } else {
      btn.textContent = "VIEW ALL";
      categoryWrapper.style.justifyContent = "center";
      scroll2Arrows.forEach((button) => (button.style.display = "flex"));
    }
  });
});

/* See More Functionality */
const seeMoreBtn = document.querySelectorAll(".see-more");
const seeMoreProductsGrid = document.querySelector(".products-grid");

seeMoreBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    seeMoreProductsGrid.classList.toggle("view-all-enabled");

    if (seeMoreProductsGrid.classList.contains("view-all-enabled")) {
      btn.textContent = "SEE MORE";
      scrollButtonsWrapper.style.justifyContent = "flex-start";
    } else {
      btn.textContent = "SEE LESS";
      scrollButtonsWrapper.style.justifyContent = "center";
    }
  });
});

/*
const viewAllBtn = document.getElementById("view-all");
// Data for the next set of cards to be loaded
const newProductsData = [
  {
    name: "Avocado",
    image: "images/avocado.png",
    discount: "25%",
    priceOld: "₦1500.00",
    priceNew: "₦1125.00/kg",
  },
  {
    name: "Broccoli",
    image: "images/broccoli.png",
    discount: "15%",
    priceOld: "₦1000.00",
    priceNew: "₦850.00/kg",
  },
  {
    name: "Carrots",
    image: "images/carrots.png",
    discount: "40%",
    priceOld: "₦1800.00",
    priceNew: "₦1080.00/kg",
  },
  {
    name: "Gala Apple",
    image: "images/gala-apple.png",
    discount: "30%",
    priceOld: "₦900.00",
    priceNew: "₦630.00/kg",
  },
];
// Function to create and append new product cards
// Function to generate the HTML string for a single item card
const createItemCardHTML = (product) => {
  return `
        <div class="item-card">
            <img
                src="${product.image}"
                alt="${product.name}"
                class="item-image"
            />
            <div class="pricing">
                <p class="discount">${product.discount}</p>
                <h3 class="item-name">${product.name}</h3>
                <p class="item-price-old">${product.priceOld}</p>
                <div class="price-and-button">
                    <p class="item-price">${product.priceNew}</p>
                    <button class="add-to-cart-btn">+</button>
                </div>
            </div>
        </div>
    `;
};

const appendNewProductCards = (products) => {
  products.forEach((product) => {
    newCards += createItemCardHTML(product);
  });

  itemCardsContainer.innerHTML += newCards;

  viewAllBtn.style.display = "none";

  viewAllBtn.removeEventListener("click", appendNewProductCards);
};

viewAllBtn.addEventListener("click", () => {
  appendNewProductCards(newProductsData);
});
 */

/* --- Quantity Controls (Event Delegation) --- */
const productsGrid = document.querySelector(".products-grid");

productsGrid.addEventListener("click", (e) => {
  const qtyControls = e.target.parentElement;
  const qtyDisplay = qtyControls.querySelector(".qty-display");
  let currentQty = parseInt(qtyDisplay.textContent);

  if (e.target.classList.contains("increment")) {
    currentQty++;
  } else if (e.target.classList.contains("decrement")) {
    if (currentQty > 0) {
      currentQty--;
    }
  }

  qtyDisplay.textContent = currentQty;
});

/* --- Category Horizontal Scroll --- */
const categoryContainer = document.querySelector(".category-container");
const scroll2LeftBtn = document.getElementById("scroll2-left");
const scroll2RightBtn = document.getElementById("scroll2-right");

const categoryScrollAmount = 605;

const scrollCategoryLeft = () => {
  categoryContainer.scrollBy({
    left: -categoryScrollAmount,
    behavior: "smooth",
  });
};

const scrollCategoryRight = () => {
  categoryContainer.scrollBy({
    left: categoryScrollAmount,
    behavior: "smooth",
  });
};

if (scroll2LeftBtn && categoryContainer) {
  scroll2LeftBtn.addEventListener("click", scrollCategoryLeft);
}
if (scroll2RightBtn && categoryContainer) {
  scroll2RightBtn.addEventListener("click", scrollCategoryRight);
}