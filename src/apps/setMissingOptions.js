/**
 * @param {Object} options
 */
function setMissingOptions(options) {
  options.quantity ??= 10;
  options.factory ??= () => ({});
  options.drawLines ??= false;
  options.linesLength ??= 100;
}

export default setMissingOptions;
