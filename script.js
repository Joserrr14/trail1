const envelope = document.getElementById("envelope");
const music = document.getElementById("bgMusic");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const volumeSlider = document.getElementById("volume");

let isOpen = false;

/* Fade-in */
function fadeIn(audio, duration = 2000) {
  audio.volume = 0;
  audio.play().catch(() => {});
  
  let step = 0.05;
  let interval = duration * step;

  let fade = setInterval(() => {
    if (audio.volume < volumeSlider.value) {
      audio.volume = Math.min(audio.volume + step, volumeSlider.value);
    } else {
      clearInterval(fade);
    }
  }, interval);
}

/* Fade-out */
function fadeOut(audio, duration = 2000) {
  let step = 0.05;
  let interval = duration * step;

  let fade = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, interval);

  function openEnvelope() {

    const envelope = document.querySelector(".envelope");
    const music = document.getElementById("music");

    envelope.classList.add("open");

    music.play().catch(function(error) {
        console.log("Autoplay blocked:", error);
    });

}
}

/* Vibration */
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate([30, 20, 30]);
  }
}

/* Click */
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

/* Controls */
playBtn.onclick = () => {
  music.play();
  vibrate();
};

pauseBtn.onclick = () => {
  music.pause();
  vibrate();
};

volumeSlider.oninput = () => {
  music.volume = volumeSlider.value;
};
