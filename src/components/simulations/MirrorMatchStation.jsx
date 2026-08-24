import React, { useState } from 'react';
import CrossingLinesDiagram from '../shared/CrossingLinesDiagram';
import NumberPad from '../shared/NumberPad';
import { playClickSFX, playCorrectSFX, playWrongSFX } from '../../utils/audio';

const ROUNDS = [
  {
    givenIndex: 0, // Top
    givenAngle: 55,
    oppositeIndex: 2, // Bottom is twin
    angles: [55, 125, 55, 125],
    givenName: 'Top (55°)'
  },
  {
    givenIndex: 1, // Right
    givenAngle: 108,
    oppositeIndex: 3, // Left is twin
    angles: [72, 108, 72, 108],
    givenName: 'Right (108°)'
  },
  {
    givenIndex: 2, // Bottom
    givenAngle: 48,
    oppositeIndex: 0, // Top is twin
    angles: [48, 132, 48, 132],
    givenName: 'Bottom (48°)'
  }
];

export default function MirrorMatchStation({ onStationDone }) {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const round = ROUNDS[currentRoundIdx] || ROUNDS[0];

  const [selectedPair, setSelectedPair] = useState([]);
  const [matchConfirmed, setMatchConfirmed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);

  // At start of round, only givenIndex is revealed
  const revealedIndices = feedback === 'round_complete'
    ? [round.givenIndex, round.oppositeIndex]
    : [round.givenIndex];

  const handleSelectQuadrant = (idx) => {
    playClickSFX();

    // If clicking the given angle itself
    if (idx === round.givenIndex) {
      setSelectedPair([round.givenIndex]);
      return;
    }

    // If learner selects the correct opposite twin quadrant
    if (idx === round.oppositeIndex) {
      playCorrectSFX();
      setSelectedPair([round.givenIndex, round.oppositeIndex]);
      setMatchConfirmed(true);
      setFeedback('pair_matched');
    } else {
      // Wrong quadrant (adjacent)
      playWrongSFX();
      setSelectedPair([round.givenIndex, idx]);
      setFeedback('pair_error');
      setTimeout(() => {
        setSelectedPair([]);
        setFeedback(null);
      }, 1200);
    }
  };

  const handleResetPair = () => {
    playClickSFX();
    setSelectedPair([]);
    setMatchConfirmed(false);
    setInputValue('');
    setFeedback(null);
  };

  const handleEquationSubmit = () => {
    const val = parseInt(inputValue, 10);
    if (val === round.givenAngle) {
      playCorrectSFX();
      setFeedback('round_complete');
      setTimeout(() => {
        if (currentRoundIdx < ROUNDS.length - 1) {
          setCurrentRoundIdx(currentRoundIdx + 1);
          setSelectedPair([]);
          setMatchConfirmed(false);
          setInputValue('');
          setFeedback(null);
        } else {
          onStationDone(2);
        }
      }, 1400);
    } else {
      playWrongSFX();
      setFeedback('equation_error');
    }
  };

  return (
    <div className="station-container mirror-match-station">
      <div className="station-banner">
        <h3 className="station-title">Station C: Mirror Match & Solve 🪞</h3>
        <p className="station-desc">
          Step 1: Tap the vertically opposite twin of the given {round.givenAngle}° angle! Step 2: Solve for missing angle ?
        </p>
      </div>

      <div className="station-workspace">
        {/* Canvas Display */}
        <div className="station-canvas-card">
          <div className="round-badge">Round {currentRoundIdx + 1} of {ROUNDS.length}</div>
          <CrossingLinesDiagram
            angles={round.angles}
            selectedAngles={selectedPair}
            missingIndex={matchConfirmed ? round.oppositeIndex : -1}
            revealedIndices={revealedIndices}
            onSelectQuadrant={!matchConfirmed ? handleSelectQuadrant : null}
            size="large"
          />

          <div className="total-display-bar">
            {!matchConfirmed
              ? `Given Angle: ${round.givenAngle}° • Tap its opposite twin quadrant ?`
              : `Twin Matched! Type missing angle ?`}
          </div>
        </div>

        {/* Step Interactive Cards */}
        <div className="station-controls-card">
          {!matchConfirmed ? (
            <div className="step-instruction-box">
              <h4>Step 1: Find the Vertically Opposite Twin</h4>
              <p>
                Look at the given <strong>{round.givenAngle}°</strong> angle. Tap the quadrant directly opposite across the vertex!
              </p>
              {feedback === 'pair_error' && (
                <div className="feedback-banner error">
                  ⚠️ That is an adjacent angle! Tap the quadrant directly across the intersection vertex.
                </div>
              )}
            </div>
          ) : (
            <div className="step-equation-box">
              <div className="step-header-with-reset">
                <h4>Step 2: Type the Twin Angle Value</h4>
                <button type="button" className="btn-secondary-small" onClick={handleResetPair}>
                  🔄 Re-select Twin
                </button>
              </div>
              <p>Since vertically opposite angles are equal twins, what is missing angle <strong>?</strong></p>
              
              <div className="input-display-box">
                <span>Angle ? = </span>
                <strong>{inputValue || '___'}°</strong>
              </div>

              <NumberPad
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleEquationSubmit}
              />

              {feedback === 'equation_error' && (
                <div className="feedback-banner error">
                  ⚠️ Remember, vertically opposite angles are identical twins! What matches {round.givenAngle}°?
                </div>
              )}
            </div>
          )}

          {feedback === 'round_complete' && (
            <div className="feedback-banner success">
              🎉 Outstanding! Vertically Opposite Angles are Equal ({round.givenAngle}°)!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


