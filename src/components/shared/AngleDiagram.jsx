import React from 'react';
import { polarToCartesian, describeArc } from '../../utils/angleMath';

const PALETTE = [
  'hsl(210, 85%, 60%)', // Blue
  'hsl(150, 75%, 45%)', // Green
  'hsl(35, 95%, 55%)',  // Orange
  'hsl(280, 75%, 60%)', // Purple
  'hsl(340, 80%, 60%)', // Pink
  'hsl(180, 70%, 45%)'  // Teal
];

export default function AngleDiagram({
  angles = [120, 150, 90],
  missingIndex = -1,
  animated = false,
  size = 'medium',
  showEquation = true
}) {
  const radius = size === 'large' ? 120 : size === 'medium' ? 90 : 64;
  const cx = radius + 24;
  const cy = radius + 24;
  const svgSize = (radius + 24) * 2;

  let startAngle = 0;
  const wedges = angles.map((deg, i) => {
    const endAngle = startAngle + deg;
    const path = describeArc(cx, cy, radius, startAngle, endAngle);
    const midAngle = startAngle + deg / 2;
    const labelPos = polarToCartesian(cx, cy, radius * 0.62, midAngle);
    const arcPos = polarToCartesian(cx, cy, radius * 0.35, midAngle);
    const color = PALETTE[i % PALETTE.length];
    const isMissing = i === missingIndex;

    const wedge = {
      path,
      color,
      deg,
      labelPos,
      arcPos,
      isMissing
    };
    startAngle = endAngle;
    return wedge;
  });

  return (
    <div className={`angle-diagram-wrapper size-${size}`}>
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize + (showEquation ? 36 : 0)}`}
        xmlns="http://www.w3.org/2000/svg"
        className={`angle-diagram-svg ${animated ? 'animate-sweep' : ''}`}
      >
        {/* Background circle outline */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="rgba(255, 255, 255, 0.4)"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Wedges */}
        {wedges.map((w, i) => (
          <g key={i} className={`wedge-group ${w.isMissing ? 'missing-wedge' : ''}`}>
            <path
              d={w.path}
              fill={w.isMissing ? 'rgba(239, 68, 68, 0.16)' : w.color}
              stroke={w.isMissing ? '#ff5252' : '#ffffff'}
              strokeWidth="2"
              strokeDasharray={w.isMissing ? '6 4' : 'none'}
              style={{ transition: 'all 0.3s ease' }}
            />
            {/* Center angle ray line - Bright White */}
            <line
              x1={cx}
              y1={cy}
              x2={polarToCartesian(cx, cy, radius, startAngle).x}
              y2={polarToCartesian(cx, cy, radius, startAngle).y}
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Angle degree label pill / text */}
            <g>
              <rect
                x={w.labelPos.x - (w.isMissing ? 18 : 26)}
                y={w.labelPos.y - 14}
                width={w.isMissing ? '36' : '52'}
                height="28"
                rx="14"
                fill={w.isMissing ? '#ef4444' : 'rgba(15, 15, 55, 0.92)'}
                stroke={w.isMissing ? '#ffffff' : '#ffc107'}
                strokeWidth="2.5"
              />
              <text
                x={w.labelPos.x}
                y={w.labelPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={size === 'large' ? '17' : size === 'medium' ? '15' : '13'}
                fontWeight="800"
                fill="#ffffff"
              >
                {w.isMissing ? '?' : `${w.deg}°`}
              </text>
            </g>
          </g>
        ))}

        {/* Center vertex point dot - Gold */}
        <circle cx={cx} cy={cy} r="7" fill="#ffc107" stroke="#ffffff" strokeWidth="2.5" />

        {/* Equation text below diagram - Bright Gold */}
        {showEquation && (
          <text
            x={cx}
            y={svgSize + 22}
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fill="#ffc107"
          >
            {`${angles.map((a, idx) => (idx === missingIndex ? '?' : `${a}°`)).join(' + ')} = 360°`}
          </text>
        )}
      </svg>
    </div>
  );
}
