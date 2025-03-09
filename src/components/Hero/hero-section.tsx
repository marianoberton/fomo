// src/components/Hero/HeroSection.tsx
"use client";

import ParticlesBackground from './ParticlesBackground';
import { forwardRef } from "react"; // Importa forwardRef

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => { // Usa forwardRef
  return (
    <section
      ref={ref} // Usa el ref que se pasa
      className="relative overflow-hidden"
      style={{
        height: "100vh",
        backgroundColor: '#0a192f'
      }}
    >
      <ParticlesBackground /> {/* ParticlesBackground DENTRO de HeroSection */}

      {/* Título centrado sobre el hero */}
      <div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-4xl px-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Potencia tu PyME con Inteligencia Artificial
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Soluciones inteligentes diseñadas para pequeñas y medianas empresas que transforman tu negocio
        </p>
      </div>
    </section>
  );
});
HeroSection.displayName = "HeroSection"; // buena practica
export default HeroSection;