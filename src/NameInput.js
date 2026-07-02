import React, { useState } from 'react';
import './NameInput.css';

function NameInput({ onStart }) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [error, setError] = useState('');

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
    if (player1Name.trim().toLowerCase() === player2Name.trim().toLowerCase()) {
      setError('Players must have different names');
      return;
    }

    onStart(player1Name.trim(), player2Name.trim());
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
              placeholder="Enter name..."
              maxLength={20}
              autoFocus
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
              placeholder="Enter name..."
              maxLength={20}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="start-button">
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default NameInput;