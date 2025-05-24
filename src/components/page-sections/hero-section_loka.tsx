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

  // Refs para la nueva sección AWS
  const expandingCircleRef = useRef<HTMLDivElement>(null);
  const awsContentRef = useRef<HTMLDivElement>(null);
  const awsBadgesContainerRef = useRef<HTMLDivElement>(null);

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
    if (!animationData || !heroRef.current || !contentRef.current || !lottieRef.current || !lottieContainerRef.current /*|| !expandingCircleRef.current || !newTextRef.current*/ // Comentado Fase 2 refs check
      || !expandingCircleRef.current || !awsContentRef.current || !awsBadgesContainerRef.current // Nuevas refs
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    lottieRef.current.goToAndStop(0, true); // Frame inicial del Lottie

    // Estados iniciales definidos con GSAP
    gsap.set(lottieContainerRef.current, { yPercent: 50 });
    gsap.set(contentRef.current, { opacity: 1 }); // Texto original visible al inicio

    // Estados iniciales para la sección AWS (ahora es el contenedor de máscara)
    gsap.set(expandingCircleRef.current, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw', 
      height: '100vh',
      backgroundColor: '#1D253F',
      scale: 1, // Tamaño completo desde el inicio
      opacity: 1, // Opaco desde el inicio (controlado por clip-path)
      zIndex: 40, 
      clipPath: 'circle(0% at 50% 50%)', // Inicia como un círculo de radio 0 en el centro
    });
    // Contenido AWS visible dentro del contenedor de máscara
    gsap.set(awsContentRef.current, { opacity: 1, y: 0, width: '100%', textAlign: 'center' });
    if (awsBadgesContainerRef.current) {
      gsap.set(awsBadgesContainerRef.current.children, { opacity: 1 }); // Asegurarse de que sean visibles
    }

    const totalFramesLottie = animationData.op || 180;
    const frameToStartAwsReveal = 72; // Frame donde comienza la revelación de AWS
    const progressToStartAwsReveal = totalFramesLottie > 0 ? frameToStartAwsReveal / totalFramesLottie : 0.4;

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

    // Fase 1: Lottie se mueve al centro y Texto original se desvanece
    // Lottie se mueve HASTA progressToStartAwsReveal
    tl.to(lottieContainerRef.current, {
        // yPercent: -25, // Cambiado
        yPercent: 0, // Mover al centro vertical
        ease: "none",
        duration: progressToStartAwsReveal // Termina exactamente cuando empieza la revelación AWS
      }, 0) // Empieza al inicio de la timeline
      .to(contentRef.current, { 
        opacity: 0, 
        ease: "none",
        duration: progressToStartAwsReveal // Desvanecer durante el mismo tiempo
      }, 0); // Empieza al inicio

    // Las animaciones de la Fase 2 ahora se manejan completamente en onUpdate

    // Animación de la sección AWS (ahora es la animación de la máscara)
    tl
      // .set(expandingCircleRef.current, { // Ya no es necesario este set
      //   opacity: 1,
      //   scale: 0, 
      // }, progressToStartAwsReveal)
      
      // Paso único: Animar el clip-path para revelar
      .to(expandingCircleRef.current, {
          clipPath: 'circle(71% at 50% 50%)', // Expandir círculo hasta cubrir la pantalla (71% > sqrt(50^2+50^2))
          duration: 0.8, // Duración de la expansión de la máscara
          ease: 'power2.inOut', // Puede ajustarse el ease
      }, progressToStartAwsReveal) // Comienza en el progress calculado

      // Ya no se necesitan las animaciones separadas para border-radius, padding, contenido y badges
      // .to(expandingCircleRef.current, { ... }) // Eliminado
      // .to(awsContentRef.current, { ... }) // Eliminado
      // .to(awsBadgesContainerRef.current ? awsBadgesContainerRef.current.children : [], { ... }) // Eliminado
      ;

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Considerar matar tweens específicos si hay problemas al desmontar
      gsap.killTweensOf([
        lottieContainerRef.current, 
        contentRef.current, 
        expandingCircleRef.current, 
        awsContentRef.current,
        awsBadgesContainerRef.current ? awsBadgesContainerRef.current.children : null
      ].filter(Boolean));
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

      {/* Círculo que se expande y contenido AWS (z-40) - Ahora es Contenedor de Máscara */}
      <div 
        ref={expandingCircleRef} 
        className="bg-[#1D253F] absolute inset-0 flex items-center justify-center" // Asegura tamaño y centrado del contenido interno
      >
        {/* Contenido AWS centrado dentro del contenedor de máscara */}
        <div ref={awsContentRef} className="text-white text-center max-w-screen-lg mx-auto px-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2.5">
            AWS <span className="font-normal">Advanced</span> Partner
          </h2>
          <p className="text-base sm:text-lg mb-7">
            We rank among the top 1% of partners for startups on AWS.
          </p>
          <div ref={awsBadgesContainerRef} className="flex flex-wrap justify-center gap-5 mb-7">
            {/* Placeholder para badges - reemplaza con tus <img> tags */}
            <div className="bg-white/10 p-4 rounded-lg w-24 h-24 flex justify-center items-center">Badge 1</div>
            <div className="bg-white/10 p-4 rounded-lg w-24 h-24 flex justify-center items-center">Badge 2</div>
            <div className="bg-white/10 p-4 rounded-lg w-24 h-24 flex justify-center items-center">Badge 3</div>
          </div>
          <a 
            href="#" 
            className="inline-block bg-[#FF9900] text-[#1D253F] py-3 px-6 rounded-md font-bold transition-colors duration-300 ease-in-out hover:bg-[#e68a00]"
          >
            LEARN MORE
          </a>
        </div>
      </div>

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