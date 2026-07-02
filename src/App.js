import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GameBoard3D from './GameBoard3D';
import NameInput from './NameInput';
import { createGame } from './game3d';
import confetti from 'canvas-confetti';
import './App.css';

/**
 * Duration of the confetti animation in milliseconds.
 * Set to 3 seconds to provide a celebratory effect without being too long.
 */
const CONFETTI_DURATION = 3000;

/**
 * Initial velocity of confetti particles.
 * Value of 30 provides a good balance between dramatic effect and natural fall.
 */
const CONFETTI_START_VELOCITY = 30;

/**
 * Spread angle of confetti particles in degrees.
 * 360 degrees creates a full circular spread for maximum visual impact.
 */
const CONFETTI_SPREAD = 360;

/**
 * Number of animation ticks for confetti particles.
 * 60 ticks provides smooth animation at typical frame rates.
 */
const CONFETTI_TICKS = 60;

/**
 * Z-index for confetti canvas overlay.
 * Set to 1000 to ensure confetti appears above game elements but below modals (typically 1001+).
 */
const CONFETTI_Z_INDEX = 1000;

function App() {
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({ X: '', O: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const confettiIntervalRef = useRef(null);

  const handleStartGame = async (player1Name, player2Name) => {
    setIsLoading(true);
    setError(null);
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
      setError(err.message || 'Failed to initialize game');
      console.error('Game initialization error:', err);
    } finally {
      setIsLoading(false);
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

    confettiIntervalRef.current = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(confettiIntervalRef.current);
        confettiIntervalRef.current = null;
        return;
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

    // Cleanup function to cancel ongoing confetti animation
    return () => {
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
        confettiIntervalRef.current = null;
      }
    };
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
    setIsLoading(true);
    setError(null);
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
      setError(err.message || 'Failed to reset game');
      console.error('Game reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetToNameInput = () => {
    setGameStarted(false);
    setGame(null);
    setBoard(null);
    setCurrentPlayer('X');
    setWinner(null);
    setPlayerNames({ X: '', O: '' });
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading-screen">
          <h2>Loading game...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-screen">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={resetToNameInput}>Try Again</button>
        </div>
      </div>
    );
  }

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
        <div className={`status ${winner ? 'winner' : ''}`}>
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
      
      <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {board && <GameBoard3D board={board} onCellClick={handleCellClick} />}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;