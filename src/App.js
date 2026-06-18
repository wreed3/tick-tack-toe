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
  }, [gameMode, isXNext, winnerInfo, draw, playerSymbol, currentSquares]);

  function handleClick(i) {
    if (currentSquares[i] || winnerInfo || draw) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    
    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
    setIsXNext(!isXNext);

    // Update scores if game is over
    const newWinner = calculateWinner(nextSquares);
    if (newWinner) {
      setScores(prev => ({
        ...prev,
        [newWinner.winner]: prev[newWinner.winner] + 1
      }));
    } else if (isDraw(nextSquares)) {
      setScores(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));
    }
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setIsXNext(move % 2 === 0);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsXNext(true);
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 });
  }

  function changeGameMode(mode) {
    setGameMode(mode);
    resetGame();
  }

  function changePlayerSymbol(symbol) {
    setPlayerSymbol(symbol);
    resetGame();
  }

  let status;
  if (winnerInfo) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    const currentPlayer = isXNext ? 'X' : 'O';
    if (gameMode === 'ai' && currentPlayer !== playerSymbol) {
      status = 'AI is thinking...';
    } else {
      status = `Next player: ${currentPlayer}`;
    }
  }

  const moves = history.map((squares, move) => {
    const desc = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button 
          className="btn btn-secondary btn-small"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 Tic-Tac-Toe</h1>
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
            <button className="btn btn-primary" onClick={resetGame}>
              New Game
            </button>
            <button className="btn btn-secondary" onClick={resetScores}>
              Reset Scores
            </button>
          </div>

          <div className="mode-selector">
            <h3>Game Mode</h3>
            <div className="mode-buttons">
              <button 
                className={`btn ${gameMode === 'pvp' ? 'btn-active' : 'btn-secondary'}`}
                onClick={() => changeGameMode('pvp')}
              >
                Player vs Player
              </button>
              <button 
                className={`btn ${gameMode === 'ai' ? 'btn-active' : 'btn-secondary'}`}
                onClick={() => changeGameMode('ai')}
              >
                Player vs AI
              </button>
            </div>
          </div>

          {gameMode === 'ai' && (
            <div className="symbol-selector">
              <h3>Play as</h3>
              <div className="mode-buttons">
                <button 
                  className={`btn ${playerSymbol === 'X' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={() => changePlayerSymbol('X')}
                >
                  X
                </button>
                <button 
                  className={`btn ${playerSymbol === 'O' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={() => changePlayerSymbol('O')}
                >
                  O
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="game-info">
          <div className="scoreboard">
            <h2>Scoreboard</h2>
            <div className="score-grid">
              <div className="score-item">
                <span className="score-label">X Wins</span>
                <span className="score-value">{scores.X}</span>
              </div>
              <div className="score-item">
                <span className="score-label">O Wins</span>
                <span className="score-value">{scores.O}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Draws</span>
                <span className="score-value">{scores.draws}</span>
              </div>
            </div>
          </div>

          <div className="history">
            <h2>Game History</h2>
            <ol className="history-list">{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;