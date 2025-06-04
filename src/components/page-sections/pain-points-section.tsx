"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, Database, EyeOff, TrendingDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PainPoint {
  icon: React.ElementType;
  title: string;
  shortTitle: string; // Compressed to 20 characters
  description: string;
  symptoms: string[];
  severity: number; // 1-10 scale for severity bar
}

const painPoints: PainPoint[] = [
  {
    icon: TrendingDown,
    title: "Procesos desordenados",
    shortTitle: "Procesos desordenados",
    description: "Cada empleado hace las cosas a su manera, no hay estándares claros",
    symptoms: [
      "Tareas que deberían tomar 1 hora toman 3",
      "Información perdida entre áreas", 
      "Clientes esperando respuestas que nunca llegan"
    ],
    severity: 9
  },
  {
    icon: Clock,
    title: "Horas perdidas en tareas manuales",
    shortTitle: "Horas perdidas en tareas manuales",
    description: "Tu equipo pierde tiempo en actividades repetitivas que podrían automatizarse",
    symptoms: [
      "Copiar datos de un sistema a otro manualmente",
      "Enviar el mismo email 20 veces al día",
      "Buscar información dispersa en WhatsApp y Excel"
    ],
    severity: 8
  },
  {
    icon: Database,
    title: "Datos dispersos por todos lados",
    shortTitle: "Datos dispersos por todos lados",
    description: "La información está fragmentada en múltiples herramientas sin conexión",
    symptoms: [
      "Ventas en Excel, stock en otro sistema",
      "Clientes repartidos entre WhatsApp, email y cuadernos",
      "Imposible tener una vista unificada del negocio"
    ],
    severity: 7
  },
  {
    icon: EyeOff,
    title: "Decisiones tomadas a ciegas",
    shortTitle: "Decisiones tomadas a ciegas",
    description: "Sin dashboards claros, decidís basándote en intuición en lugar de datos reales",
    symptoms: [
      "No sabés cuál producto realmente genera más ganancia",
      "Desconocés el costo real de adquirir un cliente",
      "Reaccionás a problemas en lugar de anticiparlos"
    ],
    severity: 10
  }
];

// Story steps for the scrollytelling (3 steps now)
const storySteps = [
  {
    badge: "¿Te suena familiar?",
    title: "Los dolores más comunes que vemos en PyMEs",
    subtitle: "Si te identificás con alguno de estos escenarios, no estás solo.",
    description: "Son los desafíos que resolvemos todos los días."
  },
  {
    badge: "La realidad de las PyMEs",
    title: "9 de cada 10 PyMEs luchan con estos problemas",
    subtitle: "No es tu culpa. Es el resultado de crecer sin herramientas adecuadas.",
    description: "La mayoría empieza con Excel y WhatsApp, pero llega un punto donde ya no alcanza."
  },
  {
    badge: "El costo real",
    title: "Cada día perdés tiempo, dinero y oportunidades",
    subtitle: "Los procesos desordenados no solo molestan, te cuestan caro.",
    description: "Empleados frustrados, clientes que se van, decisiones incorrectas por falta de datos reales."
  }
];

export default function PainPointsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  // Simplified scroll-based storytelling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Current step state
  const [currentStep, setCurrentStep] = useState(0);

  // State for controlling which card is expanded
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Update step based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      // Adjusted timing: storytelling occupies 80% of scroll, last 20% for transition
      const storytellingProgress = Math.min(progress / 0.8, 1);
      const stepIndex = Math.floor(storytellingProgress * storySteps.length);
      const clampedStep = Math.min(Math.max(stepIndex, 0), storySteps.length - 1);
      setCurrentStep(clampedStep);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  // Debug log
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const storytellingProgress = Math.min(progress / 0.8, 1);
      console.log('Scroll progress:', progress.toFixed(2), 'Storytelling:', storytellingProgress.toFixed(2), 'Current step:', currentStep);
    });
    return unsubscribe;
  }, [scrollYProgress, currentStep]);

  useEffect(() => {
    // No GSAP animations needed - Framer Motion handles all animations
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardThemes = {
    'efficiency': {
      bg: 'bg-signalYellow',
      accent: 'bg-slate-900',
      text: 'text-slate-900',
      badge: 'bg-slate-900 text-signalYellow',
      icon: 'bg-signalYellow',
      iconColor: 'text-signalYellow',
      border: 'border-yellow-600/20'
    },
    'visibility': {
      bg: 'bg-brilliantBlue',
      accent: 'bg-slate-900',
      text: 'text-white',
      badge: 'bg-white text-brilliantBlue',
      icon: 'bg-brilliantBlue',
      iconColor: 'text-brilliantBlue',
      border: 'border-blue-700/20'
    },
    'analysis': {
      bg: 'bg-plum',
      accent: 'bg-slate-900',
      text: 'text-white',
      badge: 'bg-white text-plum',
      icon: 'bg-plum',
      iconColor: 'text-plum',
      border: 'border-purple-700/20'
    },
    'competitiveness': {
      bg: 'bg-orange-500',
      accent: 'bg-orange-700',
      text: 'text-white',
      badge: 'bg-white text-orange-500',
      icon: 'bg-orange-700',
      iconColor: 'text-orange-500',
      border: 'border-orange-700/20'
    }
  }

  return (
    <div>
      {/* Enhanced Visual Separator - Flowing transition */}
      <section className="relative overflow-hidden">
        {/* Main gradient flow */}
        <div 
          className="h-40 sm:h-48 lg:h-56 relative"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(248, 250, 252, 0.95) 0%, 
                rgba(241, 245, 249, 0.9) 20%,
                rgba(0, 119, 182, 0.05) 40%,
                rgba(0, 119, 182, 0.15) 70%,
                rgba(49, 6, 41, 0.3) 100%
              )
            `
          }}
        >
          {/* Flowing wave overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              className="absolute bottom-0 w-full h-32" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,60 C300,100 400,20 600,60 C800,100 900,20 1200,60 L1200,120 L0,120 Z"
                fill="rgba(0, 119, 182, 0.15)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </svg>
            
            <svg 
              className="absolute bottom-0 w-full h-24" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,80 C200,40 500,80 600,40 C700,0 900,80 1200,40 L1200,120 L0,120 Z"
                fill="rgba(252, 205, 18, 0.2)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                viewport={{ once: true }}
              />
            </svg>
          </div>

          {/* Enhanced floating elements for transition */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/3 left-1/4 w-6 h-6 bg-brilliantBlue/20 rounded-full"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            
            <motion.div 
              className="absolute top-2/3 right-1/3 w-4 h-4 bg-signalYellow/25 rounded-full"
              animate={{ 
                y: [0, 12, 0],
                scale: [1, 0.8, 1],
                opacity: [0.25, 0.7, 0.25]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
            
            <motion.div 
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-plum/30 rounded-full"
              animate={{ 
                y: [0, -8, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            ></motion.div>

            <motion.div 
              className="absolute bottom-1/4 left-1/6 w-2 h-2 bg-orange-500/25 rounded-full"
              animate={{ 
                y: [0, -6, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            ></motion.div>
          </div>

          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 opacity-5 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
      </section>

      {/* Storytelling Section - Enhanced with video background */}
      <section 
        ref={sectionRef}
        className="relative"
        style={{ 
          height: '300vh'
        }}
      >
        {/* Video background with overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3) contrast(1.2)' }}
          >
            <source src="/videos/hero_video_ilu_blanca.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-plum/80 via-brilliantBlue/70 to-plum/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
        </div>

        {/* Enhanced background elements with video overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-signalYellow/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/8 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
        </div>

        {/* Sticky Header Content */}
        <div className="sticky top-0 h-screen flex items-center justify-center z-10 relative">
          <div className="w-full px-4 text-center relative z-20">
            <motion.div 
              key={`badge-${currentStep}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-signalYellow to-orange-500 text-slate-900 px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AlertTriangle className="w-5 h-5" />
              {storySteps[currentStep].badge}
            </motion.div>
            
            <motion.h2 
              key={`title-${currentStep}`}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {storySteps[currentStep].title}
            </motion.h2>
            
            <motion.p 
              key={`subtitle-${currentStep}`}
              className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {storySteps[currentStep].subtitle}
            </motion.p>

            <motion.p 
              key={`description-${currentStep}`}
              className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {storySteps[currentStep].description}
            </motion.p>

            {/* Progress indicator */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {storySteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'bg-signalYellow scale-125 shadow-lg shadow-signalYellow/50' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Debug info */}
            <div className="mt-8 text-sm text-slate-500">
              Step: {currentStep + 1}/{storySteps.length}
            </div>

            {/* Transition indicator when storytelling is about to end */}
            {currentStep === storySteps.length - 1 && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-sm text-white/70 mb-4">
                  Seguí scrolleando para ver los dolores específicos →
                </div>
                <motion.div
                  className="w-6 h-6 mx-auto text-signalYellow"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 13l3 3 7-7"/>
                    <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/>
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Cards Section - White background */}
      <section className="bg-white py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Section intro */}
          <motion.div
            className="text-center mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Estos son los 4 dolores principales
            </h3>
            <p className="text-lg text-slate-600">
              Cada uno tiene su nivel de impacto en tu negocio
            </p>
          </motion.div>

          {/* Pain Points Cards - with lateral margins */}
          <div className="flex gap-4 h-96 mx-8 lg:mx-16 xl:mx-24">
            {painPoints.map((point, index) => {
              const isExpanded = expandedCard === index;
              const isCompressed = expandedCard !== null && expandedCard !== index;
              
              const theme = cardThemes[['efficiency', 'visibility', 'analysis', 'competitiveness'][index] as keyof typeof cardThemes];
            
            return (
                <motion.div
                key={index}
                  className="cursor-pointer h-full"
                style={{
                    width: isExpanded ? '60%' : isCompressed ? '13.33%' : '25%'
                  }}
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  animate={{
                    width: isExpanded ? '60%' : isCompressed ? '13.33%' : '25%',
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.23, 1, 0.32, 1]
                }}
              >
                  <Card className={`relative ${theme.bg} border-2 ${theme.border} hover:border-opacity-80 transition-all duration-400 rounded-2xl overflow-hidden h-full ${isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}>
                    <CardContent className="p-6 h-full flex flex-col relative">
                      {!isExpanded ? (
                        // Compact State
                        <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="mb-4">
                            <div 
                              className={`w-16 h-16 mx-auto border-2 ${theme.border} rounded-xl flex items-center justify-center shadow-lg`}
                              style={{
                                backgroundColor: index === 0 ? '#222222' : '#FFFFFF'
                              }}
                            >
                              {React.createElement(point.icon, {
                                size: 28,
                                className: theme.iconColor,
                                strokeWidth: 1.5
                              })}
                            </div>
                          </div>
                          
                          {/* Impact badge - top right in compact */}
                          <div className="absolute top-4 right-4">
                            <div className={`${theme.badge} rounded-lg px-2.5 py-1.5 shadow-md`}>
                              <div className="text-xs font-semibold text-center opacity-90 leading-none">Impacto</div>
                              <div className="text-sm font-bold text-center leading-none mt-0.5">{point.severity}/10</div>
                    </div>
                  </div>

                          <h3 className={`text-lg font-bold ${theme.text} leading-tight mb-3`}>
                            {isCompressed ? point.shortTitle.split(' ')[0] : point.shortTitle}
                    </h3>
                          {!isCompressed && (
                            <p className={`text-sm ${theme.text} opacity-90 leading-relaxed px-2`}>
                              {point.description}
                            </p>
                          )}
                        </div>
                      ) : (
                        // Expanded State
                        <div className="h-full">
                          <div className="flex items-start gap-6 h-full">
                            {/* Left side - Icon and Title */}
                            <div 
                              className={`flex flex-col items-center text-center border-2 ${theme.border} rounded-xl p-6`} 
                              style={{
                                minWidth: '160px', 
                                maxWidth: '160px',
                                backgroundColor: index === 0 ? '#E6B610' : index === 1 ? '#005580' : index === 2 ? '#1F0419' : '#d97706'
                              }}
                            >
                              <div className="flex flex-col items-center space-y-4 pt-4">
                                <div 
                                  className={`w-20 h-20 border-2 ${theme.border} rounded-xl flex items-center justify-center shadow-lg`}
                                  style={{
                                    backgroundColor: index === 0 ? '#222222' : '#FFFFFF'
                                  }}
                                >
                                  {React.createElement(point.icon, {
                                    size: 28,
                                    className: theme.iconColor,
                                    strokeWidth: 1.5
                                  })}
                                </div>
                                
                                <div className="space-y-3 text-center">
                                  <h3 className={`text-lg font-bold ${theme.text} leading-tight`}>
                                    {point.title}
                                  </h3>
                                  <div 
                                    className={`w-12 h-0.5 mx-auto rounded-full`}
                                    style={{
                                      backgroundColor: index === 0 ? '#222222' : '#FFFFFF'
                                    }}
                                  ></div>
                                </div>
                    </div>
                  </div>

                            {/* Right side - Content */}
                            <div className="flex-1 py-4">
                              <div className="flex items-start justify-between gap-4 mb-6">
                                <div className="flex-1 pr-2">
                                  <p className={`${theme.text} text-lg leading-8 opacity-90`}>
                                    {point.description}
                                  </p>
                                </div>
                                
                                {/* Impact score badge */}
                                <div className={`flex-shrink-0 ${theme.badge} rounded-xl px-4 py-3 shadow-lg`}>
                                  <div className="text-xs font-bold mb-2 text-center">Impacto</div>
                                  <div className="flex items-center justify-center gap-1">
                                    <span className="text-2xl font-black">{point.severity}</span>
                                    <span className="text-base font-semibold opacity-70">/10</span>
                                  </div>
                                </div>
                              </div>

                              {/* Symptoms list */}
                              <motion.div 
                                className="space-y-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                              >
                                <div className={`text-sm font-semibold ${theme.text} mb-3 opacity-90`}>Síntomas comunes:</div>
                                {point.symptoms.slice(0, 3).map((symptom, symptomIndex) => (
                                  <motion.div 
                                    key={symptomIndex} 
                                    className="flex items-start gap-3 group"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (symptomIndex * 0.1), duration: 0.3 }}
                                  >
                                    <div className="flex-shrink-0 mt-1">
                                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 ${
                                        index === 0 ? 'bg-slate-900' : 'bg-white/20'
                                      }`}>
                                        <svg 
                                          className={`w-3 h-3 ${
                                            index === 0 ? 'text-signalYellow' : 'text-white'
                                          }`} 
                                          viewBox="0 0 24 24" 
                                          fill="none" 
                                          stroke="currentColor" 
                                          strokeWidth="3"
                                        >
                                          <path d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <span className={`text-sm ${theme.text} opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity duration-300`}>
                                      {symptom}
                                    </span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            </div>
                    </div>
                  </div>
                      )}
                </CardContent>
              </Card>
                </motion.div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Solution Section - Enhanced and more cohesive */}
      <section className="relative py-32 overflow-hidden">
        {/* Gradient background that flows from pain-points storytelling */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(255, 255, 255, 0.95) 0%,
                rgba(252, 205, 18, 0.02) 20%,
                rgba(0, 119, 182, 0.03) 40%,
                rgba(248, 250, 252, 0.9) 60%,
                rgba(255, 255, 255, 1) 100%
              )
            `
          }}
        ></div>

        {/* Flowing connecting elements */}
        <div className="absolute top-0 w-full overflow-hidden">
          <svg 
            className="w-full h-20 text-white/50" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,0 C300,60 400,40 600,20 C800,0 900,40 1200,20 L1200,0 L0,0 Z"
              fill="currentColor"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </svg>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-brilliantBlue/5 to-plum/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-signalYellow/5 to-orange-500/5 rounded-full blur-3xl"></div>
          
          {/* Floating accent elements */}
          <motion.div 
            className="absolute top-1/3 left-1/4 w-8 h-8 bg-brilliantBlue/10 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-signalYellow/15 rounded-full"
            animate={{ 
              y: [0, 15, 0],
              scale: [1, 0.7, 1],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {/* Enhanced good news badge */}
              <motion.div 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-signalYellow via-orange-500 to-signalYellow text-slate-900 px-8 py-4 rounded-full text-lg font-bold mb-8 shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundSize: '200% 100%'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                </svg>
                <span>La buena noticia</span>
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </motion.div>
              
              {/* Main headline with enhanced styling */}
              <motion.h2 
                className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                  background: 'linear-gradient(135deg, #310629 0%, #0077B6 50%, #310629 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Todo esto tiene solución
              </motion.h2>
              
              {/* Subtitle with better typography */}
              <motion.p 
                className="text-2xl sm:text-3xl text-slate-700 mb-6 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Y no necesitás cambiar todo{" "}
                <span 
                  className="inline-block relative"
                  style={{
                    background: 'linear-gradient(45deg, #0077B6, #310629)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  de la noche a la mañana.
                </span>
              </motion.p>

              <motion.p 
                className="text-xl text-slate-600 mb-16 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Te mostramos paso a paso cómo resolverlo, con{" "}
                <strong className="text-brilliantBlue font-semibold">resultados desde la primera semana.</strong>
              </motion.p>

              {/* Enhanced CTA section */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  className="group relative bg-gradient-to-r from-brilliantBlue to-plum text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 25px 50px -12px rgba(49, 6, 41, 0.25)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Ver cómo lo resolvemos
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-plum to-brilliantBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                
                <motion.button 
                  className="group border-3 border-brilliantBlue text-brilliantBlue hover:bg-brilliantBlue hover:text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: '#310629'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Hablar con un experto
                  </span>
                  <div className="absolute inset-0 bg-brilliantBlue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom flowing element to connect with next section */}
        <div className="absolute bottom-0 w-full overflow-hidden">
          <svg 
            className="w-full h-16 text-white/30" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,120 C300,80 400,100 600,80 C800,60 900,100 1200,80 L1200,120 L0,120 Z"
              fill="currentColor"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>
      </section>
      </div>
  );
} 