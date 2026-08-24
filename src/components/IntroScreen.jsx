import React from 'react';
import { playClickSFX, narrate } from '../utils/audio';
import { homeWelcomeNarration } from '../utils/narration';

const PHASES = [
  { id: 'wonder', title: 'Wonder', icon: '🤔', desc: 'A math mystery!' },
  { id: 'story', title: 'Story', icon: '📖', desc: 'The pizza & road count' },
  { id: 'simulate', title: 'Simulate', icon: '🧪', desc: '3 Station Sandbox' },
  { id: 'play', title: 'Practice', icon: '🎯', desc: '100 challenges' },
  { id: 'reflect', title: 'Reflect', icon: '📓', desc: 'Quiz & review' }
];

export default function IntroScreen({ state, onStart }) {
  const handleBannerClick = () => {
    playClickSFX();
    if (state.audioEnabled) {
      narrate(homeWelcomeNarration());
    }
  };

  return (
    <div className="home-screen-wrapper">
      {/* Grade Pill Badge */}
      <div className="grade-badge-pill">
        ✨ Grade 5 Math
      </div>

      {/* Main Big Glowing Title */}
      <h1 className="home-main-title">Angles Around a Point</h1>

      {/* Subtitle Text */}
      <h3 className="home-subtitle-text">
        Full Turns, Straight Lines & Opposite Angles!
      </h3>

      {/* Centered Intro Banner Card */}
      <div
        className="home-intro-banner-card clickable-banner"
        onClick={handleBannerClick}
        style={{ cursor: 'pointer' }}
        title="Click to hear welcome audio!"
      >
        <p className="home-banner-text">
          Let's master full turns (360°), straight lines (180°), and vertically opposite angle twins! 🧭
        </p>
      </div>

      {/* 5 Phase Cards Grid */}
      <div className="home-phase-cards-grid">
        {PHASES.map((p) => {
          const isDone = state.phaseComplete[p.id];
          return (
            <div
              key={p.id}
              className={`home-phase-card ${isDone ? 'done' : ''}`}
              onClick={() => {
                playClickSFX();
                onStart(p.id);
              }}
            >
              <div className="home-card-icon">{p.icon}</div>
              <h4 className="home-card-title">{p.title}</h4>
              <p className="home-card-desc">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Big Hero CTA Button */}
      <button
        type="button"
        className="home-start-hero-btn"
        onClick={() => {
          playClickSFX();
          onStart('wonder');
        }}
      >
        🚀 Begin Your Journey!
      </button>

      {/* Bottom Feature Badges */}
      <div className="home-feature-badges-row">
        <div className="home-feature-pill">🎯 100 Questions</div>
        <div className="home-feature-pill">🧭 Angles Around a Point</div>
        <div className="home-feature-pill">🏆 Badges & XP</div>
      </div>
    </div>
  );
}

