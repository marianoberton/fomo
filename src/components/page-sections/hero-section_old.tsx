"use client";

import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image"; // No longer used directly
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { gsap } from 'gsap';
// import HeroVectorAnimation from "@/components/HeroVectorAnimation"; // To be replaced

// SVG for the dots will be handled differently, perhaps as individual components or a new simpler SVG string
// const svgAnimatedString = ...; // Removed

const dynamicWords = [
 "Transformamos tu negocio digital.",
  "Revoluciona tu industria.",
  "Potenciamos tu estrategia online.",
  "Elevamos tu presencia web.",
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null); // Added state for SVG markup
  const dynamicTextSpanRef = useRef<HTMLSpanElement>(null);
  const isInitialLoad = useRef(true);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wordCycleInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(wordCycleInterval);
  }, []);

  // Effect to fetch SVG content
  useEffect(() => {
    fetch('/stolen_hero_calss.svg')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => setSvgMarkup(text))
      .catch(error => console.error("Error fetching SVG:", error));
  }, []); // Runs once on mount

  useEffect(() => {
    // GSAP animation for the very first word appearance
    if (currentIndex === 0 && isInitialLoad.current && dynamicTextSpanRef.current) {
      gsap.fromTo(dynamicTextSpanRef.current,
        { opacity: 0, y: 25, scale: 0.95 }, // GSAP's distinct "from" state
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2, // Slightly longer/different easing for GSAP intro
          ease: 'expo.out',
          onComplete: () => {
            isInitialLoad.current = false; // Prevent GSAP from running again for the initial load
          }
        }
      );
    }
  }, [currentIndex]); // Reruns when currentIndex changes to handle initial load case

  useEffect(() => {
    // GSAP animation for SVG circles, runs after svgMarkup is loaded
    if (svgContainerRef.current && svgMarkup) {
      const yellowNodes = gsap.utils.toArray<SVGElement>(svgContainerRef.current.querySelectorAll('svg .yellow-node'));
      const blueNodes = gsap.utils.toArray<SVGElement>(svgContainerRef.current.querySelectorAll('svg .blue-node'));
      const allColorNodes = [...yellowNodes, ...blueNodes];

      if (allColorNodes.length > 0) {
        gsap.set(allColorNodes, { opacity: 0 });

        const tl = gsap.timeline({
          delay: 1.2 // Overall delay for the sequence
        });

        // Step 1: Rapid progressive ignition to peak twinkle opacity
        tl.to(allColorNodes, {
          opacity: 0.9,    // Target peak twinkle opacity
          duration: 0.3,   // Adjusted duration for ignition
          stagger: 0.02,   // Fast stagger for progressive, but quick, lighting
          ease: 'linear',  // Changed ease for more constant ignition speed
        });

        // Step 2: Continuous twinkle, overlapping to ensure seamless transition.
        tl.to(allColorNodes, {
          opacity: 0.35, // This is the "other end" of the yoyo from the current ~0.9 opacity
          duration: 1.3, 
          stagger: {
            each: 0.12,   
            from: "random",
          },
          ease: 'sine.inOut',
          yoyo: true,       
          repeat: -1,     
        }, "-=0.34s"); // Adjusted overlap: (18-1)*0.02 = 0.34. Ignition ends for 1st at 0.3s. Yoyo block starts for 1st at ( (17*0.02)+0.3 - 0.34 ) = 0.3s.
      }
    }
  }, [svgMarkup]);

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-[90vh] bg-white text-slateText overflow-hidden p-4 md:p-8 pt-16 md:pt-20 lg:pt-8">
      {/* Left Column: Text Content (approx 2/3 width on lg screens) */}
      <motion.div 
        className="relative z-10 flex flex-col items-center lg:items-start justify-center text-center lg:text-left w-full lg:w-2/3 xl:w-3/5 p-4 md:pr-8 lg:pr-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Removed Small SVGs */}

        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-6 text-slate-800 leading-tight">
          Transformamos tu
          <AnimatePresence mode="wait">
            <motion.span
              ref={dynamicTextSpanRef}
              key={dynamicWords[currentIndex]} // Keyed for AnimatePresence
              // Conditional initial for Framer Motion based on GSAP's initial animation completion
              initial={isInitialLoad.current && currentIndex === 0 ? { opacity: 0, y: 25, scale: 0.95 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, scale: 1 }} // Ensure scale is 1 for Framer's animate state
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }} // Framer's duration for cycling
              className="inline-block ml-1 md:ml-2 text-sky-600"
            >
              {dynamicWords[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-10 max-w-xl text-slate-600">
          Consultoría digital de vanguardia para impulsar tu crecimiento.
        </p>

        <motion.button 
          className="bg-signalYellow text-slate-800 font-semibold font-body text-base md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-xl shadow-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-signalYellow focus:ring-opacity-50 transition-colors duration-300 transform hover:scale-105 flex flex-col items-center self-center lg:self-start"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="w-5 h-5 mb-1" strokeWidth={2} /> 
          Descubre Cómo
        </motion.button>

        {/* Removed Small SVGs */}
      </motion.div>

      {/* Right Column: Main SVG Graphic (approx 1/3 width on lg screens) */}
      <motion.div 
        className="relative z-0 flex items-center justify-center w-full lg:w-1/3 xl:w-2/5 mt-10 lg:mt-0 p-4 h-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div 
          ref={svgContainerRef}
          className="w-full h-auto max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl max-h-[85vh] object-contain" 
        >
          {svgMarkup && <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 