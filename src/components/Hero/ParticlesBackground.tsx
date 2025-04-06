// src/components/Hero/ParticlesBackground.tsx
"use client"
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ParticlesBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const colors = [
      'rgba(99, 102, 241, 0.6)',
      'rgba(129, 140, 248, 0.5)',
      'rgba(147, 197, 253, 0.4)',
      'rgba(196, 181, 253, 0.5)',
      'rgba(167, 139, 250, 0.6)'
    ];
    // Crear partículas con distribución controlada
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const baseSize = 2 + Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      let startX, startY;
      const zone = Math.random();
      
      if (zone < 0.4) {
        // Zona alrededor del video
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 20;
        startX = 50 + Math.cos(angle) * radius;
        startY = 50 + Math.sin(angle) * radius;
      } else if (zone < 0.7) {
        // Zonas laterales medias
        startX = Math.random() > 0.5 ? 
          5 + Math.random() * 25 :   // Lateral izquierdo
          70 + Math.random() * 25;   // Lateral derecho
        startY = 35 + Math.random() * 40;
      } else {
        // Esquinas inferiores y parte inferior
        if (Math.random() > 0.5) {
          // Esquina inferior izquierda
          startX = Math.random() * 30;
          startY = 70 + Math.random() * 30;
        } else {
          // Esquina inferior derecha
          startX = 70 + Math.random() * 30;
          startY = 70 + Math.random() * 30;
        }
      }
      
      particle.style.position = 'absolute';
      particle.style.width = `${baseSize}px`;
      particle.style.height = `${baseSize}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = `0 0 ${baseSize * 3}px ${color}`;
      particle.style.opacity = '0.8';
      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;
      particle.style.transform = 'translate(-50%, -50%)';
      
      container.appendChild(particle);
      
      // Animación ajustada para movimientos más amplios
      gsap.to(particle, {
        x: 'random(-35, 35)',
        y: 'random(-30, 30)',
        scale: 'random(1.5, 3)',
        boxShadow: `0 0 ${baseSize * 10}px ${color}`,
        duration: 1.5 + Math.random() * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random()
      });
    }

    // Crear partículas con distribución uniforme
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      const baseSize = 2 + Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Distribución uniforme evitando solo las esquinas superiores
      let startX = 5 + Math.random() * 90; // 5-95%
      let startY = 20 + Math.random() * 80; // 20-100%
      
      // Evitar las esquinas superiores
      if (startY < 30) {
        if (startX < 25) startX = 25; // Evitar esquina superior izquierda
        if (startX > 75) startX = 75; // Evitar esquina superior derecha
      }
      
      particle.style.position = 'absolute';
      particle.style.width = `${baseSize}px`;
      particle.style.height = `${baseSize}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = `0 0 ${baseSize * 3}px ${color}`;
      particle.style.opacity = '0.8';
      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;
      particle.style.transform = 'translate(-50%, -50%)';
      
      container.appendChild(particle);
      
      // Animación con movimientos aleatorios
      gsap.to(particle, {
        x: 'random(-50, 50)',
        y: 'random(-40, 40)',
        scale: 'random(1.5, 3)',
        boxShadow: `0 0 ${baseSize * 10}px ${color}`,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random()
      });
    }

    return () => {
      gsap.killTweensOf({});
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default ParticlesBackground;