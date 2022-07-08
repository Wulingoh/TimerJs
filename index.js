const examTime = document.getElementById("countdown");
const progressTimer = document.getElementById("progressBar");
const timer = new Date(0, 0, 0, 3, 0, 0);
let pause = true;
let reset = true;

$("#start-clock").on("click", function () {
  pause = false;
  if (reset) {
    reset = false;
    timer.setHours(3);
    timer.setMinutes(0);
    timer.setSeconds(0);
  }
});

$("#pause-clock").on("click", function () {
  pause = true;
});

$("#reset-clock").on("click", function () {
  pause = true;
  reset = true;
  examTime.innerHTML = "03:00:00";
});

function updateClock() {
  showTime();
  if (pause) {
    return;
  }
  progressTimer.value =
    10800 -
    (timer.getHours() * 3600 + timer.getMinutes() * 60 + timer.getSeconds());
  const timeRemaining = timer.toTimeString().split(" ")[0];
  if (timeRemaining === "00:00:00") {
    clearInterval(interval);
    interval = null;
  }
  if (progressTimer.value === 9900) {
    progressTimer.classList.add("warning");
  }
  timer.setTime(timer.getTime() - 1000);
  examTime.innerHTML = timeRemaining;
}

function showTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let session = "AM";

  if (h == 0) {
    h = 12;
  }
  if (h >= 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let clock = h + ":" + m + ":" + s + " " + session;

  document.getElementById("clockDisplay").innerText = clock;

  document.getElementById("clockDisplay").textContent = clock;
}
setInterval(updateClock, 1000);
