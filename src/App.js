import React, { useState, useEffect } from 'react';
import './App.css';
import { calculateWinner, isBoardFull, getBestMove } from './game';

function Square({ value, onClick, isWinning, isDisabled }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {value}
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
          isDisabled={square !== null}
        />
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
  const [aiThinking, setAiThinking] = useState(false);

  const currentSquares = history[currentMove];
  const result = calculateWinner(currentSquares);
  const winner = result?.winner;
  const winningLine = result?.line;
  const isDraw = !winner && isBoardFull(currentSquares);

  useEffect(() => {
    // AI makes a move if it's O's turn in AI mode
    if (gameMode === 'ai' && !isXNext && !winner && !isDraw && !aiThinking) {
      setAiThinking(true);
      setTimeout(() => {
        const bestMove = getBestMove(currentSquares, 'O');
        if (bestMove !== undefined) {
          handlePlay(bestMove);
        }
        setAiThinking(false);
      }, 500); // Delay for better UX
    }
  }, [isXNext, gameMode, winner, isDraw, currentSquares, aiThinking]);

  function handlePlay(squareIndex) {
    if (currentSquares[squareIndex] || winner || aiThinking) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[squareIndex] = isXNext ? 'X' : 'O';
    
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsXNext(!isXNext);

    // Check if game ended and update scores
    const gameResult = calculateWinner(nextSquares);
    if (gameResult) {
      setScores(prev => ({
        ...prev,
        [gameResult.winner]: prev[gameResult.winner] + 1
      }));
    } else if (isBoardFull(nextSquares)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
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

  function switchMode(mode) {
    setGameMode(mode);
    resetGame();
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}! 🎉`;
  } else if (isDraw) {
    status = "It's a draw! 🤝";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  const moves = history.map((squares, move) => {
    const desc = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button 
          className={`history-button ${move === currentMove ? 'active' : ''}`}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="app">
      <div className="game-container">
        <header className="game-header">
          <h1>Tic-Tac-Toe</h1>
          <div className="mode-selector">
            <button 
              className={`mode-button ${gameMode === 'pvp' ? 'active' : ''}`}
              onClick={() => switchMode('pvp')}
            >
              👥 Player vs Player
            </button>
            <button 
              className={`mode-button ${gameMode === 'ai' ? 'active' : ''}`}
              onClick={() => switchMode('ai')}
            >
              🤖 Player vs AI
            </button>
          </div>
        </header>

        <div className="game-content">
          <div className="game-board-section">
            <div className={`status ${winner ? 'winner-status' : ''}`}>
              {status}
            </div>
            <Board 
              squares={currentSquares} 
              onClick={handlePlay}
              winningLine={winningLine}
            />
            <div className="game-controls">
              <button className="control-button new-game" onClick={resetGame}>
                🔄 New Game
              </button>
            </div>
          </div>

          <div className="game-info">
            <div className="scoreboard">
              <h2>Scoreboard</h2>
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
              <button className="control-button reset-scores" onClick={resetScores}>
                Reset Scores
              </button>
            </div>

            <div className="history-section">
              <h2>Game History</h2>
              <ol className="history-list">{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;