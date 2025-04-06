"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlanCard } from "./cards";

// Animation variants
const slideUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export function PlansSection() {
  return (
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
          suppressHydrationWarning
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
          suppressHydrationWarning
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
  );
} 