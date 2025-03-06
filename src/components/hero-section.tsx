"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default function HeroSection() {
  const titleRef = useRef(null);
  const baseTextRef = useRef(null);
  const rotatingTextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Register TextPlugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(TextPlugin);
    }

    // Animación del título base
    gsap.fromTo(
      baseTextRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Rotating text animation
    const rotatingPhrases = [
      "transforman tu negocio",
      "automatizan tus procesos",
      "impulsan tu inteligencia artificial",
      "elevan tu estrategia digital"
    ];

    let currentIndex = 0;
    
    const animateText = () => {
      gsap.to(rotatingTextRef.current, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          gsap.to(rotatingTextRef.current, {
            duration: 0,
            text: rotatingPhrases[currentIndex],
            onComplete: () => {
              gsap.to(rotatingTextRef.current, {
                duration: 0.5,
                opacity: 1,
                onComplete: () => {
                  setTimeout(() => {
                    currentIndex = (currentIndex + 1) % rotatingPhrases.length;
                    animateText();
                  }, 3000); // Wait 3 seconds before changing text
                }
              });
            }
          });
        }
      });
    };

    // Start the animation after a short delay
    setTimeout(() => {
      gsap.set(rotatingTextRef.current, { text: rotatingPhrases[0], opacity: 0 });
      animateText();
    }, 1000);

    // Animación del botón CTA con retraso
    gsap.fromTo(
      ctaRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <section className="relative flex-1 flex items-center justify-center bg-gradient-to-b from-secondary to-primary overflow-hidden">
      <div className="container relative z-10 flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-neutral">
            <span ref={baseTextRef} className="block mb-2">En FOMO, creamos soluciones que...</span>
            <span ref={rotatingTextRef} className="block text-primary"></span>
          </h1>
          
          <p 
            className="mx-auto max-w-[700px] text-neutral/80 md:text-xl"
          >
            Soluciones innovadoras para pymes argentinas: desarrollo web, automatizaciones, IA y más
          </p>
        </div>
        
        <div ref={ctaRef}>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-primary text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Descubre cómo podemos ayudarte
          </Button>
        </div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
    </section>
  );
}