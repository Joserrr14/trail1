const envelope = document.querySelector(".envelope");
const music = document.getElementById("bgMusic");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const volumeSlider = document.getElementById("volume");

let isOpen = false;

/* Fade-in music */
function fadeIn(audio, duration = 2000) {
  audio.volume = 0;
  audio.play().catch(() => {});

  const step = 0.05;
  const interval = duration / (1 / step);

  const fade = setInterval(() => {
    if (audio.volume < (volumeSlider?.value || 1)) {
      audio.volume = Math.min(audio.volume + step, volumeSlider?.value || 1);
    } else {
      clearInterval(fade);
    }
  }, interval);
}

/* Fade-out music */
function fadeOut(audio, duration = 2000) {
  const step = 0.05;
  const interval = duration / (1 / step);

  const fade = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, interval);
}

/* Phone vibration */
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate([30, 20, 30]);
  }
}

/* Envelope click behavior */
if (envelope) {
  envelope.addEventListener("click", () => {
    isOpen = !isOpen;
    envelope.classList.toggle("open");

    vibrate();

    if (isOpen) {
      fadeIn(music);
    } else {
      fadeOut(music);
    }
  });
}

/* Manual controls (optional) */
if (playBtn) {
  playBtn.onclick = () => {
    music.play();
    vibrate();
  };
}

if (pauseBtn) {
  pauseBtn.onclick = () => {
    music.pause();
    vibrate();
  };
}

if (volumeSlider) {
  volumeSlider.oninput = () => {
    music.volume = volumeSlider.value;
  };
}
