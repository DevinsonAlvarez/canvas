class Shape {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} height
   * @param {number} width
   * @param {object} options
   */
  constructor(x, y, options) {
    this.x = x;
    this.y = y;

    this.context = options?.context;

    this.color = options?.color || '#fff';

    this.vx = options?.vx;
    this.vy = options?.vy;
  }

  /**
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
