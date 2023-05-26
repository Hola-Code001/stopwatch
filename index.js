const timeDisplay = document.querySelector(".time-display");
const pauseDisplay = document.querySelector(".pause");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime = 0;
let elapsedTime = 0;
let pause = true;
let hrs = 0;
let mins = 0;
let secs = 0;
let intervalId;
let ms = 0;

startBtn.addEventListener("click", () => {
  if (pause) {
    pause = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 75);
    startBtn.classList.add("active");
    pauseBtn.classList.remove("active");
    resetBtn.classList.remove("active");
    pauseDisplay.style.bottom = "10px";
    pauseDisplay.textContent = "Reading";
  }
});

pauseBtn.addEventListener("click", () => {
  if (!pause) {
    pause = true;
    clearInterval(intervalId);
    pauseBtn.classList.add("active");
    startBtn.classList.remove("active");
    resetBtn.classList.remove("active");
    pauseDisplay.textContent = "Pause";
  }
});

resetBtn.addEventListener("click", () => {
  pauseBtn.classList.remove("active");
  startBtn.classList.remove("active");

  startTime = 0;
  elapsedTime = 0;
  pause = true;
  hrs = 0;
  mins = 0;
  secs = 0;
  ms = 0;
  clearInterval(intervalId);

  pauseDisplay.style.bottom = "-100px";

  timeDisplay.textContent = `00 : 00 : 00 : 00`;
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  secs = Math.floor((elapsedTime / 1000) % 60);
  let date = new Date();
  ms = date.getMilliseconds();

  hrs = doubleDigit(hrs);
  mins = doubleDigit(mins);
  secs = doubleDigit(secs);

  timeDisplay.textContent = `${hrs} : ${mins} : ${secs} : ${ms}`;

  function doubleDigit(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}
