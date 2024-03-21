import Circle from './src/shapes/Circle.js';
import { getDistance, numBetween } from './src/utils.js';
import { colors } from './src/theme.js';
import { createBouncingBalls } from './src/apps/BouncingBalls.js';

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = `#${colors.base.hex}`;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const bouncingBalls = createBouncingBalls(canvas);

bouncingBalls.render();
