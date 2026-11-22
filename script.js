const $ = (id) => document.getElementById(id);

function makeHeart(x = Math.random() * window.innerWidth, y = -20) {
  const heart = document.createElement("span");
  heart.className = "sparkle";
  heart.textContent = ["♡", "♥", "✦", "✧"][Math.floor(Math.random() * 4)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${3 + Math.random() * 3}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6200);
}

function celebrate() {
  for (let i = 0; i < 32; i++) {
    setTimeout(() => makeHeart(Math.random() * window.innerWidth, -20), i * 45);
  }
}

$("celebrateBtn").addEventListener("click", () => {
  celebrate();
  $("celebrateBtn").textContent = "Yay! Happy birthday! 💗";
});

$("openLetter").addEventListener("click", () => {
  const letter = $("letterContent");
  letter.hidden = !letter.hidden;
  $("openLetter").textContent = letter.hidden ? "Open your letter" : "Close your letter";
  if (!letter.hidden) letter.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelectorAll(".candle").forEach((candle) => {
  candle.addEventListener("click", () => {
    candle.classList.toggle("lit");
    const litCount = document.querySelectorAll(".candle.lit").length;
    $("wishText").textContent = litCount === 0
      ? "Wish made! May it come true. ✨"
      : `${litCount} candle${litCount === 1 ? "" : "s"} still glowing. Make a wish!`;
  });
});

$("surpriseBtn").addEventListener("click", async () => {
  $("surpriseMessage").hidden = false;
  $("surpriseBtn").textContent = "Surprise opened 💗";
  $("surpriseBtn").disabled = true;
  try {
    const response = await fetch("/api/birthday-message");
    if (!response.ok) throw new Error("The message could not be loaded.");
    $("backendMessage").textContent = await response.text();
  } catch (error) {
    $("backendMessage").textContent =
      "Happy birthday, my love! I hope today brings you joy, laughter, and all the lovely things you deserve. 💗";
  }
  celebrate();
});

setInterval(() => {
  if (Math.random() > 0.35) makeHeart();
}, 850);
