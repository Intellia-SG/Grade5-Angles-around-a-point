import React from 'react';

export default function ExitModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-icon">🧭</span>
          <h3 className="modal-title">Return to Overview?</h3>
        </div>
        <p className="modal-body">
          Your current progress and XP will be saved. Are you sure you want to return to the Intro Overview screen?
        </p>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Continue Lesson
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            Yes, Exit to Intro
          </button>
        </div>
      </div>
    </div>
  );
}
