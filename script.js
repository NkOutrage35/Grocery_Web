const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const flashSaleDate = new Date("Dec 1, 2025 00:00:00");

function updateCountdown() {
  const currentDate = Date.now();
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

const searchInput = document.getElementById("SearchInput");
const searchCardTemplate = document.getElementById("search-card-template");
const searchCardContainer = document.getElementById("search-card-container");
let items = [];

async function loadItemCards() {
  try {
    const response = await fetch("cartData.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    searchCardContainer.classList.add("hidden");

    items = data.map((item) => {
      const card = searchCardTemplate.content.firstElementChild.cloneNode(true);
      const image = card.querySelector("[item-image]");
      const nameEl = card.querySelector("[item-name]");
      const priceEl = card.querySelector("[item-price]");

      const itemPrice = item.newPrice;
      const formattedPrice =
        typeof itemPrice === "number" && !isNaN(itemPrice)
          ? `$${itemPrice.toFixed(2)}`
          : "Price N/A";

      image.src = item.image || "images/placeholder.png";
      image.alt = item.name || "product image";
      nameEl.textContent = item.name || "Unnamed";
      priceEl.textContent = formattedPrice;

      searchCardContainer.append(card);

      return {
        name: (item.name || "").toLowerCase(),
        element: card,
      };
    });
  } catch (error) {
    console.error("Error loading item card data:", error);
  }
}

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase().trim();

  if (searchValue.length > 0) {
    searchCardContainer.classList.remove("hidden");
  } else {
    // Hide the container if the input is empty
    searchCardContainer.classList.add("hidden");
  }

  items.forEach((item) => {
    const isVisible = item.name.includes(searchValue);
    item.element.classList.toggle("hide", !isVisible);
  });
});

loadItemCards();

const form = document.querySelector(".modal-overlay form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("sign-in-btn");
const togglePassword = document.getElementById("togglePassword");
const loginModal = document.getElementById("login-modal");
const openModalBtn = document.getElementById("open-login-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-message");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-message");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
}

function isValidEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function validateInput() {
  let isValid = true;
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (emailValue === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, "Invalid email format");
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  if (passwordValue === "") {
    setError(passwordInput, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 6) {
    setError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  return isValid;
}

emailInput.addEventListener("input", validateInput);
passwordInput.addEventListener("input", validateInput);

togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.classList.toggle("fa-eye-slash");
});

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateInput()) {
    Swal.fire({
      title: "Success!",
      text: "You have been signed in.",
      icon: "success",
      confirmButtonText: "Continue",
      draggable: true,
    }).then(() => {
      loginModal.classList.remove("visible");
      window.location.href = "registered.html";
    });
  } else {
    Swal.fire({
      title: "Login Failed",
      text: "Please correct the errors in the form.",
      icon: "error",
      confirmButtonText: "OK",
      draggable: true,
    });
  }
});

openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.add("visible");
});

closeModalBtn.addEventListener("click", () => {
  loginModal.classList.remove("visible");
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.classList.remove("visible");
});
