import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import FloatingNumbers from './components/FloatingNumbers';
import IntroScreen from './components/IntroScreen';
import WonderPhase from './components/phases/WonderPhase';
import StoryPhase from './components/phases/StoryPhase';
import SimulatePhase from './components/phases/SimulatePhase';
import PlayPhase from './components/phases/PlayPhase';
import ReflectPhase from './components/phases/ReflectPhase';
import ExitModal from './components/shared/ExitModal';
import { playClickSFX, stopNarration } from './utils/audio';

export default function App() {
  const { state, dispatch } = useGameState();
  const [showExitModal, setShowExitModal] = useState(false);

  const handleNextPhase = (nextPhase) => {
    playClickSFX();
    stopNarration();
    dispatch({ type: 'SET_PHASE', payload: nextPhase });
  };

  const handleHomeClick = () => {
    playClickSFX();
    if (state.phase !== 'intro') {
      setShowExitModal(true);
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    stopNarration();
    handleNextPhase('intro');
  };

  const phases = [
    { id: 'wonder', label: 'Wonder', icon: '🤔' },
    { id: 'story', label: 'Story', icon: '📖' },
    { id: 'simulate', label: 'Simulate', icon: '🧪' },
    { id: 'play', label: 'Practice', icon: '🎯' },
    { id: 'reflect', label: 'Reflect', icon: '📓' }
  ];

  return (
    <div className="app-container">
      {/* Floating Animated Background Symbols */}
      <FloatingNumbers />

      {/* Top Left Home Button (Shown only in sub-phases) */}
      {state.phase !== 'intro' && (
        <button
          type="button"
          className="home-btn"
          onClick={handleHomeClick}
          title="Return to Intro Screen"
        >
          🏠
        </button>
      )}

      {/* Right-Center Circular Sound Toggle Button */}
      <button
        type="button"
        className="audio-toggle-btn"
        onClick={() => {
          playClickSFX();
          if (state.audioEnabled) {
            stopNarration();
          }
          dispatch({ type: 'TOGGLE_AUDIO' });
        }}
        title={state.audioEnabled ? 'Audio Enabled' : 'Audio Muted'}
      >
        {state.audioEnabled ? '🔊' : '🔇'}
      </button>

      {/* Top-Center Floating Journey Stepper Bar (Shown in sub-phases) */}
      {state.phase !== 'intro' && (
        <div className="journey-bar">
          {phases.map((p, idx) => {
            const isActive = state.phase === p.id;
            return (
              <React.Fragment key={p.id}>
                {idx > 0 && <div className="journey-connector" />}
                <button
                  type="button"
                  className={`journey-step ${isActive ? 'active' : ''}`}
                  onClick={() => handleNextPhase(p.id)}
                >
                  <span className="journey-step-icon">{p.icon}</span>
                  <span className="journey-step-label">{p.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Main Viewport Content */}
      <div className="phase-viewport">
        {state.phase === 'intro' && (
          <IntroScreen state={state} onStart={handleNextPhase} />
        )}
        {state.phase === 'wonder' && (
          <WonderPhase state={state} dispatch={dispatch} onNext={handleNextPhase} />
        )}
        {state.phase === 'story' && (
          <StoryPhase state={state} dispatch={dispatch} onNext={handleNextPhase} />
        )}
        {state.phase === 'simulate' && (
          <SimulatePhase state={state} dispatch={dispatch} onNext={handleNextPhase} />
        )}
        {state.phase === 'play' && (
          <PlayPhase state={state} dispatch={dispatch} onNext={handleNextPhase} />
        )}
        {state.phase === 'reflect' && (
          <ReflectPhase
            state={state}
            dispatch={dispatch}
            onRestart={() => handleNextPhase('intro')}
          />
        )}
      </div>

      {/* Exit Modal */}
      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
      />
    </div>
  );
}
