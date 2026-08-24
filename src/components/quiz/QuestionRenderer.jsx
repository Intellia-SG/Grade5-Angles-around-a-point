import React from 'react';
import AngleDiagram from '../shared/AngleDiagram';
import LineDiagram from '../shared/LineDiagram';
import CrossingLinesDiagram from '../shared/CrossingLinesDiagram';
import NumberPad from '../shared/NumberPad';
import { generateDistractors } from '../../utils/scoring';
import { playClickSFX } from '../../utils/audio';

export default function QuestionRenderer({
  question,
  userAnswer,
  setUserAnswer,
  onSubmit,
  disabled = false
}) {
  if (!question) return null;

  const options = question.options || generateDistractors(question.correctAnswer);

  const renderVisual = () => {
    switch (question.visual) {
      case 'pointDiagram':
        return (
          <AngleDiagram
            angles={[...question.knownAngles, question.missingAngle]}
            missingIndex={question.knownAngles.length}
            size="large"
            showEquation={false}
          />
        );
      case 'lineDiagram':
        return (
          <LineDiagram
            angles={[...question.knownAngles, question.missingAngle]}
            missingIndex={question.knownAngles.length}
            size="large"
            showEquation={false}
          />
        );
      case 'crossLines':
        return (
          <CrossingLinesDiagram
            angles={[question.knownAngles[0] || 55, 125, question.missingAngle || 55, 125]}
            missingIndex={2}
            size="large"
          />
        );
      case 'picture':
        return (
          <div className="picture-card-wrapper">
            <span className="picture-emoji">
              {question.objectName === 'pizza' ? '🍕' : question.objectName === 'fan' ? '🌀' : '🛣️'}
            </span>
            <div className="picture-tag">{question.characterName || 'Story'}'s {question.objectName || 'Scenario'}</div>
          </div>
        );
      case 'sentence':
      default:
        return (
          <div className="sentence-visual-box">
            <span>{question.knownAngles ? question.knownAngles.join('° + ') + '° + ? = ' + question.totalRule + '°' : '∠x + ∠y = total'}</span>
          </div>
        );
    }
  };

  const handleSelectOption = (opt) => {
    if (disabled) return;
    playClickSFX();
    setUserAnswer(opt.toString());
  };

  return (
    <div className="question-renderer-container">
      {/* Question Header & Text */}
      <div className="question-text-box">
        <h3 className="question-prompt">{question.questionText}</h3>
      </div>

      {/* Visual Canvas */}
      <div className="question-visual-container">{renderVisual()}</div>

      {/* Answer Options Grid or NumberPad */}
      <div className="question-answer-section">
        {options && options.length > 0 ? (
          <div className="mcq-options-grid">
            {options.map((opt, idx) => {
              const isSelected = userAnswer === opt.toString();
              return (
                <button
                  key={idx}
                  type="button"
                  className={`mcq-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(opt)}
                  disabled={disabled}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                  <span className="option-value">{opt}{typeof opt === 'number' ? '°' : ''}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="digit-input-container">
            <div className="input-display-box">
              <span>Answer: </span>
              <strong>{userAnswer || '___'}°</strong>
            </div>
            <NumberPad
              value={userAnswer}
              onChange={setUserAnswer}
              onSubmit={onSubmit}
              disabled={disabled}
            />
          </div>
        )}

        {options && options.length > 0 && (
          <button
            type="button"
            className="btn-primary-large submit-answer-btn"
            onClick={onSubmit}
            disabled={disabled || !userAnswer}
          >
            Submit Answer ✨
          </button>
        )}
      </div>
    </div>
  );
}
