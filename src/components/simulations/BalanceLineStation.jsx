import React, { useState } from 'react';
import LineDiagram from '../shared/LineDiagram';
import { playClickSFX, playCorrectSFX, playWrongSFX } from '../../utils/audio';

const ROUNDS = [
  { fixedSide: 'left', fixedValue: 90, targetValue: 90 },
  { fixedSide: 'left', fixedValue: 65, targetValue: 115 },
  { fixedSide: 'right', fixedValue: 38, targetValue: 142 }
];

export default function BalanceLineStation({ onStationDone }) {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const round = ROUNDS[currentRoundIdx] || ROUNDS[0];

  const [leftValue, setLeftValue] = useState(
    round.fixedSide === 'left' ? round.fixedValue : 180 - round.fixedValue
  );
  const [rightValue, setRightValue] = useState(180 - leftValue);
  const [feedback, setFeedback] = useState(null);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setLeftValue(val);
    setRightValue(180 - val);
  };

  const handleSubmit = () => {
    const isTargetMatched =
      round.fixedSide === 'left'
        ? leftValue === round.fixedValue
        : rightValue === round.fixedValue;

    if (isTargetMatched) {
      playCorrectSFX();
      setFeedback('correct');
      setTimeout(() => {
        if (currentRoundIdx < ROUNDS.length - 1) {
          const next = ROUNDS[currentRoundIdx + 1];
          setCurrentRoundIdx(currentRoundIdx + 1);
          const newLeft = next.fixedSide === 'left' ? next.fixedValue : 180 - next.fixedValue;
          setLeftValue(newLeft);
          setRightValue(180 - newLeft);
          setFeedback(null);
        } else {
          onStationDone(1);
        }
      }, 1400);
    } else {
      playWrongSFX();
      setFeedback('incorrect');
    }
  };

  return (
    <div className="station-container balance-line-station">
      <div className="station-banner">
        <h3 className="station-title">Station B: Balance the Straight Line 📏</h3>
        <p className="station-desc">
          Drag the pivot slider to set the missing angle so both sides balance to 180°!
        </p>
      </div>

      <div className="station-workspace">
        {/* Canvas Display */}
        <div className="station-canvas-card">
          <div className="round-badge">Round {currentRoundIdx + 1} of {ROUNDS.length}</div>
          <LineDiagram angles={[leftValue, rightValue]} size="large" showEquation={false} />

          <div className="total-display-bar complete">
            Line Total: <strong>{leftValue}° + {rightValue}° = 180°</strong>
          </div>
        </div>

        {/* Pivot Slider & Lock Controls */}
        <div className="station-controls-card">
          <div className="slider-box">
            <label className="slider-label">
              🎛️ Adjust Pivot Angle: <strong>{leftValue}°</strong>
            </label>
            <input
              type="range"
              min="10"
              max="170"
              step="1"
              value={leftValue}
              onChange={handleSliderChange}
              className="pivot-slider"
            />
            <div className="slider-range-labels">
              <span>10°</span>
              <span>Target: {round.fixedValue}°</span>
              <span>170°</span>
            </div>
          </div>

          <button type="button" className="btn-primary" onClick={handleSubmit}>
            Lock Angle Position 🔒
          </button>

          {feedback === 'correct' && (
            <div className="feedback-banner success">
              🎉 Balanced Perfectly! Straight Line = 180°!
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="feedback-banner error">
              ⚠️ Slide the pivot arm until the fixed angle matches {round.fixedValue}°!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
