import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const CELL_SIZE = 2;
const CELL_HEIGHT = 0.3;

function Cell3D({ position, value, onClick, isWinningCell }) {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && value) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

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
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[CELL_SIZE, CELL_HEIGHT, CELL_SIZE]} />
        <meshStandardMaterial
          color={isWinningCell ? '#4ade80' : (isHovered && !value ? '#4299e1' : '#4a5568')}
          emissive={isWinningCell ? '#22c55e' : (isHovered && !value ? '#2c5282' : '#000000')}
          emissiveIntensity={0.3}
          wireframe={!value}
        />
      </mesh>

      {/* X or O */}
      {value && (
        <>
          <Text
            position={[0, 0.5, 0]}
            fontSize={1.5}
            color={value === 'X' ? '#f56565' : '#48bb78'}
            anchorX="center"
            anchorY="middle"
          >
            {value}
          </Text>
          <Text
            position={[0, 0.5, CELL_SIZE / 2]}
            rotation={[0, 0, 0]}
            fontSize={1.5}
            color={value === 'X' ? '#f56565' : '#48bb78'}
            anchorX="center"
            anchorY="middle"
          >
            {value}
          </Text>
          <Text
            position={[0, 0.5, -CELL_SIZE / 2]}
            rotation={[0, Math.PI, 0]}
            fontSize={1.5}
            color={value === 'X' ? '#f56565' : '#48bb78'}
            anchorX="center"
            anchorY="middle"
          >
            {value}
          </Text>
          <Text
            position={[CELL_SIZE / 2, 0.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={1.5}
            color={value === 'X' ? '#f56565' : '#48bb78'}
            anchorX="center"
            anchorY="middle"
          >
            {value}
          </Text>
          <Text
            position={[-CELL_SIZE / 2, 0.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            fontSize={1.5}
            color={value === 'X' ? '#f56565' : '#48bb78'}
            anchorX="center"
            anchorY="middle"
          >
            {value}
          </Text>
          <Text
            position={[0, CELL_HEIGHT / 2 + 0.01, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={1.5}
            color={value === 'X' ? '#f56565' : '#48bb78'}
            anchorX="center"
            anchorY="middle"
          >
            {value}
          </Text>
        </>
      )}
    </group>
  );
}

export default Cell3D;