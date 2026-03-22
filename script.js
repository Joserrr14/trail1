const envelope = document.querySelector(".envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const music = document.getElementById("bgMusic");

let startY = 0;
let currentY = 0;
let progress = 0;
let isDragging = false;
let isOpen = false;
let hasStartedMusic = false;

// SETTINGS (tweak feel here)
const DRAG_RANGE = 300;   // how far to drag to fully open
const OPEN_THRESHOLD = 0.35; // how much drag needed to open

// Start gesture
envelope.addEventListener("pointerdown", (e) => {
  if (isOpen) return;

  isDragging = true;
  startY = e.clientY;
  envelope.setPointerCapture(e.pointerId);
});

// Dragging
envelope.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  currentY = e.clientY;
  const delta = startY - currentY;

  // convert drag into 0 → 1 progress
  progress = Math.max(0, Math.min(1, delta / DRAG_RANGE));

  // ✨ Apply easing (rubber-band feel)
  const eased = 1 - Math.pow(1 - progress, 3);

  // Animate flap
  flap.style.transform = `rotateX(${eased * 160}deg)`;

  // Animate letter
  letter.style.transform = `translateY(${(1 - eased) * 100}%)`;

  // Start music on first interaction
  if (!hasStartedMusic && progress > 0.05) {
    music.play().then(() => {
      hasStartedMusic = true;
    }).catch(() => {});
  }
});

// Release
envelope.addEventListener("pointerup", () => {
  if (!isDragging) return;
  isDragging = false;

  // Decide open or close
  if (progress > OPEN_THRESHOLD) {
    openEnvelope();
  } else {
    closeEnvelope();
  }
});

// OPEN (smooth physics finish)
function openEnvelope() {
  isOpen = true;

  flap.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  letter.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

  flap.style.transform = "rotateX(160deg)";
  letter.style.transform = "translateY(0%)";

  envelope.classList.add("open");

  // subtle vibration
  if (navigator.vibrate) navigator.vibrate(10);
}

// CLOSE (snap back)
function closeEnvelope() {
  flap.style.transition = "transform 0.4s ease";
  letter.style.transition = "transform 0.4s ease";

  flap.style.transform = "rotateX(0deg)";
  letter.style.transform = "translateY(100%)";

  envelope.classList.remove("open");

  progress = 0;
}

// Prevent scroll during gesture
document.addEventListener("touchmove", (e) => {
  if (isDragging) e.preventDefault();
}, { passive: false });
