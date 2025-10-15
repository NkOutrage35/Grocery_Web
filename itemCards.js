window.itemCardsData = window.itemCardsData || [];

const itemCardsContainer = document.querySelector(".item-cards-container");

fetch("products.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to load products.json");
    return response.json();
  })
  .then((data) => {
    const newItems = data.filter(
      (item) =>
        !window.itemCardsData.some((existing) => existing.id === item.id)
    );
    window.itemCardsData.push(...newItems);
    displayItemCards();
  })
  .catch((error) => console.error("Error fetching product data:", error));

function displayItemCards() {
  itemCardsContainer.innerHTML = "";

  window.itemCardsData.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image" />
      <div class="pricing">
        <p class="discount">${item.discount || ""}</p>
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price-old">${item.oldPrice || ""}</p>
        <div class="price-and-button">
          <p class="item-price">${item.newPrice || item.price}${
      item.unit ? "/" + item.unit : ""
    }</p>
          <button class="add-to-cart-btn" data-product-id="${
            item.id
          }">+</button>
        </div>
      </div>
    `;
    itemCardsContainer.appendChild(card);
  });
}

itemCardsContainer.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-to-cart-btn");
  if (addBtn) {
    const productId = addBtn.dataset.productId;
    if (typeof addToCartById === "function") {
      addToCartById(productId, 1);
    } else {
      console.warn(
        "⚠️ addToCartById not found. Make sure it's loaded before this script."
      );
    }
  }
});

/* --- Scroll Animation --- */
document.addEventListener("DOMContentLoaded", () => {
  const scrollLeft = document.getElementById("scroll-left");
  const scrollRight = document.getElementById("scroll-right");
  const scrollAmount = 478;

  if (itemCardsContainer && scrollLeft && scrollRight) {
    scrollLeft.addEventListener("click", () => {
      itemCardsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    scrollRight.addEventListener("click", () => {
      itemCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  } else {
    console.warn("Scroll elements not found. Check your HTML selectors.");
  }
});

/* --- VIEW ALL Functionality --- */
const viewAllBtn = document.getElementById("view-all1");
const scrollButtonsWrapper = document.querySelector(".card-and-scroll-wrapper");
const scrollArrows = document.querySelectorAll(".scroll");

if (viewAllBtn && itemCardsContainer) {
  viewAllBtn.addEventListener("click", () => {
    const enableGrid =
      !itemCardsContainer.classList.contains("view-all-enabled");

    itemCardsContainer.classList.toggle("view-all-enabled", enableGrid);

    if (enableGrid) {
      viewAllBtn.textContent = "VIEW LESS";
      scrollButtonsWrapper.style.justifyContent = "flex-start";
      scrollArrows.forEach((button) => (button.style.display = "none"));
      itemCardsContainer.style.overflowX = "visible";
    } else {
      viewAllBtn.textContent = "VIEW ALL";
      scrollButtonsWrapper.style.justifyContent = "center";
      scrollArrows.forEach((button) => (button.style.display = "flex"));
      itemCardsContainer.style.overflowX = "scroll";
      itemCardsContainer.scrollLeft = 0;
    }
  });
}
