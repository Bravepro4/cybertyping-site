const quote = document.getElementById("quote").textContent;
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let startTime = null;
let timer = null;

input.addEventListener("input", () => {
  if (!startTime) {
    startTime = new Date();
    timer = setInterval(updateStats, 1000);
  }
  updateStats();
});

function updateStats() {
  const typed = input.value;
  const elapsed = Math.floor((new Date() - startTime) / 1000) || 0;
  timeEl.textContent = elapsed;

  const wordsTyped = typed.trim().split(/\s+/).filter(Boolean).length;
  const minutes = elapsed / 60 || 1 / 60;
  const wpm = Math.round(wordsTyped / minutes);
  wpmEl.textContent = wpm;

  let correctChars = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === quote[i]) correctChars++;
  }

  const accuracy = typed.length
    ? Math.round((correctChars / typed.length) * 100)
    : 100;
  accuracyEl.textContent = accuracy;

  if (typed === quote) {
    clearInterval(timer);
  }
}

restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  startTime = null;
  timer = null;
  input.value = "";
  timeEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
});
