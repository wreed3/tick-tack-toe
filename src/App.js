import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import confetti from 'canvas-confetti';
import './App.css';
import GameBoard3D from './components/GameBoard3D';
import NameInput from './components/NameInput';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong with the 3D rendering:</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState(null);
  const [playerNames, setPlayerNames] = useState({ X: 'Player X', O: 'Player O' });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    // Check for a winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    // Check for a draw
    if (squares.every(square => square !== null)) {
      return 'draw';
    }
    
    return null;
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
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  };

  const handleClick = (index) => {
    if (board[index] || gameStatus) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const result = calculateWinner(newBoard);
    if (result) {
      setGameStatus(result);
      if (result !== 'draw') {
        triggerConfetti();
      }
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus(null);
  };

  const handleNameChange = (player, name) => {
    setPlayerNames(prev => ({ ...prev, [player]: name }));
  };

  return (
    <div className="App">
      <h1>3D Tic-Tac-Toe</h1>
      <NameInput 
        playerNames={playerNames}
        onNameChange={handleNameChange}
      />
      <div className="status">
        {gameStatus === 'draw' ? (
          <span>It's a draw!</span>
        ) : gameStatus ? (
          <span className="winner">Winner: {playerNames[gameStatus]}!</span>
        ) : (
          <span>Next player: {playerNames[isXNext ? 'X' : 'O']}</span>
        )}
      </div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={resetGame}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <GameBoard3D 
            board={board}
            onSquareClick={handleClick}
          />
          <OrbitControls />
        </Canvas>
      </ErrorBoundary>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;