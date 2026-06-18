import React, { useState, useEffect } from 'react';
import { calculateWinner, isDraw, getBestMove } from './game';
import './App.css';

function Square({ value, onClick, isWinning, disabled }) {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value || 'empty square'}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    const isWinning = winningLine && winningLine.includes(i);
    const gameOver = calculateWinner(squares) || isDraw(squares);
    
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinning}
        disabled={gameOver || squares[i] !== null}
      />
    );
  };

  return (
    <div className="board">
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' or 'ai'
  const [playerSymbol, setPlayerSymbol] = useState('X');

  const currentSquares = history[currentMove];
  const winnerInfo = calculateWinner(currentSquares);
  const draw = isDraw(currentSquares);

  useEffect(() => {
    // AI move
    if (gameMode === 'ai' && !winnerInfo && !draw) {
      const currentPlayer = isXNext ? 'X' : 'O';
      if (currentPlayer !== playerSymbol) {
        const timer = setTimeout(() => {
          const aiMove = getBestMove(currentSquares, currentPlayer);
          if (aiMove !== undefined) {
            handleClick(aiMove);
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentMove, isXNext, gameMode, playerSymbol, currentSquares, winnerInfo, draw]);

  function handleClick(i) {
    if (currentSquares[i] || winnerInfo || draw) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsXNext(!isXNext);

    // Update scores if game ended
    const newWinner = calculateWinner(nextSquares);
    if (newWinner) {
      setScores(prev => ({
        ...prev,
        [newWinner.winner]: prev[newWinner.winner] + 1
      }));
    } else if (isDraw(nextSquares)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsXNext(true);
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setIsXNext(move % 2 === 0);
  }

  function toggleGameMode() {
    setGameMode(prev => prev === 'pvp' ? 'ai' : 'pvp');
    resetGame();
  }

  function togglePlayerSymbol() {
    setPlayerSymbol(prev => prev === 'X' ? 'O' : 'X');
    resetGame();
  }

  let status;
  if (winnerInfo) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
    if (gameMode === 'ai') {
      const currentPlayer = isXNext ? 'X' : 'O';
      status += currentPlayer === playerSymbol ? ' (You)' : ' (AI)';
    }
  }

  const moves = history.map((squares, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button 
          onClick={() => jumpTo(move)}
          className={move === currentMove ? 'current-move' : ''}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic-Tac-Toe</h1>
      </header>
      
      <div className="game-container">
        <div className="game-board">
          <div className="status" role="status" aria-live="polite">
            {status}
          </div>
          <Board
            squares={currentSquares}
            onClick={handleClick}
            winningLine={winnerInfo?.line}
          />
          <div className="game-controls">
            <button onClick={resetGame} className="btn btn-primary">
              New Game
            </button>
            <button onClick={toggleGameMode} className="btn btn-secondary">
              Mode: {gameMode === 'pvp' ? 'Player vs Player' : 'Player vs AI'}
            </button>
            {gameMode === 'ai' && (
              <button onClick={togglePlayerSymbol} className="btn btn-secondary">
                Play as: {playerSymbol}
              </button>
            )}
          </div>
        </div>

        <div className="game-info">
          <div className="scoreboard">
            <h3>Scoreboard</h3>
            <div className="scores">
              <div className="score-item">
                <span className="score-label">X Wins:</span>
                <span className="score-value">{scores.X}</span>
              </div>
              <div className="score-item">
                <span className="score-label">O Wins:</span>
                <span className="score-value">{scores.O}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Draws:</span>
                <span className="score-value">{scores.draws}</span>
              </div>
            </div>
            <button onClick={resetScores} className="btn btn-small">
              Reset Scores
            </button>
          </div>

          <div className="game-history">
            <h3>Game History</h3>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;