"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { LineChart, Users, Target } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    title: "Estrategia Clara",
    description: "Estrategia clara y adaptada a tu realidad.",
    icon: <Target className="h-10 w-10 text-primary" />
  },
  {
    title: "Capacitación",
    description: "Capacitación para tu equipo.",
    icon: <Users className="h-10 w-10 text-primary" />
  },
  {
    title: "KPIs Medibles",
    description: "Resultados medibles con KPIs definidos.",
    icon: <LineChart className="h-10 w-10 text-primary" />
  }
];

const examples = [
  {
    title: "Diagnóstico Digital para Empresa R",
    description: "Identificamos brechas y creamos un plan que redujo costos operativos un 20%.",
    impact: "20% reducción de costos",
    timeframe: "3 meses"
  },
  {
    title: "Implementación de Dashboard para Pyme Q",
    description: "Dashboards en Power BI que facilitaron decisiones basadas en datos.",
    impact: "Decisiones data-driven",
    timeframe: "2 meses"
  }
];

export default function ConsultoriaDigital() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    
    if (hero) {
      gsap.fromTo(
        hero.querySelector('.hero-content'),
        { 
          y: -50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out" 
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="bg-secondary py-24 md:py-32"
      >
        <div className="container">
          <div className="hero-content max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Tu camino hacia lo digital, guiado
            </h1>
            <p className="text-xl text-neutral/80">
              Te ayudamos a digitalizar tu pyme con un plan paso a paso.
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-neutral leading-relaxed">
              La transformación digital puede ser abrumadora, pero no tenés que hacerlo solo. 
              En FOMO, te ofrecemos consultoría personalizada: desde diagnósticos de tu estado 
              actual hasta la implementación de herramientas como Power BI para dashboards y 
              Google Suite para colaboración. Te guiamos en cada etapa, asegurándonos de que 
              tu negocio aproveche al máximo la tecnología disponible en Argentina.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-10 text-center">
            Beneficios de nuestra consultoría
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="border-primary/20 hover:border-primary transition-colors"
              >
                <CardHeader className="flex flex-col items-center">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-primary text-center">
                    {benefit.title}
                  </h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-neutral/80">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-10 text-center">
            Casos de éxito
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full shadow-md">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-primary">
                      {example.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-neutral/80">{example.description}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="bg-primary/10 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-primary">
                          {example.impact}
                        </span>
                      </div>
                      <div className="bg-secondary px-3 py-1 rounded-full">
                        <span className="text-sm text-neutral/70">
                          {example.timeframe}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-neutral">
              Empezá tu transformación
            </h2>
            <p className="text-neutral/80">
              Descubrí cómo la tecnología puede impulsar tu negocio al siguiente nivel.
            </p>
            <Link href="/contacto">
              <Button 
                size="lg"
                className="bg-accent hover:bg-primary text-white transition-colors"
              >
                Contactanos ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}