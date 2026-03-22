const envelope = document.getElementById("envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const letterImg = document.querySelector(".letter img");
const music = document.getElementById("bgMusic");

let isOpen = false;

const ZOOM_SCALE = 1.25;
const ZOOM_X = 50;
const ZOOM_Y = 35;

envelope.addEventListener("click", () => {
  if(!isOpen) openEnvelope();
  else closeEnvelope();
});

function openEnvelope() {
  isOpen = true;

  flap.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
  letter.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
  flap.style.transform = "rotateX(160deg)";
  letter.style.transform = "translateY(0%)";
  envelope.classList.add("open");

  // Music starts at 35s on user interaction
  if(music.duration > 35) music.currentTime = 35;
  music.play().catch(()=>{});

  if(navigator.vibrate) navigator.vibrate(10);

  // Auto zoom
  setTimeout(startZoom, 500);
}

function closeEnvelope() {
  isOpen = false;

  flap.style.transition = "transform 0.4s ease";
  letter.style.transition = "transform 0.4s ease";

  flap.style.transform = "rotateX(0deg)";
  letter.style.transform = "translateY(100%)";

  letterImg.style.transition = "transform 0.4s ease";
  letterImg.style.transform = "scale(1)";
  letterImg.style.transformOrigin = "center";

  envelope.classList.remove("open");

  // Stop music
  music.pause();
  music.currentTime = 0;
}

function startZoom(){
  letterImg.style.transition = "transform 2.5s cubic-bezier(0.22,1,0.36,1)";
  letterImg.style.transformOrigin = `${ZOOM_X}% ${ZOOM_Y}%`;
  letterImg.style.transform = `scale(${ZOOM_SCALE})`;
}
