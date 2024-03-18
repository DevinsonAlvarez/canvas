class Square {
  /**
   * @param {number} x
   * @param {number} y
   * @param {object} options
   */
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.size = options?.size ?? 10;

    this.context = options?.context;

    this.color = options?.color ?? '#fff';

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
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default Square;
