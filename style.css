/* Reset */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d2d4d;
}

/* Envelope container */
.envelope {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  perspective: 1400px;
  pointer-events: auto;
  overflow: hidden;
}

/* Envelope background & flap */
.body,
.flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("assets/image1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 1;
}

.flap {
  clip-path: polygon(0 0, 100% 0, 85% 45%, 50% 62%, 15% 45%);
  transform-origin: top center;
  transition: transform 0.8s ease-in-out;
  z-index: 3;
}

/* Blur background behind letter */
.blur-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(0,0,0,0.25);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease-in-out;
  z-index: 2;
}

/* Letter container (fully responsive) */
.letter {
  position: absolute;
  top: 0;           /* start at top */
  left: 0;
  width: 100vw;     /* full viewport width */
  height: 100vh;    /* full viewport height */
  z-index: 4;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(100%); /* start below envelope */
  transition: transform 4s cubic-bezier(0.22, 0.61, 0.36, 1); /* slow smooth slipout on mobile */
}

/* Letter image fully fits */
.letter img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* mobile: fill screen */
  transition: transform 0.4s ease;
}

/* Desktop / laptop: fit entire letter without cropping */
@media (min-width: 768px) {
  .letter img {
    object-fit: contain; /* show full letter inside viewport */
  }
}

/* Open state */
.envelope.open .flap {
  transform: rotateX(160deg);
}

.envelope.open .letter {
  transform: translateY(0); /* bring letter fully into view */
}

.envelope.open .blur-bg {
  opacity: 1;
}
