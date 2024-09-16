let dateinput = document.querySelector("input");
let leftimer = document.querySelector(".leftTimer");
let countdownInterval; // Store the interval id so we can clear it later if needed

dateinput.addEventListener("change", function (e) {
  e.preventDefault();
  let EndDate = new Date(dateinput.value);
  // Clear any existing interval before starting a new one
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  leftTime(EndDate);
  updateeverysecond(EndDate);
});

function leftTime(time) {
  let CurrentDate = new Date();
  let Lefttime = time- CurrentDate;
  //Milliseconds are 1000 times less than a second. Therefore, to find seconds, you need to divide by 1000.
  //when the seconds are divided by 60, giving the number of seconds that don't complete a full minute.
  //Modulus (%) is used to extract the relevant remainder of seconds, minutes, and hours that fit within a minute, hour, and day, respectively.
  let seconds = Math.floor((Lefttime / 1000) % 60);
  let minutes = Math.floor((Lefttime / 1000 / 60) % 60);
  let hours = Math.floor((Lefttime / (1000 * 60 * 60)) % 24);
  let days = Math.floor(Lefttime / (1000 * 60 * 60 * 24));

  let timeData = {
    total: Lefttime,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  for (let property in timeData) {
    let element = document.querySelector("." + property);
    if (element) {
      element.innerHTML = timeData[property];
    }
  }

  if (Lefttime <= 0) {
    clearInterval(countdownInterval);
    alert("You must choose a time in the future");
  }
}

//setInterval that calls the leftTime function every second.
function updateeverysecond(SelectedDate) {
    countdownInterval = setInterval(()=>{
        leftTime(SelectedDate);
    }, 1000);
}

