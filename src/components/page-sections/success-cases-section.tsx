"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Cpu, MessageSquare } from "lucide-react";
import { CaseStudyCard } from "./cards";

// Animation variants
const slideUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export function SuccessCasesSection() {
  return (
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
              suppressHydrationWarning
            >
              <div
                style={{
                  width: `${30 + Math.random() * 70}px`,
                  height: `${30 + Math.random() * 70}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: "blur(8px)",
                  position: 'absolute',
                  borderRadius: '50%'
                }}
                suppressHydrationWarning
              />
              <motion.div
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
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                }}
              />
            </motion.div>
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
  );
} 