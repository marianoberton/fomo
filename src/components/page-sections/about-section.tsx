"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function AboutSection() {
  return (
    <section id="quienes-somos" className="py-28 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="about-dots" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#about-dots)" />
        </svg>
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute right-20 bottom-20 w-64 h-64 rounded-full bg-primary/5"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
        
        <motion.div 
          className="absolute left-20 top-40 w-40 h-40 rounded-full bg-accent/5"
          animate={{
            scale: [1.1, 1, 1.1],
            y: [0, -20, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100 
            }}
          >
            <div className="relative perspective-1000">
              {/* Decorative frame with 3D effect */}
              <motion.div 
                className="absolute -inset-4 border border-primary/30 rounded-lg -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.02,
                  borderColor: "hsl(var(--accent) / 0.3)"
                }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              />
              
              <motion.div 
                className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-accent"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              
              <motion.div 
                className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              
              <motion.div 
                className="bg-secondary/5 p-10 rounded-lg backdrop-blur-sm"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 102, 255, 0.15)",
                  y: -5
                }}
              >
                <motion.h3 
                  className="font-accent text-3xl mb-6 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.span
                    animate={{
                      color: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    FOMO
                  </motion.span>
                </motion.h3>
                
                <motion.p 
                  className="text-2xl font-heading italic mb-6 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    "Fear Of Missing Out"
                  </motion.span>
                </motion.p>
                
                <motion.div 
                  className="grid grid-cols-2 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { value: "✓", label: "Experiencia comprobada", delay: 0.1 },
                    { value: "50+", label: "Proyectos exitosos", delay: 0.2 },
                    { value: "24/7", label: "Soporte técnico", delay: 0.3 },
                    { value: "100%", label: "Compromiso", delay: 0.4 }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex flex-col items-center group"
                      variants={fadeIn}
                      transition={{ delay: item.delay }}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className="text-4xl font-bold text-primary mb-2 relative"
                        whileHover={{
                          textShadow: "0 0 10px rgba(0,102,255,0.5)",
                          scale: 1.1
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.value}
                        <motion.div
                          className="absolute -inset-2 rounded-full bg-primary/10 -z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 0.7 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <motion.div 
                        className="text-sm text-muted-foreground"
                        whileHover={{ color: "hsl(var(--primary))" }}
                      >
                        {item.label}
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring", 
              stiffness: 100 
            }}
          >
            <div className="relative overflow-hidden">
              <motion.span 
                className="text-sm font-medium text-accent tracking-wider uppercase block mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Nuestra historia
              </motion.span>
              
              <motion.h2 
                className="section-title relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Quiénes Somos
              </motion.h2>
              
              <motion.div 
                className="h-1 w-20 bg-accent mt-2"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-muted-foreground text-lg leading-relaxed"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                Nuestra visión es un futuro donde ninguna pyme se quede atrás en la era digital. 
                Nos enfocamos en ofrecer <motion.span 
                  className="text-primary font-medium"
                  whileHover={{ 
                    color: "hsl(var(--accent))",
                    transition: { duration: 0.2 }
                  }}
                >soluciones prácticas</motion.span> que generan resultados tangibles: 
                incremento en ventas, reducción de costos y optimización de procesos.
              </motion.p>
              
              <motion.p 
                className="text-muted-foreground text-lg leading-relaxed"
                variants={fadeIn}
                transition={{ delay: 0.4 }}
              >
                En <motion.span 
                  className="font-accent text-primary"
                  whileHover={{ 
                    textShadow: "0 0 8px rgba(0,102,255,0.5)",
                    transition: { duration: 0.2 }
                  }}
                >FOMO</motion.span> (Fear Of Missing Out), combinamos experiencia en IA, desarrollo full stack y 
                conocimiento profundo de las necesidades de las pymes. Nuestro compromiso es 
                transformar tu negocio con un enfoque personalizado y soluciones a medida.
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button asChild variant="outline" className="group relative overflow-hidden">
                <Link href="#casos-exito" className="flex items-center gap-1">
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Ver Casos de Éxito
                  </motion.span> 
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 