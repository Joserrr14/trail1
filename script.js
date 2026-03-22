const envelope = document.getElementById("envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const letterImg = document.querySelector(".letter img");
const music = document.getElementById("bgMusic");

let isOpen = false;

// Open/close on click anywhere
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

  // Vibrate for tactile feedback
  if(navigator.vibrate) navigator.vibrate(10);
}

function closeEnvelope() {
  isOpen = false;

  flap.style.transition = "transform 0.4s ease";
  letter.style.transition = "transform 0.4s ease";

  flap.style.transform = "rotateX(0deg)";
  letter.style.transform = "translateY(100%)";

  envelope.classList.remove("open");

  // Stop music
  music.pause();
  music.currentTime = 0;
}
