import React, { useState } from 'react';
import './App.css';
import { calculateWinner } from './game';

function Square({ value, onClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
    >
      {value && <span className="square-content">{value}</span>}
    </button>
  );
}

function Board({ squares, onClick, winningSquares }) {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningSquares && winningSquares.includes(i)}
      />
    );
  };

  return (
    <div className="board">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? '🎃' : '👻';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningSquares = winnerInfo ? winnerInfo.line : null;

  let status;
  let statusClass = '';
  
  if (winner) {
    const winnerName = winner === '🎃' ? 'Pumpkin' : 'Ghost';
    status = `👑 ${winnerName} Wins! 👑`;
    statusClass = 'winner';
  } else if (squares.every(square => square !== null)) {
    status = '🦇 Draw! Try Again! 🦇';
  } else {
    const nextPlayer = xIsNext ? '🎃 Pumpkin' : '👻 Ghost';
    status = `Next player: ${nextPlayer}`;
  }

  return (
    <div className="App">
      {/* Floating bats for atmosphere */}
      <div className="bat" style={{ top: '10%' }}>🦇</div>
      <div className="bat" style={{ top: '30%' }}>🦇</div>
      <div className="bat" style={{ top: '50%' }}>🦇</div>
      <div className="bat" style={{ top: '70%' }}>🦇</div>
      <div className="bat" style={{ top: '90%' }}>🦇</div>

      <div className="game-container">
        <h1>🎃 Spooky Showdown 👻</h1>
        <div className={`status ${statusClass}`}>{status}</div>
        <Board 
          squares={squares} 
          onClick={handleClick}
          winningSquares={winningSquares}
        />
        <button className="reset-button" onClick={handleReset}>
          🎃 New Game 👻
        </button>
      </div>
    </div>
  );
}

export default App;