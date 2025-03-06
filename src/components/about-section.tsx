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
    <section className="py-16 bg-gradient-to-b from-white to-secondary/30" id="about">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-8 border border-primary/10"
        >
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
            
            <p className="text-base leading-relaxed">
              Nuestro enfoque es simple: entender tus necesidades y entregar resultados tangibles. 
              Nos apasiona la innovación y trabajamos para que la tecnología sea una ventaja 
              competitiva para vos, adaptándonos siempre al mercado argentino.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                {
                  icon: <Lightbulb className="h-8 w-8 text-accent" />,
                  title: "Compromiso con la innovación",
                  description: "Siempre a la vanguardia de la tecnología"
                },
                {
                  icon: <Flag className="h-8 w-8 text-accent" />,
                  title: "Soluciones pensadas para Argentina",
                  description: "Adaptadas a la realidad local"
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-accent" />,
                  title: "Resultados que podés medir",
                  description: "Impacto real en tu negocio"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + (index * 0.2),
                    ease: "easeOut" 
                  }}
                  className="flex flex-col items-center p-4 bg-secondary/20 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-3 bg-white p-3 rounded-full shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-primary text-center">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral/70 text-center mt-1">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary mt-6"
            >
              <p className="text-sm italic text-neutral/90">
                "FOMO transformó nuestra operación con un sistema que realmente entiende cómo trabajamos. 
                El resultado fue inmediato: menos tiempo en tareas administrativas y más foco en nuestros clientes."
              </p>
              <p className="text-xs font-medium text-primary mt-2">
                — María L., Gerente de Operaciones, Pyme de Servicios
              </p>
            </motion.div>
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