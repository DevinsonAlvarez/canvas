/**
 * Generate a random number between two values
 * @returns number
 */
export function numBetween(min = 1, max = 10) {
  return Math.round(Math.random() * (max - min + 1)) + min;
}
