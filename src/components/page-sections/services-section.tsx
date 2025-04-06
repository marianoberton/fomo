"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Cpu, MessageSquare, Users } from "lucide-react";
import { ServiceCard } from "./cards";

// Animation variants
const slideUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export function ServicesSection() {
  return (
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
  );
} 