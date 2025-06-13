"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle,
  Target,
  Hexagon,
  Settings, 
  Zap,
  ArrowRight,
  type LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PillarData {
  id: string;
  icon: LucideIcon;
  title: string;
  promise: string;
  bullets: string[];
  details: string[];
  pictogram: LucideIcon;
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

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
              color: "#64748b" // slate-500
      },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              color: "#f59e0b", // amber-500 (mantiene el tono naranja-amarillo)
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
    <section id="three-pillars" ref={sectionRef} className="w-full bg-white py-12 md:py-16 relative">


      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-plum/8 to-brilliantBlue/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-signalYellow/8 to-orange-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-plum/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header with GSAP Animations */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-plum to-brilliantBlue text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg"
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
            className="text-4xl lg:text-6xl font-bold text-slate-800 mb-8 leading-tight tracking-tight"
          >
            Todo lo que necesitás para<br className="hidden sm:block" />{" "}
            <span 
              ref={highlightRef}
              className="text-transparent bg-clip-text bg-gradient-to-r from-signalYellow to-orange-500 inline-block font-extrabold"
            >
              transformar tu PyME
            </span>
          </h2>
          
          <p 
            ref={subtitleRef}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Rediseñamos procesos, implementamos tecnología y convertimos datos en decisiones estratégicas
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16 relative lg:auto-rows-fr">
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
                <Card className={`relative ${pillar.bgColor} border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-[520px] flex flex-col group hover:scale-[1.02]`}>
                  <CardContent className="p-8 text-center flex-1 flex flex-col relative">
                    {/* Large Pictogram */}
                    <div className="mb-8 relative z-10">
                      <motion.div 
                        className={`relative mx-auto w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300 border border-white/30`}
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
                          {React.createElement(Pictogram, {
                            className: "w-12 h-12 text-white drop-shadow-lg",
                            strokeWidth: 2
                          })}
                        </motion.div>
                        
                        {/* Elegant accent dot */}
                        <motion.div 
                          className={`absolute -top-3 -right-3 w-4 h-4 rounded-full shadow-xl border-2 border-white ${
                            pillar.accentColor === 'signalYellow' ? 'bg-slate-800' :
                                            pillar.accentColor === 'brilliantBlue' ? 'bg-yellow-400' :
                'bg-orange-500'
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
                    <div className="flex-1 space-y-6">
                      <div>
                        <div className={`text-xs font-bold mb-3 uppercase tracking-widest ${pillar.accentColor === 'signalYellow' ? 'text-slate-700' : 'text-white/80'}`}>
                        Pilar {index + 1}
                      </div>
                        <h3 className={`text-xl font-bold leading-tight mb-4 ${pillar.accentColor === 'signalYellow' ? 'text-slate-900' : 'text-white'}`}>
                        {pillar.title}
                        </h3>
                        <p className={`text-sm font-semibold leading-relaxed px-4 py-3 rounded-xl ${pillar.accentColor === 'signalYellow' ? 'text-slate-800 bg-white/30' : 'text-white bg-white/20'}`}>
                    "{pillar.promise}"
                  </p>
                      </div>

                                            <ul className="space-y-3 text-left flex-1">
                        {pillar.bullets.map((bullet, bulletIndex) => (
                          <motion.li 
                            key={bulletIndex} 
                            className="flex items-start gap-2.5 group/bullet"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: bulletIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-all duration-300 ${pillar.accentColor === 'signalYellow' ? 'text-slate-900' : 'text-white'}`} />
                            <span className={`font-medium leading-snug text-sm transition-colors duration-300 ${pillar.accentColor === 'signalYellow' ? 'text-slate-700 group-hover/bullet:text-slate-900' : 'text-white/90 group-hover/bullet:text-white'}`}>
                              {bullet}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>


                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet Layout - Stacked Cards */}
        <div className="lg:hidden space-y-6 mb-12">
          {pillarsData.map((pillar, index) => {
            const Pictogram = pillar.pictogram;
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className={`${pillar.bgColor} border-0 rounded-3xl shadow-xl overflow-hidden`}>
                  <CardContent className="p-6 md:p-8">
                    <div className="text-center mb-6">
                      <motion.div 
                        className={`inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 relative shadow-2xl border border-white/30`}
                        animate={{
                          y: [0, -1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
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
                          {React.createElement(Pictogram, {
                            className: "w-10 h-10 text-white drop-shadow-lg",
                            strokeWidth: 2
                          })}
                        </motion.div>
                        <motion.div 
                          className={`absolute -top-2 -right-2 w-3 h-3 rounded-full shadow-xl border-2 border-white ${
                            pillar.accentColor === 'signalYellow' ? 'bg-slate-800' :
                            pillar.accentColor === 'brilliantBlue' ? 'bg-yellow-400' :
                            'bg-orange-500'
                          }`}
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            duration: 2.5, 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3
                          }}
                        />
                      </motion.div>
                      
                      <div className={`text-xs font-bold mb-2 uppercase tracking-wider ${pillar.accentColor === 'signalYellow' ? 'text-slate-700' : 'text-white/80'}`}>
                        Pilar {index + 1}
                      </div>
                      <h3 className={`text-xl font-bold mb-3 leading-tight ${pillar.accentColor === 'signalYellow' ? 'text-slate-900' : 'text-white'}`}>
                        {pillar.title}
                      </h3>
                      <p className={`text-base font-semibold leading-relaxed px-4 py-2.5 rounded-xl ${pillar.accentColor === 'signalYellow' ? 'text-slate-800 bg-slate-900/10' : 'text-white bg-white/20'}`}>
                        "{pillar.promise}"
                      </p>
                    </div>

                    <div className="space-y-3">
                      {pillar.bullets.map((bullet, bulletIndex) => (
                        <motion.div 
                          key={bulletIndex} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: bulletIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pillar.accentColor === 'signalYellow' ? 'text-slate-900' : 'text-white'}`} />
                          <span className={`font-medium leading-relaxed text-sm ${pillar.accentColor === 'signalYellow' ? 'text-slate-700' : 'text-white/90'}`}>
                            {bullet}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-12 border-2 border-plum/20 shadow-lg max-w-5xl mx-auto">
            <div className="relative">
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                ¿Cómo se conectan estos{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum to-brilliantBlue">
                  3 pilares
                </span>{" "}
                en la práctica?
              </h3>
              <p className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              Cada pilar se complementa con los otros: no implementamos tecnología sin antes entender tus procesos, 
              y no rediseñamos procesos sin datos que justifiquen los cambios. Es un enfoque integral.
            </p>
              
              {/* Visual connection */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-signalYellow rounded-xl shadow-lg">
                    <Hexagon className="w-6 h-6 text-slate-900" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                  <div className="flex items-center justify-center w-12 h-12 bg-brilliantBlue rounded-xl shadow-lg">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl shadow-lg">
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