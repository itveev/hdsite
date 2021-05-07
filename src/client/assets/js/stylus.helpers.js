function toHex(c) {
  const h = c.toString(16);
  return h.length < 2 ? `0${h}` : h;
}

const helpers = () => (stylus) => {
  stylus.define('getColoredSVG', (svg, c) => svg.val.replace(/(%23|#)\w+/g,
    `$1${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`));
};
module.exports = helpers;
