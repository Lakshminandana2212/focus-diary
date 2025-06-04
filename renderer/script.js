let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("start-btn");

let totalTime = 25 * 60; // 25 minutes
let timer;

startBtn.addEventListener("click", () => {
  if (timer) return; // prevent multiple clicks
  timer = setInterval(() => {
    totalTime--;
    let mins = String(Math.floor(totalTime / 60)).padStart(2, '0');
    let secs = String(totalTime % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;

    if (totalTime <= 0) {
      clearInterval(timer);
      timer = null;
      alert("Pomodoro complete! Take a break 🌸");
      totalTime = 25 * 60;
      timerDisplay.textContent = "25:00";
    }
  }, 1000);
});

document.getElementById("save-entry").addEventListener("click", () => {
    const mood = document.getElementById("mood").value;
    const entry = document.getElementById("entry").value;
    const content = `Mood: ${mood}\nEntry: ${entry}`;
    
    window.electronAPI.saveEntry(content);
    alert("Entry saved! 🌼");
  });
  
