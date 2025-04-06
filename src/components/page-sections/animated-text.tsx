"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimate, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Text reveal animation for heading
export const AnimatedCharacters = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  // Para texto con múltiples palabras, separamos cada letra para animar individualmente
  const words = text.split(" ");
  
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{ 
                opacity: 0,
                y: 20,
                rotateY: 30,
                filter: "blur(8px)"
              }}
              animate={{ 
                opacity: 1,
                y: 0,
                rotateY: 0,
                filter: "blur(0px)"
              }}
              transition={{
                duration: 0.8,
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                ease: [0.2, 0.65, 0.3, 0.9]
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

// SplitText Animation Hook
export const useSplitTextAnimation = (text: string, options = {}) => {
  const el = useRef<HTMLDivElement>(null);
  const isInView = useInView(el, { once: false, amount: 0.5 });
  const [scope, animate] = useAnimate();
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    
    if (isInView && el.current) {
      const chars = [...el.current.querySelectorAll('.char')];
      
      gsap.fromTo(chars, 
        { 
          opacity: 0, 
          y: 20,
          rotationY: 30,
          filter: "blur(8px)" 
        },
        { 
          opacity: 1, 
          y: 0,
          rotationY: 0,
          filter: "blur(0px)",
          stagger: 0.03,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }
  }, [isInView]);
  
  return { ref: el, scope, isInView };
};

// Interface for the message structure
export interface Message {
  top: string;
  middle: string;
  bottom: string;
}

// AnimatedText component for the hero section
export function AnimatedText({ 
  currentMessage, 
  setCurrentMessage 
}: { 
  currentMessage: Message; 
  setCurrentMessage: React.Dispatch<React.SetStateAction<Message>>; 
}) {
  useEffect(() => {
    const messages = [
      {
        top: "IMPULSA",
        middle: "TU",
        bottom: "NEGOCIO"
      },
      {
        top: "POTENCIA",
        middle: "TU",
        bottom: "EMPRESA"
      },
      {
        top: "AUTOMATIZA",
        middle: "TUS",
        bottom: "PROCESOS"
      },
      {
        top: "REVOLUCIONA",
        middle: "TU",
        bottom: "INDUSTRIA"
      },
      {
        top: "TRANSFORMA",
        middle: "TU",
        bottom: "FUTURO"
      }
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setCurrentMessage(messages[index]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [setCurrentMessage]);
  
  return (
    <div className="flex flex-col items-start space-y-4 w-full overflow-visible">
      <AnimatePresence mode="wait">
        <motion.div
          key={`top-${currentMessage.top}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Contenedor con fondo azul */}
          <div className="relative inline-block px-6 py-3 rounded-xl bg-primary/10">
            <span 
              className="playful-text text-primary block text-[13vw] md:text-[11vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw] whitespace-nowrap soft-shadow"
            >
              {currentMessage.top}
            </span>
          </div>
          
          {/* Animación de entrada para el fondo */}
          <motion.div 
            className="absolute inset-0 rounded-xl bg-primary/10 -z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-4 w-full overflow-visible">
        <AnimatePresence mode="wait">
          <motion.span
            key={`middle-${currentMessage.middle}`}
            className="font-heading relative inline-block text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[5vw] whitespace-nowrap text-3d"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>{currentMessage.middle}</span>
            <motion.span
              className="absolute bottom-0 left-0 h-1 bg-accent w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={`bottom-${currentMessage.bottom}`}
            className="font-accent relative text-[13vw] md:text-[11vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw] whitespace-nowrap overflow-visible pr-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-accent)', fontWeight: 700 }}
          >
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-gradient-animated pr-2 inline-block">
                {currentMessage.bottom}
              </span>
              
              <motion.div
                className="absolute inset-0 rounded-xl bg-accent/5 -z-10 scale-110"
                animate={{ 
                  scale: [1.1, 1.15, 1.1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
} 