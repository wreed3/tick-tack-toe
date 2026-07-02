import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GameBoard3D from './GameBoard3D';
import NameInput from './NameInput';
import { createGame } from './game3d';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({ X: '', O: '' });

  const handleStartGame = (player1Name, player2Name) => {
    setPlayerNames({ X: player1Name, O: player2Name });
    const newGame = createGame();
    setGame(newGame);
    setBoard(newGame.getBoard());
    setGameStarted(true);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
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
      setBoard([...game.getBoard()]);
      
      const gameWinner = game.checkWinner();
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    const newGame = createGame();
    setGame(newGame);
    setBoard(newGame.getBoard());
    setCurrentPlayer('X');
    setWinner(null);
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
        <GameBoard3D board={board} onCellClick={handleCellClick} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;