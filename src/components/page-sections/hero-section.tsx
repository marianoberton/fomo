"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";

// Definición del componente HeroSection
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Contenido original ("Start shipping")
  const lottieRef = useRef<any>(null); // Para el reproductor Lottie
  const lottieContainerRef = useRef<HTMLDivElement>(null); // Contenedor para el Lottie que se mueve
  // const expandingCircleRef = useRef<HTMLDivElement>(null); // Comentado Fase 2
  // const newTextRef = useRef<HTMLDivElement>(null); // Comentado Fase 2

  const [animationData, setAnimationData] = useState<any | null>(null);

  // Efecto para cargar la animación Lottie
  useEffect(() => {
    fetch("/mask_reveal_lottie.json") // Asume que el JSON está en public/
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error fetching Lottie animation:", error));
  }, []);

  // Efecto principal para configurar GSAP y ScrollTrigger cuando la data Lottie esté lista
  useEffect(() => {
    if (!animationData || !heroRef.current || !contentRef.current || !lottieRef.current || !lottieContainerRef.current /*|| !expandingCircleRef.current || !newTextRef.current*/) { // Comentado Fase 2 refs check
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    lottieRef.current.goToAndStop(0, true); // Frame inicial del Lottie

    // Estados iniciales definidos con GSAP
    gsap.set(lottieContainerRef.current, { yPercent: 50 }); // Posición inicial del Lottie (ajustar para la mitad de la esfera)
    // gsap.set(expandingCircleRef.current, { scale: 0, borderRadius: '50%' }); // Comentado Fase 2
    // gsap.set(newTextRef.current, { opacity: 0, scale: 0.5 }); // Comentado Fase 2
    gsap.set(contentRef.current, { opacity: 1 }); // Texto original visible al inicio

    const totalFramesLottie = animationData.op || 180; // Total de frames del Lottie
    // const framePhase2Start = 72; // Comentado Fase 2
    // const progressPhase2Start = framePhase2Start / totalFramesLottie; // Comentado Fase 2
    
    // const heroWidth = heroRef.current.offsetWidth; // Comentado Fase 2
    // const heroHeight = heroRef.current.offsetHeight; // Comentado Fase 2
    // const baseCircleSize = 40; // Comentado Fase 2

    // Timeline principal de ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=3000", // Duración del pin (ajustar según sea necesario)
        scrub: 1,      // Suavizado del scroll
        pin: true,     // Fijar la sección Hero
        pinSpacing: true,
        // markers: process.env.NODE_ENV === "development", // Descomentar para depurar
        onUpdate: (self) => {
          // 1. Controlar el frame del Lottie original durante todo el scroll
          const frame = Math.floor(self.progress * totalFramesLottie);
          if (lottieRef.current) {
            lottieRef.current.goToAndStop(frame, true);
          }

          // Lógica de Fase 2 comentada
          /*
          let progressPhase2 = 0;
          if (self.progress >= progressPhase2Start) {
            progressPhase2 = (self.progress - progressPhase2Start) / (1 - progressPhase2Start);
          }
          progressPhase2 = Math.max(0, Math.min(1, progressPhase2));

          const targetScaleX = heroWidth / baseCircleSize;
          const targetScaleY = heroHeight / baseCircleSize;
          gsap.set(expandingCircleRef.current, {
            scaleX: progressPhase2 * targetScaleX,
            scaleY: progressPhase2 * targetScaleY,
            borderRadius: progressPhase2 > 0.85 ? '0%' : '50%', 
            transformOrigin: 'center center'
          });

          gsap.set(newTextRef.current, {
            opacity: progressPhase2, 
            scale: 0.5 + progressPhase2 * 0.5 
          });
          */
        }
      }
    });

    // Animaciones de la Fase 1 en la timeline (Lottie sube, texto original se desvanece)
    tl
      .to(lottieContainerRef.current, { yPercent: -25, ease: "none" }, 0) // Lottie se mueve hacia arriba
      .to(contentRef.current, { opacity: 0, ease: "none" }, 0); // Texto original se desvanece

    // Las animaciones de la Fase 2 ahora se manejan completamente en onUpdate

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Considerar matar tweens específicos si hay problemas al desmontar
      // gsap.killTweensOf([lottieContainerRef.current, contentRef.current, expandingCircleRef.current, newTextRef.current]);
    };
  }, [animationData]); // El efecto se ejecuta cuando animationData cambia

  return (
    <section 
      ref={heroRef}
      // Quitamos overflow-hidden si causaba problemas de recorte del Lottie
      className="relative flex items-center justify-center h-screen w-full bg-black" 
    >
      {/* Video de fondo (z-0) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 z-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay oscuro para el video (z-0) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      {/* Capa de animación Lottie original (z-10) */}
      {animationData && (
        <div 
          ref={lottieContainerRef} 
          // className="absolute inset-0 z-10 pointer-events-none" // Original class
          // Let's add flex centering and allow overflow
          className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-visible" 
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            // className="w-full h-full object-contain" // Original classes
            // Make Lottie wider than viewport and use object-cover
            className="w-[120vw] h-auto object-cover" // Adjust width/height as needed
            autoplay={false}
            loop={false}
          />
        </div>
      )}

      {/* Círculo que se expande (z-15) - Comentado Fase 2 */}
      {/* 
      <div 
        ref={expandingCircleRef}
        className="absolute w-10 h-10 bg-blue-600 z-15" // Tamaño base, posición se ajusta con style
        style={{ 
          top: '50%',     // <- AJUSTA ESTE VALOR para alineación vertical inicial
          left: '50%',    // <- AJUSTA ESTE VALOR para alineación horizontal inicial
          transform: 'translate(-50%, -50%)', 
        }}
      ></div>
      */}

      {/* Nuevo texto "No te quedes afuera" (z-20) - Comentado Fase 2 */}
      {/* 
      <div 
        ref={newTextRef}
        className="absolute top-1/2 left-1/2 z-20 text-white text-4xl md:text-6xl font-bold text-center whitespace-nowrap"
        style={{ transform: 'translate(-50%, -50%)' }} // GSAP controla opacidad y escala iniciales
      >
        No te quedes afuera.
      </div>
      */}

      {/* Contenido original "Start shipping" (z-30) */}
      <motion.div
        ref={contentRef}
        className="relative z-30 flex flex-col items-center justify-center text-center text-white px-4 pt-16 sm:pt-20"
        // initial y animate de framer-motion pueden quitarse si GSAP controla todo
        // initial={{ opacity: 1 }}
        // animate={{ opacity: 1 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-3 font-light">
          Stop talking.
        </h2>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Start shipping.
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-xl font-light">
          Loka puts your idea into the hands of your audience faster.
        </p>
      </motion.div>
    </section>
  );
} 