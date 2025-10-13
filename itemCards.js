const itemCardsContainer = document.querySelector(".item-cards-container");
let itemCardsData = [];

fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load products.json");
    }
    return response.json();
  })
  .then((data) => {
    itemCardsData = data;
    displayItemCards();
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
  });

function displayItemCards() {
  itemCardsContainer.innerHTML = "";
  itemCardsData.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("item-card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image" />
      <div class="pricing">
        <p class="discount">${item.discount}</p>
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price-old">${item.oldPrice}</p>
        <div class="price-and-button">
          <p class="item-price">${item.newPrice}${
      item.unit ? "/" + item.unit : ""
    }</p>
          <button class="add-to-cart-btn">+</button>
        </div>
      </div> `;
    itemCardsContainer.appendChild(card);
  });
}

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
const viewAllBtn = document.getElementById("view-all1");
const scrollButtonsWrapper = document.querySelector(".card-and-scroll-wrapper");
const scrollArrows = document.querySelectorAll(".scroll");

viewAllBtn.addEventListener("click", () => {
    itemCardsContainer.classList.toggle("view-all-enabled");

    if (itemCardsContainer.classList.contains("view-all-enabled")) {
      viewAllBtn.textContent = "VIEW LESS";
      scrollButtonsWrapper.style.justifyContent = "flex-start";
      scrollArrows.forEach((button) => (button.style.display = "none"));
      itemCardsContainer.style.overflowX = "auto";
    } else {
      viewAllBtn.textContent = "VIEW ALL";
      scrollButtonsWrapper.style.justifyContent = "center";
      scrollArrows.forEach((button) => (button.style.display = "flex"));
      itemCardsContainer.scrollLeft = 0;
    }
  });
 