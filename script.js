const envelope = document.getElementById("envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const letterImg = document.querySelector(".letter img");
const blur = document.querySelector(".blur-bg");
const music = document.getElementById("bgMusic");

let isOpen = false;
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

  if (isMobile) {
    letter.style.transition = "transform 4s cubic-bezier(0.22, 0.61, 0.36, 1)";
    letter.style.transform = "translateY(0)";
  } else {
    letter.style.transition = "transform 1.5s ease-in-out";
    letter.style.transform = "translate(-50%, -50%)";
  }

  if (music.duration > 35) music.currentTime = 35;
  music.play().catch(() => {});

  if (!isMobile) {
    letterImg.style.transition = "transform 2.5s cubic-bezier(0.22, 1, 0.36, 1)";
    letterImg.style.transformOrigin = "50% 50%";
    letterImg.style.transform = "scale(1.1)";
  } else {
    letterImg.style.transform = "scale(1)";
  }

  if (navigator.vibrate) navigator.vibrate(10);
}

function closeEnvelope() {
  isOpen = false;

  flap.style.transform = "rotateX(0deg)";
  blur.style.opacity = "0";

  if (isMobile) {
    letter.style.transition = "transform 4s cubic-bezier(0.22, 0.61, 0.36, 1)";
    letter.style.transform = "translateY(100%)";
  } else {
    letter.style.transition = "transform 1.5s ease-in-out";
    letter.style.transform = "translate(-50%, 100vh)";
  }

  if (!isMobile) {
    letterImg.style.transition = "transform 0.4s ease";
    letterImg.style.transform = "scale(1)";
  }

  envelope.classList.remove("open");
  music.pause();
  music.currentTime = 0;
}
