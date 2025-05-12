"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroVectorAnimationProps {
  svgString: string;
}

const HeroVectorAnimation: React.FC<HeroVectorAnimationProps> = ({ svgString }) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgContainerRef.current) return;

    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    // 1. Main Network Path Animation - Draw once and persist
    const mainPath = svgElement.querySelector('#main-network-path') as SVGPathElement;
    if (mainPath) {
      const length = mainPath.getTotalLength();
      gsap.set(mainPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
        autoRound: false,
      });

      gsap.to(mainPath, {
        strokeDashoffset: 0,
        duration: 10, // Drawing duration
        ease: 'power2.inOut',
        delay: 0.5, // Small delay before starting main path draw
      });
    }

    // 2. Blinking Nodes Animation - Start invisible, then blink and persist
    const nodes = svgElement.querySelectorAll('.blinking-node');
    if (nodes.length > 0) {
      // Set initial state to invisible for all nodes
      gsap.set(nodes, { opacity: 0 });

      nodes.forEach((node, index) => {
        gsap.to(node, { // Animate to visible and start blinking
          opacity: 1, // Fade in to full opacity first
          duration: 0.5, // Short fade-in duration
          delay: gsap.utils.random(2, 7), // Random start delay for each node (lines should draw first)
          ease: 'power1.inOut',
          onComplete: () => {
            // Once visible, start the continuous blinking animation
            gsap.to(node, {
              opacity: 0.3, // Blink to this lower opacity
              duration: gsap.utils.random(1, 2),
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
            });
          }
        });
      });
    }

    // 3. Other Lines Animation (.draw-line) - Draw once and persist
    const otherLines = svgElement.querySelectorAll('.draw-line');
    if (otherLines.length > 0) {
      otherLines.forEach((line, index) => {
        const pathLine = line as SVGPathElement;
        if (pathLine.getTotalLength && typeof pathLine.getTotalLength === 'function') {
          const len = pathLine.getTotalLength();
          if (len > 0) {
            gsap.set(pathLine, { strokeDasharray: len, strokeDashoffset: len, autoRound: false });
            
            gsap.to(pathLine, {
              strokeDashoffset: 0,
              duration: 4, // Drawing duration
              delay: 1.5 + index * 0.3, // Stagger their start, after main path starts
              ease: 'circ.out'
            });
          }
        }
      });
    }

  }, [svgString]);

  return (
    <div 
      ref={svgContainerRef} 
      dangerouslySetInnerHTML={{ __html: svgString }} 
      className="w-full h-full"
    />
  );
};

export default HeroVectorAnimation; 