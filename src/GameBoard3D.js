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
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas 
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0f172a']} />
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          target={[0, 0, 0]}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

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
    </div>
  );
}

export default GameBoard3D;