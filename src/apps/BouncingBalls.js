import Circle from '../shapes/Circle.js';
import { Base } from '../theme.js';
import { getDistance, numBetween } from '../utils.js';
import { colors } from './options.js';

/**
 * @param {HTMLCanvasElement} canvas
 */
function drawOnCanvas(canvas) {
  const context = canvas.getContext('2d');

  const balls = [];

  let colorIndex = 0;

  for (let i = 0; i < 14; i++) {
    const sign = Math.round(Math.random()) * 2 - 1;

    let vx = Math.random() * 3 * sign;
    let vy = Math.random() * 3 * sign;

    if (vx % 2 === 0) {
      vx = -vx;
    }

    if (vy % 2 === 0) {
      vy = -vy;
    }

    const ball = new Circle({
      x: numBetween(20, canvas.width - 20),
      y: numBetween(20, canvas.height - 20),
      radius: 20,
      color: colors[colorIndex],
      vx,
      vy,
    });

    balls.push(ball);

    colorIndex + 1 >= colors.length - 1 ? (colorIndex = 0) : colorIndex++;
  }

  return function render() {
    context.fillStyle = `#${Base.hex}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
      if (ball.x + ball.vx > canvas.width - 20 || ball.x + ball.vx < 20) {
        ball.vx = -ball.vx;
      }

      if (ball.y + ball.vy > canvas.height - 20 || ball.y + ball.vy < 20) {
        ball.vy = -ball.vy;
      }

      ball.x += ball.vx;
      ball.y += ball.vy;

      ball.draw(context);
    });

    window.requestAnimationFrame(render);
  };
}

export default { drawOnCanvas };
