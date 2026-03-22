const envelope = document.getElementById("envelope");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const letterImg = document.querySelector(".letter img");
const music = document.getElementById("bgMusic");

let startY=0, progress=0, isDragging=false, isOpen=false, motionEnabled=false;

const DRAG_RANGE=300;
const OPEN_THRESHOLD=0.35;
const ZOOM_SCALE=1.25;
const ZOOM_X=50;
const ZOOM_Y=35;
const TILT_STRENGTH=12;

envelope.addEventListener("pointerdown", e => {
  if(isOpen) return;
  isDragging=true;
  startY=e.clientY;
  envelope.setPointerCapture(e.pointerId);
});

envelope.addEventListener("pointermove", e => {
  if(!isDragging) return;
  const delta=startY-e.clientY;
  progress=Math.max(0,Math.min(1, delta/DRAG_RANGE));
  const eased=1-Math.pow(1-progress,3);
  flap.style.transform=`rotateX(${eased*160}deg)`;
  letter.style.transform=`translateY(${(1-eased)*100}%)`;
});

envelope.addEventListener("pointerup", () => {
  if(!isDragging) return;
  isDragging=false;
  if(progress>OPEN_THRESHOLD) openEnvelope();
  else closeEnvelope();
});

function openEnvelope(){
  if(isOpen) return;
  isOpen=true;

  flap.style.transition="transform 0.6s cubic-bezier(0.22,1,0.36,1)";
  letter.style.transition="transform 0.6s cubic-bezier(0.22,1,0.36,1)";
  flap.style.transform="rotateX(160deg)";
  letter.style.transform="translateY(0%)";
  envelope.classList.add("open");

  // START MUSIC AT 35s ON USER INTERACTION
  music.currentTime = 35;
  music.play().catch(()=>{});

  if(navigator.vibrate) navigator.vibrate(10);
  setTimeout(startZoom,500);
  enableMotion();
}

function closeEnvelope(){
  if(!isOpen) return;
  isOpen=false;

  flap.style.transition="transform 0.4s ease";
  letter.style.transition="transform 0.4s ease";

  flap.style.transform="rotateX(0deg)";
  letter.style.transform="translateY(100%)";

  letterImg.style.transition="transform 0.4s ease";
  letterImg.style.transform="scale(1)";
  letterImg.style.transformOrigin="center";

  envelope.classList.remove("open");

  // STOP MUSIC
  music.pause();
  music.currentTime=0;
}

function startZoom(){
  letterImg.style.transition="transform 2.5s cubic-bezier(0.22,1,0.36,1)";
  letterImg.style.transformOrigin=`${ZOOM_X}% ${ZOOM_Y}%`;
  letterImg.style.transform=`scale(${ZOOM_SCALE})`;
}

function enableMotion(){
  if(motionEnabled) return;
  if(typeof DeviceOrientationEvent!=="undefined" && typeof DeviceOrientationEvent.requestPermission==="function"){
    DeviceOrientationEvent.requestPermission().then(resp=>{if(resp==="granted") startParallax();}).catch(()=>{});
  } else startParallax();
  motionEnabled=true;
}

function startParallax(){
  window.addEventListener("deviceorientation", e=>{
    if(!isOpen) return;
    const rotateX=(e.beta/45)*TILT_STRENGTH;
    const rotateY=(e.gamma/45)*TILT_STRENGTH;
    letter.style.transform=`translateY(0%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
}

// prevent scroll during drag
document.addEventListener("touchmove", e=>{if(isDragging) e.preventDefault();},{passive:false});
