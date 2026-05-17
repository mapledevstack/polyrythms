const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const size = 600;
canvas.width = size;
canvas.height = size;

const tracks = [];
const balls = [];
const N = 13;

const center = { x: size / 2, y: size / 2 };

const initialTrackRadius = 100;
const trackStep = 15;
const ballRadius = 7;
const angle = Math.PI;
const initialOmega = -Math.PI / 350;
const omegaStep = Math.PI / 20000;

let cosMultiple = 6;
let sinMultiple = 6;

window.soundEnabled = false;

for (let i = 0; i < N; i++) {
  const trackRadius = initialTrackRadius + i * trackStep;
  const omega = initialOmega + i * omegaStep;

  const track = new Track(center, trackRadius, i, cosMultiple, sinMultiple);
  const ball = new Ball(track, ballRadius, angle, omega);

  tracks.push(track);
  balls.push(ball);
}

const cosSlider = document.getElementById("cosRange");
const sinSlider = document.getElementById("sinRange");
const cosValue = document.getElementById("cosValue");
const sinValue = document.getElementById("sinValue");
const enableSoundButton = document.getElementById("enableSoundButton");

function updateSoundButton() {
  enableSoundButton.textContent = window.soundEnabled ? "Disable sound" : "Enable sound";
}

function toggleSound() {
  const audioCtx = Ball.getAudioContext();
  if (!audioCtx) {
    enableSoundButton.textContent = "Audio unavailable";
    enableSoundButton.disabled = true;
    return;
  }

  if (!window.soundEnabled) {
    if (audioCtx.state === "suspended") {
      audioCtx.resume().then(() => {
        window.soundEnabled = true;
        updateSoundButton();
      });
    } else {
      window.soundEnabled = true;
      updateSoundButton();
    }
  } else {
    window.soundEnabled = false;
    updateSoundButton();
  }
}

enableSoundButton.addEventListener("pointerdown", toggleSound);
updateSoundButton();

cosSlider.addEventListener("input", (event) => {
  cosMultiple = Number(event.target.value);
  cosValue.textContent = cosMultiple;
  tracks.forEach((track) => {
    track.cosMultiple = cosMultiple;
  });
});

sinSlider.addEventListener("input", (event) => {
  sinMultiple = Number(event.target.value);
  sinValue.textContent = sinMultiple;
  tracks.forEach((track) => {
    track.sinMultiple = sinMultiple;
  });
});

function animate() {
  ctx.clearRect(0, 0, size, size);
  tracks.forEach((track) => track.draw(ctx));
  balls.forEach((ball) => {
    ball.draw(ctx);
    ball.move();
  });

  requestAnimationFrame(animate);
}

animate();
