import Circle from '../shapes/Circle.js';
import { colors as themeColors } from '../theme.js';
import { getDistance, numBetween } from '../utils.js';

/**
 * @typedef BallParams
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {string} color
 * @property {number} radius
 * @property {number} vx
 * @property {number} vy
 */
class BouncingBalls {
  /**
   * @type {HTMLCanvasElement}
   */
  #canvas;

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context;

  /**
   * @type {number}
   */
  #quantity = 10;

  /**
   * @callback BallFactory
   * @returns {BallParams}
   *
   * @type {BallFactory}
   */
  #factory = () => ({});

  /**
   * @type {boolean}
   */
  #drawLines = false;

  /**
   * @type {number}
   */
  #linesLength = 100;

  /**
   * @type {number}
   */
  #linesWidth = 1;

  /**
   * @type {Circle[]}
   */
  #balls = [];

  /**
   * @type {Array.<{ name: string, hex: string, rgb: string, hsl: string }>}
   */
  #colors = [];

  /**
   * @type {number}
   */
  #colorIndex = 0;

  /**
   * @type {boolean}
   */
  #wasRendered = false;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {number|undefined} quantity
   */
  constructor(canvas) {
    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');

    const colorRegex = /([a-zA-Z].*\s[0-9])|base|mantle|crust/;

    this.#colors = Object.values(themeColors).filter(
      (color) => !colorRegex.test(color.name),
    );
  }

  /**
   * Sets the number of balls
   *
   * @param {number} value
   */
  quantity(value) {
    this.#quantity = value;

    return this;
  }

  /**
   * @callback FactoryCallback
   * @returns {BallParams}
   *
   * @param {FactoryCallback} callback
   */
  factory(callback) {
    this.#factory = callback;

    return this;
  }

  /**
   * @param {{ draw: boolean, width: number, length: number }} params
   */
  lines({ draw = false, length = 100, width = 1 }) {
    this.#drawLines = draw;
    this.#linesLength = length;
    this.#linesWidth = width;

    return this;
  }

  /**
   * @param {BallParams|undefined} params
   */
  addBall(params) {
    const ballParams = this.#resolveDefaultParams({
      ...this.#factory(),
      ...params,
    });

    this.#balls.push(new Circle({ context: this.#context, ...ballParams }));

    return this;
  }

  removeBall() {
    this.#balls.pop();

    return this;
  }

  #ballsFactory(quantity) {
    const n = quantity ?? this.#quantity;

    for (let i = 0; i < n; i++) {
      const ballParams = this.#resolveDefaultParams(this.#factory());

      this.#balls.push(
        new Circle({
          context: this.#context,
          ...ballParams,
        }),
      );
    }
  }

  render() {
    this.clearCanvas();

    if (this.#balls.length === 0 && !this.#wasRendered) {
      this.#ballsFactory();

      this.#wasRendered = true;
    }

    this.#balls.forEach((ball1) => {
      this.#balls.forEach((ball2) => {
        if (ball1 === ball2) return;

        const d = getDistance(ball1.x, ball1.y, ball2.x, ball2.y);

        if (this.#drawLines) {
          if (d < this.#linesLength) {
            const gradient = this.#context.createLinearGradient(
              ball1.x,
              ball1.y,
              ball2.x,
              ball2.y,
            );
            gradient.addColorStop(0, ball1.color);
            gradient.addColorStop(1, ball2.color);

            this.#context.beginPath();
            this.#context.moveTo(ball1.x, ball1.y);
            this.#context.lineTo(ball2.x, ball2.y);
            this.#context.strokeStyle = gradient;
            this.#context.lineWidth = this.#linesWidth;
            this.#context.stroke();
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

      // Check if the ball pass the right side
      if (ball1.x >= canvas.width - ball1.radius) {
        ball1.x = canvas.width - ball1.radius;
      }

      // Check if the ball pass the up side
      if (ball1.y >= canvas.height - ball1.radius) {
        ball1.y = canvas.height - ball1.radius;
      }

      // Check if the ball pass the left side
      if (ball1.x <= ball1.radius) {
        ball1.x = ball1.radius;
      }

      // Check if the ball pass the down side
      if (ball1.y <= ball1.radius) {
        ball1.y = ball1.radius;
      }

      // applying velocity
      ball1.x += ball1.vx;
      ball1.y += ball1.vy;

      // preventing canvas overflow
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

    window.requestAnimationFrame(this.render.bind(this));

    return this;
  }

  /**
   * @param {BallParams} params
   *
   * @returns {BallParams}
   */
  #resolveDefaultParams(params) {
    const radius = Math.round(Math.random() * 12 + 6);

    return {
      x: params.x ?? numBetween(radius, canvas.width - radius),
      y: params.y ?? numBetween(radius, canvas.height - radius),
      radius: params.radius ?? radius,
      color: params.color ?? '#'.concat(this.getNextColor().hex),
      vx: params.vx ?? Math.random() * 3 * Math.round(Math.random()) * 2 - 1,
      vy: params.vy ?? Math.random() * 3 * Math.round(Math.random()) * 2 - 1,
    };
  }

  /**
   * @returns {{ name: string, hex: string, rgb: string, hsl: string }}
   */
  getNextColor() {
    const color = this.#colors[this.#colorIndex];

    this.#colorIndex >= this.#colors.length - 1
      ? (this.#colorIndex = 0)
      : this.#colorIndex++;

    return color;
  }

  clearCanvas() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }
}

export { BouncingBalls };

export default BouncingBalls;
