import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Helix() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create helix points
  const helixPoints = [];
  const radius = 2;
  const height = 10;
  const turns = 3;
  const pointsPerTurn = 20;
  
  for (let i = 0; i < turns * pointsPerTurn; i++) {
    const angle = (i / pointsPerTurn) * Math.PI * 2;
    const y = (i / (turns * pointsPerTurn)) * height - height / 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    helixPoints.push({ x, y, z });
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, index) => {
        const isAccent = index % 5 === 0;
        return (
          <Sphere
            key={index}
            position={[point.x, point.y, point.z]}
            args={[isAccent ? 0.12 : 0.08, 16, 16]}
          >
            <meshStandardMaterial
              color={isAccent ? '#1ec9e8' : '#ff6a13'}
              emissive={isAccent ? '#1ec9e8' : '#ff6a13'}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        );
      })}
    </group>
  );
}

export function HelixBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1ec9e8" />
        <Helix />
      </Canvas>
    </div>
  );
}
