import Circle from './src/shapes/Circle.js';
import { getDistance, numBetween } from './src/utils.js';
import { colors } from './src/theme.js';
import { createBouncingBalls } from './src/apps/BouncingBalls.js';

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = `#${colors.base.hex}`;

const ballFactory = () => ({
  radius: 20,
});

const bouncingBalls = createBouncingBalls(canvas, {
  factory: ballFactory,
  quantity: 100,
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let linesLength = 100;
let drawLines = true;

const $addBallButton = document.getElementById('add-ball-button');
$addBallButton.addEventListener('click', () => {
  return bouncingBalls.addBall({
    x: 40,
    y: 40,
    vy: Math.random() * 10 * Math.round(Math.random()) * 2 - 1,
    radius: 2,
  });
});

const $removeBallButton = document.getElementById('remove-ball-button');
$removeBallButton.addEventListener('click', () => bouncingBalls.removeBall());

const $drawLinesInput = document.getElementById('draw-lines-input');
$drawLinesInput.addEventListener('click', (e) => {
  drawLines = e.target.checked;
});

bouncingBalls.render();
