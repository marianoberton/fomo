"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Clock, MessageSquare, Zap } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    title: "Ahorro de Tiempo",
    description: "Reducción de tiempo en tareas operativas.",
    icon: <Clock className="h-10 w-10 text-primary" />
  },
  {
    title: "Atención 24/7",
    description: "Atención al cliente sin pausas.",
    icon: <MessageSquare className="h-10 w-10 text-primary" />
  },
  {
    title: "Integraciones",
    description: "Integraciones con las herramientas que ya usás.",
    icon: <Zap className="h-10 w-10 text-primary" />
  }
];

const examples = [
  {
    title: "Bot de WhatsApp para Tienda Z",
    description: "Respondió consultas y cerró ventas automáticamente, ahorrando 10 horas semanales.",
    stats: "10 horas ahorradas",
    period: "por semana"
  },
  {
    title: "Automatización de Reportes para Empresa W",
    description: "Reportes fiscales generados en segundos con datos de AFIP.",
    stats: "Reportes en segundos",
    period: "antes: 3 horas"
  }
];

export default function Automatizaciones() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    
    if (hero) {
      gsap.fromTo(
        hero.querySelector('.hero-title'),
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

      gsap.fromTo(
        hero.querySelector('.hero-subtitle'),
        { 
          y: -30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.3,
          ease: "power3.out" 
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div 
        ref={heroRef}
        className="bg-gradient-to-b from-secondary to-primary/20 py-24 md:py-32"
      >
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="hero-title text-4xl md:text-5xl font-bold text-primary">
              Automatizá tu día a día
            </h1>
            <p className="hero-subtitle text-xl text-neutral/80">
              Bots y automatizaciones que ahorran tiempo y esfuerzo para tu pyme.
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-neutral leading-relaxed">
              Dejá de perder horas en tareas repetitivas. En FOMO, creamos automatizaciones 
              y bots a medida que optimizan tus procesos. Desde chatbots en WhatsApp que 
              atienden clientes 24/7 hasta reportes automáticos con datos de AFIP, usamos 
              herramientas como Python y Zapier para que todo fluya sin intervención manual. 
              Si querés responder rápido, cobrar más fácil o analizar datos sin complicaciones, 
              estamos para ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-10 text-center">
            Beneficios de nuestras automatizaciones
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.3 }}
              >
                <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-primary">
                      {example.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-neutral/80">{example.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-primary">
                          {example.stats}
                        </span>
                      </div>
                      <span className="text-sm text-neutral/60">
                        {example.period}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary/50 to-secondary/30">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-neutral">
              Simplificá tu negocio hoy
            </h2>
            <p className="text-neutral/80">
              Dejá que la tecnología trabaje por vos mientras te enfocás en hacer crecer tu negocio.
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