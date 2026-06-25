import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './App.css';

// Simple test cube to verify Three.js is working
function TestCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <h1>3D Tic-Tac-Toe - Testing Three.js</h1>
      <div style={{ width: '100vw', height: '80vh' }}>
        <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <TestCube />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;