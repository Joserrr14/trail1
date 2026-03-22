const envelope = document.querySelector(".envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const letterImg = document.querySelector(".letter img");
const music = document.getElementById("bgMusic");

let startY = 0;
let currentY = 0;
let progress = 0;
let isDragging = false;
let isOpen = false;
let hasStartedMusic = false;
let motionEnabled = false;

// SETTINGS
const DRAG_RANGE = 300;
const OPEN_THRESHOLD = 0.35;

// ZOOM TARGET (adjust this!)
const ZOOM_SCALE = 1.25;
const ZOOM_X = 50;
const ZOOM_Y = 35;

// PARALLAX SETTINGS
const TILT_STRENGTH = 12; // max tilt in degrees

/* ------------------ GESTURE ------------------ */

envelope.addEventListener("pointerdown", (e) => {
  if (isOpen) return;
  isDragging = true;
  startY = e.clientY;
  envelope.setPointerCapture(e.pointerId);
});

envelope.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  currentY = e.clientY;
  const delta = startY - currentY;

  progress = Math.max(0, Math.min(1, delta / DRAG_RANGE));
  const eased = 1 - Math.pow(1 - progress, 3);

  flap.style.transform = `rotateX(${eased * 160}deg)`;
  letter.style.transform = `translateY(${(1 - eased) * 100}%)`;

  if (!hasStartedMusic && progress > 0.05) {
    music.play().then(() => {
      hasStartedMusic = true;
    }).catch(() => {});
  }
});

envelope.addEventListener("pointerup", () => {
  if (!isDragging) return;
  isDragging = false;

  if (progress > OPEN_THRESHOLD) {
    openEnvelope();
  } else {
    closeEnvelope();
  }
});

/* ------------------ OPEN / CLOSE ------------------ */

function openEnvelope() {
  isOpen = true;

  flap.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  letter.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

  flap.style.transform = "rotateX(160deg)";
  letter.style.transform = "translateY(0%)";

  envelope.classList.add("open");

  if (navigator.vibrate) navigator.vibrate(10);

  // Start zoom
  setTimeout(startZoom, 500);

  // Enable parallax (ask permission on iOS)
  enableMotion();
}

function closeEnvelope() {
  flap.style.transition = "transform 0.4s ease";
  letter.style.transition = "transform 0.4s ease";

  flap.style.transform = "rotateX(0deg)";
  letter.style.transform = "translateY(100%)";

  letterImg.style.transform = "scale(1)";
  letterImg.style.transformOrigin = "center";

  envelope.classList.remove("open");

  progress = 0;
}

/* ------------------ ZOOM ------------------ */

function startZoom() {
  letterImg.style.transition = "transform 2.5s cubic-bezier(0.22, 1, 0.36, 1)";
  letterImg.style.transformOrigin = `${ZOOM_X}% ${ZOOM_Y}%`;
  letterImg.style.transform = `scale(${ZOOM_SCALE})`;
}

/* ------------------ PARALLAX TILT ------------------ */

function enableMotion() {
  if (motionEnabled) return;

  // iOS requires permission
  if (typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function") {

    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          startParallax();
        }
      })
      .catch(() => {});
  } else {
    startParallax();
  }

  motionEnabled = true;
}

function startParallax() {
  window.addEventListener("deviceorientation", (e) => {
    if (!isOpen) return;

    const tiltX = e.beta;  // front/back
    const tiltY = e.gamma; // left/right

    // normalize values
    const rotateX = (tiltX / 45) * TILT_STRENGTH;
    const rotateY = (tiltY / 45) * TILT_STRENGTH;

    letter.style.transform = `
      translateY(0%)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });
}

/* ------------------ PREVENT SCROLL DURING DRAG ------------------ */

document.addEventListener("touchmove", (e) => {
  if (isDragging) e.preventDefault();
}, { passive: false });
