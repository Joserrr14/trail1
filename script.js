const envelope = document.getElementById("envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const letterImg = document.querySelector(".letter img");
const blur = document.querySelector(".blur-bg");
const music = document.getElementById("bgMusic");

let isOpen = false;

// Detect mobile devices
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

envelope.addEventListener("click", () => {
  if (!isOpen) openEnvelope();
  else closeEnvelope();
});

function openEnvelope() {
  isOpen = true;

  flap.style.transform = "rotateX(160deg)";
  blur.style.opacity = "1";
  envelope.classList.add("open");

  // Slipout duration: mobile slow, desktop faster
  letter.style.transition = isMobile
    ? "transform 4s cubic-bezier(0.22, 0.61, 0.36, 1)"
    : "transform 1.5s ease-in-out";
  letter.style.transform = "translateY(0)"; // slide into view

  // Music at 35s
  if (music.duration > 35) music.currentTime = 35;
  music.play().catch(() => {});

  // Desktop zoom only
  if (!isMobile) {
    letterImg.style.transition = "transform 2.5s cubic-bezier(0.22,1,0.36,1)";
    letterImg.style.transformOrigin = "50% 50%";
    letterImg.style.transform = "scale(1.1)";
  } else {
    letterImg.style.transform = "scale(1)"; // mobile: no zoom
  }

  if (navigator.vibrate) navigator.vibrate(10);
}

function closeEnvelope() {
  isOpen = false;

  flap.style.transform = "rotateX(0deg)";
  blur.style.opacity = "0";

  letter.style.transition = isMobile
    ? "transform 4s cubic-bezier(0.22, 0.61, 0.36, 1)"
    : "transform 1.5s ease-in-out";
  letter.style.transform = "translateY(100vh)";

  if (!isMobile) {
    letterImg.style.transition = "transform 0.4s ease";
    letterImg.style.transform = "scale(1)";
  }

  envelope.classList.remove("open");

  music.pause();
  music.currentTime = 0;
}
