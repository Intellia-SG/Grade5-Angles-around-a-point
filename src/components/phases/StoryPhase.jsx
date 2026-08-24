import React, { useState, useEffect } from 'react';
import Mascot from '../shared/Mascot';
import AngleDiagram from '../shared/AngleDiagram';
import LineDiagram from '../shared/LineDiagram';
import CrossingLinesDiagram from '../shared/CrossingLinesDiagram';
import { STORY_PANELS } from '../../data/storyContent';
import { narrate, stopNarration, playClickSFX } from '../../utils/audio';
import { storyNarration } from '../../utils/narration';

export default function StoryPhase({ state, dispatch, onNext }) {
  const currentPanelIdx = state.storyPanel || 0;
  const panel = STORY_PANELS[currentPanelIdx] || STORY_PANELS[0];

  const [panelImages, setPanelImages] = useState({});
  const [viewMode, setViewMode] = useState('image'); // 'image' | 'diagram'
  const [urlInput, setUrlInput] = useState('');
  const [showUrlForm, setShowUrlForm] = useState(false);

  const currentImage = panelImages[panel.id] || panel.image || '';

  useEffect(() => {
    if (state.audioEnabled) {
      narrate(storyNarration(currentPanelIdx));
    }
    if (currentImage) {
      setViewMode('image');
    }
    return () => stopNarration();
  }, [state.audioEnabled, currentPanelIdx, currentImage]);

  const handleNextPanel = () => {
    playClickSFX();
    if (currentPanelIdx < STORY_PANELS.length - 1) {
      dispatch({ type: 'NEXT_STORY_PANEL' });
    } else {
      dispatch({ type: 'COMPLETE_PHASE', payload: 'story' });
      onNext('simulate');
    }
  };

  const handlePrevPanel = () => {
    playClickSFX();
    dispatch({ type: 'PREV_STORY_PANEL' });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPanelImages(prev => ({ ...prev, [panel.id]: imageUrl }));
      setViewMode('image');
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setPanelImages(prev => ({ ...prev, [panel.id]: urlInput.trim() }));
      setUrlInput('');
      setShowUrlForm(false);
      setViewMode('image');
    }
  };

  const handleRemoveImage = () => {
    setPanelImages(prev => ({ ...prev, [panel.id]: '' }));
  };

  const renderPanelVisual = () => {
    switch (panel.visualType) {
      case 'pizza':
      case 'circle-turn':
      case 'missing-slice':
        return (
          <AngleDiagram
            angles={panel.angles}
            missingIndex={panel.missingIndex !== undefined ? panel.missingIndex : -1}
            size="large"
          />
        );
      case 'straight-line':
        return <LineDiagram angles={panel.angles} size="large" />;
      case 'crossing-lines':
        return <CrossingLinesDiagram angles={panel.angles} size="large" />;
      case 'summary':
      default:
        return (
          <div className="summary-badge-container">
            <div className="summary-fact-pill">⭕ Point = 360°</div>
            <div className="summary-fact-pill">📏 Line = 180°</div>
            <div className="summary-fact-pill">🪞 Opposite = Equal</div>
          </div>
        );
    }
  };

  return (
    <div className="phase-container story-phase">
      <div className="phase-header">
        <span className="phase-pill">PHASE 2 • STORY 📖</span>
        <h2 className="phase-title">{panel.title}</h2>
      </div>

      <div className="story-layout">
        {/* Visual Story Card */}
        <div className="story-visual-card">
          <div className="story-visual-header">
            <div className="rule-tag-header">{panel.ruleTag}</div>
            
            {/* View Mode Toggle Switch */}
            <div className="visual-mode-toggle">
              <button
                type="button"
                className={`mode-toggle-btn ${viewMode === 'diagram' ? 'active' : ''}`}
                onClick={() => { playClickSFX(); setViewMode('diagram'); }}
              >
                📐 Diagram
              </button>
              <button
                type="button"
                className={`mode-toggle-btn ${viewMode === 'image' ? 'active' : ''} ${currentImage ? 'has-img' : ''}`}
                onClick={() => { playClickSFX(); setViewMode('image'); }}
              >
                🖼️ Story Image {currentImage ? '✓' : ''}
              </button>
            </div>
          </div>

          {/* Main Visual Display Area */}
          <div className="story-visual-canvas">
            {viewMode === 'diagram' ? (
              renderPanelVisual()
            ) : (
              <div className="story-image-space-container">
                {currentImage ? (
                  <div className="story-image-wrapper">
                    <img src={currentImage} alt={panel.title} className="story-panel-image" />
                    <div className="story-image-actions">
                      <label htmlFor={`change-img-${panel.id}`} className="btn-action-small">
                        📁 Change File
                      </label>
                      <input
                        type="file"
                        id={`change-img-${panel.id}`}
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        className="btn-action-small danger"
                        onClick={handleRemoveImage}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="story-image-placeholder">
                    <span className="placeholder-icon">🖼️</span>
                    <h4 className="placeholder-title">Story Scene Image Space</h4>
                    <p className="placeholder-desc">
                      Add a custom illustration for this panel (upload file, paste URL, or set <code>image</code> in <code>storyContent.js</code>)
                    </p>

                    <div className="image-upload-controls">
                      <label htmlFor={`upload-img-${panel.id}`} className="btn-secondary-small">
                        📁 Upload Image File
                      </label>
                      <input
                        type="file"
                        id={`upload-img-${panel.id}`}
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      
                      <button
                        type="button"
                        className="btn-secondary-small"
                        onClick={() => setShowUrlForm(!showUrlForm)}
                      >
                        🔗 {showUrlForm ? 'Cancel' : 'Paste Image Link'}
                      </button>
                    </div>

                    {showUrlForm && (
                      <form onSubmit={handleUrlSubmit} className="image-url-form">
                        <input
                          type="text"
                          className="image-url-input"
                          placeholder="e.g. /images/pizza.png or https://..."
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                        />
                        <button type="submit" className="btn-primary-small">
                          Set Image
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="story-equation-bar">{panel.equationText}</div>
        </div>

        {/* Narrative Card */}
        <div className="story-text-card">
          <Mascot mood="happy" message={panel.highlightText} />

          <div className="story-body">
            <p className="story-paragraph">{panel.text}</p>
          </div>

          {/* Quick Image Indicator / Add Button in Narrative Card */}
          <div className="narrative-image-status">
            <span className="status-label">Scene Visual:</span>
            <button
              type="button"
              className="status-badge-btn"
              onClick={() => { playClickSFX(); setViewMode('image'); }}
            >
              🖼️ {currentImage ? 'Custom Image Attached' : '+ Add Scene Image'}
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="story-controls">
            <button
              type="button"
              className="btn-secondary"
              onClick={handlePrevPanel}
              disabled={currentPanelIdx === 0}
            >
              ← Back
            </button>

            <span className="panel-indicator">
              Panel {currentPanelIdx + 1} of {STORY_PANELS.length}
            </span>

            <button type="button" className="btn-primary" onClick={handleNextPanel}>
              {currentPanelIdx === STORY_PANELS.length - 1 ? 'Go to Simulation 🧪' : 'Next Panel →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

