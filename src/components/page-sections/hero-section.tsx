"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  const [animationData, setAnimationData] = useState<any | null>(null);

  useEffect(() => {
    fetch("/mask_reveal_lottie.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error fetching Lottie animation:", error));
  }, []);

  useEffect(() => {
    if (!animationData || !heroRef.current || !contentRef.current || !lottieRef.current || !lottieContainerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    
    lottieRef.current.goToAndStop(0, true);

    gsap.set(lottieContainerRef.current, { yPercent: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const totalFrames = animationData.op;
          const frame = Math.floor(self.progress * totalFrames);
          if (lottieRef.current) {
            lottieRef.current.goToAndStop(frame, true);
          }
        }
      }
    });

    tl
      .to(lottieContainerRef.current, { 
        yPercent: -25,
        ease: "none"
      }, 0)
      .to(contentRef.current, { 
        opacity: 0,
        ease: "none"
      }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationData]);

  return (
    <section 
      ref={heroRef}
      className="relative flex items-center justify-center h-screen w-full overflow-hidden"
    >
      {/* Background Video */}
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

      {/* Overlay for video darkness */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      {/* Lottie Animation Layer - Behind Content */}
      {animationData && (
        <div ref={lottieContainerRef} className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            className="w-full h-full object-cover"
            autoplay={false}
            loop={false}
          />
        </div>
      )}

      {/* Content - Now on top of Lottie */}
      <motion.div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 pt-16 sm:pt-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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