"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function DescriptionSection() {
  const transformacionRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const practicaRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="descripcion" className="py-20 md:py-28 px-4 relative overflow-hidden w-full">
      {/* SVG background pattern */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      
      {/* Floating Elements SVG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-10 right-10 w-40 h-40 text-primary/10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            animate={{ 
              r: [30, 35, 30],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        <svg className="absolute bottom-20 left-20 w-32 h-32 text-accent/10" viewBox="0 0 100 100">
          <motion.path 
            d="M20,50 Q50,10 80,50 Q50,90 20,50 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            animate={{
              d: [
                "M20,50 Q50,10 80,50 Q50,90 20,50 Z",
                "M25,50 Q50,20 75,50 Q50,80 25,50 Z",
                "M20,50 Q50,10 80,50 Q50,90 20,50 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-full h-full text-primary/5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#gradient)" />
          </svg>
        </motion.div>
      </div>
      
      {/* Text Content */}
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center mx-auto">
          <div className="text-center md:text-left space-y-8 relative">
            {/* Fondo sólido detrás del texto */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm rounded-2xl -m-6 p-6 shadow-sm border border-border/5 z-0"></div>
            
            {/* Split Text Animation for Title */}
            <div className="relative overflow-hidden z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading leading-tight">
                <motion.div 
                  ref={transformacionRef}
                  className="inline-block text-primary font-medium text-gradient"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Transformación
                </motion.div>
                <br className="md:hidden" />
                <motion.div 
                  ref={digitalRef}
                  className="inline-block text-foreground ml-0 md:ml-2 font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Digital
                </motion.div>
                <br className="md:hidden" />
                <motion.div 
                  ref={practicaRef}
                  className="inline-block text-accent ml-0 md:ml-2 animated-gradient"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Práctica
                </motion.div>
              </h2>
              
              {/* Animated underline with SVG path */}
              <svg className="w-full h-3 mt-4" viewBox="0 0 100 2" preserveAspectRatio="none">
                <motion.path 
                  d="M0,1 L100,1" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                />
                
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Description with subtle animation */}
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-full relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              En{" "}
              <motion.span
                className="font-medium text-primary relative animated-underline"
                whileHover={{
                  color: "hsl(var(--accent))",
                  transition: { duration: 0.2 }
                }}
              >
                FOMO
              </motion.span>
              , diseñamos{" "}
              <motion.span
                className="font-medium relative inline-block text-gradient-animated"
                initial={{ 
                  opacity: 0,
                  backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)))"
                }}
                whileInView={{
                  opacity: 1,
                  backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))"
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                soluciones a medida
              </motion.span>{" "}
              para crecer con la tecnología.
            </motion.p>
            
            {/* Tags with SVG decorations */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center md:justify-start relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {[
                { text: "IA", icon: "M50,20 L80,50 L50,80 L20,50 Z" },
                { text: "Automatizaciones", icon: "M20,50 C20,30 30,20 50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 Z" },
                { text: "Estrategias", icon: "M20,20 L80,20 L80,80 L20,80 Z" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative bg-primary/10 px-6 py-3 rounded-full group hover-3d"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.9 + (index * 0.1)
                  }}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "hsl(var(--primary) / 0.15)"
                  }}
                >
                  <span className="font-medium text-primary relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 100 100">
                      <motion.path 
                        d={item.icon} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </svg>
                    {item.text}
                  </span>
                  
                  {/* Hover effect with SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <motion.path 
                      d="M0,15 C20,5 80,5 100,15" 
                      stroke="hsl(var(--primary) / 0.3)" 
                      strokeWidth="1" 
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileHover={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Button with SVG arrow */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="font-medium hover:bg-primary/10 hover:text-primary relative mt-6 overflow-hidden group button-3d"
              >
                <Link href="#quienes-somos" className="flex items-center gap-2">
                  <span>Conocé más sobre nosotros</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "easeInOut" 
                    }}
                  >
                    <ChevronRight size={18} className="text-primary" />
                  </motion.div>
                  
                  {/* SVG path trace animation */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <motion.path 
                      d="M0,25 C30,15 70,15 100,25" 
                      stroke="hsl(var(--primary) / 0.2)" 
                      strokeWidth="1" 
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileHover={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </svg>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Illustration Column */}
          <motion.div
            className="relative order-first md:order-last"
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* SVG decorative frame */}
              <svg className="absolute -inset-4 text-primary/10 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.rect 
                  x="0" y="0" width="100" height="100" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
                
                <motion.circle 
                  cx="0" cy="0" r="5" 
                  fill="currentColor"
                  animate={{ 
                    cx: [0, 100, 100, 0, 0],
                    cy: [0, 0, 100, 100, 0]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </svg>
              
              {/* The main image in a decorative container */}
              <motion.div
                className="relative z-10 rounded-lg overflow-hidden shadow-xl perspective-container"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Background pattern with SVG */}
                <svg className="absolute inset-0 w-full h-full z-0 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
                
                {/* The new image */}
                <div className="illustration-highlight">
                  <Image
                    src="/images/ilu_hero_1.png"
                    width={480}
                    height={480}
                    alt="Transformación Digital - Ilustración"
                    className="relative z-10 w-full object-contain"
                    priority
                  />
                </div>
                
                {/* SVG animated highlights */}
                <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.circle 
                    cx="30" cy="30" r="10" 
                    fill="hsl(var(--primary) / 0.1)"
                    animate={{ 
                      r: [10, 15, 10],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.circle 
                    cx="70" cy="70" r="15" 
                    fill="hsl(var(--accent) / 0.1)"
                    animate={{ 
                      r: [15, 20, 15],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </svg>
              </motion.div>
              
              {/* Decorative elements */}
              <svg className="absolute -bottom-6 -right-6 w-24 h-24 text-accent/20 z-0" viewBox="0 0 100 100">
                <motion.path 
                  d="M20,20 C40,0 60,0 80,20 C100,40 100,60 80,80 C60,100 40,100 20,80 C0,60 0,40 20,20 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                  animate={{ 
                    d: [
                      "M20,20 C40,0 60,0 80,20 C100,40 100,60 80,80 C60,100 40,100 20,80 C0,60 0,40 20,20 Z",
                      "M25,25 C45,15 55,15 75,25 C85,45 85,55 75,75 C55,85 45,85 25,75 C15,55 15,45 25,25 Z",
                      "M20,20 C40,0 60,0 80,20 C100,40 100,60 80,80 C60,100 40,100 20,80 C0,60 0,40 20,20 Z"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 