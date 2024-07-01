const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function updateCurrentTime() {
  const currentDate = new Date();

  const currentDay = document.querySelector('[data-testid="currentDay"]');
  currentDay.textContent = daysOfWeek[currentDate.getUTCDay()];

  const currentUTCTime = document.querySelector(
    '[data-testid="currentTimeUTC"]'
  );
  currentUTCTime.textContent = `${Date.now()} ms`;
}

updateCurrentTime();

setInterval(updateCurrentTime, 100);
