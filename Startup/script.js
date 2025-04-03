/**
 * Retrieves the saved time format from local storage.
 * Defaults to "12h" if no value is found.
 * @returns {string} The saved time format ("12h" or "24h").
 */
function getSavedTimeFormat() {
  return localStorage.getItem("timeFormat") || "12h";
}

/**
 * Saves the selected time format to local storage.
 * @param {string} timeFormat - The time format to save ("12h" or "24h").
 */
function saveTimeFormat(timeFormat) {
  localStorage.setItem("timeFormat", timeFormat);
}

const timeElement = document.getElementById("time");
let timeFormat = getSavedTimeFormat();

/**
 * Generates a random dark RGB color.
 * @returns {string} Random dark RGB color in the format "rgb(r, g, b)".
 */
function getRandomDarkColor() {
  const r = Math.floor(Math.random() * 100);
  const g = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 150) + 50;
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Generates a random degree value between 0 and 359.
 * @returns {number} Random degree value.
 */
function getRandomDegrees() {
  return Math.floor(Math.random() * 360);
}

/**
 * Applies a random linear gradient background to the body.
 */
function applyRandomGradient() {
  document.body.style.background = `linear-gradient(${getRandomDegrees()}deg, ${getRandomDarkColor()}, ${getRandomDarkColor()})`;
}

/**
 * Formats a numerical value to ensure two-digit representation.
 * @param {number} value - The value to format.
 * @returns {string} The formatted two-digit string.
 */
function formatTime(value) {
  return String(value).padStart(2, "0");
}

/**
 * Updates the displayed time without seconds.
 * Adjusts format based on user preference (12-hour or 24-hour format).
 */
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = formatTime(now.getMinutes());
  let period = "";

  if (timeFormat === "12h") {
    period = hours < 12 ? " AM" : " PM";
    hours = hours % 12 || 12;
  }

  timeElement.textContent = `${formatTime(hours)}:${minutes}${period}`;
}

/**
 * Toggles between 12-hour and 24-hour formats on user click.
 */
if (timeElement) {
  timeElement.addEventListener("click", function () {
    timeFormat = timeFormat === "12h" ? "24h" : "12h";
    saveTimeFormat(timeFormat);
    updateTime();
  });
}

/**
 * Prevents empty search form submission.
 */
const searchForm = document.getElementById("search-form");
if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    if (!document.getElementById("search-input").value.trim()) {
      event.preventDefault();
    }
  });
}

applyRandomGradient();
updateTime();

/**
 * Calculates the time for the first update based on remaining seconds in the current minute,
 * then ensures subsequent updates occur every 60 seconds.
 */
const remainingSeconds = 60 - new Date().getSeconds();
setTimeout(() => {
  updateTime();
  setInterval(updateTime, 60000);
}, remainingSeconds * 1000);
