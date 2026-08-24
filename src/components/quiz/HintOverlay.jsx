import React from 'react';

export default function HintOverlay({ question, attemptCount, hintsUsed, onClose }) {
  if (attemptCount === 0) return null;

  return (
    <div className="hint-overlay-card">
      <div className="hint-header">
        <span className="hint-badge">💡 HINT & EXPLANATION</span>
        <button type="button" className="close-hint-btn" onClick={onClose}>✕</button>
      </div>

      {attemptCount >= 1 && (
        <div className="hint-box tier-1">
          <strong>Hint 1:</strong> {question.hint1}
        </div>
      )}

      {attemptCount >= 2 && (
        <div className="hint-box tier-2">
          <strong>Hint 2 (Step-by-step):</strong> {question.hint2}
        </div>
      )}

      {attemptCount >= 3 && (
        <div className="hint-box tier-3 full-solution">
          <strong>Complete Solution:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
}
