import React, { useState } from 'react';
import AngleDiagram from '../shared/AngleDiagram';
import WedgeTray from '../shared/WedgeTray';
import { playClickSFX, playCorrectSFX, playWrongSFX } from '../../utils/audio';

const ROUNDS = [
  { knownAngles: [90, 120], missingAngle: 150, available: [60, 90, 150, 45] },
  { knownAngles: [80, 95, 100], missingAngle: 85, available: [85, 90, 105, 75] },
  { knownAngles: [110, 70, 90], missingAngle: 90, available: [90, 80, 100, 60] },
  { knownAngles: [60, 70, 80, 95], missingAngle: 55, available: [55, 65, 75, 45] }
];

export default function SpinCircleStation({ onCompleteRound, onStationDone }) {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const round = ROUNDS[currentRoundIdx] || ROUNDS[0];
  const [placedWedges, setPlacedWedges] = useState([...round.knownAngles]);
  const [selectedWedge, setSelectedWedge] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const totalDegrees = placedWedges.reduce((a, b) => a + b, 0);

  const handleSelectWedge = (deg) => {
    setSelectedWedge(deg);
    // Add wedge to circle
    const updated = [...placedWedges, deg];
    const newTotal = updated.reduce((a, b) => a + b, 0);
    if (newTotal <= 360) {
      setPlacedWedges(updated);
    }
  };

  const handleReset = () => {
    playClickSFX();
    setPlacedWedges([...round.knownAngles]);
    setSelectedWedge(null);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (totalDegrees === 360) {
      playCorrectSFX();
      setFeedback('correct');
      setTimeout(() => {
        if (currentRoundIdx < ROUNDS.length - 1) {
          setCurrentRoundIdx(currentRoundIdx + 1);
          setPlacedWedges([...ROUNDS[currentRoundIdx + 1].knownAngles]);
          setSelectedWedge(null);
          setFeedback(null);
        } else {
          onStationDone(0);
        }
      }, 1400);
    } else {
      playWrongSFX();
      setFeedback('incorrect');
    }
  };

  return (
    <div className="station-container spin-circle-station">
      <div className="station-banner">
        <h3 className="station-title">Station A: Spin & Close 360° Circle ⭕</h3>
        <p className="station-desc">
          Drag/tap angle wedges into place to fill the gap and complete the full 360° circle!
        </p>
      </div>

      <div className="station-workspace">
        {/* Canvas Display */}
        <div className="station-canvas-card">
          <div className="round-badge">Round {currentRoundIdx + 1} of {ROUNDS.length}</div>
          <AngleDiagram angles={placedWedges} size="large" showEquation={false} />
          
          <div className={`total-display-bar ${totalDegrees === 360 ? 'complete' : ''}`}>
            Current Total: <strong>{totalDegrees}°</strong> / 360°
            {totalDegrees < 360 && <span className="gap-text"> (Gap: {360 - totalDegrees}°)</span>}
          </div>
        </div>

        {/* Tray & Controls */}
        <div className="station-controls-card">
          <WedgeTray
            availableWedges={round.available}
            selectedWedge={selectedWedge}
            onSelectWedge={handleSelectWedge}
          />

          <div className="station-actions">
            <button type="button" className="btn-secondary" onClick={handleReset}>
              🔄 Reset Wedges
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
              disabled={totalDegrees !== 360}
            >
              Verify Circle 360° ✨
            </button>
          </div>

          {feedback === 'correct' && (
            <div className="feedback-banner success">
              🎉 Outstanding! Full 360° Circle Closed!
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="feedback-banner error">
              ⚠️ Not quite 360°. Adjust wedges and try again!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
