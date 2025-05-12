"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface BackgroundParticlesProps {
  count?: number;
  mouseInfluence?: number;
  particleColor?: string;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({
  count = 3000, // Adjusted count, can be increased if performance allows
  mouseInfluence = 0.05,
  particleColor = "#777777", // Slightly brighter for better visibility with texture
}) => {
  const pointsRef = useRef<THREE.Points>(null!); 
  const { viewport } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Load the dot texture
  const dotTexture = useTexture("/dot_texture.png"); // Assumes dot_texture.png is in public/

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { positions, initialData } = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const data = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2.5; // Increased spread
      const y = (Math.random() - 0.5) * viewport.height * 2.5; // Increased spread
      const z = (Math.random() - 0.5) * 20; // Increased depth spread
      posArray[i * 3 + 0] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
      data.push({ 
        initialX: x, 
        initialY: y, 
        initialZ: z, 
        speed: 0.005 + Math.random() * 0.01,
        offset: Math.random() * Math.PI * 2
      });
    }
    return { positions: posArray, initialData: data };
  }, [count, viewport.width, viewport.height]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;

    const geomPositions = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const data = initialData[i];
      const i3 = i * 3;

      geomPositions.array[i3 + 1] += Math.sin(state.clock.elapsedTime * data.speed + data.offset) * 0.01;
      
      const targetX = data.initialX + mousePosition.x * viewport.width * mouseInfluence * (data.initialZ / 10); // More influence for closer particles
      const targetY = data.initialY - mousePosition.y * viewport.height * mouseInfluence * (data.initialZ / 10);
      
      geomPositions.array[i3 + 0] += (targetX - geomPositions.array[i3 + 0]) * 0.05; // Slower lerp for smoother effect
      geomPositions.array[i3 + 1] += (targetY - geomPositions.array[i3 + 1]) * 0.05; 
    }
    geomPositions.needsUpdate = true;

    // pointsRef.current.rotation.y += delta * 0.002; // Optional rotation
    // pointsRef.current.rotation.x += delta * 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        attach="material" 
        map={dotTexture} // Apply the texture
        size={0.1}       // Adjust size as needed with texture
        color={particleColor} 
        sizeAttenuation 
        transparent       // Enable transparency for the texture
        alphaTest={0.5}   // Discard pixels with alpha < 0.5
        opacity={0.8}
        blending={THREE.AdditiveBlending} // For a brighter, glowy effect
      />
    </points>
  );
};

const HeroVisuals: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 75 }} // Adjusted camera slightly
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    >
      <Suspense fallback={null}> {/* Suspense is needed when using useTexture */}
        <BackgroundParticles />
      </Suspense>
    </Canvas>
  );
};

export default HeroVisuals; 