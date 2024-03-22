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
bb.quantity(200);

const $addBallButton = document.getElementById('add-ball-button');
$addBallButton.addEventListener('click', () => bb.addBall());

const $removeBallButton = document.getElementById('remove-ball-button');
$removeBallButton.addEventListener('click', () => bb.removeBall());

const $resetButton = document.getElementById('reset-button');
$resetButton.addEventListener('click', () => bb.reset());

const $drawLinesInput = document.getElementById('draw-lines-input');
$drawLinesInput.addEventListener('click', (e) => {
  bb.lines({ draw: e.target.checked });
});

bb.render();
