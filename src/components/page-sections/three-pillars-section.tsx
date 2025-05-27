"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle,
  Target,
  Hexagon,
  Settings, 
  Zap,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PillarData {
  id: string;
  icon: React.ElementType;
  title: string;
  promise: string;
  bullets: string[];
  details: string[];
  pictogram: React.ElementType;
  color: string;
  bgColor: string;
  accentColor: string;
}

// Predefined particle positions to avoid hydration mismatch - REDUCED for performance
const particlePositions = [
  { left: 25.7, top: 21.3 },
  { left: 68.1, top: 49.2 },
  { left: 79.5, top: 48.1 },
  { left: 55.2, top: 20.1 },
  { left: 51.0, top: 38.9 },
  { left: 82.3, top: 16.4 },
  { left: 59.0, top: 30.1 },
  { left: 9.4, top: 26.0 },
  { left: 5.6, top: 21.5 },
  { left: 54.9, top: 65.3 },
  { left: 16.7, top: 29.2 },
  { left: 30.2, top: 14.2 }
];

const edgePositions = [
  { left: 8.5, top: 37.2 },
  { left: 7.8, top: 23.2 },
  { left: 96.0, top: 41.3 },
  { left: 90.8, top: 39.2 },
  { left: 93.2, top: 36.3 },
  { left: 97.2, top: 36.9 }
];

const microPositions = [
  { left: 64.4, top: 79.0 },
  { left: 56.6, top: 74.8 },
  { left: 65.1, top: 51.0 },
  { left: 44.3, top: 68.6 },
  { left: 65.3, top: 61.5 },
  { left: 48.4, top: 59.1 }
];

const floatingPositions = [
  { left: 15.3, top: 35.8 },
  { left: 78.6, top: 68.2 },
  { left: 32.4, top: 47.1 },
  { left: 84.7, top: 29.5 },
  { left: 21.9, top: 73.6 },
  { left: 66.2, top: 22.4 },
  { left: 43.8, top: 81.7 },
  { left: 89.1, top: 44.3 }
];

const sparklePositions = [
  { left: 22.1, top: 19.4 },
  { left: 77.8, top: 83.6 },
  { left: 41.2, top: 37.8 },
  { left: 86.5, top: 56.2 },
  { left: 19.7, top: 72.5 },
  { left: 64.3, top: 41.7 }
];

const pillarsData: PillarData[] = [
  {
    id: "procesos",
    icon: Hexagon,
    pictogram: Hexagon,
    title: "Procesos & Cultura Digital",
    promise: "Estandarizá y ordená tu operación.",
    color: "text-signalYellow",
    bgColor: "bg-signalYellow",
    accentColor: "signalYellow",
    bullets: [
      "Mapeo y optimización de procesos",
      "Gestión del cambio & training",
      "Selección de herramientas (CRM/ERP ligero, colaboración)",
      "Roadmap de transformación"
    ],
    details: [
      "Diagnóstico completo de procesos actuales y mapeo de workflows",
      "Identificación de cuellos de botella y oportunidades de mejora",
      "Plan de gestión del cambio con capacitación personalizada",
      "Selección e implementación de herramientas CRM y ERP adaptadas",
      "Diseño de nuevos procesos estandarizados y documentación",
      "Acompañamiento en la adopción de cultura digital"
    ]
  },
  {
    id: "automatizacion",
    icon: Settings,
    pictogram: Settings,
    title: "Automatización & Implementación Tech",
    promise: "La tecnología ejecuta lo que diseñamos.",
    color: "text-brilliantBlue",
    bgColor: "bg-brilliantBlue",
    accentColor: "brilliantBlue",
    bullets: [
      "Workflows n8n / RPA",
      "Web y e-commerce integrados a stock y ERP",
      "Chatbots y formularios inteligentes",
      "Integraciones API a medida"
    ],
    details: [
      "Automatización de procesos repetitivos con n8n y RPA",
      "Desarrollo de sitios web y e-commerce integrados a sistemas",
      "Implementación de chatbots para atención al cliente",
      "Creación de formularios inteligentes con validaciones",
      "Integraciones custom entre sistemas existentes",
      "Configuración de workflows automáticos end-to-end"
    ]
  },
  {
    id: "datos",
    icon: Zap,
    pictogram: Zap,
    title: "Datos, Dashboards & IA",
    promise: "Decidí con evidencia, no con intuición.",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    accentColor: "orange-500",
    bullets: [
      "Centro de Comando en Looker / Next.js",
      "KPIs y alertas en tiempo real",
      "Modelos predictivos / scoring",
      "Acompañamiento de mejora continua"
    ],
    details: [
      "Dashboards ejecutivos centralizados con métricas clave",
      "Sistema de alertas automáticas para situaciones críticas",
      "Modelos de machine learning para predicciones de negocio",
      "Sistemas de scoring automático para leads y clientes",
      "Reportes automatizados y análisis de tendencias",
      "Soporte continuo y optimización basada en datos"
    ]
  }
];

export default function ThreePillarsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  const activePillar = pillarsData[activeTab];
  const ActivePictogram = activePillar.pictogram;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Split the main title text
      if (titleRef.current) {
        const titleSplit = new SplitType(titleRef.current, { 
          types: 'words,chars',
          tagName: 'span'
        });

        // Animate title characters
        gsap.fromTo(titleSplit.chars, 
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "0% 50% -50px"
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            stagger: {
              amount: 1.5,
              from: "start"
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Special animation for the highlight span
        if (highlightRef.current) {
          const highlightSplit = new SplitType(highlightRef.current, { 
            types: 'chars',
            tagName: 'span'
          });

          gsap.fromTo(highlightSplit.chars,
            {
              opacity: 0,
              scale: 0,
              rotation: 180,
              color: "#ffffff"
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              color: "#F7D917", // signalYellow
              duration: 0.8,
              ease: "elastic.out(1, 0.3)",
              stagger: {
                amount: 0.8,
                from: "center"
              },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "top 10%",
                toggleActions: "play none none reverse"
              },
              delay: 1
            }
          );

          // Continuous glow effect for highlight
          gsap.to(highlightRef.current, {
            textShadow: "0 0 20px #F7D917, 0 0 40px #F7D917, 0 0 60px #F7D917",
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2
          });
        }
      }

      // Split and animate subtitle - simple one-time animation
      if (subtitleRef.current) {
        const subtitleSplit = new SplitType(subtitleRef.current, { 
          types: 'words',
          tagName: 'span'
        });

        gsap.fromTo(subtitleSplit.words,
          {
            opacity: 0,
            y: 30,
            filter: "blur(5px)"
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              amount: 0.8,
              from: "start"
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 15%",
              toggleActions: "play none none reverse"
            },
            delay: 0.5
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-plum relative overflow-hidden">
      {/* Clean solid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with GSAP Animations */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            viewport={{ once: true }}
          >
            <Target className="w-5 h-5" />
            Nuestros 3 Pilares
          </motion.div>
          
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
          >
            Todo lo que necesitás para{" "}
            <span 
              ref={highlightRef}
              className="text-signalYellow inline-block"
            >
              transformar tu PyME
            </span>
          </h2>
          
          <p 
            ref={subtitleRef}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Rediseñamos procesos, implementamos tecnología y convertimos datos en decisiones estratégicas
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-24 relative">
          {pillarsData.map((pillar, index) => {
            const Icon = pillar.icon;
            const Pictogram = pillar.pictogram;

            return (
              <motion.div 
                key={pillar.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
              >
                <Card className="relative bg-white border-2 border-white/20 hover:border-white/40 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden min-h-[520px] flex flex-col group">
                  <CardContent className="p-6 text-center flex-1 flex flex-col relative">
                    {/* Main floating particles - optimized */}
                    {particlePositions.map((pos, i) => (
                      <motion.div
                        key={i}
                        className={`absolute rounded-full ${
                          i < 4 ? 'w-1 h-1' : i < 8 ? 'w-1.5 h-1.5' : 'w-1 h-1'
                        } ${
                          pillar.accentColor === 'signalYellow' ? 'bg-yellow-300/40' :
                          pillar.accentColor === 'brilliantBlue' ? 'bg-blue-300/40' :
                          'bg-orange-300/40'
                        }`}
                        style={{
                          left: `${pos.left}%`,
                          top: `${pos.top}%`,
                        }}
                        animate={{ 
                          y: [0, -8, 0],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 4 + (i % 2),
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Edge particles - simplified */}
                    {edgePositions.map((pos, i) => (
                      <motion.div
                        key={`edge-${i}`}
                        className={`absolute w-1 h-1 rounded-full ${
                          pillar.accentColor === 'signalYellow' ? 'bg-yellow-400/50' :
                          pillar.accentColor === 'brilliantBlue' ? 'bg-blue-400/50' :
                          'bg-orange-400/50'
                        }`}
                        style={{
                          left: `${pos.left}%`,
                          top: `${pos.top}%`,
                        }}
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 3 + (i % 2),
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Corner accent particles - simplified */}
                    <motion.div
                      className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${
                        pillar.accentColor === 'signalYellow' ? 'bg-yellow-400/60' :
                        pillar.accentColor === 'brilliantBlue' ? 'bg-blue-400/60' :
                        'bg-orange-400/60'
                      }`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />

                    {/* Floating particles - reduced and simplified */}
                    {floatingPositions.slice(0, 4).map((pos, i) => (
                      <motion.div
                        key={`floating-${i}`}
                        className={`absolute w-1 h-1 rounded-full ${
                          pillar.accentColor === 'signalYellow' ? 'bg-yellow-300/35' :
                          pillar.accentColor === 'brilliantBlue' ? 'bg-blue-300/35' :
                          'bg-orange-300/35'
                        }`}
                        style={{
                          left: `${pos.left}%`,
                          top: `${pos.top}%`,
                        }}
                        animate={{
                          y: [0, -6, 0],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 5 + (i % 2),
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Sparkle particles - reduced */}
                    {sparklePositions.slice(0, 3).map((pos, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className={`absolute w-1 h-1 rounded-full ${
                          pillar.accentColor === 'signalYellow' ? 'bg-yellow-400/60' :
                          pillar.accentColor === 'brilliantBlue' ? 'bg-blue-400/60' :
                          'bg-orange-400/60'
                        }`}
                        style={{
                          left: `${pos.left}%`,
                          top: `${pos.top}%`,
                        }}
                        animate={{
                          scale: [0.5, 1.5, 0.5],
                          opacity: [0, 0.7, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Large Pictogram */}
                    <div className="mb-6 relative z-10">
                      <motion.div 
                        className={`relative mx-auto w-20 h-20 ${pillar.bgColor} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300`}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                        }}
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          },
                          hover: {
                            duration: 0.3,
                            ease: "easeOut"
                          }
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 3, -3, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.7
                          }}
                        >
                          <Pictogram className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </motion.div>
                        
                        {/* Simplified accent dot */}
                        <motion.div 
                          className={`absolute -top-2 -right-2 w-3 h-3 rounded-full shadow-lg ${
                            pillar.accentColor === 'signalYellow' ? 'bg-slate-800' :
                            pillar.accentColor === 'brilliantBlue' ? 'bg-yellow-400' :
                            'bg-blue-500'
                          }`}
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3
                          }}
                          whileHover={{
                            scale: 1.3,
                            transition: { duration: 0.3 }
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                        Pilar {index + 1}
                      </div>
                        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-3">
                        {pillar.title}
                        </h3>
                        <p className={`text-sm font-semibold ${pillar.color} leading-relaxed bg-slate-50 px-3 py-2 rounded-lg`}>
                    "{pillar.promise}"
                  </p>
                      </div>

                      <ul className="space-y-2.5 text-left flex-1">
                    {pillar.bullets.map((bullet, bulletIndex) => (
                          <motion.li 
                            key={bulletIndex} 
                            className="flex items-start gap-2.5 group/bullet"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: bulletIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className={`w-4 h-4 ${pillar.color} mt-0.5 flex-shrink-0 transition-all duration-300`} />
                            <span className="text-slate-600 font-medium leading-snug text-sm group-hover/bullet:text-slate-800 transition-colors duration-300">
                          {bullet}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <motion.div 
                        className={`w-full h-1 ${pillar.bgColor} rounded-full`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet Tabs Layout */}
        <div className="lg:hidden mb-20">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 rounded-2xl p-1 inline-flex gap-1 max-w-full overflow-x-auto">
              {pillarsData.map((pillar, index) => {
                const Pictogram = pillar.pictogram;
                return (
                  <Button
                    key={pillar.id}
                    onClick={() => setActiveTab(index)}
                    variant="ghost"
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap min-w-fit
                      ${activeTab === index 
                        ? 'bg-white text-plum shadow-lg scale-105' 
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <Pictogram className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium text-sm">
                      {pillar.title.split(' & ')[0]}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <Card className="bg-white border-2 border-white/20 rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 ${activePillar.bgColor} rounded-2xl mb-6 relative shadow-lg`}
                      animate={{
                        y: [0, -1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: activeTab * 0.7
                        }}
                      >
                        <ActivePictogram className="w-10 h-10 text-white" strokeWidth={1.5} />
                      </motion.div>
                      <motion.div 
                        className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full shadow-lg ${
                          activePillar.accentColor === 'signalYellow' ? 'bg-gradient-to-br from-slate-800 to-slate-900' :
                          activePillar.accentColor === 'brilliantBlue' ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                          'bg-gradient-to-br from-blue-500 to-blue-600'
                        }`}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Inner glow for mobile */}
                        <motion.div
                          className={`absolute inset-0.5 rounded-full ${
                            activePillar.accentColor === 'signalYellow' ? 'bg-yellow-400/30' :
                            activePillar.accentColor === 'brilliantBlue' ? 'bg-white/40' :
                            'bg-white/30'
                          }`}
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </motion.div>
                    <div className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">
                      Pilar {activeTab + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">
                      {activePillar.title}
                    </h3>
                    <p className={`text-lg font-semibold ${activePillar.color} leading-relaxed bg-slate-50 px-4 py-3 rounded-xl`}>
                      "{activePillar.promise}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    {activePillar.bullets.map((bullet, bulletIndex) => (
                      <motion.div 
                        key={bulletIndex} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: bulletIndex * 0.1 }}
                      >
                        <CheckCircle className={`w-6 h-6 ${activePillar.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-slate-600 font-medium leading-relaxed">
                          {bullet}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tab indicator */}
                  <div className="flex justify-center mt-8 gap-2">
                    {pillarsData.map((pillar, index) => (
                      <div 
                        key={index}
                        className={`
                          h-2 rounded-full transition-all duration-500
                          ${index === activeTab ? `${pillar.bgColor} w-8` : 'bg-slate-300 w-2'}
                        `}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white/10 rounded-2xl p-12 border border-white/20 shadow-lg max-w-5xl mx-auto">
            <div className="relative">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                ¿Cómo se conectan estos{" "}
                <span className="text-signalYellow">
                  3 pilares
                </span>{" "}
                en la práctica?
            </h3>
              <p className="text-white/90 text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              Cada pilar se complementa con los otros: no implementamos tecnología sin antes entender tus procesos, 
              y no rediseñamos procesos sin datos que justifiquen los cambios. Es un enfoque integral.
            </p>
              
              {/* Visual connection */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-signalYellow rounded-xl">
                    <Hexagon className="w-6 h-6 text-plum" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/60" />
                  <div className="flex items-center justify-center w-12 h-12 bg-brilliantBlue rounded-xl">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/60" />
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 