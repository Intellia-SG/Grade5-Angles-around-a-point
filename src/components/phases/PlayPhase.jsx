import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import QuestionRenderer from '../quiz/QuestionRenderer';
import HintOverlay from '../quiz/HintOverlay';
import Mascot from '../shared/Mascot';
import { playCorrectSFX, playWrongSFX, playClickSFX } from '../../utils/audio';

export default function PlayPhase({ state, dispatch, onNext }) {
  const currentQIndex = state.currentQuestion || 0;
  const questionSet = state.questionSet || [];
  const currentQ = questionSet[currentQIndex] || questionSet[0];

  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [showHint, setShowHint] = useState(false);

  if (!currentQ) {
    return (
      <div className="phase-container play-phase">
        <div className="loading-box">Loading IntelliPlay Question Bank...</div>
      </div>
    );
  }

  const currentWorldIndex = Math.floor(currentQIndex / 10);
  const questionInWorldIndex = (currentQIndex % 10) + 1;

  const handleSubmit = () => {
    if (!userAnswer) return;

    const isCorrect =
      userAnswer.toString().trim().toLowerCase() ===
      currentQ.correctAnswer.toString().trim().toLowerCase();

    if (isCorrect) {
      playCorrectSFX();
      setFeedback('correct');
      dispatch({ type: 'ANSWER_CORRECT' });

      // Trigger confetti on correct answers or streak milestones
      if (state.streak >= 2 || currentQIndex % 10 === 9) {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
          // Ignore
        }
      }

      setTimeout(() => {
        setUserAnswer('');
        setFeedback(null);
        setShowHint(false);
        if (currentQIndex + 1 < questionSet.length) {
          dispatch({ type: 'NEXT_QUESTION' });
        } else {
          dispatch({ type: 'COMPLETE_PHASE', payload: 'play' });
          onNext('reflect');
        }
      }, 1200);
    } else {
      playWrongSFX();
      setFeedback('incorrect');
      dispatch({ type: 'ANSWER_INCORRECT' });
    }
  };

  const handleToggleHint = () => {
    playClickSFX();
    dispatch({ type: 'USE_HINT' });
    setShowHint(!showHint);
  };

  return (
    <div className="phase-container play-phase">
      <div className="phase-header">
        <span className="phase-pill">PHASE 4 • PRACTICE 🎯</span>
        <h2 className="phase-title">IntelliPractice Angle Challenge</h2>
      </div>

      {/* Header Gamification Bar */}
      <div className="play-header-bar">
        <div className="world-badge">
          🌐 World {currentWorldIndex + 1}: Question {questionInWorldIndex}/10
        </div>

        <div className="stat-pill xp-pill">
          ⚡ <strong>{state.xp}</strong> XP
        </div>

        <div className="stat-pill streak-pill">
          🔥 <strong>{state.streak}</strong> Streak
        </div>

        <div className="stat-pill stars-pill">
          ⭐ <strong>{state.totalStars}</strong> Stars
        </div>
      </div>

      {/* Main Play Grid */}
      <div className="play-layout">
        {/* Left Column: Mascot & Hints */}
        <div className="play-sidebar">
          <Mascot
            mood={
              feedback === 'correct'
                ? 'celebrate'
                : feedback === 'incorrect'
                ? 'thinking'
                : 'happy'
            }
            message={
              feedback === 'correct'
                ? "Bingo! That's the correct angle!"
                : feedback === 'incorrect'
                ? "Not quite! Tap 'Use Hint' for a breakdown!"
                : `World ${currentWorldIndex + 1} • Question ${currentQIndex + 1} of ${questionSet.length}`
            }
          />

          <button
            type="button"
            className="hint-trigger-btn"
            onClick={handleToggleHint}
          >
            💡 {showHint ? 'Hide Hint' : 'Use Hint'}
          </button>

          {showHint && (
            <HintOverlay
              question={currentQ}
              attemptCount={state.attemptCount}
              hintsUsed={state.hintsUsed}
              onClose={() => setShowHint(false)}
            />
          )}
        </div>

        {/* Right Column: Question Renderer */}
        <div className="play-main-card">
          <QuestionRenderer
            question={currentQ}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            onSubmit={handleSubmit}
            disabled={feedback === 'correct'}
          />

          {feedback === 'correct' && (
            <div className="feedback-banner success">
              🎉 Correct! Great geometry reasoning!
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="feedback-banner error">
              ❌ Keep trying! Check the degree rules or use a hint!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
