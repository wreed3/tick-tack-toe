import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import GameBoard3D from './GameBoard3D';
import NameInput from './NameInput';
import { createGame } from './game3d';
import confetti from 'canvas-confetti';
import './App.css';

const CONFETTI_DURATION = 3000;
// Initial velocity of confetti particles in pixels per second
const CONFETTI_START_VELOCITY = 30;
// Spread angle of confetti particles in degrees (360 = full circle)
const CONFETTI_SPREAD = 360;
// Number of animation frames for confetti particles (higher = longer animation)
const CONFETTI_TICKS = 60;
const CONFETTI_Z_INDEX = 1000;

function CanvasErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="canvas-error-fallback" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>3D Rendering Error</h2>
      <p>Unable to initialize 3D graphics. This may be due to:</p>
      <ul style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>Unsupported browser or WebGL not available</li>
        <li>GPU or graphics driver issues</li>
        <li>Hardware acceleration disabled</li>
      </ul>
      <p style={{ fontSize: '0.9em', color: '#666' }}>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

function App() {
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({ X: '', O: '' });

  const handleStartGame = async (player1Name, player2Name) => {
    try {
      setPlayerNames({ X: player1Name, O: player2Name });
      const newGame = createGame();
      if (!newGame) {
        throw new Error('Failed to create game');
      }
      setGame(newGame);
      setBoard(newGame.getBoard());
      setGameStarted(true);
    } catch (err) {
      console.error('Game initialization error:', err);
      alert('Failed to initialize game. Please try again.');
    }
  };

  const triggerConfetti = () => {
    const animationEnd = Date.now() + CONFETTI_DURATION;
    const defaults = { 
      startVelocity: CONFETTI_START_VELOCITY, 
      spread: CONFETTI_SPREAD, 
      ticks: CONFETTI_TICKS, 
      zIndex: CONFETTI_Z_INDEX 
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / CONFETTI_DURATION);
      
      // Launch confetti from two different positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  useEffect(() => {
    if (winner && winner !== 'draw') {
      triggerConfetti();
    }
  }, [winner]);

  const handleCellClick = (x, y, z) => {
    if (!game || winner) return;

    const success = game.makeMove(x, y, z, currentPlayer);
    if (success) {
      const newBoard = game.getBoard();
      if (newBoard) {
        setBoard([...newBoard]);
      }
      
      const gameWinner = game.checkWinner();
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    try {
      const newGame = createGame();
      if (!newGame) {
        throw new Error('Failed to create game');
      }
      setGame(newGame);
      setBoard(newGame.getBoard());
      setCurrentPlayer('X');
      setWinner(null);
    } catch (err) {
      console.error('Game reset error:', err);
      alert('Failed to reset game. Please try again.');
    }
  };

  const resetToNameInput = () => {
    setGameStarted(false);
    setGame(null);
    setBoard(null);
    setCurrentPlayer('X');
    setWinner(null);
    setPlayerNames({ X: '', O: '' });
  };

  if (!gameStarted) {
    return <NameInput onStart={handleStartGame} />;
  }

  const getStatusMessage = () => {
    if (winner === 'draw') {
      return "It's a Draw! 🤝";
    }
    if (winner) {
      const winnerName = playerNames[winner];
      return `🎉 ${winnerName} Wins! 🎉`;
    }
    const currentPlayerName = playerNames[currentPlayer];
    return `${currentPlayerName}'s Turn (${currentPlayer})`;
  };

  return (
    <div className="App">
      <div className="game-header">
        <h1>3D Tic-Tac-Toe</h1>
        <div className="player-info">
          <span className={currentPlayer === 'X' ? 'active' : ''}>
            {playerNames.X} (X)
          </span>
          <span className="vs">vs</span>
          <span className={currentPlayer === 'O' ? 'active' : ''}>
            {playerNames.O} (O)
          </span>
        </div>
        <div className={`status ${winner ? 'winner' : ''}`} aria-live="polite" aria-atomic="true">
          {getStatusMessage()}
        </div>
        <div className="button-group">
          <button onClick={resetGame} className="reset-button">
            New Game
          </button>
          <button onClick={resetToNameInput} className="change-names-button">
            Change Names
          </button>
        </div>
      </div>
      
      <ErrorBoundary
        FallbackComponent={CanvasErrorFallback}
        onReset={resetGame}
      >
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {board && <GameBoard3D board={board} onCellClick={handleCellClick} />}
          <OrbitControls />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

export default App;