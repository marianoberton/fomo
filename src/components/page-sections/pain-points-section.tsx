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
  const headerRef = useRef<HTMLDivElement>(null);

  // Current step state
  const [currentStep, setCurrentStep] = useState(0);

  // Scroll direction state
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  // State for controlling which card is expanded
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // GSAP ScrollTrigger implementation with bidirectional scroll and pauses
  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const content = section.querySelector('.pain-points-content');
    
    if (!content) return;

    // Create pinning scroll trigger with bidirectional behavior
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=400vh", // Extended scroll distance for final pause
      pin: content, // Pin the content container
      pinSpacing: true, // Adds spacing to push down following content
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const direction = self.direction; // 1 for down, -1 for up
        let newStep = 0;
        
        // Distribute steps with extended pauses for both directions
        if (progress < 0.25) {
          newStep = 0; // Step 1: 0-25%
        } else if (progress < 0.5) {
          newStep = 1; // Step 2: 25-50%
        } else {
          newStep = 2; // Step 3: 50-100% (extended pause)
        }
        
        if (newStep !== currentStep) {
          setCurrentStep(newStep);
          setScrollDirection(direction === 1 ? 'down' : 'up');
        }
      },
      markers: false,
      refreshPriority: 1
    });

    return () => {
      pinTrigger.kill();
    };
  }, [currentStep]);

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
      border: 'border-brilliantBlue/20'
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


      {/* Storytelling Section - Proper Pinning Implementation */}
      <section 
        ref={sectionRef}
        className="pain-points-section relative w-full"
        data-scroll-section
      >
        {/* Content Container - This will be pinned */}
        <div className="pain-points-content w-full h-screen relative">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-plum/95 via-brilliantBlue/80 to-plum/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
          
          {/* Enhanced background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-signalYellow/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/8 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
          </div>

          {/* Content - centered */}
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <div className="w-full max-w-6xl mx-auto px-4 text-center">
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
                className="text-xl sm:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {storySteps[currentStep].subtitle}
              </motion.p>

              <motion.p 
                key={`description-${currentStep}`}
                className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {storySteps[currentStep].description}
              </motion.p>
            </div>
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
              Estos son los 4 problemas más comunes
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

              {/* Enhanced CTA section - Single prominent button */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.a 
                  href="https://wa.me/5491123456789?text=Hola%2C%20quiero%20saber%20más%20sobre%20cómo%20pueden%20ayudarme%20con%20los%20procesos%20de%20mi%20PyME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-brilliantBlue to-plum hover:from-brilliantBlue/90 hover:to-plum/90 text-white px-12 py-6 rounded-3xl font-bold text-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden transform hover:scale-105"
                  whileHover={{ 
                    scale: 1.06,
                    boxShadow: '0 25px 50px -12px rgba(0, 119, 182, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    <span>Hablemos de tu PyME</span>
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full p-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                  </span>
                  
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-plum to-brilliantBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-white/5 scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </motion.a>
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