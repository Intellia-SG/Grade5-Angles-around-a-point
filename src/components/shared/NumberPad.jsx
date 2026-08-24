import React from 'react';
import { playClickSFX } from '../../utils/audio';

export default function NumberPad({ value = '', onChange, onSubmit, disabled = false }) {
  const handleDigit = (digit) => {
    if (disabled) return;
    playClickSFX();
    if (value.length < 4) {
      onChange(value + digit);
    }
  };

  const handleBackspace = () => {
    if (disabled) return;
    playClickSFX();
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    if (disabled) return;
    playClickSFX();
    onChange('');
  };

  const handleSubmit = () => {
    if (disabled || !value) return;
    playClickSFX();
    onSubmit();
  };

  return (
    <div className="numberpad-container">
      <div className="numberpad-grid">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button
            key={num}
            type="button"
            className="num-btn"
            onClick={() => handleDigit(num)}
            disabled={disabled}
          >
            {num}
          </button>
        ))}
        <button
          type="button"
          className="num-btn action-btn clear-btn"
          onClick={handleClear}
          disabled={disabled || !value}
        >
          C
        </button>
        <button
          type="button"
          className="num-btn"
          onClick={() => handleDigit('0')}
          disabled={disabled}
        >
          0
        </button>
        <button
          type="button"
          className="num-btn action-btn backspace-btn"
          onClick={handleBackspace}
          disabled={disabled || !value}
        >
          ⌫
        </button>
      </div>
      {onSubmit && (
        <button
          type="button"
          className="numberpad-submit-btn"
          onClick={handleSubmit}
          disabled={disabled || !value}
        >
          Submit Answer ✨
        </button>
      )}
    </div>
  );
}
