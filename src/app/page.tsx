// page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight, Cpu, BarChart2, Users, MessageSquare, ArrowRight, CheckCircle, Facebook } from "lucide-react";
import { motion, useAnimate, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "@/utils/SplitText";
import ClientParticles from "@/components/ClientParticles";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Text reveal animation for heading
const AnimatedCharacters = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
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
const useSplitTextAnimation = (text: string, options = {}) => {
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

export default function Home() {
  const heroBgRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const transformacionRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const practicaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Setup SplitText for word-by-word animation
    if (transformacionRef.current && digitalRef.current && practicaRef.current) {
      new SplitText(transformacionRef.current, { type: "chars", charsClass: "char" });
      new SplitText(digitalRef.current, { type: "chars", charsClass: "char" });
      new SplitText(practicaRef.current, { type: "chars", charsClass: "char" });
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center pt-28">
        <div className="absolute inset-0 bg-grid-small-neutral-200/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Background elements animados */}
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
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-10">
              <div className="overflow-hidden relative">
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  <h1 className="mega-text relative z-10">
                    {/* IMPULSA texto unificado en una línea */}
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="relative"
                    >
                      <span className="playful-text text-primary block">
                        IMPULSA
                      </span>
                      <motion.div
                        className="absolute -left-2 -right-2 top-0 bottom-0 rounded-xl bg-primary/10 -z-10"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      />
                    </motion.div>
                    
                    {/* TU NEGOCIO unificado en una línea */}
                    <motion.div
                      className="flex items-center mt-4"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <motion.span 
                        className="font-heading relative inline-block"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span>TU</span>
                        <motion.span
                          className="absolute bottom-0 left-0 h-1 bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.9, duration: 0.6 }}
                        />
                      </motion.span>
                      
                      <motion.span
                        className="font-accent ml-4 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          textShadow: [
                            "0 0 0px rgba(0,0,0,0)",
                            "0 0 10px rgba(0,187,214,0.5)",
                            "0 0 0px rgba(0,0,0,0)"
                          ]
                        }}
                        transition={{ 
                          opacity: { duration: 0.8, delay: 0.6 },
                          scale: { duration: 0.8, delay: 0.6 },
                          textShadow: { 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                          }
                        }}
                      >
                        <motion.div
                          className="relative z-10"
                          animate={{ 
                            y: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent bubbly-text inline-block text-[12vw] md:text-[8vw]">
                            NEGOCIO
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
                    </motion.div>
                  </h1>
                </motion.div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ 
                  duration: 0.8, 
                  delay: 1.0,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="max-w-[600px] text-muted-foreground text-xl md:text-2xl font-body leading-relaxed"
              >
                Marketing digital y desarrollo de software para empresas que quieren{" "}
                <motion.span 
                  className="text-primary font-medium relative"
                  whileInView={{
                    textShadow: [
                      "0 0 0px rgba(0,0,0,0)",
                      "0 0 8px rgba(0,102,255,0.5)",
                      "0 0 0px rgba(0,0,0,0)"
                    ]
                  }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop" 
                  }}
                >
                  crecer
                  <motion.span
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary/50"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  />
                </motion.span>{" "}
                en entornos digitales.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-col gap-4 min-[400px]:flex-row"
              >
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg" className="button-3d bg-primary text-white hover:bg-primary/90 font-medium text-base px-6 py-6 overflow-hidden group">
                    <Link href="#contacto" className="relative">
                      <motion.span 
                        className="absolute inset-0 bg-accent/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8 }}
                      />
                      <span className="relative z-10">Agendar una consulta</span>
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button asChild variant="outline" size="lg" className="border-2 border-primary/20 hover:bg-primary/10 hover:text-primary text-base px-6 py-6 overflow-hidden group">
                    <Link href="#servicios" className="relative">
                      <motion.span 
                        className="absolute inset-0 bg-primary/10"
                        initial={{ y: '100%' }}
                        whileHover={{ y: '0%' }}
                        transition={{ duration: 0.4 }}
                      />
                      <span className="relative z-10">Conocer servicios</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex items-center justify-center"
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
                className="relative perspective-1000 flex items-center justify-center"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Capa decorativa */}
                <motion.div
                  className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet-500/20 via-primary/30 to-accent/30 -z-10 opacity-80"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Elementos decorativos flotantes */}
                <motion.div
                  className="absolute top-[-10%] right-[-5%] w-16 h-16 bg-yellow-400/50 rounded-full z-20"
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute bottom-[-5%] left-[-8%] w-20 h-20 bg-pink-400/40 rounded-blob z-20"
                  animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
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
                  className="absolute top-[20%] left-[-12%] w-12 h-12 bg-green-400/40 rounded-blob z-20"
                  animate={{
                    y: [0, -10, 0],
                    x: [0, -5, 0],
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
                  className="absolute -inset-[2px] rounded-2xl overflow-hidden z-0"
                  style={{
                    backgroundImage: "linear-gradient(45deg, rgba(0,102,255,0.5), rgba(0,187,214,0.5), rgba(155,89,182,0.5))",
                    backgroundSize: "400% 400%"
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear"
                  }}
                />
                
                {/* La imagen principal */}
                <motion.div
                  className="relative z-10 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 102, 255, 0.25)"
                  }}
                >
                  {/* Efecto de brillo al pasar el cursor */}
                  <motion.div
                    className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  />
                  
                  {/* Contenedor de la imagen simplificado */}
                  <motion.div 
                    className="relative w-[450px] h-[450px] rounded-2xl overflow-hidden mx-auto"
                  >
                    {/* Fondo animado con gradiente */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-primary/30 z-0"
                      animate={{
                        backgroundImage: [
                          "linear-gradient(45deg, rgba(0,102,255,0.2), rgba(0,187,214,0.2))",
                          "linear-gradient(45deg, rgba(0,187,214,0.2), rgba(72,52,212,0.2))",
                          "linear-gradient(45deg, rgba(72,52,212,0.2), rgba(0,102,255,0.2))"
                        ]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Marco decorativo animado */}
                    <motion.div
                      className="absolute inset-[-8px] rounded-2xl z-0 image-border-gradient"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Este div crea el efecto de borde con gradiente rotativo */}
                    </motion.div>

                    {/* Contenedor de la imagen con efectos */}
                    <motion.div 
                      className="absolute inset-[3px] z-10 overflow-hidden rounded-2xl"
                      whileHover={{ 
                        scale: 1.03,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 rounded-2xl"
                        style={{
                          backgroundImage: "linear-gradient(135deg, rgba(0,102,255,0.1), rgba(0,187,214,0.05), rgba(155,89,182,0.1))"
                        }}
                        whileHover={{ opacity: 0.7 }}
                        animate={{
                          backgroundImage: [
                            "linear-gradient(135deg, rgba(0,102,255,0.1), rgba(0,187,214,0.05), rgba(155,89,182,0.1))",
                            "linear-gradient(135deg, rgba(0,187,214,0.05), rgba(155,89,182,0.1), rgba(0,102,255,0.1))",
                            "linear-gradient(135deg, rgba(155,89,182,0.1), rgba(0,102,255,0.1), rgba(0,187,214,0.05))"
                          ]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      />
                      
                      <div className="flex items-center justify-center w-full h-full">
                        <Image
                          src="/images/ilu_hero.png"
                          width={400}
                          height={400}
                          alt="Ilustración Hero - Marketing Digital"
                          className="object-contain filter-vibrant transition-all duration-300 max-w-full max-h-full"
                          priority
                          onError={(e) => {
                            // Si la imagen falla, hacemos visible el placeholder
                            e.currentTarget.style.opacity = "0";
                          }}
                        />
                      </div>
                      
                      {/* Efecto de resplandor en hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 blur-xl"
                        style={{
                          backgroundImage: "linear-gradient(to right, rgba(0,102,255,0.2), rgba(0,187,214,0.2))"
                        }}
                        whileHover={{ opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Partículas flotantes decorativas */}
                      <ClientParticles />
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Elementos de adorno tras la imagen */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full -z-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                <motion.div
                  className="absolute -top-2 left-10 w-24 h-24 bg-blue-500/10 rounded-blob -z-10"
                  animate={{ 
                    scale: [1, 0.9, 1],
                    opacity: [0.4, 0.7, 0.4],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                
                {/* Patrón punteado decorativo */}
                <svg 
                  className="absolute -right-8 -bottom-8 w-24 h-24 text-primary/40 -z-5" 
                  viewBox="0 0 100 100"
                >
                  <pattern 
                    id="dots" 
                    x="0" y="0" 
                    width="10" height="10" 
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="2" fill="currentColor" />
                  </pattern>
                  <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brief Description - Con SVG y animaciones */}
      <section className="py-28 px-4 relative overflow-hidden">
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
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center max-w-6xl mx-auto">
            <div className="text-center md:text-left space-y-8">
              {/* Split Text Animation for Title */}
              <div className="relative overflow-hidden">
                <h2 className="inline-block text-4xl md:text-5xl lg:text-6xl font-heading">
                  <motion.div 
                    ref={transformacionRef}
                    className="inline-block text-primary font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Transformación
                  </motion.div>
                  <motion.div 
                    ref={digitalRef}
                    className="inline-block text-foreground ml-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Digital
                  </motion.div>
                  <motion.div 
                    ref={practicaRef}
                    className="inline-block text-accent ml-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Práctica
                  </motion.div>
                </h2>
                
                {/* Animated underline with SVG path */}
                <svg className="w-full h-3 mt-2" viewBox="0 0 100 2" preserveAspectRatio="none">
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
                className="text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                En{" "}
                <motion.span
                  className="font-medium text-primary relative"
                  whileHover={{
                    color: "hsl(var(--accent))",
                    transition: { duration: 0.2 }
                  }}
                >
                  FOMO
                </motion.span>
                , diseñamos{" "}
                <motion.span
                  className="font-medium relative"
                  initial={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)))" }}
                  whileInView={{
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))"
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1 }}
                  style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  soluciones a medida
                </motion.span>{" "}
                para crecer con la tecnología.
              </motion.p>
              
              {/* Tags with SVG decorations */}
              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
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
                    className="relative bg-primary/10 px-6 py-3 rounded-full group"
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Button 
                  asChild 
                  variant="ghost" 
                  size="lg" 
                  className="font-medium hover:bg-primary/10 hover:text-primary relative mt-6 overflow-hidden group"
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
            
            {/* Illustration Column - Updated with the new image */}
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
                  className="relative z-10 rounded-lg overflow-hidden shadow-xl"
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
                  <Image
                    src="/images/ilu_hero_1.png"
                    width={500}
                    height={500}
                    alt="Transformación Digital - Ilustración"
                    className="relative z-10 w-full object-contain"
                    priority
                  />
                  
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

      {/* Services Highlight */}
      <section id="servicios" className="py-28 px-4 bg-secondary/5 relative overflow-hidden">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="services-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect x="9.5" y="9.5" width="1" height="1" fill="rgba(0,102,255,0.3)" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#services-grid)" />
          </svg>
          <motion.div 
            className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary/10 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-accent/10 opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [45, 0, 45]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-sm font-medium text-accent tracking-wider uppercase block mb-2"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Lo que hacemos
            </motion.span>
            
            <h2 className="section-title relative inline-block">
              Nuestros Servicios
              <motion.div 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </h2>
            
            <motion.p 
              className="text-muted-foreground max-w-xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Soluciones personalizadas para impulsar la transformación digital de tu pyme.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.div variants={slideUp}>
              <ServiceCard 
                title="Diagnóstico Digital Personalizado"
                description="Relevamiento de procesos, análisis de datos, identificación de oportunidades."
                icon={<BarChart2 className="h-10 w-10" />}
                color="primary"
                pattern="M20,20 L80,20 L80,80 L20,80 Z"
              />
            </motion.div>
            
            <motion.div variants={slideUp}>
              <ServiceCard 
                title="Optimización de Procesos"
                description="Automatización de áreas clave y adopción de metodologías ágiles."
                icon={<Cpu className="h-10 w-10" />}
                color="accent"
                pattern="M50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 C20,30 30,20 50,20 Z"
              />
            </motion.div>
            
            <motion.div variants={slideUp}>
              <ServiceCard 
                title="Inteligencia Artificial Aplicada"
                description="IA práctica: chatbots 24/7, análisis predictivo, automatización de tareas."
                icon={<MessageSquare className="h-10 w-10" />}
                color="blue"
                pattern="M20,20 L80,20 L50,80 Z"
              />
            </motion.div>
            
            <motion.div variants={slideUp}>
              <ServiceCard 
                title="Acompañamiento y Capacitación"
                description="Soporte continuo, evolución gradual de soluciones y capacitación."
                icon={<Users className="h-10 w-10" />}
                color="purple"
                pattern="M20,50 Q50,20 80,50 Q50,80 20,50 Z"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl z-10 relative">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="large-text">¿Listo para transformar tu negocio?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Solicita un diagnóstico gratuito y descubre cómo la tecnología puede impulsar tu pyme.
            </p>
            <Button asChild size="lg" variant="primary" className="font-medium px-8 py-6 text-lg">
              <Link href="#contacto">Solicitar Diagnóstico</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="quienes-somos" className="py-28 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="about-dots" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#about-dots)" />
          </svg>
          
          {/* Animated decorative elements */}
          <motion.div 
            className="absolute right-20 bottom-20 w-64 h-64 rounded-full bg-primary/5"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
          
          <motion.div 
            className="absolute left-20 top-40 w-40 h-40 rounded-full bg-accent/5"
            animate={{
              scale: [1.1, 1, 1.1],
              y: [0, -20, 0],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100 
              }}
            >
              <div className="relative perspective-1000">
                {/* Decorative frame with 3D effect */}
                <motion.div 
                  className="absolute -inset-4 border border-primary/30 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    rotateX: 5,
                    rotateY: -5,
                    scale: 1.02,
                    borderColor: "hsl(var(--accent) / 0.3)"
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                />
                
                <motion.div 
                  className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-accent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                
                <motion.div 
                  className="bg-secondary/5 p-10 rounded-lg backdrop-blur-sm"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ 
                    boxShadow: "0 25px 50px -12px rgba(0, 102, 255, 0.15)",
                    y: -5
                  }}
                >
                  <motion.h3 
                    className="font-accent text-3xl mb-6 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.span
                      animate={{
                        color: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      FOMO
                    </motion.span>
                  </motion.h3>
                  
                  <motion.p 
                    className="text-2xl font-heading italic mb-6 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      "Fear Of Missing Out"
                    </motion.span>
                  </motion.p>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {[
                      { value: "✓", label: "Experiencia comprobada", delay: 0.1 },
                      { value: "50+", label: "Proyectos exitosos", delay: 0.2 },
                      { value: "24/7", label: "Soporte técnico", delay: 0.3 },
                      { value: "100%", label: "Compromiso", delay: 0.4 }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex flex-col items-center group"
                        variants={fadeIn}
                        transition={{ delay: item.delay }}
                        whileHover={{ y: -5 }}
                      >
                        <motion.div 
                          className="text-4xl font-bold text-primary mb-2 relative"
                          whileHover={{
                            textShadow: "0 0 10px rgba(0,102,255,0.5)",
                            scale: 1.1
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {item.value}
                          <motion.div
                            className="absolute -inset-2 rounded-full bg-primary/10 -z-10"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 0.7 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.2, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <motion.div 
                          className="text-sm text-muted-foreground"
                          whileHover={{ color: "hsl(var(--primary))" }}
                        >
                          {item.label}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring", 
                stiffness: 100 
              }}
            >
              <div className="relative overflow-hidden">
                <motion.span 
                  className="text-sm font-medium text-accent tracking-wider uppercase block mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Nuestra historia
                </motion.span>
                
                <motion.h2 
                  className="section-title relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Quiénes Somos
                </motion.h2>
                
                <motion.div 
                  className="h-1 w-20 bg-accent mt-2"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
              
              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-muted-foreground text-lg leading-relaxed"
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  Nuestra visión es un futuro donde ninguna pyme se quede atrás en la era digital. 
                  Nos enfocamos en ofrecer <motion.span 
                    className="text-primary font-medium"
                    whileHover={{ 
                      color: "hsl(var(--accent))",
                      transition: { duration: 0.2 }
                    }}
                  >soluciones prácticas</motion.span> que generan resultados tangibles: 
                  incremento en ventas, reducción de costos y optimización de procesos.
                </motion.p>
                
                <motion.p 
                  className="text-muted-foreground text-lg leading-relaxed"
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  En <motion.span 
                    className="font-accent text-primary"
                    whileHover={{ 
                      textShadow: "0 0 8px rgba(0,102,255,0.5)",
                      transition: { duration: 0.2 }
                    }}
                  >FOMO</motion.span> (Fear Of Missing Out), combinamos experiencia en IA, desarrollo full stack y 
                  conocimiento profundo de las necesidades de las pymes. Nuestro compromiso es 
                  transformar tu negocio con un enfoque personalizado y soluciones a medida.
                </motion.p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button asChild variant="outline" className="group relative overflow-hidden">
                  <Link href="#casos-exito" className="flex items-center gap-1">
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Ver Casos de Éxito
                    </motion.span> 
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section id="casos-exito" className="py-28 px-4 bg-secondary/5 relative overflow-hidden">
        {/* Background SVG patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="success-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 L 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#success-grid)" />
          </svg>

          {/* Animated shapes */}
          <div className="absolute w-full h-full overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: `${30 + Math.random() * 70}px`,
                  height: `${30 + Math.random() * 70}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: "blur(8px)"
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-sm font-medium text-accent tracking-wider uppercase block mb-2"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Proyectos destacados
            </motion.span>
            
            <h2 className="section-title relative inline-block">
              Casos de Éxito
              <motion.div 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </h2>
            
            <motion.p 
              className="text-muted-foreground max-w-xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Empresas que ya transformaron su negocio con FOMO.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.div variants={slideUp}>
              <CaseStudyCard 
                title="Pyme de Servicios"
                description="Automatización de nóminas, gestión de proyectos y chatbot interno."
                result="Ahorro del 30% en tiempo administrativo."
                icon={<Users className="h-8 w-8" />}
                color="primary"
              />
            </motion.div>
            
            <motion.div variants={slideUp}>
              <CaseStudyCard 
                title="Automatización de Licitaciones"
                description="Scraper para obtener información del Gobierno de la Ciudad."
                result="Reducción del 65% en tiempo de búsqueda."
                icon={<Cpu className="h-8 w-8" />}
                color="accent"
              />
            </motion.div>
            
            <motion.div variants={slideUp}>
              <CaseStudyCard 
                title="Bot de Auto-Oferta"
                description="Automatización de tareas repetitivas para comercio electrónico."
                result="Incremento del 22% en conversiones."
                icon={<MessageSquare className="h-8 w-8" />}
                color="blue"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="py-28 px-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pricing-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pricing-grid)" />
          </svg>
          
          {/* Animated gradient blobs */}
          <motion.div
            className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 opacity-30 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              filter: ["blur(70px)", "blur(90px)", "blur(70px)"]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full bg-accent/10 opacity-20 -z-10"
            animate={{
              scale: [1.2, 1, 1.2],
              y: [0, 50, 0],
              filter: ["blur(60px)", "blur(80px)", "blur(60px)"]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-sm font-medium text-accent tracking-wider uppercase block mb-2"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Crecimiento continuo
            </motion.span>
            
            <h2 className="section-title relative inline-block">
              Planes y Abonos
              <motion.div 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </h2>
            
            <motion.p 
              className="text-muted-foreground max-w-xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Acompañamiento constante para mejoras progresivas y soporte permanente.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.div variants={slideUp}>
              <PlanCard 
                title="Plan Básico"
                price="USD 200/mes"
                color="blue"
                features={[
                  "Hasta 10 horas de soporte al mes",
                  "Mantenimiento de automatizaciones sencillas",
                  "Reporte mensual de oportunidades"
                ]}
              />
            </motion.div>
            
            <motion.div variants={slideUp}>
              <PlanCard 
                title="Plan Profesional"
                price="USD 500/mes"
                color="primary"
                features={[
                  "Hasta 25 horas mensuales",
                  "Automatizaciones de complejidad media",
                  "1 reunión de seguimiento mensual",
                  "KPI detallados"
                ]}
                highlighted
              />
            </motion.div>
            
            <motion.div variants={slideUp}>
              <PlanCard 
                title="Plan Premium"
                price="USD 1000+/mes"
                color="accent"
                features={[
                  "Horas ampliadas",
                  "Servicios avanzados (IA compleja, integraciones)",
                  "Reuniones quincenales",
                  "Soporte prioritario 24/7"
                ]}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button asChild size="lg" className="font-medium group relative overflow-hidden">
              <Link href="#contacto" className="flex items-center gap-2">
                <span className="relative z-10">Consulta tu plan a medida</span> 
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 -z-10 bg-primary/10 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-28 px-4 bg-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
          <div className="absolute left-0 top-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Contacto</h2>
              <div className="h-1 w-16 bg-accent mb-6"></div>
              <p className="text-muted-foreground mb-8">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
              
              <div className="space-y-6 pt-4">
                <motion.div 
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-primary/10 p-2 rounded-md text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-muted-foreground">+54 11 3906-6421</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-primary/10 p-2 rounded-md text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">info@fomo.com.ar</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-primary/10 p-2 rounded-md text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Dirección</h3>
                    <p className="text-muted-foreground">Av. Cordoba 1886, Buenos Aires, Argentina</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-background p-8 rounded-lg shadow-lg backdrop-blur-sm z-10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                    <input 
                      id="name" 
                      type="text" 
                      className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                  <input 
                    id="subject" 
                    type="text" 
                    className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full py-6 text-lg font-medium">Enviar Mensaje</Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Plan Card Component
function PlanCard({ title, price, features, highlighted = false, color = "primary" }: { title: string; price: string; features: string[]; highlighted?: boolean; color?: string }) {
  return (
    <Card 
      className={`h-full transition-all overflow-hidden relative backdrop-blur-sm border-border/50 ${
        highlighted ? 'border-accent shadow-lg shadow-accent/10 scale-105 z-10' : 'hover:shadow-xl border-border/30'
      } hover:translate-y-[-8px] group`}
    >
      {highlighted && (
        <motion.div 
          className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent to-primary"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      )}
      
      {/* Background glow effect */}
      <motion.div 
        className={`absolute -z-10 inset-0 bg-gradient-to-br from-${color}/5 via-transparent to-${color}/10 opacity-0 group-hover:opacity-100`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Top circular decoration */}
      <motion.div 
        className={`absolute -top-32 -right-32 w-64 h-64 rounded-full bg-${color}/5 opacity-0 group-hover:opacity-100`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      
      <CardHeader className={`${highlighted ? `bg-${color}/10` : ''} relative`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle className="text-xl font-bold relative inline-flex">
            {title}
            <motion.span 
              className={`absolute -bottom-1 left-0 right-full h-[2px] bg-${color}/50`}
              initial={{ scaleX: 0, originX: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </CardTitle>
        </motion.div>
        
        <motion.div 
          className={`text-2xl font-bold mt-2 ${highlighted ? `text-${color}` : `text-${color}`}`}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10, 
            delay: 0.4 
          }}
        >
          {price}
        </motion.div>
        
        {/* Subtle animated pattern */}
        <svg 
          className="absolute top-0 right-0 w-24 h-24 text-foreground/5 -z-10" 
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern 
            id={`plan-pattern-${title}`} 
            x="0" y="0" 
            width="10" height="10" 
            patternUnits="userSpaceOnUse"
          >
            <circle cx="5" cy="5" r="1" fill="currentColor" />
          </pattern>
          <motion.rect 
            width="100%" 
            height="100%" 
            fill={`url(#plan-pattern-${title})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </svg>
      </CardHeader>
      
      <CardContent>
        <motion.ul 
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start gap-2 group/item"
              variants={fadeIn}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <motion.div
                className={`h-5 w-5 text-${color} flex-shrink-0 mt-0.5`}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                  color: `hsl(var(--${highlighted ? 'accent' : color}))` 
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
              
              <motion.span 
                className="text-muted-foreground group-hover/item:text-foreground transition-colors"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
        
        {highlighted && (
          <motion.div 
            className="mt-6 pt-4 border-t border-border/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-sm text-accent font-medium">Plan Recomendado</span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// Service Card Component
function ServiceCard({ title, description, icon, color, pattern }: { title: string; description: string; icon: React.ReactNode; color: string; pattern: string }) {
  return (
    <Card className="h-full border border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:shadow-xl hover:translate-y-[-5px] group relative overflow-hidden">
      {/* Decorative pattern SVG */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg viewBox="0 0 100 100" className={`text-${color}`}>
          <motion.path
            d={pattern}
            fill="currentColor"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </div>
      
      {/* Hover effect gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent to-primary/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <CardHeader>
        <motion.div 
          className={`text-${color} mb-4 group-hover:text-accent transition-colors duration-300 relative`}
          whileHover={{ 
            scale: 1.1,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          {/* Decorative circle behind the icon */}
          <motion.div 
            className={`absolute inset-0 bg-${color}/10 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100`}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          {/* Icon */}
          <motion.div
            initial={{ rotateY: 0 }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {icon}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle className="text-xl font-bold relative inline-block">
            {title}
            <motion.div 
              className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-${color}/40 origin-left`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </CardTitle>
        </motion.div>
      </CardHeader>
      
      <CardContent>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </motion.div>
        
        <motion.div 
          className="mt-6 flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div 
            className={`text-${color} rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity`}
            whileHover={{ 
              scale: 1.2, 
              boxShadow: "0 0 10px rgba(0,102,255,0.3)" 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

// Case Study Card Component
function CaseStudyCard({ title, description, result, icon, color }: { title: string; description: string; result: string; icon: React.ReactNode; color: string }) {
  return (
    <Card className="h-full transition-all hover:shadow-xl hover:translate-y-[-8px] overflow-hidden group relative border border-border/50 bg-card/50 backdrop-blur-sm">
      {/* Decorative circular background */}
      <motion.div 
        className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-${color}/5 z-0 opacity-0 group-hover:opacity-100`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      
      {/* Top image section */}
      <motion.div 
        className={`h-48 bg-gradient-to-br from-${color}/20 to-background/80 flex items-center justify-center relative overflow-hidden`}
        whileHover={{ 
          background: `linear-gradient(135deg, hsl(var(--${color}) / 0.3), hsl(var(--${color}) / 0.1))`
        }}
      >
        {/* Animated background pattern */}
        <svg className="absolute inset-0 w-full h-full text-foreground/5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id={`case-pattern-${title}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="currentColor" />
          </pattern>
          <motion.rect 
            width="100%" 
            height="100%" 
            fill={`url(#case-pattern-${title})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </svg>
        
        {/* Circular icon */}
        <motion.div 
          className={`relative z-10 w-24 h-24 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-${color} shadow-lg border border-${color}/20 group-hover:scale-110 transition-transform duration-300`}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
          whileHover={{ 
            boxShadow: `0 0 30px hsla(var(--${color}) / 0.3)`,
            scale: 1.1
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        
        {/* Light beam effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-y-12 z-0"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>
      
      <CardHeader className="pb-2">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardTitle className="text-xl font-bold relative inline-flex">
            {title}
            <motion.span 
              className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-${color}/50`}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
          </CardTitle>
        </motion.div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </motion.div>
        
        <motion.div 
          className={`pt-4 border-t border-border/50 text-${color} font-medium flex items-center gap-2`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, 10, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            <CheckCircle className="h-5 w-5" />
          </motion.div>
          <motion.p 
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {result}
          </motion.p>
        </motion.div>
      </CardContent>
    </Card>
  );
}