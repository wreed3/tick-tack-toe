import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function Cell3D({ position, value, onClick, isHovered, isWinningCell }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && value) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const cellSize = 2; // Increased from default

  return (
    <group position={position}>
      {/* Cell base */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[cellSize, 0.3, cellSize]} />
        <meshStandardMaterial
          color={isWinningCell ? '#4ade80' : (hovered && !value ? '#4299e1' : '#4a5568')}
          emissive={isWinningCell ? '#22c55e' : (hovered && !value ? '#2c5282' : '#000000')}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* X or O */}
      {value && (
        <Text
          position={[0, 0.5, 0]}
          fontSize={1.5}
          color={value === 'X' ? '#f56565' : '#48bb78'}
          anchorX="center"
          anchorY="middle"
        >
          {value}
        </Text>
      )}
    </group>
  );
}

export default Cell3D;