let dateInput = document.querySelector("#date-input");
let errorMessage = document.querySelector(".error-message");
let countdownInterval; // Store the interval id so we can clear it later if needed

dateInput.addEventListener("change", function (e) {
  e.preventDefault();
  let endDate = new Date(dateInput.value);
  let currentDate = new Date();

  // Validate date input
  if (endDate <= currentDate) {
    errorMessage.textContent = "Please select a future date!";
    clearInterval(countdownInterval); // Clear previous intervals if any
    resetTimer(); // Reset timer display to 0
    return;
  }

  errorMessage.textContent = ""; // Clear error message

  // Clear any existing interval before starting a new one
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  leftTime(endDate);
  updateEverySecond(endDate);
});

function leftTime(endTime) {
  let currentDate = new Date();
  let leftTime = endTime - currentDate;

  // Calculate time left
  let seconds = Math.floor((leftTime / 1000) % 60);
  let minutes = Math.floor((leftTime / 1000 / 60) % 60);
  let hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24);
  let days = Math.floor(leftTime / (1000 * 60 * 60 * 24));

  let timeData = {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  for (let key in timeData) {
    let element = document.querySelector(`.${key}`);
    if (element) {
      element.textContent = timeData[key];
    }
  }

  if (leftTime <= 0) {
    clearInterval(countdownInterval);
    resetTimer();
    alert("Countdown finished!");
  }
}

// Reset the timer display to 0
function resetTimer() {
  document.querySelector(".days").textContent = "0";
  document.querySelector(".hours").textContent = "0";
  document.querySelector(".minutes").textContent = "0";
  document.querySelector(".seconds").textContent = "0";
}

// Update every second
function updateEverySecond(endDate) {
  countdownInterval = setInterval(() => {
    leftTime(endDate);
  }, 1000);
}
