import React from 'react';

export default function CrossingLinesDiagram({
  angles = [55, 125, 55, 125], // [top, right, bottom, left]
  selectedAngles = [],
  missingIndex = -1,
  revealedIndices = null, // Array of indices allowed to display degree values (null displays all)
  onSelectQuadrant = null,
  highlightPairs = true,
  size = 'large'
}) {
  const width = size === 'large' ? 300 : size === 'medium' ? 240 : 180;
  const height = width;
  const cx = width / 2;
  const cy = height / 2;
  const lineLength = width * 0.42;

  // Quad positions: 0=Top, 1=Right, 2=Bottom, 3=Left
  const labels = [
    { idx: 0, x: cx, y: cy - lineLength * 0.52, angle: angles[0] },
    { idx: 1, x: cx + lineLength * 0.52, y: cy, angle: angles[1] },
    { idx: 2, x: cx, y: cy + lineLength * 0.52, angle: angles[2] },
    { idx: 3, x: cx - lineLength * 0.52, y: cy, angle: angles[3] }
  ];

  return (
    <div className={`crossing-diagram-wrapper size-${size}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        className="crossing-diagram-svg"
      >
        {/* Decorative subtle background circle */}
        <circle
          cx={cx}
          cy={cy}
          r={lineLength * 0.7}
          fill="rgba(255, 255, 255, 0.03)"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Line 1 (Top-Left to Bottom-Right) */}
        <line
          x1={cx - lineLength * 0.85}
          y1={cy - lineLength * 0.65}
          x2={cx + lineLength * 0.85}
          y2={cy + lineLength * 0.65}
          stroke="#818cf8"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Line 2 (Bottom-Left to Top-Right) */}
        <line
          x1={cx - lineLength * 0.85}
          y1={cy + lineLength * 0.65}
          x2={cx + lineLength * 0.85}
          y2={cy - lineLength * 0.65}
          stroke="#818cf8"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Highlight Dotted Arcs for Vertically Opposite Pairs */}
        {highlightPairs && (
          <>
            {/* Top Arc */}
            <path
              d={`M ${cx - 22} ${cy - 16} A 28 28 0 0 1 ${cx + 22} ${cy - 16}`}
              fill="none"
              stroke="#ff9800"
              strokeWidth="3"
              strokeDasharray="4 3"
            />
            {/* Bottom Arc */}
            <path
              d={`M ${cx - 22} ${cy + 16} A 28 28 0 0 0 ${cx + 22} ${cy + 16}`}
              fill="none"
              stroke="#ff9800"
              strokeWidth="3"
              strokeDasharray="4 3"
            />
            {/* Left Arc */}
            <path
              d={`M ${cx - 16} ${cy - 22} A 28 28 0 0 0 ${cx - 16} ${cy + 22}`}
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeDasharray="4 3"
            />
            {/* Right Arc */}
            <path
              d={`M ${cx + 16} ${cy - 22} A 28 28 0 0 1 ${cx + 16} ${cy + 22}`}
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeDasharray="4 3"
            />
          </>
        )}

        {/* Quadrant Angle Buttons / Labels */}
        {labels.map((lbl) => {
          const isSelected = selectedAngles.includes(lbl.idx);
          const isMissing = lbl.idx === missingIndex;
          const isRevealed = revealedIndices === null || revealedIndices.includes(lbl.idx);
          const isOppositePair = (selectedAngles.includes(0) && lbl.idx === 2) || (selectedAngles.includes(2) && lbl.idx === 0) ||
                                 (selectedAngles.includes(1) && lbl.idx === 3) || (selectedAngles.includes(3) && lbl.idx === 1);

          let badgeColor = 'rgba(15, 15, 55, 0.95)';
          let textColor = '#ffffff';
          let strokeColor = '#ffc107';
          let strokeW = '2';

          if (isSelected) {
            badgeColor = '#ffc107';
            textColor = '#1a1a2e';
            strokeColor = '#ffffff';
            strokeW = '3';
          } else if (isMissing) {
            badgeColor = '#ef4444';
            textColor = '#ffffff';
            strokeColor = '#ffffff';
            strokeW = '3';
          } else if (isOppositePair) {
            badgeColor = '#3b82f6';
            textColor = '#ffffff';
            strokeColor = '#ffffff';
            strokeW = '2.5';
          }

          return (
            <g
              key={lbl.idx}
              onClick={() => onSelectQuadrant && onSelectQuadrant(lbl.idx)}
              style={{ cursor: onSelectQuadrant ? 'pointer' : 'default' }}
              className={`quad-group ${isSelected ? 'selected' : ''}`}
            >
              <circle
                cx={lbl.x}
                cy={lbl.y}
                r="25"
                fill={badgeColor}
                stroke={strokeColor}
                strokeWidth={strokeW}
                style={{ transition: 'all 0.25s ease' }}
              />
              <text
                x={lbl.x}
                y={lbl.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="17"
                fontWeight="800"
                fill={textColor}
              >
                {isRevealed ? `${lbl.angle}°` : '?'}
              </text>
            </g>
          );
        })}

        {/* Center Intersection Point */}
        <circle cx={cx} cy={cy} r="7" fill="#ffc107" stroke="#ffffff" strokeWidth="2.5" />
      </svg>
    </div>
  );
}


