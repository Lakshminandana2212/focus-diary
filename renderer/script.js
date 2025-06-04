const fs = require('fs');
const path = require('path');
const journalFile = path.join(__dirname, 'journal-entries.json');




let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resetBtn = document.getElementById("reset-btn");

let totalTime = 25 * 60; // 25 mins in seconds
let timer;
let isPaused = false;

function updateDisplay() {
  let mins = String(Math.floor(totalTime / 60)).padStart(2, '0');
  let secs = String(totalTime % 60).padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
}

startBtn.addEventListener("click", () => {
  if (timer || totalTime <= 0) return;

  timer = setInterval(() => {
    if (!isPaused) {
      totalTime--;
      updateDisplay();

      if (totalTime <= 0) {
        clearInterval(timer);
        timer = null;
        new Notification("Pomodoro Complete!", {
          body: "Take a short break 🌸",
        });
        totalTime = 25 * 60;
        updateDisplay();
      }
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  totalTime = 25 * 60;
  updateDisplay();
  isPaused = false;
  pauseBtn.textContent = "Pause";
});

updateDisplay(); // Set initial display


  function loadEntries() {
    const container = document.getElementById("entries-container");
    container.innerHTML = "";
  
    if (fs.existsSync(journalFile)) {
      const data = fs.readFileSync(journalFile);
      const entries = JSON.parse(data);
  
      entries.reverse().forEach(entry => {
        const div = document.createElement("div");
        div.className = "entry-item";
        div.innerHTML = `<strong>${entry.date} - ${entry.mood}</strong><br>${entry.text}`;
        container.appendChild(div);
      });
    }
  }
  
  document.getElementById("save-entry").addEventListener("click", () => {
    const mood = document.getElementById("mood").value;
    const entry = document.getElementById("entry").value.trim();
    const today = new Date().toLocaleDateString();
  
    if (!entry) return alert("Please write something 🌸");
  
    const newEntry = {
      date: today,
      mood: mood,
      text: entry
    };
  
    let entries = [];
    if (fs.existsSync(journalFile)) {
      entries = JSON.parse(fs.readFileSync(journalFile));
    }
  
    entries.push(newEntry);
    fs.writeFileSync(journalFile, JSON.stringify(entries, null, 2));
  
    alert("Entry saved! 💖");
    document.getElementById("entry").value = "";
    loadEntries();
  });

  loadEntries();
