import React, { useState } from 'react';
import './App.css';
import { calculateWinner } from './game';

function Square({ value, onClick, isWinning }) {
  const getEmoji = (val) => {
    if (val === 'X') return '🎃';
    if (val === 'O') return '👻';
    return '';
  };

  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
    >
      {value && <span className="piece">{getEmoji(value)}</span>}
    </button>
  );
}

function Board({ squares, onClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          isWinning={winningLine && winningLine.includes(i)}
        />
      ))}
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : null;

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatus = () => {
    if (winner) {
      const emoji = winner === 'X' ? '🎃' : '👻';
      const name = winner === 'X' ? 'Pumpkin' : 'Ghost';
      return `${emoji} ${name} Wins! ${emoji}`;
    } else if (squares.every(square => square !== null)) {
      return "👻 It's a Spooky Draw! 🎃";
    } else {
      const emoji = xIsNext ? '🎃' : '👻';
      const name = xIsNext ? 'Pumpkin' : 'Ghost';
      return `${name}'s Turn ${emoji}`;
    }
  };

  return (
    <div className="App">
      <h1 className="game-title">SPOOKY SHOWDOWN</h1>
      <p className="game-subtitle">🕷️ Halloween Tic-Tac-Toe 🕷️</p>
      
      <div className="player-indicator">
        <div className={`player ${xIsNext && !winner ? 'active' : ''}`}>
          <span className="player-icon">🎃</span>
          <span className="player-label">Pumpkin</span>
        </div>
        <div className={`player ${!xIsNext && !winner ? 'active' : ''}`}>
          <span className="player-icon">👻</span>
          <span className="player-label">Ghost</span>
        </div>
      </div>

      <div className={`status ${winner ? 'winner' : ''}`}>
        {getStatus()}
      </div>

      <Board
        squares={squares}
        onClick={handleClick}
        winningLine={winningLine}
      />

      <div className="controls">
        <button className="restart-button" onClick={handleRestart}>
          🎃 New Game 👻
        </button>
      </div>
    </div>
  );
}

export default App;