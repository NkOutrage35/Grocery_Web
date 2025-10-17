let cartItems = [];
let itemCardsData = [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");

// Ensure product data is always loaded from the global variable
function ensureProductDataLoaded() {
  if (window.itemCardsData && window.itemCardsData.length > 0) {
    itemCardsData = window.itemCardsData.map((p) => ({
      ...p,
      id: String(p.id),
    }));
  }
}

function initializeCart() {
  ensureProductDataLoaded();

  let savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
    } catch {
      cartItems = [];
    }
  }

  if (cartItemsContainer) {
    renderCartItems(cartItems);
    calculateCartTotal(cartItems);
  }

  updateCartCount();
}

function addToCartById(productId, quantity) {
  ensureProductDataLoaded();
  const pid = String(productId);

  const item = itemCardsData.find((p) => p.id === pid);
  if (!item) {
    console.error(`Product with ID ${pid} not found.`);
    return;
  }

  const existingItem = cartItems.find((cartItem) => cartItem.id === pid);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ ...item, quantity });
  }

  // --- SweetAlert Integration for Add To Cart (Optional Enhancement) ---
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    icon: "success",
    title: `${quantity}x ${item.name} added to cart!`,
  });
  // ---------------------------------------------------------------------

  if (cartItemsContainer) {
    renderCartItems(cartItems);
    calculateCartTotal(cartItems);
  }

  saveCart();
  updateCartCount();
}

function calculateCartTotal(cartItems) {
  if (!cartTotalElement) return;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartTotalElement.textContent = `₦${total.toFixed(2)}`;
}

function updateCartCount() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

function renderCartItems(cartItems) {
  if (!cartItemsContainer) return;

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <p class="empty-cart-message">Your cart is empty.</p>
    `;
    if (cartTotalElement) cartTotalElement.textContent = "₦0.00";
    return;
  }

  cartItemsContainer.innerHTML = cartItems
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">₦${item.price.toFixed(2)}</p>
          <div class="item-controls">
            <button class="qty-btn" onclick="changeQuantity('${
              item.id
            }', -1)"><i class="fa-solid fa-minus"></i></button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="changeQuantity('${
              item.id
            }', 1)"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <i class="fa-solid fa-trash" onclick="removeItem('${item.id}')"></i>
      </div>
    `
    )
    .join("");

  calculateCartTotal(cartItems);
}

function changeQuantity(id, change) {
  const sid = String(id);
  const item = cartItems.find((item) => item.id === sid);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    // If quantity hits zero, remove the item (which now includes SweetAlert logic)
    removeItem(sid);
  } else {
    if (cartItemsContainer) {
      renderCartItems(cartItems);
      calculateCartTotal(cartItems);
    }
    saveCart();
    updateCartCount();
  }
}

// --- CORRECTED REMOVEITEM FUNCTION ---
function removeItem(id) {
  const sid = String(id);

  if (!cartItemsContainer) return; // Exit if cart container is not present

  Swal.fire({
    title: "Remove Item?",
    text: "Are you sure you want to remove this item from your cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    // This code only runs AFTER the user interacts with the first alert
    if (result.isConfirmed) {
      // 1. Filter the item out of the array
      cartItems = cartItems.filter((item) => item.id !== sid);

      // 2. Update UI and storage
      renderCartItems(cartItems);
      calculateCartTotal(cartItems);
      saveCart();
      updateCartCount();

      // 3. Show the success notification
      Swal.fire({
        title: "Removed!",
        text: "The item has been removed from your cart.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  // IMPORTANT: The lines that update the cart (renderCartItems, saveCart, etc.)
  // MUST be inside the .then((result) => {...}) block.
  // We remove the redundant calls that were placed here previously.
}
// --- END CORRECTED REMOVEITEM FUNCTION ---

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

document.addEventListener("DOMContentLoaded", () => {
  initializeCart();
});
