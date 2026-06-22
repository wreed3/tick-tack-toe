import React, { useState } from 'react';
import './App.css';
import { calculateWinner, isBoardFull, getInspirationalMessage } from './game';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ crossIsNext, squares, onPlay }) {
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && isBoardFull(squares);

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = crossIsNext ? '✝' : '🐟';
    onPlay(nextSquares);
  }

  let status;
  let message = '';
  
  if (winner) {
    status = `Victory for ${winner === '✝' ? 'Cross' : 'Fish'}!`;
    message = getInspirationalMessage(winner, false);
  } else if (isDraw) {
    status = "It's a draw!";
    message = getInspirationalMessage(null, true);
  } else {
    status = `Next player: ${crossIsNext ? '✝ Cross' : '🐟 Fish'}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      {message && <div className="message">{message}</div>}
      <div className="board">
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row">
            {[0, 1, 2].map(col => {
              const i = row * 3 + col;
              return (
                <Square
                  key={i}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                  isWinning={winningLine.includes(i)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const crossIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-header">
        <h1>⛪ Faith & Fellowship Tic-Tac-Toe ⛪</h1>
        <p className="scripture">"For where two or three gather in my name, there am I with them." - Matthew 18:20</p>
      </div>
      <div className="game-board">
        <Board crossIsNext={crossIsNext} squares={currentSquares} onPlay={handlePlay} />
        <button className="reset-button" onClick={resetGame}>New Game</button>
      </div>
      <div className="game-info">
        <h3>Game History</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}