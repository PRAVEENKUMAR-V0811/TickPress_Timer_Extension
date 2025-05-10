let startTime = null;
let elapsedTime = 0;
let interval = null;
let isPaused = false;

const timerDisplay = document.getElementById("timerDisplay");
const lapseDisplay = document.getElementById("lapseDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapseBtn = document.getElementById("lapseBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateTimer() {
  const now = new Date().getTime();
  const timeDiff = now - startTime + elapsedTime;
  timerDisplay.textContent = formatTime(timeDiff);
}

startBtn.addEventListener("click", () => {
  if (!interval) {
    startTime = new Date().getTime();
    interval = setInterval(updateTimer, 1000);
    isPaused = false;
  }
});

pauseBtn.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
    elapsedTime += new Date().getTime() - startTime;
    isPaused = true;
  }
});

lapseBtn.addEventListener("click", () => {
  if (startTime || elapsedTime) {
    const now = isPaused ? elapsedTime : new Date().getTime() - startTime + elapsedTime;
    lapseDisplay.textContent = "Lapse Time: " + formatTime(now);
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  startTime = null;
  elapsedTime = 0;
  isPaused = false;
  timerDisplay.textContent = "00:00:00";
  lapseDisplay.textContent = "Lapse Time: --:--:--";
});
