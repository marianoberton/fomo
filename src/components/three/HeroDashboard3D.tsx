"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

interface ElegantParticlesProps {
  count?: number;
}

const ElegantParticles: React.FC<ElegantParticlesProps> = ({ count = 150 }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: x * 0.5, y: y * 0.5 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { positions, colors, sizes } = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colArray = new Float32Array(count * 3);
    const sizeArray = new Float32Array(count);
    
    const colorPalette = [
      new THREE.Color("#1E90FF"), // brilliantBlue
      new THREE.Color("#F7D917"), // signalYellow  
      new THREE.Color("#8B5CF6"), // plum
      new THREE.Color("#F97316")  // orange
    ];
    
    for (let i = 0; i < count; i++) {
      // Distribute particles more around the edges, less in center
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 12;
      
      posArray[i * 3 + 0] = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
      posArray[i * 3 + 1] = Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 4;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 8;
      
      // Colors
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colArray[i * 3 + 0] = color.r;
      colArray[i * 3 + 1] = color.g;
      colArray[i * 3 + 2] = color.b;
      
      // Sizes - smaller and more varied
      sizeArray[i] = Math.random() * 0.5 + 0.2;
    }
    
    return { 
      positions: posArray, 
      colors: colArray, 
      sizes: sizeArray 
    };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle floating animation
      pos.array[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.003;
      
      // Subtle mouse interaction
      const mouseInfluence = 0.01;
      pos.array[i3 + 0] += (mousePosition.x * mouseInfluence - pos.array[i3 + 0] * 0.001) * 0.02;
      pos.array[i3 + 1] += (mousePosition.y * mouseInfluence - pos.array[i3 + 1] * 0.001) * 0.02;
    }
    
    pos.needsUpdate = true;
    
    // Very slow rotation
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const SubtleGeometry: React.FC = () => {
  return (
    <>
      {/* Floating ring in the background */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <Torus position={[-6, 3, -8]} args={[1.2, 0.1, 8, 32]}>
          <meshStandardMaterial 
            color="#1E90FF" 
            transparent 
            opacity={0.15}
            wireframe
          />
        </Torus>
      </Float>

      {/* Small floating cubes */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
        <Box position={[7, -2, -6]} args={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial 
            color="#F7D917" 
            transparent 
            opacity={0.2}
            emissive="#F7D917"
            emissiveIntensity={0.1}
          />
        </Box>
      </Float>

      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.15}>
        <Sphere position={[6, 4, -7]} args={[0.2]}>
          <meshStandardMaterial 
            color="#8B5CF6" 
            transparent 
            opacity={0.25}
            emissive="#8B5CF6"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>
    </>
  );
};

const DataConnections: React.FC = () => {
  const linesRef = useRef<THREE.LineSegments>(null!);
  
  const points = useMemo(() => {
    const positions = [];
    // Create subtle connection lines that don't interfere with dashboard
    positions.push(-8, 2, -5, -6, 1, -4); // Line 1
    positions.push(6, 3, -6, 8, 1, -5);   // Line 2
    positions.push(-7, -3, -6, 7, -2, -5); // Line 3
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
      // Pulse opacity
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#1E90FF" transparent opacity={0.1} />
    </lineSegments>
  );
};

const HeroDashboard3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%",
          zIndex: 2,
          opacity: 0.8
        }}
      >
        <Suspense fallback={null}>
          {/* Very subtle lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffffff" />
          <pointLight position={[-10, -10, 10]} intensity={0.3} color="#F7D917" />

          {/* Elegant particle system */}
          <ElegantParticles count={120} />

          {/* Subtle geometric elements */}
          <SubtleGeometry />

          {/* Data connection lines */}
          <DataConnections />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroDashboard3D; 