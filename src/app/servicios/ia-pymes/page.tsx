"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Brain, MessageCircle, TrendingUp } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    title: "Insights Accionables",
    description: "Insights accionables con datos simples.",
    icon: <TrendingUp className="h-10 w-10 text-primary" />
  },
  {
    title: "Atención Inteligente",
    description: "Atención al cliente más inteligente.",
    icon: <MessageCircle className="h-10 w-10 text-primary" />
  },
  {
    title: "Ventaja Competitiva",
    description: "Ventaja competitiva con tecnología de punta.",
    icon: <Brain className="h-10 w-10 text-primary" />
  }
];

const examples = [
  {
    title: "Chatbot IA para Servicio T",
    description: "Respondió consultas complejas en WhatsApp, mejorando satisfacción un 50%.",
    stats: "50% más satisfacción",
    platform: "WhatsApp"
  },
  {
    title: "Predicción de Ventas para Pyme S",
    description: "Predijo demanda con 90% de precisión, optimizando inventario.",
    stats: "90% de precisión",
    platform: "Dashboard personalizado"
  }
];

export default function IAPymes() {
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
        className="bg-gradient-to-b from-primary to-secondary py-24 md:py-32"
      >
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="hero-title text-4xl md:text-5xl font-bold text-white">
              Inteligencia que impulsa tu pyme
            </h1>
            <p className="hero-subtitle text-xl text-white/90">
              Usá IA para analizar, predecir y conectar como nunca.
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-neutral leading-relaxed">
              La inteligencia artificial no es solo para grandes empresas. En FOMO, la ponemos 
              al alcance de tu pyme con soluciones prácticas: chatbots avanzados con OpenAI y 
              WhatsApp, análisis de redes sociales con Instagram y Facebook, o predicciones de 
              ventas con datos reales. Convertimos números en decisiones y conversaciones en 
              oportunidades, todo personalizado para el mercado argentino.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-10 text-center">
            Beneficios de la IA para tu negocio
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
                initial={{ 
                  opacity: 0, 
                  x: index === 0 ? -50 : 50 
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0 
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  type: "spring", 
                  stiffness: 50 
                }}
              >
                <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
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
                          {example.stats}
                        </span>
                      </div>
                      <div className="bg-secondary px-3 py-1 rounded-full">
                        <span className="text-sm text-neutral/70">
                          {example.platform}
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
      <section className="py-16 bg-gradient-to-r from-secondary/50 to-secondary/30">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-neutral">
              Descubrí el poder de la IA
            </h2>
            <p className="text-neutral/80">
              Transformá tu negocio con soluciones de inteligencia artificial accesibles y efectivas.
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