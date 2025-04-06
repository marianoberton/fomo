"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ClientParticles from "@/components/ClientParticles";
import { AnimatedText, Message } from "./animated-text";

export function HeroSection() {
  // For animated message display
  const [currentMessage, setCurrentMessage] = useState<Message>({
    top: "TRANSFORMA",
    middle: "TU",
    bottom: "FUTURO"
  });

  return (
    <section className="relative overflow-visible min-h-[85vh] flex items-center justify-center pt-20 pb-32 w-full">
      <div className="absolute inset-0 bg-grid-small-neutral-200/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Background elements animados */}
      <motion.div
        className="absolute w-full h-full inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
            filter: ["blur(40px)", "blur(60px)", "blur(40px)"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full bg-accent/20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
            filter: ["blur(50px)", "blur(30px)", "blur(50px)"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Nuevos elementos decorativos */}
        <motion.div
          className="absolute top-1/4 right-[15%] w-20 h-20 rounded-blob bg-blue-400/30"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-[15%] left-[10%] w-16 h-16 rounded-blob bg-yellow-400/30"
          animate={{
            y: [0, 12, 0],
            rotate: [0, -8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>
      
      <div className="w-full max-w-[1800px] px-4 md:px-8 lg:px-12 xl:px-16 relative z-10 overflow-visible">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Text column */}
          <div className="w-full lg:w-[55%] xl:w-[50%] lg:pr-8 overflow-visible">
            <div className="overflow-visible relative">
              <motion.div 
                className="mb-4 overflow-visible"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <h1 className="mega-text relative z-10 min-h-[240px] sm:min-h-[280px] md:min-h-[350px] lg:min-h-[400px] flex flex-col justify-center overflow-visible">
                  <AnimatedText currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />
                </h1>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-8 md:mt-12 lg:mt-16"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ 
                duration: 0.8, 
                delay: 1.0,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <p className="max-w-full text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl font-body leading-relaxed mb-8">
                Automatización inteligente y soluciones de IA para empresas que buscan optimizar sus procesos y potenciar su crecimiento.
              </p>
            </motion.div>
          </div>
          
          {/* Image column */}
          <div className="w-full lg:w-[45%] xl:w-[50%] mt-6 lg:mt-0 flex justify-center lg:justify-end">
            <motion.div 
              className="flex items-center justify-center lg:justify-end w-full"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {/* Contenedor principal de la imagen con efecto 3D */}
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  rotateX: -5
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }}
                className="relative perspective-1000 flex items-center justify-center w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[430px] lg:h-[430px] xl:w-[500px] xl:h-[500px]"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Capa decorativa */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/20 via-primary/30 to-accent/30 -z-10 opacity-80"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [0.8, 0.87, 0.8], 
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Elementos decorativos flotantes con tamaños reducidos */}
                <motion.div
                  className="absolute top-[-5%] right-[-2%] w-12 h-12 bg-yellow-400/50 rounded-full z-20"
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute bottom-[-2%] left-[-4%] w-14 h-14 bg-pink-400/40 rounded-blob z-20"
                  animate={{
                    y: [0, 10, 0],
                    x: [0, -5, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                <motion.div
                  className="absolute top-[20%] left-[-8%] w-8 h-8 bg-green-400/40 rounded-blob z-20"
                  animate={{
                    y: [0, -8, 0],
                    x: [0, -3, 0],
                    rotate: [0, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                
                {/* Marco de la imagen - border con efecto de degradado animado */}
                <motion.div
                  className="relative z-10 rounded-xl overflow-hidden shadow-xl w-full h-full"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    {/* Fondo animado para la imagen */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 z-0"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                      }}
                    />
                    
                    {/* Use our PlaceholderImage or fallback to real image if available */}
                    <div className="relative z-10 w-full h-full">
                      <Image
                        src="/images/ilu_hero.png"
                        fill
                        alt="Ilustración Hero"
                        className="object-contain"
                        priority
                        onError={(e) => {
                          // Make element invisible if image load fails
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      
                      {/* Particles effect */}
                      <ClientParticles />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 