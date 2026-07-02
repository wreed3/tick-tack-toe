import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Cell3D from './Cell3D';

function GameBoard3D({ board, onCellClick, currentPlayer }) {
  const gridSize = 3;
  const cellSpacing = 2.5; // Increased spacing for larger board

  return (
    <Canvas shadows antialias alpha={false} dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={50} />
      <OrbitControls 
        enablePan={false}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Grid lines */}
      <gridHelper args={[8, 8]} position={[0, -0.1, 0]} />

      {/* Game board */}
      <group>
        {board.map((layer, z) =>
          layer.map((row, y) =>
            row.map((cell, x) => {
              const posX = (x - 1) * cellSpacing;
              const posY = (z - 1) * cellSpacing;
              const posZ = (y - 1) * cellSpacing;
              const index = z * gridSize * gridSize + y * gridSize + x;
              
              return (
                <Cell3D
                  key={index}
                  position={[posX, posY, posZ]}
                  value={cell}
                  onClick={() => onCellClick(z, y, x)}
                  isHovered={false}
                />
              );
            })
          )
        )}
      </group>

      {/* Base platform */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[9, 0.5, 9]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </Canvas>
  );
}

export default GameBoard3D;