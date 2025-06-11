"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Workflow,
  Cog,
  TrendingUp,
  LifeBuoy,
  Zap
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Blueprint animation styles using useEffect to inject CSS
const blueprintStyles = `
  @keyframes blueprint-move {
    0% {
      background-position: 0px 0px, 0px 0px;
    }
    100% {
      background-position: 50px 50px, 50px 50px;
    }
  }
  
  .blueprint-bg {
    background-color: #222222;
    background-image: 
      linear-gradient(rgba(247, 217, 23, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(247, 217, 23, 0.08) 1px, transparent 1px),
      linear-gradient(rgba(247, 217, 23, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(247, 217, 23, 0.03) 1px, transparent 1px);
    background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
    animation: blueprint-move 15s linear infinite;
  }
`;

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Diagnóstico 360°",
    description: "Auditamos procesos, cultura y datos para mapear tu situación actual",
    icon: Search,
    details: [
      "Entrevistas con equipo clave",
      "Mapeo de procesos actuales",
      "Auditoría de herramientas existentes",
      "Análisis de cultura organizacional"
    ]
  },
  {
    number: 2,
    title: "Rediseño y plan de cambio",
    description: "Diseñamos nuevos procesos optimizados y el plan de transformación",
    icon: Workflow,
    details: [
      "Procesos rediseñados y documentados",
      "Plan de gestión del cambio",
      "Roadmap de implementación",
      "Estrategia de capacitación"
    ]
  },
  {
    number: 3,
    title: "Implementación tech & automatización",
    description: "Ejecutamos la tecnología, integraciones y automatizaciones",
    icon: Cog,
    details: [
      "Desarrollo de automatizaciones",
      "Integración de sistemas",
      "Configuración de herramientas",
      "Testing y puesta en producción"
    ]
  },
  {
    number: 4,
    title: "Dashboards e IA",
    description: "Construimos tu centro de comando con datos en tiempo real",
    icon: TrendingUp,
    details: [
      "Dashboard ejecutivo centralizado",
      "KPIs y alertas automáticas",
      "Modelos predictivos",
      "Reportes automatizados"
    ]
  },
  {
    number: 5,
    title: "Soporte y mejora continua",
    description: "Acompañamos la optimización y evolución constante",
    icon: LifeBuoy,
    details: [
      "Soporte técnico ongoing",
      "Optimización basada en uso",
      "Nuevas automatizaciones",
      "Evolución de la solución"
    ]
  }
];

export default function ProcessTimelineSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Inject CSS styles into the document head
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = blueprintStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // GSAP ScrollTrigger animations + Click functionality
  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const section = sectionRef.current;
    const timeline = timelineRef.current;

    // Pin the entire section
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * processSteps.length}`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const stepIndex = Math.min(
          Math.floor(progress * processSteps.length),
          processSteps.length - 1
        );
        setActiveStep(stepIndex);

        // Animate cards based on scroll progress
        animateCards(progress);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate cards function (used by both scroll and click)
  const animateCards = (progress?: number) => {
    cardsRefs.current.forEach((cardRef, index) => {
      if (!cardRef) return;

      if (progress !== undefined) {
        // Scroll-based animation
        const stepProgress = (progress * processSteps.length) - index;
        
        if (stepProgress >= 0 && stepProgress <= 1) {
          // Card is active - visible in center
          gsap.set(cardRef, {
            y: 0,
            opacity: 1,
            scale: 1,
            zIndex: 10
          });
        } else if (stepProgress < 0) {
          // Card is coming from below
          gsap.set(cardRef, {
            y: 100,
            opacity: 0,
            scale: 0.8,
            zIndex: 1
          });
        } else {
          // Card is going up (disappearing behind)
          gsap.set(cardRef, {
            y: -100,
            opacity: 0,
            scale: 0.8,
            zIndex: 1
          });
        }
      } else {
        // Click-based animation - use current activeStep
        if (index === activeStep) {
          gsap.to(cardRef, {
            y: 0,
            opacity: 1,
            scale: 1,
            zIndex: 10,
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          gsap.to(cardRef, {
            y: index < activeStep ? -100 : 100,
            opacity: 0,
            scale: 0.8,
            zIndex: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  };

  // Separate function for click animations to ensure state is updated
  const animateCardsForClick = (targetIndex: number) => {
    cardsRefs.current.forEach((cardRef, index) => {
      if (!cardRef) return;

      if (index === targetIndex) {
        gsap.to(cardRef, {
          y: 0,
          opacity: 1,
          scale: 1,
          zIndex: 10,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(cardRef, {
          y: index < targetIndex ? -100 : 100,
          opacity: 0,
          scale: 0.8,
          zIndex: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

    // Handle title click - direct state management without scroll
  const handleTitleClick = (index: number) => {
    // Update state immediately
    setActiveStep(index);
    
    // Trigger animations immediately with the target index
    animateCardsForClick(index);
  };



  return (
    <>
      {/* Combined Section with Global Blueprint Background */}
      <div className="relative w-screen" data-section="process-timeline" style={{ backgroundColor: '#222222' }}>
        {/* Global Background decoration */}
      <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-signalYellow/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/6 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

        {/* SVG Decorations distributed throughout the ENTIRE component */}
        {/* (SVGs removed as requested) */}

        {/* Header Section */}
        <section className="w-screen py-16 relative" style={{ backgroundColor: '#222222' }}>
          <div className="relative w-screen px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-signalYellow to-orange-500 text-slate-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Workflow className="w-5 h-5" />
              Roadmap paso a paso
          </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-signalYellow to-orange-500 bg-clip-text text-transparent">
                Nuestro proceso
              </span>{" "}
              paso a paso
          </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Una metodología probada que garantiza resultados tangibles y adopción exitosa
          </p>
        </div>
        </section>

        {/* Main Timeline Section - Full Screen Pinned */}
        <section 
          ref={sectionRef}
          className="w-screen h-screen relative overflow-hidden"
          style={{ backgroundColor: '#222222' }}
        >

        {/* Full Screen Timeline Interface */}
        <div 
          ref={timelineRef}
          className="relative h-full w-screen"
          style={{ paddingTop: '80px' }}
        >
                     <div className="flex w-screen h-full relative">
                          {/* Left Section - Reduced margins, more space */}
             <div className="w-5/12 flex items-center justify-end pr-8">
               <div className="space-y-3 lg:space-y-4">
                 {processSteps.map((step, index) => (
                   <div
                     key={step.number}
                     onClick={() => handleTitleClick(index)}
                     className={`cursor-pointer transition-all duration-300 p-3 lg:p-4 rounded-xl ${
                       activeStep === index
                         ? 'bg-gradient-to-r from-signalYellow to-orange-500 text-slate-900 shadow-xl scale-105'
                         : 'text-white/80 hover:bg-white/10 hover:shadow-lg hover:text-white'
                     }`}
                   >
                     <div className="flex items-center gap-3 lg:gap-4">
                       <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 ${
                         activeStep === index ? 'bg-slate-900 text-signalYellow' : 'bg-white/20 text-white'
                       }`}>
                         {step.number}
                       </div>
                       <div className={`w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0 ${activeStep === index ? 'text-slate-900' : 'text-white/60'}`}>
                         <step.icon className="w-full h-full" />
                       </div>
                       <h3 className={`font-bold text-sm lg:text-base leading-tight ${
                         activeStep === index ? 'text-slate-900' : 'text-white'
                       }`}>
                         {step.title}
                       </h3>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

                          {/* Center Timeline - Same */}
             <div className="w-2/12 relative flex items-center justify-center" data-section="process-timeline-center">
               {/* Extended Timeline Line */}
               <div className="absolute w-1.5 bg-gradient-to-b from-signalYellow via-white/30 to-orange-500 left-1/2 transform -translate-x-1/2" 
                    style={{ top: '-80px', bottom: '-80px' }}></div>
              
                             {/* Active Node */}
               <div className="relative z-10" id="process-center-icon">
                 <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-signalYellow to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-900 transition-all duration-500">
                   {React.createElement(processSteps[activeStep].icon, { 
                     className: "w-8 h-8 lg:w-10 lg:h-10 text-slate-900" 
                   })}
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full flex items-center justify-center text-signalYellow font-bold text-sm lg:text-base border-2 border-signalYellow transition-all duration-500">
                   {processSteps[activeStep].number}
                    </div>
                    </div>
                  </div>
                  
                         {/* Right Section - Reduced margins, more space */}
             <div className="w-5/12 relative flex items-center justify-center pl-8">
               {processSteps.map((step, index) => (
                 <div
                   key={step.number}
                   ref={(el) => { cardsRefs.current[index] = el; }}
                   className="absolute flex items-center justify-center w-full"
                 >
                   <Card className="w-full max-w-lg border-2 border-signalYellow/40 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm" style={{ backgroundColor: '#1a1a1a' }}>
                     {/* Card Header with gradient */}
                     <div className="bg-gradient-to-r from-signalYellow/10 to-orange-500/10 p-6 border-b border-signalYellow/20">
                       <div className="flex items-center gap-4">
                         <div className="relative">
                           <div className="w-16 h-16 bg-gradient-to-br from-signalYellow to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                             <step.icon className="w-8 h-8 text-slate-900" />
                           </div>
                           <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border-2 border-signalYellow">
                             <span className="text-signalYellow font-bold text-sm">{step.number}</span>
                           </div>
                         </div>
                         <div className="flex-1">
                           <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                         </div>
                       </div>
                     </div>

                     <CardContent className="p-6 lg:p-8">
                       {/* Description */}
                       <div className="mb-6">
                         <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                        {step.description}
                      </p>
                       </div>
                      
                       {/* Details with enhanced styling */}
                       <div className="space-y-4">
                         <div className="flex items-center gap-2 mb-4">
                           <div className="w-6 h-6 bg-signalYellow/20 rounded-lg flex items-center justify-center">
                             <div className="w-3 h-3 bg-signalYellow rounded-full"></div>
                           </div>
                           <h4 className="font-bold text-signalYellow text-sm uppercase tracking-wider">
                             Incluye:
                           </h4>
                         </div>
                         <ul className="space-y-3">
                          {step.details.map((detail, detailIndex) => (
                             <li key={detailIndex} className="flex items-start gap-3 group">
                               <div className="w-6 h-6 bg-gradient-to-br from-signalYellow/30 to-orange-500/30 rounded-lg flex items-center justify-center mt-0.5 border border-signalYellow/40 group-hover:border-signalYellow/60 transition-colors">
                                 <div className="w-2 h-2 bg-signalYellow rounded-full"></div>
                               </div>
                               <span className="text-white/80 text-sm lg:text-base leading-relaxed group-hover:text-white transition-colors">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
               ))}
             </div>
          </div>
        </div>
        </section>
            </div>


    </>
  );
} 