"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
}

const ClientParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  // Generate random particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Generate between 15-25 particles
    const count = Math.floor(Math.random() * 10) + 15;
    const particles: Particle[] = [];
    
    // Colors array with primary and accent color variants
    const colors = [
      "hsl(var(--primary) / 0.8)",
      "hsl(var(--primary) / 0.6)",
      "hsl(var(--accent) / 0.8)",
      "hsl(var(--accent) / 0.6)",
      "hsl(var(--secondary) / 0.7)"
    ];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100, // percentage position
        y: Math.random() * 100, // percentage position
        size: Math.random() * 6 + 1, // between 1-7px
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2, // between 0.2-0.7
        speed: Math.random() * 15 + 10 // between 10-25s
      });
    }
    
    particlesRef.current = particles;
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-20"
      aria-hidden="true"
    >
      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.id % 2 === 0 ? 10 : -10, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ClientParticles; 