class Circle {
  /**
   * @param {number} x
   * @param {number} y
   * @param {object} options
   */
  constructor({ x = 0, y = 0, radius = 10, color, vx = 0, vy = 0, context }) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.context = context;

    this.color = color ?? '#f00';

    this.vx = vx;
    this.vy = vy;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    if (context === undefined) {
      context = this.context;
    }
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}

export default Circle;
