"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    title: "SEO y Conversiones",
    description: "Diseños optimizados para SEO y conversiones.",
    icon: "🎯"
  },
  {
    title: "Integraciones Locales",
    description: "Integraciones locales que tus clientes necesitan.",
    icon: "🔄"
  },
  {
    title: "Soporte Continuo",
    description: "Soporte continuo para que siempre estés al día.",
    icon: "🛠️"
  }
];

const examples = [
  {
    title: "Tienda Online para Pyme X",
    description: "Una tienda con Mercado Pago y facturación AFIP que aumentó ventas un 40% en 3 meses.",
    stats: "40% más ventas",
    period: "3 meses"
  },
  {
    title: "App de Reservas para Restaurante Y",
    description: "Reservas en tiempo real con notificaciones por WhatsApp, reduciendo no-shows un 25%.",
    stats: "25% menos no-shows",
    period: "1 mes"
  }
];

export default function DesarrolloWeb() {
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
              Sitios y aplicaciones que venden por vos
            </h1>
            <p className="text-xl text-neutral/80">
              Desde tiendas online hasta plataformas móviles, creamos soluciones modernas 
              que conectan con tus clientes.
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-neutral leading-relaxed">
              En FOMO, desarrollamos sitios web y aplicaciones móviles que no solo se ven bien, 
              sino que trabajan para tu negocio. Integraciones con Mercado Pago para pagos seguros, 
              facturación automática con AFIP, y seguimiento de envíos con Correo Argentino son solo 
              el comienzo. Usamos tecnologías como Next.js y Supabase para que tu plataforma sea 
              rápida, escalable y fácil de usar. Ya sea una landing page o un e-commerce completo, 
              te ayudamos a destacar en el mercado argentino.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="border-primary"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-primary">
                    {benefit.title}
                  </h3>
                </CardHeader>
                <CardContent>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-primary">
                      {example.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-neutral/80">{example.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-primary">
                          {example.stats}
                        </span>
                      </div>
                      <span className="text-sm text-neutral/60">
                        en {example.period}
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
      <section className="py-16 bg-secondary/30">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-neutral">
              Hacé que tu web trabaje por vos
            </h2>
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