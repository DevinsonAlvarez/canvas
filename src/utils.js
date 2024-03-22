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

/**
 * Returns a random element from the given object
 *
 * @param {Object|Array} obj
 *
 * @returns any
 */
export function getRandomItem(obj) {
  if (Array.isArray(obj)) {
    return obj[Math.floor(Math.random() * obj.length)];
  }

  if (typeof obj === 'object') {
    const items = Object.values(obj);
    return items[Math.floor(Math.random() * items.length)];
  }
}
