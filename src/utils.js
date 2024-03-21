/**
 * Generate a random number between two values
 *
 * @returns number
 */
export function numBetween(min = 1, max = 10) {
  return Math.round(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate the distance between two coords
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 *
 * @returns number
 */
export function getDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}
