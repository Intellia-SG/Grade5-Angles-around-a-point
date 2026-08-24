import React from 'react';
import { polarToCartesian, describeOpenArc } from '../../utils/angleMath';

export default function LineDiagram({
  angles = [110, 70],
  missingIndex = -1,
  size = 'large',
  showEquation = true
}) {
  const width = size === 'large' ? 320 : size === 'medium' ? 260 : 200;
  const height = size === 'large' ? 180 : size === 'medium' ? 140 : 110;
  const cx = width / 2;
  const cy = height - 30;
  const radius = size === 'large' ? 110 : size === 'medium' ? 85 : 65;

  const leftAngle = angles[0] || 90;
  const rightAngle = angles[1] || 180 - leftAngle;

  const rayEnd = polarToCartesian(cx, cy, radius, leftAngle);

  const leftArc = describeOpenArc(cx, cy, radius * 0.48, 0, leftAngle);
  const rightArc = describeOpenArc(cx, cy, radius * 0.48, leftAngle, 180);

  const leftLabelPos = polarToCartesian(cx, cy, radius * 0.72, leftAngle / 2);
  const rightLabelPos = polarToCartesian(cx, cy, radius * 0.72, leftAngle + rightAngle / 2);

  return (
    <div className={`line-diagram-wrapper size-${size}`}>
      <svg
        viewBox={`0 0 ${width} ${height + (showEquation ? 32 : 0)}`}
        xmlns="http://www.w3.org/2000/svg"
        className="line-diagram-svg"
      >
        {/* Flat straight line base - Bright White */}
        <line
          x1={cx - radius - 24}
          y1={cy}
          x2={cx + radius + 24}
          y2={cy}
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Ray separating the two angles - Bright Sky Blue */}
        <line
          x1={cx}
          y1={cy}
          x2={rayEnd.x}
          y2={rayEnd.y}
          stroke="#38bdf8"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Left angle arc */}
        <path
          d={leftArc}
          fill="none"
          stroke={missingIndex === 0 ? '#ff5252' : '#38bdf8'}
          strokeWidth="3.5"
          strokeDasharray={missingIndex === 0 ? '5 3' : 'none'}
        />

        {/* Right angle arc */}
        <path
          d={rightArc}
          fill="none"
          stroke={missingIndex === 1 ? '#ff5252' : '#34d399'}
          strokeWidth="3.5"
          strokeDasharray={missingIndex === 1 ? '5 3' : 'none'}
        />

        {/* Left Label Pill & Text */}
        <g>
          <rect
            x={leftLabelPos.x - 26}
            y={leftLabelPos.y - 14}
            width="52"
            height="28"
            rx="14"
            fill={missingIndex === 0 ? '#ef4444' : 'rgba(15, 15, 55, 0.92)'}
            stroke={missingIndex === 0 ? '#ffffff' : '#38bdf8'}
            strokeWidth="2.5"
          />
          <text
            x={leftLabelPos.x}
            y={leftLabelPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="17"
            fontWeight="800"
            fill="#ffffff"
          >
            {missingIndex === 0 ? '?' : `${leftAngle}°`}
          </text>
        </g>

        {/* Right Label Pill & Text */}
        <g>
          <rect
            x={rightLabelPos.x - 26}
            y={rightLabelPos.y - 14}
            width="52"
            height="28"
            rx="14"
            fill={missingIndex === 1 ? '#ef4444' : 'rgba(15, 15, 55, 0.92)'}
            stroke={missingIndex === 1 ? '#ffffff' : '#34d399'}
            strokeWidth="2.5"
          />
          <text
            x={rightLabelPos.x}
            y={rightLabelPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="17"
            fontWeight="800"
            fill="#ffffff"
          >
            {missingIndex === 1 ? '?' : `${rightAngle}°`}
          </text>
        </g>

        {/* Center Vertex Dot - Gold */}
        <circle cx={cx} cy={cy} r="7" fill="#ffc107" stroke="#ffffff" strokeWidth="2.5" />

        {/* 180° Straight Line indicator label - Gold & White */}
        {showEquation && (
          <text
            x={cx}
            y={height + 22}
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fill="#ffc107"
          >
            {`${missingIndex === 0 ? '?' : `${leftAngle}°`} + ${missingIndex === 1 ? '?' : `${rightAngle}°`} = 180°`}
          </text>
        )}
      </svg>
    </div>
  );
}

