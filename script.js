const envelope = document.querySelector(".envelope");
const music = document.getElementById("bgMusic");

let isOpen = false;
let hasStartedMusic = false;

function toggleEnvelope() {
  isOpen = !isOpen;
  envelope.classList.toggle("open", isOpen);

  // Play music only once (avoids restart on every tap)
  if (isOpen && !hasStartedMusic) {
    music.play().then(() => {
      hasStartedMusic = true;
    }).catch(() => {});
  }

  // Optional: pause when closing
  if (!isOpen && hasStartedMusic) {
    music.pause();
  }
}

// Better mobile interaction (faster than click on iOS)
envelope.addEventListener("pointerup", toggleEnvelope);
