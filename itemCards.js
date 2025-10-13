const itemCardsContainer = document.querySelector(".item-cards-container");

const itemCardsData = [
  {
    name: "Pork",
    image: "images/unsplash_aeE-Y7SVVR4.png",
    discount: "35%",
    oldPrice: "₦2000.00",
    newPrice: "₦1000.00",
    unit: "kg",
  },
  {
    name: "Spinach",
    image: "images/unsplash_4jpNPu7IW8k.png",
    discount: "20%",
    oldPrice: "₦2000.00",
    newPrice: "₦1600.00",
    unit: "kg",
  },
  {
    name: "Beef Meat",
    image: "images/unsplash_lvmFFcLvHl8.png",
    discount: "50%",
    oldPrice: "₦2000.00",
    newPrice: "₦1000.00",
    unit: "kg",
  },
  {
    name: "Apple",
    image: "images/unsplash_wXuzS9xR49M.png",
    discount: "50%",
    oldPrice: "₦2000.00",
    newPrice: "₦1000.00",
    unit: "kg",
  },
  {
    name: "Coca Cola",
    image: "images/unsplash_wQFmDhrvVSs.png",
    discount: "5%",
    oldPrice: "₦500.00",
    newPrice: "₦475.00",
  },
  {
    name: "Bag of Rice",
    image: "images/unsplash_c9AuglIqhes.png",
    discount: "50%",
    oldPrice: "₦50000.00",
    newPrice: "₦25000.00",
    unit: "kg",
  },
  {
    name: "Broccoli",
    image: "https://placehold.co/230x200/50D150/ffffff?text=Broccoli",
    discount: "25%",
    oldPrice: "₦800.00",
    newPrice: "₦600.00",
  },
  {
    name: "Broccoli",
    image: "https://placehold.co/230x200/50D150/ffffff?text=Broccoli",
    discount: "25%",
    oldPrice: "₦800.00",
    newPrice: "₦600.00",
  },
  {
    name: "Broccoli",
    image: "https://placehold.co/230x200/50D150/ffffff?text=Broccoli",
    discount: "25%",
    oldPrice: "₦800.00",
    newPrice: "₦600.00",
  },
  {
    name: "Broccoli",
    image: "https://placehold.co/230x200/50D150/ffffff?text=Broccoli",
    discount: "25%",
    oldPrice: "₦800.00",
    newPrice: "₦600.00",
  },
];

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

displayItemCards(itemCardsData);

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
 