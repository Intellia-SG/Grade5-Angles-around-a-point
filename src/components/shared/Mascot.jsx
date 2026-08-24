import React from 'react';

export default function Mascot({ mood = 'idle', message = '', onClick = null }) {
  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy': return '🤖✨';
      case 'thinking': return '🤖🤔';
      case 'celebrate': return '🤖🎉';
      case 'idle':
      default: return '🤖';
    }
  };

  const getMoodAnimation = () => {
    switch (mood) {
      case 'happy': return 'mascot-bounce';
      case 'thinking': return 'mascot-float';
      case 'celebrate': return 'mascot-spin';
      default: return 'mascot-pulse';
    }
  };

  return (
    <div
      className={`mascot-container mood-${mood} ${getMoodAnimation()}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Robot SVG / Avatar */}
      <div className="mascot-avatar">
        <svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
          {/* Head Outer */}
          <rect x="20" y="25" width="60" height="50" rx="14" fill="url(#mascotGradient)" stroke="#2563eb" strokeWidth="3" />
          {/* Antenna */}
          <line x1="50" y1="25" x2="50" y2="10" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="10" r="6" fill={mood === 'celebrate' ? '#f59e0b' : '#3b82f6'} />
          {/* Eyes */}
          {mood === 'thinking' ? (
            <>
              <circle cx="38" cy="45" r="6" fill="#1e293b" />
              <circle cx="62" cy="45" r="8" fill="#3b82f6" />
            </>
          ) : mood === 'happy' || mood === 'celebrate' ? (
            <>
              <path d="M 32 45 Q 38 38 44 45" fill="none" stroke="#1d4ed8" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 56 45 Q 62 38 68 45" fill="none" stroke="#1d4ed8" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="38" cy="45" r="6" fill="#1d4ed8" />
              <circle cx="62" cy="45" r="6" fill="#1d4ed8" />
              <circle cx="40" cy="43" r="2" fill="#ffffff" />
              <circle cx="64" cy="43" r="2" fill="#ffffff" />
            </>
          )}
          {/* Mouth */}
          {mood === 'happy' || mood === 'celebrate' ? (
            <path d="M 38 60 Q 50 72 62 60" fill="none" stroke="#1d4ed8" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <line x1="40" y1="62" x2="60" y2="62" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
          )}
          {/* Cheeks */}
          <circle cx="28" cy="54" r="4" fill="#f43f5e" opacity="0.4" />
          <circle cx="72" cy="54" r="4" fill="#f43f5e" opacity="0.4" />
          {/* Gradient Defs */}
          <defs>
            <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eff6ff" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className="mascot-speech-bubble">
          <div className="mascot-badge">{getMoodEmoji()} Intellia AI</div>
          <p className="mascot-text">{message}</p>
        </div>
      )}
    </div>
  );
}
