import React from 'react';

const PHASES = [
  { id: 'wonder', label: 'Wonder', icon: '🤔' },
  { id: 'story', label: 'Story', icon: '📖' },
  { id: 'simulate', label: 'Simulate', icon: '🧪' },
  { id: 'play', label: 'Practice', icon: '🎯' },
  { id: 'reflect', label: 'Reflect', icon: '📓' }
];

export default function ProgressMap({ currentPhase, phaseComplete, onSelectPhase }) {
  return (
    <div className="progress-map-container">
      <div className="progress-map-steps">
        {PHASES.map((p, idx) => {
          const isActive = currentPhase === p.id;
          const isDone = phaseComplete[p.id];

          return (
            <React.Fragment key={p.id}>
              {idx > 0 && (
                <div className={`progress-connector ${isDone ? 'done' : ''}`} />
              )}
              <button
                type="button"
                className={`progress-step-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                onClick={() => onSelectPhase(p.id)}
                title={`Go to ${p.label} Phase`}
              >
                <span className="step-dot">{isDone ? '✓' : p.icon}</span>
                <span className="step-label">{p.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
