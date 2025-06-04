"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box } from "@react-three/drei";

const RotatingCube: React.FC = () => {
  const meshRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={meshRef} position={[0, 0, 0]} args={[2, 2, 2]}>
      <meshStandardMaterial color="#F7D917" />
    </Box>
  );
};

const SimpleThreeTest: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%",
          zIndex: 15,
          background: "transparent"
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <RotatingCube />
        
        <Sphere position={[-3, 0, 0]} args={[1]}>
          <meshStandardMaterial color="#1E90FF" />
        </Sphere>
        
        <Sphere position={[3, 0, 0]} args={[1]}>
          <meshStandardMaterial color="#8B5CF6" />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default SimpleThreeTest; 