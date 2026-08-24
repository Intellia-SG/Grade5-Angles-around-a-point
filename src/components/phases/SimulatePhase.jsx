import React, { useState, useEffect } from 'react';
import SpinCircleStation from '../simulations/SpinCircleStation';
import BalanceLineStation from '../simulations/BalanceLineStation';
import MirrorMatchStation from '../simulations/MirrorMatchStation';
import Mascot from '../shared/Mascot';
import { narrate, stopNarration, playClickSFX } from '../../utils/audio';
import { stationAIntroNarration, stationBIntroNarration, stationCIntroNarration } from '../../utils/narration';

export default function SimulatePhase({ state, dispatch, onNext }) {
  const currentStationIdx = state.currentSimStation || 0;
  const stationsDone = state.simStationsComplete || [false, false, false];

  useEffect(() => {
    if (state.audioEnabled) {
      if (currentStationIdx === 0) narrate(stationAIntroNarration());
      else if (currentStationIdx === 1) narrate(stationBIntroNarration());
      else if (currentStationIdx === 2) narrate(stationCIntroNarration());
    }
    return () => stopNarration();
  }, [currentStationIdx, state.audioEnabled]);

  const handleSelectStation = (idx) => {
    playClickSFX();
    dispatch({ type: 'SET_SIM_STATION', payload: idx });
  };

  const handleStationDone = (stationIdx) => {
    dispatch({ type: 'COMPLETE_SIM_STATION', payload: stationIdx });
    if (stationIdx < 2) {
      dispatch({ type: 'SET_SIM_STATION', payload: stationIdx + 1 });
    }
  };

  const allComplete = stationsDone.every(Boolean);

  return (
    <div className="phase-container simulate-phase">
      <div className="phase-header">
        <span className="phase-pill">PHASE 3 • SIMULATE 🧪</span>
        <h2 className="phase-title">Interactive Angle Lab</h2>
      </div>

      {/* Station Tabs Bar */}
      <div className="station-tabs-bar">
        {[
          { id: 0, title: 'Station A: Spin 360°', icon: '⭕' },
          { id: 1, title: 'Station B: Balance 180°', icon: '📏' },
          { id: 2, title: 'Station C: Mirror Match', icon: '🪞' }
        ].map((st) => (
          <button
            key={st.id}
            type="button"
            className={`station-tab-btn ${currentStationIdx === st.id ? 'active' : ''} ${stationsDone[st.id] ? 'done' : ''}`}
            onClick={() => handleSelectStation(st.id)}
          >
            <span className="tab-icon">{stationsDone[st.id] ? '✓' : st.icon}</span>
            <span className="tab-label">{st.title}</span>
          </button>
        ))}
      </div>

      {/* Active Station Canvas */}
      <div className="station-viewport">
        {currentStationIdx === 0 && (
          <SpinCircleStation onStationDone={handleStationDone} />
        )}
        {currentStationIdx === 1 && (
          <BalanceLineStation onStationDone={handleStationDone} />
        )}
        {currentStationIdx === 2 && (
          <MirrorMatchStation onStationDone={handleStationDone} />
        )}
      </div>

      {/* Completion CTA Bar when all 3 stations are completed */}
      {allComplete && (
        <div className="simulation-complete-banner">
          <Mascot mood="celebrate" message="Circle Builder Badge Unlocked! All 3 Simulation Stations Complete!" />
          <button
            type="button"
            className="btn-primary-large"
            onClick={() => {
              playClickSFX();
              onNext('play');
            }}
          >
            Enter Practice Challenge 🎯 →
          </button>
        </div>
      )}
    </div>
  );
}
