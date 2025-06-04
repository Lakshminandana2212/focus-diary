// script.js
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
      playDing();
      alert("Pomodoro complete! 🎉 Time for a break 🌸");
      totalTime = 25 * 60;
      timerDisplay.textContent = "25:00";
    }
  }, 1000);
});

function playDing() {
  const audio = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1101-pristine.mp3");
  audio.play();
}

document.getElementById("save-entry").addEventListener("click", () => {
  const mood = document.getElementById("mood").value;
  const entry = document.getElementById("entry").value;
  const today = new Date().toLocaleDateString();

  const moodAffirmations = {
    "😊 Happy": "Keep smiling! 🌞",
    "😔 Sad": "It’s okay to feel down. Better days are coming 💕",
    "😡 Angry": "Breathe in calm, breathe out stress. You’ve got this 🧘‍♀️",
    "🥰 Loved": "You are deeply cherished 💖",
    "😴 Tired": "Rest is productive too 🌙",
    "😌 Relaxed": "Peace looks good on you 🍃"
  };

  const affirmation = moodAffirmations[mood] || "You're doing great 💪";
  const content = `Mood: ${mood}\nEntry: ${entry}\nAffirmation: ${affirmation}`;

  window.electronAPI.saveEntry(content);

  const confirmBox = document.createElement("div");
  confirmBox.textContent = "🌼 Entry saved!";
  confirmBox.style.position = "fixed";
  confirmBox.style.bottom = "20px";
  confirmBox.style.left = "50%";
  confirmBox.style.transform = "translateX(-50%)";
  confirmBox.style.background = "#ffb6c1";
  confirmBox.style.color = "#fff";
  confirmBox.style.padding = "0.75rem 1.5rem";
  confirmBox.style.borderRadius = "10px";
  confirmBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  confirmBox.style.zIndex = "1000";
  confirmBox.style.fontFamily = "'Nunito', sans-serif";
  document.body.appendChild(confirmBox);

  setTimeout(() => {
    confirmBox.remove();
  }, 3000);
});
const content = {
    date: today,
    mood: mood,
    entry: entry,
    affirmation: affirmation
  };
  
  window.electronAPI.saveEntry(content);
  