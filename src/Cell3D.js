import { useRef, useState } from 'react';
import { Text } from '@react-three/drei';

function Cell3D({ position, value, onClick, isWinningCell }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Cell cube */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={isWinningCell ? '#4ade80' : hovered ? '#60a5fa' : '#1e293b'}
          transparent
          opacity={value ? 0.3 : 0.1}
          wireframe={!value}
        />
      </mesh>

      {/* X or O text */}
      {value && (
        <Text
          position={[0, 0, 0.46]}
          fontSize={0.5}
          color={value === 'X' ? '#ef4444' : '#3b82f6'}
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