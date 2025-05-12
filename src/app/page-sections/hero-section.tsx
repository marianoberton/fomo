'use client'

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from 'next/dynamic'; 
import { LottieRefCurrentProps } from 'lottie-react'; // Keep this type import

// Dynamically import LottiePortal with SSR disabled
const LottiePortal = dynamic(
  () => import('@/components/transitions/lottie-portal'), 
  { ssr: false }
);

// Definición del componente HeroSection
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Contenido original ("Start shipping")
  const portalLottieRef = useRef<LottieRefCurrentProps | null>(null);

  // Main GSAP effect will be added here
  useEffect(() => {
    // Placeholder for GSAP logic using portalLottieRef
    if (!portalLottieRef.current || !heroRef.current || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const lottieInstance = portalLottieRef.current;

    // --- Add GSAP ScrollTrigger logic here --- 
    // Example: Pin heroRef, control lottieInstance frames, fade contentRef
    console.log('GSAP Setup - Lottie Instance:', lottieInstance);
    lottieInstance.goToAndStop(0, true);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=3000", 
        scrub: 1,      
        pin: true,     
        pinSpacing: true,
        onUpdate: (self) => {
          const totalFrames = lottieInstance.getDuration(true);
          if (typeof totalFrames === 'number') {
             const frame = Math.floor(self.progress * totalFrames);
             lottieInstance.goToAndStop(frame, true);
          }
        }
      }
    });

    tl.to(contentRef.current, { opacity: 0, ease: "none" }, 0); // Fade out original text
    // Note: No need to animate the portal container position itself

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };

  }, []); // Dependency array might need portalLottieRef.current, but refs don't trigger re-renders

  return (
    <section 
      ref={heroRef}
      className="relative flex items-center justify-center h-screen w-full bg-black" 
    >
      {/* Render the Portal - This is now responsible for Lottie rendering and positioning */}
      <LottiePortal
        ref={portalLottieRef}
        animationPath="/lottie/circle-expand-v3.json"
        className="fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none"
        lottieProps={{
          autoplay: false,
          loop: false,
        }}
      />

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

      {/* Contenido original "Start shipping" (z-30) */}
      <motion.div
        ref={contentRef}
        className="relative z-30 flex flex-col items-center justify-center text-center text-white px-4 pt-16 sm:pt-20"
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

      {/* REMOVE all previous Lottie related divs like lottieContainerRef */}
      {/* REMOVE expandingCircleRef and newTextRef if part of the old approach */}

    </section>
  );
} 