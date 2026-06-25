import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Cell3D from './Cell3D';

function GameBoard3D({ board, onCellClick, winningCells }) {
  const isWinningCell = (z, y, x) => {
    return winningCells.some(
      cell => cell[0] === z && cell[1] === y && cell[2] === x
    );
  };

  return (
    <Canvas style={{ height: '600px', background: '#0f172a' }}>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Render all 27 cells */}
      {board.map((layer, z) =>
        layer.map((row, y) =>
          row.map((cell, x) => (
            <Cell3D
              key={`${z}-${y}-${x}`}
              position={[(x - 1) * 1.2, (y - 1) * 1.2, (z - 1) * 1.2]}
              value={cell}
              onClick={() => onCellClick(z, y, x)}
              isWinningCell={isWinningCell(z, y, x)}
            />
          ))
        )
      )}

      {/* Grid helper for reference */}
      <gridHelper args={[6, 6]} position={[0, -2, 0]} />
    </Canvas>
  );
}

export default GameBoard3D;