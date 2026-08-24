import React from 'react';
import { playClickSFX } from '../../utils/audio';

export default function WedgeTray({
  availableWedges = [60, 90, 120, 150, 45, 75, 105],
  selectedWedge = null,
  onSelectWedge
}) {
  return (
    <div className="wedge-tray-container">
      <h4 className="tray-title">🧩 Select Angle Wedge Slices:</h4>
      <div className="wedge-chips-grid">
        {availableWedges.map((deg, idx) => {
          const isSelected = selectedWedge === deg;
          return (
            <button
              key={`${deg}-${idx}`}
              type="button"
              className={`wedge-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                playClickSFX();
                onSelectWedge(deg);
              }}
            >
              <span className="wedge-icon">📐</span>
              <span className="wedge-label">{deg}°</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
