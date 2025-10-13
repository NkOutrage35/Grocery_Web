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