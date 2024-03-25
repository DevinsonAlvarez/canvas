import { colors } from './src/theme.js';
import { BouncingBalls } from './src/apps/BouncingBalls.js';
import { $ } from './src/utils.js';

/** @type {HTMLCanvasElement} */
const canvas = $('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = `#${colors.base.hex}`;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const bb = new BouncingBalls(canvas);

/**
 * Ball factory params
 *
 * @type {import('./src/apps/BouncingBalls.js').BallParams}
 */
const ballsParams = {};

// Quantity input
const $ballQuantityInput = $('#ball-quantity-input');
$ballQuantityInput.addEventListener('change', (e) =>
  bb.quantity(parseInt(e.target.value)).reset(),
);
bb.quantity(parseInt($ballQuantityInput.value)); // Set initial ball quantity

// Radius input
const $ballRadiusInput = $('#ball-radius-input');
$ballRadiusInput.addEventListener('change', (e) => {
  ballsParams.radius = parseInt(e.target.value);
  bb.reset();
});

// Random radius check
const $randomBallRadiusInput = $('#random-ball-radius-input');
$randomBallRadiusInput.addEventListener('change', (e) => {
  $ballRadiusInput.disabled = e.target.checked;

  if (e.target.checked) {
    ballsParams.radius = undefined;
  } else {
    ballsParams.radius = parseInt($ballRadiusInput.value);
  }

  bb.reset();
});

const $addBallButton = $('#add-ball-button');
$addBallButton.addEventListener('click', () => {
  bb.addBall();
  $ballQuantityInput.value = bb.ballQuantity();
});

const $removeBallButton = $('#remove-ball-button');
$removeBallButton.addEventListener('click', () => {
  bb.removeBall();
  $ballQuantityInput.value = bb.ballQuantity();
});

const $resetButton = $('#reset-button');
$resetButton.addEventListener('click', () => bb.reset());

const $drawLinesInput = $('#draw-lines-input');
$drawLinesInput.addEventListener('click', (e) => {
  bb.lines({ draw: e.target.checked });
});

// rendering on canvas
bb.factory(() => ballsParams).render();

// displaying fps
function fpsMeter() {
  let prevTime = Date.now();
  let frames = 0;

  const $fpsMeter = document.getElementById('fps-meter');

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
