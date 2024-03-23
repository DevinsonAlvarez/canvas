import { colors } from './src/theme.js';
import { BouncingBalls } from './src/apps/BouncingBalls.js';

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = `#${colors.base.hex}`;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const bb = new BouncingBalls(canvas);

/** @type {import('./src/apps/BouncingBalls.js').BallParams} */
const ballsParams = {};

const $ballRadiusInput = document.getElementById('ball-radius-input');
$ballRadiusInput.addEventListener('change', (e) => {
  ballsParams.radius = parseInt(e.target.value);
  bb.reset();
});

const $randomBallRadiusInput = document.getElementById(
  'random-ball-radius-input',
);
$randomBallRadiusInput.addEventListener('change', (e) => {
  $ballRadiusInput.disabled = e.target.checked;

  if (e.target.checked) {
    ballsParams.radius = undefined;
  } else {
    ballsParams.radius = parseInt($ballRadiusInput.value);
  }

  bb.reset();
});

const $ballQuantityInput = document.getElementById('ball-quantity-input');
$ballQuantityInput.addEventListener('change', (e) =>
  bb.quantity(parseInt(e.target.value)).reset(),
);

const $addBallButton = document.getElementById('add-ball-button');
$addBallButton.addEventListener('click', () => {
  bb.addBall();
  $ballQuantityInput.value = bb.ballQuantity();
});

const $removeBallButton = document.getElementById('remove-ball-button');
$removeBallButton.addEventListener('click', () => {
  bb.removeBall();
  $ballQuantityInput.value = bb.ballQuantity();
});

const $resetButton = document.getElementById('reset-button');
$resetButton.addEventListener('click', () => bb.reset());

const $drawLinesInput = document.getElementById('draw-lines-input');
$drawLinesInput.addEventListener('click', (e) => {
  bb.lines({ draw: e.target.checked });
});

const $fpsMeter = document.getElementById('fps-meter');

bb.quantity(parseInt($ballQuantityInput.value))
  .factory(() => ballsParams)
  .render();

function fpsMeter() {
  let prevTime = Date.now();
  let frames = 0;

  requestAnimationFrame(function loop() {
    const time = Date.now();
    frames++;
    if (time > prevTime + 1000) {
      let fps = Math.round((frames * 1000) / (time - prevTime));
      prevTime = time;
      frames = 0;

      $fpsMeter.innerText = fps;
    }

    requestAnimationFrame(loop);
  });
}

fpsMeter();
