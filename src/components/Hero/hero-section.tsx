// src/components/Hero/HeroSection.tsx
"use client";

import { BackgroundLines } from './BackgroundLines';
import { forwardRef } from "react";

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <BackgroundLines
      className="relative overflow-hidden"
      svgOptions={{ duration: 8 }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#0a192f',
          opacity: 0.95 // Añadida transparencia
        }}
      />
      <section
        ref={ref}
        className="relative h-screen z-10"
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-5xl px-6"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Impulsamos tu Negocio con{' '}
            <span className="text-indigo-400 inline-block">
              Inteligencia Artificial
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Transforma tu PyME con soluciones inteligentes que maximizan tu productividad y resultados
          </p>
        </div>
      </section>
    </BackgroundLines>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;