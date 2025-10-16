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


// SIGN-IN JS.
const form = document.querySelector(".modal-overlay form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("sign-in-btn");
const togglePassword = document.getElementById("togglePassword");

const loginModal = document.getElementById("login-modal");
const openModalBtn = document.getElementById("open-login-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

let isFormValidated = false;

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-message");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  isFormValidated = false;
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-message");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validateInput = () => {
  let isValid = true;
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // --- EMAIL ---
  if (emailValue === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, "Invalid email format");
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  // --- PASSWORD ---
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
};

/* --- On Change Events for Real-Time Validation --- */
emailInput.addEventListener("input", validateInput);
passwordInput.addEventListener("input", validateInput);

/* --- View Password Toggle --- */
togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.classList.toggle("fa-eye-slash");
});

/* --- Sign In Button Logic --- */
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateInput()) {
    isFormValidated = true;
    // Close modal on success before navigating
    loginModal.classList.remove("visible");
    window.location.href = "registered.html";
  }
});

// 🌟 MODAL CONTROL LOGIC
// Open modal when 'Login' is pressed
openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.add("visible");
});

// Close modal when the 'X' button is pressed
closeModalBtn.addEventListener("click", () => {
  loginModal.classList.remove("visible");
});

// Close modal if the user clicks anywhere outside the form container
loginModal.addEventListener("click", (e) => {
  // Check if the click target is the overlay itself
  if (e.target === loginModal) {
    loginModal.classList.remove("visible");
  }
});