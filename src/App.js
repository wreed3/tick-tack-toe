import React, { useState } from 'react';
import './App.css';
import { calculateWinner, isBoardFull } from './game';

function Square({ value, onClick, isWinning, isAnimating }) {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''} ${isAnimating ? 'pop-in' : ''}`}
      onClick={onClick}
    >
      {value && <span className={`mark mark-${value.toLowerCase()}`}>{value}</span>}
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
          isAnimating={square !== null}
        />
      ))}
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;
  const isDraw = !winner && isBoardFull(squares);

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStarted(false);
  };

  let status;
  if (winner) {
    status = `🎉 Winner: ${winner}!`;
  } else if (isDraw) {
    status = "🤝 It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <div className="game-container">
        <h1 className="title">
          <span className="title-tic">Tic</span>
          <span className="title-tac">Tac</span>
          <span className="title-toe">Toe</span>
        </h1>
        
        <div className={`status ${winner ? 'winner-status' : ''} ${isDraw ? 'draw-status' : ''}`}>
          {status}
        </div>

        <Board 
          squares={squares} 
          onClick={handleClick}
          winningLine={winningLine}
        />

        <button className="reset-button" onClick={resetGame}>
          {gameStarted ? '🔄 New Game' : '🎮 Start Game'}
        </button>

        <div className="instructions">
          <p>Click any square to make your move!</p>
          <p>Get three in a row to win 🏆</p>
        </div>
      </div>
    </div>
  );
}

export default App;