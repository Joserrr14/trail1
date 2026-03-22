const envelope = document.getElementById("envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const letterImg = document.querySelector(".letter img");
const blur = document.querySelector(".blur-bg");
const music = document.getElementById("bgMusic");

let isOpen = false;

// Simple mobile check
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

envelope.addEventListener("click", () => {
  if (!isOpen) openEnvelope();
  else closeEnvelope();
});

function openEnvelope() {
  isOpen = true;

  flap.style.transform = "rotateX(160deg)";
  letter.style.opacity = "1";
  blur.style.opacity = "1";
  envelope.classList.add("open");

  // Music starts at 35s
  if (music.duration > 35) music.currentTime = 35;
  music.play().catch(() => {});

  // Only zoom on desktop
  if (!isMobile) {
    letterImg.style.transition = "transform 2.5s cubic-bezier(0.22,1,0.36,1)";
    letterImg.style.transformOrigin = "50% 35%";
    letterImg.style.transform = "scale(1.25)";
  }

  if (navigator.vibrate) navigator.vibrate(10);
}

function closeEnvelope() {
  isOpen = false;

  flap.style.transform = "rotateX(0deg)";
  letter.style.opacity = "0";
  blur.style.opacity = "0";
  envelope.classList.remove("open");

  // Reset zoom on desktop
  if (!isMobile) {
    letterImg.style.transition = "transform 0.4s ease";
    letterImg.style.transform = "scale(1)";
  }

  music.pause();
  music.currentTime = 0;
}
