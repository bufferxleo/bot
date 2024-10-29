// Ensure the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the input elements
  const input = document.getElementById("input");
  const month = document.getElementById("month");
  const day = document.getElementById("day");
  const result = document.getElementById("result");
  const countdownDisplay = document.getElementById("countdown"); // New element for countdown

  // Get the 'name', 'month', and 'day' parameters from the URL
  const nameValue = new URLSearchParams(window.location.search).get("name");
  const monthValue = new URLSearchParams(window.location.search).get("month");
  const dayValue = new URLSearchParams(window.location.search).get("day");

  // Populate input fields if values are present
  if (nameValue) {
    input.value = nameValue;
  }
  if (monthValue) {
    month.value = monthValue;
  }
  if (dayValue) {
    day.value = dayValue;
  }

  // Calculate days to birthday on page load
  calculateDaysToBirthday();
});

// Function to calculate and display the countdown
function calculateDaysToBirthday() {
  const name = document.getElementById("input").value;
  const monthInput = parseInt(document.getElementById("month").value, 10);
  const dayInput = parseInt(document.getElementById("day").value, 10);

  // Validate month and day inputs
  if (
    isNaN(monthInput) ||
    isNaN(dayInput) ||
    monthInput < 1 ||
    monthInput > 12 ||
    dayInput < 1 ||
    dayInput > 31
  ) {
    document.getElementById("result").innerText =
      "Please enter valid month (1-12) and day (1-31) values.";
    return;
  }

  const today = new Date();
  const birthday = new Date(today.getFullYear(), monthInput - 1, dayInput); // month is 0-indexed

  // If the birthday has already passed this year, calculate for next year
  if (birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  // Update the countdown every second
  const timer = setInterval(() => {
    const now = new Date();
    const timeDiff = birthday - now; // difference in milliseconds

    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutesDiff = Math.floor((timeDiff / 1000 / 60) % 60);
    const secondsDiff = Math.floor((timeDiff / 1000) % 60);

    if (timeDiff < 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerText = `Happy Birthday!  `;
      return;
    }
    // Display the countdown
    document.getElementById(
      "bot"
    ).innerHTML = `Hi ${name}, your birthday is in`;
    document.getElementById(
      "countdown"
    ).innerHTML = `<div>${daysDiff} days</div>:<div>${hoursDiff} hours</div>:<div>${minutesDiff} minutes</div>: <div>${secondsDiff} seconds</div>`;
  }, 1000);
}
