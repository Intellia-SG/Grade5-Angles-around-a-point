// Angle geometry math helpers

/**
 * Converts polar coordinates to Cartesian (x, y)
 * In SVG, 0 degrees is at 3 o'clock. We offset by -90° so 0° starts at 12 o'clock.
 */
export function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians)
  };
}

/**
 * Generates an SVG path for an angle arc/wedge slice between startAngle and endAngle
 */
export function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', cx, cy,
    'L', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'Z'
  ].join(' ');
}

/**
 * Generates an open arc path (for angle arc indicators)
 */
export function describeOpenArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

export function sumsToPoint(angles) {
  const total = angles.reduce((sum, a) => sum + a, 0);
  return Math.abs(total - 360) < 0.1;
}

export function sumsToLine(angles) {
  const total = angles.reduce((sum, a) => sum + a, 0);
  return Math.abs(total - 180) < 0.1;
}

export function calculateMissingPointAngle(knownAngles) {
  const sum = knownAngles.reduce((acc, a) => acc + a, 0);
  return 360 - sum;
}

export function calculateMissingLineAngle(knownAngles) {
  const sum = knownAngles.reduce((acc, a) => acc + a, 0);
  return 180 - sum;
}
