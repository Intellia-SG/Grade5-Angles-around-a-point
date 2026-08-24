import React, { useState, useEffect } from 'react';
import Mascot from '../shared/Mascot';
import AngleDiagram from '../shared/AngleDiagram';
import NumberPad from '../shared/NumberPad';
import { narrate, stopNarration, playCorrectSFX, playWrongSFX, playClickSFX } from '../../utils/audio';
import { wonderNarration } from '../../utils/narration';

export default function WonderPhase({ state, dispatch, onNext }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (state.audioEnabled) {
      narrate(wonderNarration());
    }
    return () => stopNarration();
  }, [state.audioEnabled]);

  const handleSubmit = () => {
    const val = parseInt(userAnswer, 10);
    if (val === 120) {
      playCorrectSFX();
      setFeedback('correct');
      setRevealed(true);
      dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
    } else {
      playWrongSFX();
      setFeedback('incorrect');
    }
  };

  return (
    <div className="phase-container wonder-phase">
      <div className="phase-header">
        <span className="phase-pill">PHASE 1 • WONDER 🤔</span>
        <h2 className="phase-title">The Paper Pinwheel Mystery</h2>
      </div>

      <div className="wonder-layout">
        {/* Visual Canvas / Pinwheel SVG */}
        <div className="wonder-visual-card">
          <h3 className="card-subtitle">John's 4-Blade Pinwheel</h3>
          <AngleDiagram
            angles={[90, 80, 70, 120]}
            missingIndex={revealed ? -1 : 3}
            size="large"
            showEquation={revealed}
          />
          <p className="diagram-caption">
            3 measured blades: <strong>90°</strong>, <strong>80°</strong>, <strong>70°</strong>. What is the 4th angle so they fit perfectly around the center point?
          </p>
        </div>

        {/* Question & Interactive Entry */}
        <div className="wonder-interactive-card">
          <Mascot
            mood={revealed ? 'celebrate' : feedback === 'incorrect' ? 'thinking' : 'happy'}
            message={
              revealed
                ? "Brilliant! 90° + 80° + 70° + 120° = 360°! ALL angles around a point always total 360°!"
                : feedback === 'incorrect'
                ? "Not quite! Add 90 + 80 + 70 = 240. What number makes 240 + ? = 360?"
                : "Can you discover the secret angle that closes the pinwheel around the center?"
            }
          />

          {!revealed ? (
            <div className="wonder-input-area">
              <div className="input-display-box">
                <span className="display-label">Fourth Blade Angle:</span>
                <span className="display-value">{userAnswer || '___'}°</span>
              </div>

              <NumberPad
                value={userAnswer}
                onChange={setUserAnswer}
                onSubmit={handleSubmit}
              />
            </div>
          ) : (
            <div className="wonder-success-box">
              <div className="secret-reveal-badge">✨ SECRET DISCOVERED! ✨</div>
              <h3 className="secret-title">Angles Around a Point = 360°</h3>
              <p className="secret-desc">
                One complete turn around a point always equals <strong>360 degrees</strong> (a full rotation)!
              </p>
              <button
                type="button"
                className="btn-primary-large"
                onClick={() => {
                  playClickSFX();
                  onNext('story');
                }}
              >
                Continue to Story 📖 →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
