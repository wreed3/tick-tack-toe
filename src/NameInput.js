import React, { useState } from 'react';
import './NameInput.css';

function NameInput({ onStart }) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [error, setError] = useState('');

  const sanitizeName = (name) => {
    // Remove any HTML tags and special characters that could be used for XSS
    return name.replace(/[<>'"&]/g, '').trim();
  };

  const normalizeName = (name) => {
    // Normalize names to lowercase for consistent storage and comparison
    return sanitizeName(name).toLowerCase();
  };

  const handleStart = (e) => {
    e.preventDefault();
    
    // Validate names
    if (!player1Name.trim()) {
      setError('Please enter Player 1 name');
      return;
    }
    if (!player2Name.trim()) {
      setError('Please enter Player 2 name');
      return;
    }
    if (normalizeName(player1Name) === normalizeName(player2Name)) {
      setError('Players must have different names');
      return;
    }

    onStart(sanitizeName(player1Name), sanitizeName(player2Name));
  };

  const handlePlayer1Blur = (e) => {
    setPlayer1Name(e.target.value.trim());
  };

  const handlePlayer2Blur = (e) => {
    setPlayer2Name(e.target.value.trim());
  };

  return (
    <div className="name-input-container">
      <div className="name-input-card">
        <h1>🎮 Tic-Tac-Toe 3D</h1>
        <p className="subtitle">Enter player names to begin</p>
        
        <form onSubmit={handleStart}>
          <div className="input-group">
            <label htmlFor="player1">Player 1 (X)</label>
            <input
              id="player1"
              type="text"
              value={player1Name}
              onChange={(e) => {
                setPlayer1Name(e.target.value);
                setError('');
              }}
              onBlur={handlePlayer1Blur}
              placeholder="Enter name..."
              maxLength={20}
              autoFocus
              aria-invalid={error && !player1Name.trim() ? 'true' : 'false'}
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>

          <div className="input-group">
            <label htmlFor="player2">Player 2 (O)</label>
            <input
              id="player2"
              type="text"
              value={player2Name}
              onChange={(e) => {
                setPlayer2Name(e.target.value);
                setError('');
              }}
              onBlur={handlePlayer2Blur}
              placeholder="Enter name..."
              maxLength={20}
              aria-invalid={error && !player2Name.trim() ? 'true' : 'false'}
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>

          {error && (
            <div 
              id="error-message" 
              className="error-message" 
              role="alert" 
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <button type="submit" className="start-button">
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default NameInput;