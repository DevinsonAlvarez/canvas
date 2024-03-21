import Circle from './src/shapes/Circle.js';
import { getDistance, numBetween } from './src/utils.js';
import { Base } from './src/theme.js';
import BouncingBalls from './src/apps/BouncingBalls.js';

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = `#${Base.hex}`;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const render = BouncingBalls.drawOnCanvas(canvas);
render();
