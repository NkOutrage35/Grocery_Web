let cartItems = [];
itemCardsData = window.itemCardsData || [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

function getFullProduct(cartItem) {
  const productDetails = itemCardsData.find((p) => p.id === cartItem.id);
  if (productDetails) {
    return {
      ...productDetails,
      quantity: cartItem.quantity,
    };
  }
  return null;
}

function initializeCart() {
  if (itemCardsData.length === 0) {
    setTimeout(initializeCart, 50);
    return;
  }

  if (cartItemsContainer) {
    let savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      cartItems = JSON.parse(savedCart);

      renderCartItems(cartItems);
      calculateCartTotal(cartItems);
      updateCartCount();
    } else {
      cartItems = [];
      renderCartItems(cartItems);
      calculateCartTotal(cartItems);
      updateCartCount();
    }
  } else {
    let savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      cartItems = JSON.parse(savedCart);
    }
    updateCartCount();
  }
}

function addToCartById(productId, quantity) {
  const item = itemCardsData.find((p) => p.id === productId);

  if (!item) {
    console.error(`Product with ID ${productId} not found!`);
    return;
  }

  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ ...item, quantity: quantity });
  }

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
  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = total;
  }
}

function renderCartItems(cartItems) {
  if (cartItems.length === 0) {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = ` <p class="empty-cart-message">Your cart is empty.</p> `;
      if (cartTotalElement) {
        cartTotalElement.textContent = "₦0.00";
      }
    }
  } else {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = cartItems
        .map((item) => {
          return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${
            item.name
          }" class="cart-item-image" />
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <p class="cart-item-price">₦${item.price.toFixed(
                              2
                            )}</p>
                            <div class="item-controls">
                                <button
                                    class="qty-btn"
                                    onclick="changeQuantity('${item.id}', -1)"
                                >
                                    -
                                </button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="changeQuantity('${
                                  item.id
                                }', 1)">
                                    +
                                </button>
                            </div>
                        </div>
                        <i class='fa-solid fa-trash' onclick="removeItem('${
                          item.id
                        }')"></i> 
                    </div>`;
        })
        .join("");
    }
  }
}

function changeQuantity(id, change) {
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeItem(id);
    } else {
      if (cartItemsContainer) {
        renderCartItems(cartItems);
        calculateCartTotal(cartItems);
      }
      saveCart();
      updateCartCount();
    }
  }
}

function removeItem(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  if (cartItemsContainer) {
    renderCartItems(cartItems);
    calculateCartTotal(cartItems);
  }
  saveCart();
  updateCartCount();
}

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
