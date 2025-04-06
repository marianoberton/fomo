"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  top: string;
  left: string;
  yAnimation: number[];
  duration: number;
  delay: number;
};

export default function ClientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Only run on client side
    const newParticles = Array(8).fill(0).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      yAnimation: [0, -15 * Math.random(), 0],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
    
    setParticles(newParticles);
  }, []);
  
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-accent/70"
          style={{
            top: particle.top,
            left: particle.left,
            filter: "blur(1px)"
          }}
          animate={{
            y: particle.yAnimation,
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay
          }}
        />
      ))}
    </>
  );
} 