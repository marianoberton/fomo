// src/components/Hero/ParticlesBackground.tsx
"use client"
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ParticlesBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Limpiar cualquier contenido previo
    container.innerHTML = '';

    // Definir las tres líneas semicirculares - ajustadas para que sean más sutiles
    const arcs = [
      { radius: 25, centerX: 50, centerY: 110, particleCount: 20, direction: 1, color: 'rgba(168, 168, 255, 0.6)' },  // Arco 1
      { radius: 35, centerX: 50, centerY: 110, particleCount: 25, direction: -1, color: 'rgba(134, 134, 236, 0.5)' }, // Arco 2
      { radius: 45, centerX: 50, centerY: 110, particleCount: 30, direction: 1, color: 'rgba(255, 255, 255, 0.4)' },  // Arco 3
    ];

    // Crear partículas para cada arco con posiciones iniciales distribuidas
    arcs.forEach(arc => {
      // Crear un grupo de animación para cada arco para mantener sincronización
      const particles = [];
      
      // Crear partículas con posiciones iniciales distribuidas uniformemente
      for (let i = 0; i < arc.particleCount; i++) {
        // Distribuir las partículas uniformemente a lo largo del arco
        const startProgress = i / arc.particleCount; // Distribución uniforme inicial
        
        // Crear partícula
        const particle = document.createElement('div');
        
        // Tamaño más pequeño para que sea más sutil como en la imagen
        const size = 1.5 + (arc.radius / 40);
        
        // Estilo de la partícula - más sutil
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = arc.color;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${size}px ${arc.color}`;
        particle.style.opacity = '0.6';
        
        // Añadir al contenedor
        container.appendChild(particle);
        particles.push({
          element: particle,
          startProgress: startProgress
        });
      }
      
      // Usar una única animación para todo el arco para mantener la sincronización
      const duration = 30; // Duración fija para todas las partículas del mismo arco
      
      // Animación principal que controla todas las partículas del arco
      gsap.to({}, {
        duration: duration,
        repeat: -1,
        ease: "none",
        onUpdate: function() {
          const masterProgress = this.progress();
          
          // Actualizar cada partícula manteniendo su offset inicial
          particles.forEach(particle => {
            // Calcular el progreso individual manteniendo la separación original
            let progress = (masterProgress + particle.startProgress) % 1;
            
            // Calcular el ángulo actual basado en la dirección
            let currentAngle;
            if (arc.direction === 1) {
              // De 0 a 180 grados
              currentAngle = progress * 180;
            } else {
              // De 180 a 0 grados
              currentAngle = 180 - (progress * 180);
            }
            
            // Convertir a radianes
            const currentRadians = (currentAngle * Math.PI) / 180;
            
            // Calcular nueva posición
            const newX = arc.centerX + arc.radius * Math.cos(currentRadians);
            const newY = arc.centerY - arc.radius * Math.sin(currentRadians);
            
            // Actualizar posición
            particle.element.style.left = `${newX}%`;
            particle.element.style.top = `${newY}%`;
          });
        }
      });
    });
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