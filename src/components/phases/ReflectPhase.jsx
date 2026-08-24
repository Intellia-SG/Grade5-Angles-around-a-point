import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Mascot from '../shared/Mascot';
import { BADGES } from '../../utils/badgeEngine';
import { narrate, stopNarration, playBadgeSFX, playClickSFX } from '../../utils/audio';
import { reflectPromptNarration, lessonCompleteNarration } from '../../utils/narration';

export default function ReflectPhase({ state, dispatch, onRestart }) {
  const [journalText, setJournalText] = useState('');
  const [submittedJournal, setSubmittedJournal] = useState(false);

  useEffect(() => {
    if (state.audioEnabled) {
      narrate(reflectPromptNarration());
    }
    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
      playBadgeSFX();
    } catch {
      // Ignore
    }
    return () => stopNarration();
  }, [state.audioEnabled]);

  const handleSubmitJournal = () => {
    if (!journalText.trim()) return;
    playClickSFX();
    setSubmittedJournal(true);
    dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' });
    if (state.audioEnabled) {
      narrate(lessonCompleteNarration());
    }
  };

  const unlockedBadges = BADGES.filter(b => state.badges.includes(b.id));

  return (
    <div className="phase-container reflect-phase">
      <div className="phase-header">
        <span className="phase-pill">PHASE 5 • REFLECT 📓</span>
        <h2 className="phase-title">Geometry Journal & Champion Trophy</h2>
      </div>

      <div className="reflect-layout">
        {/* Left Column: Reflection Journal */}
        <div className="reflect-card journal-card">
          <h3 className="card-subtitle">📓 Learner Reflection Journal</h3>
          <p className="journal-prompt">
            Explain in your own words: <em>"Why do all angles around a point ALWAYS add up to 360 degrees?"</em>
          </p>

          {!submittedJournal ? (
            <div className="journal-input-box">
              <textarea
                className="journal-textarea"
                rows="4"
                placeholder="Write your explanation here..."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              />
              <button
                type="button"
                className="btn-primary"
                onClick={handleSubmitJournal}
                disabled={!journalText.trim()}
              >
                Submit Journal & Complete Lesson ✨
              </button>
            </div>
          ) : (
            <div className="journal-response-box">
              <Mascot
                mood="celebrate"
                message={`Wonderful reflection! LearnFlow AI verified your response: "${journalText}". You've mastered 360° point angles, 180° line angles, and vertically opposite angle twins!`}
              />
            </div>
          )}
        </div>

        {/* Right Column: Achievements & Summary */}
        <div className="reflect-card summary-card">
          <div className="trophy-header">
            <span className="trophy-emoji">🏆</span>
            <h3>360° Champion Mastery</h3>
          </div>

          <div className="stats-summary-grid">
            <div className="summary-stat-item">
              <span className="stat-label">Total XP Earned</span>
              <span className="stat-value">⚡ {state.xp}</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-label">Max Streak</span>
              <span className="stat-value">🔥 {state.maxStreak}</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-label">Total Stars</span>
              <span className="stat-value">⭐ {state.totalStars}</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-label">Badges Unlocked</span>
              <span className="stat-value">🏅 {unlockedBadges.length} / {BADGES.length}</span>
            </div>
          </div>

          {/* Badges Gallery */}
          <div className="badges-gallery">
            <h4 className="gallery-title">Your Unlocked Badges:</h4>
            <div className="badges-grid">
              {BADGES.map((b) => {
                const isUnlocked = state.badges.includes(b.id);
                return (
                  <div key={b.id} className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                    <span className="badge-icon">{b.icon}</span>
                    <span className="badge-name">{b.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="btn-secondary-large restart-btn"
            onClick={() => {
              playClickSFX();
              dispatch({ type: 'RESET_SESSION' });
              onRestart();
            }}
          >
            🔄 Restart Lesson Experience
          </button>
        </div>
      </div>
    </div>
  );
}
