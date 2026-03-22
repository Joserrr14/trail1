const envelope = document.querySelector(".envelope");
const music = document.getElementById("bgMusic");

let isOpen = false;

envelope.addEventListener("click", () => {
  isOpen = !isOpen;
  envelope.classList.toggle("open");

  if (isOpen) {
    music.play().catch(() => {});
  } else {
    music.pause();
  }
});
