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

const categoryWrapper = document.querySelector(".category-wrap");
const viewAllBtn = document.getElementById("view-all2");
const scroll2Arrows = document.querySelector(".scroll2");

if (viewAllBtn) {
  viewAllBtn.addEventListener("click", () => {
    categoryContainer.classList.toggle("view-all-enabled");

    if (categoryContainer.classList.contains("view-all-enabled")) {
      viewAllBtn.textContent = "VIEW LESS";
      categoryWrapper.style.justifyContent = "flex-start";
      scroll2Arrows.forEach((button) => (button.style.display = "none"));
      categoryContainer.style.overflowX = "auto";
    } else {
      viewAllBtn.textContent = "VIEW ALL";
      categoryWrapper.style.justifyContent = "center";
      scroll2Arrows.forEach((button) => (button.style.display = "flex"));
      categoryContainer.scrollLeft = 0;
    }
  });
}
const categoryContainer = document.querySelector(".category-container");