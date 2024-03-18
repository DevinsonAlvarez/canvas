import Circle from './src/shapes/Circle.js';
import Square from './src/shapes/Square.js';
import { numBetween } from './src/utils.js';

const colors = {
  base: '#1e1e2e',
  white: '#fff',
  red: '#f38ba8',
  blue: '#89b4fa',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  purple: '#cba6f7',
};

const ballColors = Object.values(colors);
ballColors.shift(); // removing background color

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = colors.base;

const ctx = canvas.getContext('2d');

function createBalls(n = 1) {
  const balls = [];
  let colorIndex = 0;

  for (let i = 0; i < n; i++) {
    let vx = numBetween(-2, 2);
    let vy = numBetween(-2, 2);

    let radius = 40;

    const ball = new Circle(
      numBetween(radius, canvas.width - radius),
      numBetween(radius, canvas.height - radius),
      {
        context: ctx,
        color: ballColors[colorIndex],
        radius,
        vx,
        vy,
      },
    );

    balls.push(ball);

    if (colorIndex > ballColors.length - 1) {
      colorIndex = 0;
    } else {
      colorIndex++;
    }
  }

  return balls;
}

const balls = createBalls(6);

const drawCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball1) => {
    balls.forEach((ball2) => {
      if (ball1 === ball2) {
        return;
      }

      const dx = ball1.x - ball2.x;
      const dy = ball1.y - ball2.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (
        ball1.x + ball1.vx > canvas.width - ball1.radius ||
        ball1.x + ball1.vx < ball1.radius ||
        d < ball1.radius + ball2.radius
      ) {
        ball1.vx = -ball1.vx;
      }

      if (
        ball1.y + ball1.vy > canvas.height - ball1.radius ||
        ball1.y + ball1.vy < ball1.radius ||
        d < ball1.radius + ball2.radius
      ) {
        ball1.vy = -ball1.vy;
      }

      ball1.x += ball1.vx;
      ball1.y += ball1.vy;

      ball1.draw();
    });
  });

  window.requestAnimationFrame(drawCanvas);
};

drawCanvas();
