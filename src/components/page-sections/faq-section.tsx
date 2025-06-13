"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle, Clock, Cog, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ElementType;
  colorTheme: 'signalYellow' | 'brilliantBlue' | 'plum' | 'orange';
}

const faqData: FAQItem[] = [
  {
    question: "¿Cuánto dura el diagnóstico?",
    answer: "El diagnóstico completo se entrega en 5 días hábiles desde que coordinamos la primera llamada. Incluye: mapeo de procesos actuales, auditoría de herramientas, identificación de 3 quick wins de automatización y roadmap de transformación detallado. La sesión de presentación de resultados dura aproximadamente 90 minutos.",
    icon: Clock,
    colorTheme: 'signalYellow'
  },
  {
    question: "¿Necesito cambiar todo mi software?",
    answer: "No necesariamente. Primero evaluamos qué herramientas tenés funcionando bien y cuáles están causando ineficiencias. Muchas veces podemos optimizar lo que ya tenés con integraciones y automatizaciones. Solo recomendamos cambios cuando realmente hay una oportunidad significativa de mejora.",
    icon: Cog,
    colorTheme: 'brilliantBlue'
  },
  {
    question: "¿Cómo involucran a mi equipo?",
    answer: "El equipo es clave para el éxito. Incluimos sesiones de mapeo colaborativo donde tu equipo nos cuenta cómo trabajan hoy. Diseñamos un plan de gestión del cambio personalizado con capacitaciones y acompañamiento. Guillermina, nuestra experta en cultura digital, se encarga específicamente de que la adopción sea exitosa.",
    icon: Users,
    colorTheme: 'plum'
  },
  {
    question: "¿Qué ROI puedo esperar?",
    answer: "Nuestros clientes típicamente ven una reducción del 30-50% en tiempos de procesos manuales dentro de los primeros 3 meses. Esto se traduce en ahorro de horas de trabajo, menos errores, y capacidad de escalar sin contratar más gente. El ROI exacto depende de tu situación específica, pero lo calculamos en el diagnóstico inicial.",
    icon: TrendingUp,
    colorTheme: 'orange'
  },
  {
    question: "¿Cuánto cuesta la transformación completa?",
    answer: "El costo depende del alcance y complejidad de tu PyME. Después del diagnóstico, te presentamos un presupuesto detallado por fases. Podés implementar por etapas según tu presupuesto. La mayoría de nuestros clientes recuperan la inversión en los primeros 6-9 meses a través del ahorro en tiempo y eficiencia operativa.",
    icon: Clock,
    colorTheme: 'signalYellow'
  },
  {
    question: "¿Trabajan con empresas de mi sector?",
    answer: "Trabajamos con PyMEs de diversos sectores: retail, servicios, manufactura, distribución, consultoría, y más. Nuestra metodología se adapta a cualquier industria porque nos enfocamos en procesos universales: ventas, operaciones, finanzas y atención al cliente. Lo importante no es el sector, sino el tamaño y la complejidad operativa.",
    icon: Cog,
    colorTheme: 'brilliantBlue'
  },
  {
    question: "¿Qué pasa si mi equipo se resiste al cambio?",
    answer: "Es normal y lo esperamos. Por eso Guillermina lidera específicamente la gestión del cambio. Incluimos capacitaciones personalizadas, acompañamiento individual, y implementación gradual. Mostramos beneficios tangibles desde el primer día para generar adopción natural. Tenemos 100% de éxito en adopción porque priorizamos a las personas tanto como la tecnología.",
    icon: Users,
    colorTheme: 'plum'
  },
  {
    question: "¿Ofrecen soporte después de la implementación?",
    answer: "Sí, incluimos 3 meses de soporte post-implementación sin costo adicional. Después podés contratar soporte mensual que incluye: optimizaciones continuas, nuevas automatizaciones, actualizaciones de dashboards, y resolución de incidencias. También ofrecemos sesiones trimestrales de revisión estratégica.",
    icon: TrendingUp,
    colorTheme: 'orange'
  }
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
    <section className="w-full pt-8 pb-24 bg-white relative overflow-hidden">
      {/* Background decoration matching other sections */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-brilliantBlue/8 to-plum/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-signalYellow/8 to-orange-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-plum/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  href="https://wa.me/5491123456789?text=Hola%2C%20quiero%20saber%20más%20sobre%20cómo%20pueden%20ayudarme%20con%20los%20procesos%20de%20mi%20PyME"
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