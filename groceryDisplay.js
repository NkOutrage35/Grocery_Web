/* --- Product Grid Section --- */
const productGrid = document.querySelector("#productGrid");
const seeMoreBtn = document.querySelector("#seeMoreBtn");

const productData = [
  {
    name: "Milo",
    price: 1000,
    image:
      "images/chocolate-malt-energy-drink-milo-C269H4-removebg-preview 1.png",
  },
  {
    name: "Tomatoes",
    price: 500,
    image: "images/vince-lee-p6KMIFzWwy8-unsplash-removebg-preview 1.png",
  },
  {
    name: "Chicken",
    price: 1500,
    image: "images/photo-1587593810167-a84920ea0781-removebg-preview 1.png",
  },
  { name: "Cornflakes", price: 1700, image: "images/Rectangle 236.png" },
  { name: "Watermelon", price: 1300, image: "images/Rectangle 247.png" },
  { name: "Banana (Bunch)", price: 2500, image: "images/Rectangle 233.png" },
  { name: "Yam Flour", price: 5500, image: "images/Rectangle 237.png" },
  { name: "Fish", price: 4500, image: "images/Group 130.png" },
  { name: "Grapes", price: 800, image: "images/Rectangle 248.png" },
  { name: "Fish fillets", price: 4500, image: "images/Rectangle 256.png" },
  { name: "Apples", price: 1200, image: "images/unsplash_wXuzS9xR49M.png" },
  { name: "Banana (Single)", price: 500, image: "images/banana.jpg" },
  { name: "Orange", price: 800, image: "images/orange.jpg" },
];

function displayProducts(products) {
  productGrid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">₦${product.price.toFixed(2)}</p>
      <div class="product-actions">
        <div class="qty-controls">
          <button class="qty-btn decrement">-</button>
          <input type="number" min="0" value="0" class="qty-display" />
          <button class="qty-btn increment">+</button>
        </div>
        <button class="add-btn">
          <img src="images/add_shopping_cart.svg" alt="Shopping Cart Icon" />
          Add to cart
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function QuantityControls() {
  productGrid.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("increment") ||
      e.target.classList.contains("decrement")
    ) {
      const qtyControls = e.target.closest(".qty-controls");
      const qtyDisplay = qtyControls.querySelector(".qty-display");
      let currentQty = parseInt(qtyDisplay.value);

      if (e.target.classList.contains("increment")) {
        currentQty++;
      } else if (e.target.classList.contains("decrement") && currentQty > 0) {
        currentQty--;
      }

      qtyDisplay.value = currentQty;
    }
  });
}

seeMoreBtn.addEventListener("click", () => {
  productGrid.classList.toggle("see-more-enabled");
  seeMoreBtn.textContent = productGrid.classList.contains("see-more-enabled")
    ? "SEE LESS"
    : "SEE MORE";
});

displayProducts(productData);
QuantityControls();
