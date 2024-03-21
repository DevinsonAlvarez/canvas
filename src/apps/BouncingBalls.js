import Circle from '../shapes/Circle.js';
import { colors as themeColors } from '../theme.js';
import { getDistance, numBetween } from '../utils.js';

/**
 * @param {HTMLCanvasElement} canvas
 */
function createBouncingBalls(canvas) {
  const context = canvas.getContext('2d');

  const colorRegex = /([a-zA-Z].*\s[0-9])|base|mantle|crust/;

  const colors = Object.values(themeColors)
    .filter((color) => !colorRegex.test(color.name))
    .map((color) => '#'.concat(color.hex));

  const balls = [];

  let colorIndex = 0;

  for (let i = 0; i < 14; i++) {
    // Generating a random 1 or -1
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

  function render() {
    context.fillStyle = '#'.concat(themeColors.base.hex);
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
  }

  return {
    render,
  };
}

export { createBouncingBalls };
