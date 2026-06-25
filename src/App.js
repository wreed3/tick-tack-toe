import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { createGame3D, makeMove } from './game3d';
import './App.css';

// Individual cell in the 3D grid
function Cell({ position, value, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && hovered && !value) {
      meshRef.current.scale.x = 1.1;
      meshRef.current.scale.y = 1.1;
      meshRef.current.scale.z = 1.1;
    } else if (meshRef.current) {
      meshRef.current.scale.x = 1;
      meshRef.current.scale.y = 1;
      meshRef.current.scale.z = 1;
    }
  });

  return (
    <group position={position}>
      {/* Cell box */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={hovered && !value ? '#4a90e2' : '#2a2a2a'}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* X or O marker */}
      {value === 'X' && (
        <>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial color="#ff6b6b" />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial color="#ff6b6b" />
          </mesh>
        </>
      )}

      {value === 'O' && (
        <mesh>
          <torusGeometry args={[0.4, 0.1, 16, 32]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
      )}
    </group>
  );
}

// The 3D game board
function Board3D({ game, onCellClick }) {
  const cells = [];

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        const position = [
          (x - 1) * 1.2,
          (y - 1) * 1.2,
          (z - 1) * 1.2
        ];
        cells.push(
          <Cell
            key={`${x}-${y}-${z}`}
            position={position}
            value={game.board[x][y][z]}
            onClick={() => onCellClick(x, y, z)}
          />
        );
      }
    }
  }

  return (
    <group>
      {cells}
      {/* Grid lines for reference */}
      <gridHelper args={[4, 4]} position={[0, -2, 0]} />
    </group>
  );
}

function App() {
  const [game, setGame] = useState(createGame3D());

  const handleCellClick = (x, y, z) => {
    if (!game.winner && !game.isDraw) {
      setGame(makeMove(game, x, y, z));
    }
  };

  const handleReset = () => {
    setGame(createGame3D());
  };

  return (
    <div className="App">
      <div className="header">
        <h1>3D Tic-Tac-Toe</h1>
        <div className="status">
          {game.winner ? (
            <span className="winner">🏆 Player {game.winner} Wins!</span>
          ) : game.isDraw ? (
            <span className="draw">🤝 Draw!</span>
          ) : (
            <span>Current Player: <strong>{game.currentPlayer}</strong></span>
          )}
        </div>
        <button onClick={handleReset} className="reset-button">
          Reset Game
        </button>
      </div>

      <div className="canvas-container">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Board3D game={game} onCellClick={handleCellClick} />
          <OrbitControls 
            enablePan={false}
            minDistance={4}
            maxDistance={10}
          />
        </Canvas>
      </div>

      <div className="instructions">
        <p>🖱️ Drag to rotate • 🖱️ Scroll to zoom • 🎯 Click cells to play</p>
        <p>Win by getting 3 in a row in any direction - including diagonals through the cube!</p>
      </div>
    </div>
  );
}

export default App;