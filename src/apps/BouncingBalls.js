import Circle from '../shapes/Circle.js';
import { colors as themeColors } from '../theme.js';
import { getDistance, getRandomItem, numBetween } from '../utils.js';
import setMissingOptions from './setMissingOptions.js';

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Object} options
 */
function createBouncingBalls(canvas, options = {}) {
  setMissingOptions(options);

  const context = canvas.getContext('2d');

  const colorRegex = /([a-zA-Z].*\s[0-9])|base|mantle|crust/;

  const colors = Object.values(themeColors)
    .filter((color) => !colorRegex.test(color.name))
    .map((color) => '#'.concat(color.hex));

  const balls = [];

  let colorIndex = 0;

  for (let i = 0; i < options.quantity; i++) {
    const params = options.factory();

    params.color ??= colors[colorIndex];
    params.radius ??= Math.round(Math.random() * 12 + 6);
    params.vx ??= Math.random() * 3 * Math.round(Math.random()) * 2 - 1;
    params.vy ??= Math.random() * 3 * Math.round(Math.random()) * 2 - 1;

    const ball = new Circle({
      x: numBetween(params.radius, canvas.width - params.radius),
      y: numBetween(params.radius, canvas.height - params.radius),
      context,
      ...params,
    });

    balls.push(ball);

    colorIndex + 1 >= colors.length - 1 ? (colorIndex = 0) : colorIndex++;
  }

  function addBall(params) {
    balls.push(
      new Circle({
        x: params?.x,
        y: params?.y,
        radius: params?.radius,
        color: params?.color ?? colors[colorIndex++],
        context,
        vx: params?.vx,
        vy: params?.vy,
      }),
    );

    colorIndex + 1 >= colors.length - 1 ? (colorIndex = 0) : colorIndex++;
  }

  function removeBall() {
    balls.pop();
  }

  let drawLines = options.drawLines;
  let linesLength = options.linesLength;

  function render() {
    context.fillStyle = '#'.concat(themeColors.base.hex);
    context.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball1) => {
      balls.forEach((ball2) => {
        if (ball1 === ball2) return;

        const d = getDistance(ball1.x, ball1.y, ball2.x, ball2.y);

        if (drawLines) {
          if (d < linesLength) {
            const gradient = context.createLinearGradient(
              ball1.x,
              ball1.y,
              ball2.x,
              ball2.y,
            );
            gradient.addColorStop(0, ball1.color);
            gradient.addColorStop(1, ball2.color);

            context.beginPath();
            context.moveTo(ball1.x, ball1.y);
            context.lineTo(ball2.x, ball2.y);
            context.strokeStyle = gradient;
            context.lineWidth = ball1.radius;
            context.stroke();
          }
        }
      });

      // infinite canvas x
      // if (ball1.x >= canvas.width - ball1.radius || ball1.x <= ball1.radius) {
      //   ball1.x = canvas.width - ball1.radius;
      // }

      // infinite canvas y
      // if (ball1.y <= ball1.radius) {
      //   ball1.y = canvas.height - ball1.radius;
      // }

      if (ball1.x >= canvas.width - ball1.radius) {
        ball1.x = canvas.width - ball1.radius;
      }

      if (ball1.y >= canvas.height - ball1.radius) {
        ball1.y = canvas.height - ball1.radius;
      }

      if (ball1.x <= ball1.radius) {
        ball1.x = ball1.radius;
      }

      if (ball1.y <= ball1.radius) {
        ball1.y = ball1.radius;
      }

      ball1.x += ball1.vx;
      ball1.y += ball1.vy;

      if (
        ball1.x - ball1.radius <= 0 ||
        ball1.x >= canvas.width - ball1.radius
      ) {
        ball1.vx *= -1;
      }

      if (
        ball1.y - ball1.radius <= 0 ||
        ball1.y >= canvas.height - ball1.radius
      ) {
        ball1.vy *= -1;
      }

      ball1.draw();
    });

    window.requestAnimationFrame(() => render());
  }

  return {
    addBall,
    removeBall,
    render,
  };
}

export { createBouncingBalls };
