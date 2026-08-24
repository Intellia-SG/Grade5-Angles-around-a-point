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
    triggerConfetti();
    return () => stopNarration();
  }, [state.audioEnabled]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ffc107', '#7c5cbf', '#4caf50', '#ff9800', '#ffffff']
      });
      playBadgeSFX();
    } catch {
      // Ignore
    }
  };

  const handleAddTag = (tagText) => {
    playClickSFX();
    setJournalText((prev) => (prev ? `${prev} ${tagText}` : tagText));
  };

  const handleSubmitJournal = () => {
    if (!journalText.trim()) return;
    playClickSFX();
    setSubmittedJournal(true);
    dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' });
    triggerConfetti();
    if (state.audioEnabled) {
      narrate(lessonCompleteNarration());
    }
  };

  const unlockedBadges = BADGES.filter(b => state.badges.includes(b.id));

  const promptTags = [
    { label: '🍕 Complete Circle', text: 'It forms a complete circle.' },
    { label: '🔄 Full 360° Turn', text: 'Making a full rotation is 360°.' },
    { label: '📐 Adjacent Angles', text: 'All adjacent angles around a vertex fit together.' },
    { label: '🧩 Pie Slices', text: 'Like slices of a pie fitting seamlessly without gaps.' }
  ];

  return (
    <div className="phase-container reflect-phase">
      <div className="phase-header">
        <span className="phase-pill">PHASE 5 • REFLECT 📓</span>
        <h2 className="phase-title">Geometry Journal & Champion Trophy</h2>
        <p className="phase-subtitle">Synthesize your angle mastery & claim your 360° Champion badge!</p>
      </div>

      <div className="reflect-layout">
        {/* Left Column: Reflection Journal */}
        <div className="reflect-card journal-card">
          <div className="journal-card-header">
            <div className="journal-icon-badge">📓</div>
            <div>
              <h3 className="card-subtitle">Learner Reflection Journal</h3>
              <span className="card-subtitle-tag">Mastery Synthesis</span>
            </div>
          </div>

          <div className="journal-prompt-box">
            <span className="prompt-label">Reflection Prompt</span>
            <p className="journal-prompt">
              Explain in your own words: <em>"Why do all angles around a point ALWAYS add up to 360 degrees?"</em>
            </p>
          </div>

          {!submittedJournal ? (
            <div className="journal-input-box">
              <div className="inspiration-tags-box">
                <span className="tags-label">💡 Need inspiration? Tap a phrase:</span>
                <div className="tags-chips-grid">
                  {promptTags.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="tag-chip"
                      onClick={() => handleAddTag(tag.text)}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="journal-textarea-wrapper">
                <textarea
                  className="journal-textarea"
                  rows="4"
                  placeholder="Write your explanation here... (e.g. A full turn around any single point creates a complete circle, which is 360 degrees...)"
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                />
                <div className="journal-meta-row">
                  <span className={`char-count-pill ${journalText.trim().length >= 15 ? 'good' : ''}`}>
                    {journalText.trim().length} chars {journalText.trim().length < 15 ? '(Aim for 15+)' : '✓'}
                  </span>
                  {journalText.length > 0 && (
                    <button
                      type="button"
                      className="btn-clear-text"
                      onClick={() => setJournalText('')}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <button
                type="button"
                className={`btn-primary submit-journal-btn ${journalText.trim() ? 'pulse-btn' : ''}`}
                onClick={handleSubmitJournal}
                disabled={!journalText.trim()}
              >
                Submit Journal & Complete Lesson ✨
              </button>
            </div>
          ) : (
            <div className="journal-response-box">
              <div className="certificate-badge-header">
                <span className="cert-verified-pill">VERIFIED BY LEARNFLOW AI ✨</span>
                <span className="cert-date">Lesson Complete</span>
              </div>

              <div className="student-quote-card">
                <span className="quote-mark">“</span>
                <p className="student-quote-text">{journalText}</p>
                <span className="quote-author">— 360° Geometry Scholar</span>
              </div>

              <Mascot
                mood="celebrate"
                message="Outstanding reflection! You've mastered 360° point angles, 180° line angles, and vertically opposite twin angles!"
              />

              <button
                type="button"
                className="replay-confetti-btn"
                onClick={() => {
                  playClickSFX();
                  triggerConfetti();
                }}
              >
                🎉 Replay Celebration Confetti
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Achievements & Summary */}
        <div className="reflect-card summary-card">
          <div className="trophy-header-banner">
            <div className="trophy-floating-icon">🏆</div>
            <div className="trophy-header-text">
              <span className="trophy-rank-tag">LESSON COMPLETE</span>
              <h3>360° Champion Mastery</h3>
            </div>
          </div>

          <div className="stats-summary-grid">
            <div className="stat-widget-card xp-stat">
              <div className="stat-widget-icon">⚡</div>
              <div className="stat-widget-info">
                <span className="stat-value">{state.xp}</span>
                <span className="stat-label">Total XP</span>
              </div>
            </div>

            <div className="stat-widget-card streak-stat">
              <div className="stat-widget-icon">🔥</div>
              <div className="stat-widget-info">
                <span className="stat-value">{state.maxStreak}</span>
                <span className="stat-label">Max Streak</span>
              </div>
            </div>

            <div className="stat-widget-card stars-stat">
              <div className="stat-widget-icon">⭐</div>
              <div className="stat-widget-info">
                <span className="stat-value">{state.totalStars}</span>
                <span className="stat-label">Total Stars</span>
              </div>
            </div>

            <div className="stat-widget-card badges-stat">
              <div className="stat-widget-icon">🏅</div>
              <div className="stat-widget-info">
                <span className="stat-value">{unlockedBadges.length} / {BADGES.length}</span>
                <span className="stat-label">Badges</span>
              </div>
            </div>
          </div>

          {/* Badges Gallery */}
          <div className="badges-gallery-section">
            <div className="gallery-header-row">
              <h4 className="gallery-title">Your Badge Gallery</h4>
              <span className="gallery-count-pill">{unlockedBadges.length} Unlocked</span>
            </div>
            <div className="badges-grid">
              {BADGES.map((b) => {
                const isUnlocked = state.badges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                    title={b.description}
                  >
                    <div className="badge-icon-wrap">
                      <span className="badge-icon">{b.icon}</span>
                      {!isUnlocked && <span className="lock-overlay">🔒</span>}
                    </div>
                    <div className="badge-details">
                      <span className="badge-name">{b.title}</span>
                      <span className="badge-desc">{b.description}</span>
                    </div>
                    <span className={`badge-status-tag ${isUnlocked ? 'unlocked' : 'locked'}`}>
                      {isUnlocked ? 'UNLOCKED ✨' : 'LOCKED'}
                    </span>
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
