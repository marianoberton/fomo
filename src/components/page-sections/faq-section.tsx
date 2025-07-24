"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Users, 
  TrendingUp,
  DollarSign,
  CalendarCheck,
  ShieldCheck,
  CreditCard,
  Cpu,
  BarChart
} from "lucide-react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ElementType;
  colorTheme: 'signalYellow' | 'brilliantBlue' | 'plum' | 'orange';
}

interface FloatingExample {
  text: string;
  category: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  color: 'signalYellow' | 'brilliantBlue' | 'plum' | 'orange';
}

const faqData: FAQItem[] = [
  {
    question: "¿Qué resultados concretos puedo ver en los primeros 30 días?",
    answer: "En el primer mes solemos implementar al menos un 'quick win' de automatización (ej. reportería automática o integración de facturación) que reduce de inmediato entre un 20 y 30 % las horas destinadas a tareas manuales. Además, entregamos un mini-dashboard con tus KPIs críticos para que empieces a tomar decisiones basadas en datos desde la semana 4.",
    icon: TrendingUp,
    colorTheme: "signalYellow"
  },
  {
    question: "¿Cómo calculan el retorno de inversión (ROI) de la automatización e IA?",
    answer: "Usamos un modelo de ROI basado en tres variables: horas ahorradas, errores evitados y ventas adicionales por insights de datos. Cada variable se multiplica por tu costo/hora promedio o tu margen neto. El modelo se presenta en el diagnóstico, para que veas la proyección de payback en 3, 6 y 12 meses.",
    icon: DollarSign,
    colorTheme: "brilliantBlue"
  },
  {
    question: "¿La implementación interrumpe mis operaciones diarias?",
    answer: "No. Trabajamos con una metodología 'Zero-Downtime': clonamos tus flujos actuales en un entorno de pruebas y migramos en ventanas programadas (normalmente fuera del horario comercial). Así tu equipo sigue operando sin fricciones.",
    icon: CalendarCheck,
    colorTheme: "plum"
  },
  {
    question: "¿Mi información y la de mis clientes están protegidas?",
    answer: "Sí. Firmamos acuerdo de confidencialidad (NDA), usamos cifrado AES-256 en tránsito y reposo, y cumplimos con la Ley 25.326 de Protección de Datos Personales de Argentina. Nuestros servidores están en regiones que garantizan redundancia y backups automáticos.",
    icon: ShieldCheck,
    colorTheme: "orange"
  },
  {
    question: "¿FOMO trabaja con PyMEs de menos de 10 empleados?",
    answer: "Claro. Nuestra propuesta es modular: desde planes 'Start' para micro-empresas hasta proyectos enterprise. El requisito clave no es el tamaño, sino la voluntad de profesionalizar procesos y aprovechar datos.",
    icon: Users,
    colorTheme: "signalYellow"
  },
  {
    question: "¿Cuál es la inversión mínima y cómo puedo financiarla?",
    answer: "Los proyectos arranquen desde USD 1.200 e incluyen fase de diagnóstico + quick wins. Podés financiar en 3 o 6 cuotas en pesos al tipo de cambio oficial + IVA, o abonar con tarjeta corporativa en dólares sin recargos.",
    icon: CreditCard,
    colorTheme: "brilliantBlue"
  },
  {
    question: "¿Qué tecnologías usan y por qué las eligen?",
    answer: "Trabajamos con n8n para RPA low-code, Next.js para front-end, Supabase para bases de datos serverless y modelos de IA de OpenAI o Vertex AI. Las elegimos por su comunidad activa, bajo costo de escalado y licencias open-source o pay-as-you-go.",
    icon: Cpu,
    colorTheme: "plum"
  },
  {
    question: "¿Cómo aseguran que la solución escale cuando mi negocio crece?",
    answer: "Diseñamos una arquitectura cloud-native que separa front-end, automatizaciones y base de datos. Así podés aumentar tráfico o volumen de pedidos sin reescribir código; solo se ajustan recursos (RAM, vCPU) bajo demanda.",
    icon: BarChart,
    colorTheme: "orange"
  }
];

// Floating examples disabled to prevent visual issues
const floatingExamples: FloatingExample[] = [
  // Disabled temporarily to prevent floating elements from overlapping content
  // {
  //   text: "Necesitamos automatizar procesos manuales para dejar de perder tiempo y dinero en tareas repetitivas.",
  //   category: "Automatización",
  //   position: { top: "10%", left: "2%" },
  //   color: "signalYellow"
  // },
  // {
  //   text: "Queremos que nuestro CRM se integre automáticamente con facturación, ventas y atención al cliente.",
  //   category: "Integraciones",
  //   position: { top: "14%", right: "3%" },
  //   color: "brilliantBlue"
  // },
  // {
  //   text: "Necesitamos dashboards claros que nos den visibilidad en tiempo real para tomar mejores decisiones comerciales.",
  //   category: "Dashboards & IA",
  //   position: { bottom: "20%", left: "3%" },
  //   color: "orange"
  // },
  // {
  //   text: "Buscamos digitalizar la gestión completa de clientes para aumentar ventas y mejorar su experiencia.",
  //   category: "Transformación Digital",
  //   position: { bottom: "8%", right: "4%" },
  //   color: "plum"
  // }
];

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const getThemeColors = (theme: 'signalYellow' | 'brilliantBlue' | 'plum' | 'orange') => {
    switch (theme) {
      case 'signalYellow':
        return {
          bg: 'bg-signalYellow',
          text: 'text-slate-900',
          iconBg: 'bg-slate-900',
          iconColor: 'text-signalYellow',
          border: 'border-yellow-600/20'
        };
      case 'brilliantBlue':
        return {
          bg: 'bg-brilliantBlue',
          text: 'text-white',
          iconBg: 'bg-white',
          iconColor: 'text-brilliantBlue',
          border: 'border-brilliantBlue/20'
        };
      case 'plum':
        return {
          bg: 'bg-plum',
          text: 'text-white',
          iconBg: 'bg-white',
          iconColor: 'text-plum',
          border: 'border-purple-700/20'
        };
      case 'orange':
        return {
          bg: 'bg-orange-500',
          text: 'text-white',
          iconBg: 'bg-white',
          iconColor: 'text-orange-500',
          border: 'border-orange-700/20'
        };
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 pt-8 pb-24 bg-white relative overflow-hidden">
      {/* Background decoration matching other sections */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-brilliantBlue/8 to-plum/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-signalYellow/8 to-orange-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-plum/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Examples - Better contained */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingExamples.map((example, index) => {
          const theme = getThemeColors(example.color);
          return (
            <motion.div
              key={index}
              className="absolute hidden lg:block z-10 pointer-events-auto"
              style={example.position}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
            <motion.div
              className={`max-w-xs p-4 ${theme.bg} rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm`}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }
              }}
            >
              <div className="mb-2">
                <span className={`text-xs font-bold ${theme.text} opacity-80 uppercase tracking-wider`}>
                  {example.category}
                </span>
              </div>
              <p className={`text-sm ${theme.text} leading-relaxed font-medium`}>
                {example.text}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-signalYellow to-orange-500 text-slate-900 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            viewport={{ once: true }}
          >
            <HelpCircle className="w-4 h-4" />
            Preguntas Frecuentes
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Resolvemos tus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brilliantBlue to-plum">
              dudas más comunes
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Las respuestas a las preguntas que más nos hacen las PyMEs antes de iniciar su transformación digital
          </p>
        </motion.div>

        {/* FAQ Items - Clean white cards with colored accents */}
        <div className="grid gap-4 max-w-3xl mx-auto px-4 md:px-12 lg:px-20">
          {faqData.map((faq, index) => {
            const theme = getThemeColors(faq.colorTheme);
            const Icon = faq.icon;
            const isExpanded = expandedFAQ === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="bg-white border-2 border-slate-200/50 hover:border-slate-300/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => toggleFAQ(index)}
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      {/* Colored icon */}
                      <div className={`w-12 h-12 ${theme.bg} rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${theme.text}`} />
                      </div>
                      
                      {/* Question */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 leading-tight pr-4 group-hover:text-slate-900 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      
                      {/* Expand/collapse button */}
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`w-10 h-10 ${theme.bg} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                        >
                          <ChevronDown className={`w-5 h-5 ${theme.text}`} />
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Answer - Expandable */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-slate-200">
                        <p className="text-slate-600 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA at the end of FAQ - Clean white with signalYellow/orange details */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-200/50 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-signalYellow/3 via-transparent to-orange-500/3"></div>
            
            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-signalYellow to-orange-500 rounded-full flex items-center justify-center shadow-md">
                  <HelpCircle className="w-5 h-5 text-slate-900" />
                </div>
                <span className="font-semibold text-xl text-slate-800">
                  ¿Tenés otra pregunta?
                </span>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Coordinamos una llamada de 15 minutos sin compromiso para resolver todas tus dudas sobre transformación digital y procesos.
              </p>
              
              {/* Enhanced CTA section - Single prominent button matching other sections */}
              <motion.div
                className="flex justify-center items-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.a 
                  href="https://wa.me/5491139066421?text=Hola%2C%20quiero%20saber%20más%20sobre%20cómo%20pueden%20ayudarme%20con%20los%20procesos%20de%20mi%20PyME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-signalYellow to-orange-500 hover:from-signalYellow/90 hover:to-orange-500/90 text-black px-12 py-6 rounded-3xl font-bold text-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden transform hover:scale-105"
                  whileHover={{ 
                    scale: 1.06,
                    boxShadow: '0 25px 50px -12px rgba(247, 217, 23, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    <span>Hablemos de tu PyME</span>
                    <div className="flex items-center justify-center w-12 h-12 bg-black/20 rounded-full p-2">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                  </span>
                  
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-signalYellow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-white/5 scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </motion.a>
              </motion.div>


            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 