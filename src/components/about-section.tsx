"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Flag, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // Reducimos el padding superior para minimizar el espacio entre secciones
    <section className="pt-8 pb-16 bg-gradient-to-b from-white to-secondary/30">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-8 border border-primary/10"
        >
          {/* El resto del contenido permanece igual */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-neutral">
              Sobre Nosotros
            </h2>
          </div>
          
          <div className="space-y-6 text-neutral/80">
            <p className="text-base leading-relaxed">
              Somos una agencia tecnológica argentina con un equipo de expertos en desarrollo, 
              automatización y transformación digital. Con experiencia en proyectos para pymes 
              y gobierno, nos especializamos en crear soluciones a medida que impulsan el 
              crecimiento de tu negocio.
            </p>
            
            {/* Resto del contenido sin cambios */}
          </div>
          
          <div className="flex justify-center mt-8">
            <Link href="/#services">
              <Button 
                className="bg-accent hover:bg-primary text-white transition-all duration-300 transform hover:scale-105"
              >
                Conoce nuestros servicios
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}