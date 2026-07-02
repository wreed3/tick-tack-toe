import React, { useState } from 'react';
import './NameInput.css';

function NameInput({ onStart }) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [error, setError] = useState('');

  const sanitizeName = (name) => {
    // Whitelist approach: only allow alphanumeric characters and spaces
    return name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  };

  const normalizeName = (name) => {
    // Normalize names to lowercase for comparison only
    return name.toLowerCase().trim();
  };

  const handleStart = (e) => {
    e.preventDefault();
    
    const sanitized1 = sanitizeName(player1Name);
    const sanitized2 = sanitizeName(player2Name);
    
    // Validate names
    if (!sanitized1) {
      setError('Please enter Player 1 name');
      return;
    }
    if (!sanitized2) {
      setError('Please enter Player 2 name');
      return;
    }
    
    // Validate length (enforce maxLength even if bypassed)
    if (sanitized1.length > 20) {
      setError('Player 1 name must be 20 characters or less');
      return;
    }
    if (sanitized2.length > 20) {
      setError('Player 2 name must be 20 characters or less');
      return;
    }
    
    // Case-insensitive comparison without modifying stored values
    if (normalizeName(sanitized1) === normalizeName(sanitized2)) {
      setError('Players must have different names');
      return;
    }

    onStart(sanitized1, sanitized2);
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