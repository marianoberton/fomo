"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface ClientLogo {
  name: string;
  logo: string;
  description: string;
}

interface Testimonial {
  company: string;
  author: string;
  role: string;
  content: string;
  logo: string;
}

const clients: ClientLogo[] = [
  {
    name: "Inted",
    logo: "/images/clients/inted-logo.png", // Placeholder - replace with actual logo
    description: "Educación tecnológica"
  },
  {
    name: "Hembra",
    logo: "/images/clients/hembra-logo.png", // Placeholder - replace with actual logo  
    description: "Marca de lifestyle"
  },
  {
    name: "La Moderna",
    logo: "/images/clients/lamoderna-logo.png", // Placeholder - replace with actual logo
    description: "Retail tradicional"
  }
];

const testimonials: Testimonial[] = [
  {
    company: "Inted",
    author: "María González",
    role: "Directora Comercial",
    content: "FOMO transformó completamente nuestros procesos de captación y gestión de alumnos. Logramos reducir 45% los tiempos operativos y ahora todo fluye automáticamente desde el primer contacto hasta la matriculación.",
    logo: "/images/clients/inted-logo.png"
  },
  {
    company: "Hembra",
    author: "Sofía Martínez", 
    role: "Founder",
    content: "La integración de nuestro e-commerce con el sistema de stock nos cambió la vida. Ya no perdemos ventas por falta de información y los procesos de fulfillment son completamente automáticos.",
    logo: "/images/clients/hembra-logo.png"
  },
  {
    company: "La Moderna",
    author: "Carlos Rodriguez",
    role: "Gerente General", 
    content: "El Centro de Comando que nos armaron nos permite ver todo el negocio en tiempo real. Ahora tomamos decisiones basadas en datos concretos, no en intuición como hacíamos antes.",
    logo: "/images/clients/lamoderna-logo.png"
  }
];

export default function SocialProofSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Casos de Transformación
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-brilliantBlue">
              +5 PyMEs
            </span>{" "}
            ya optimizaron sus procesos con FOMO
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resultados reales de empresas que transformaron su forma de trabajar e implementaron procesos inteligentes
          </p>
        </div>

        {/* Client Logos */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
            {clients.map((client, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-32 h-20 bg-muted rounded-2xl flex items-center justify-center mb-2 group-hover:bg-muted/80 transition-colors duration-300 border border-border">
                  {/* Placeholder for logos - replace with actual logo images */}
                  <div className="text-muted-foreground font-bold text-lg">
                    {client.name}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {client.description}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div className="w-32 h-20 bg-muted rounded-2xl flex items-center justify-center mb-2 border border-border">
                <div className="text-muted-foreground font-bold text-lg">
                  +5 PyMEs
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                2024-2025
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-3xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center shadow-md">
                    {/* Placeholder for company logo */}
                    <div className="text-muted-foreground font-bold text-sm">
                      {testimonial.company.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-brilliantBlue/20" />
                  <blockquote className="text-muted-foreground leading-relaxed relative z-10">
                    "{testimonial.content}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-1 mt-6">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-4 h-4 fill-signalYellow text-signalYellow" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-muted/50 rounded-3xl p-8 border border-border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-brilliantBlue mb-2">
                -45%
              </div>
              <div className="text-muted-foreground font-medium">
                Reducción promedio de tiempos en procesos
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                3 meses
              </div>
              <div className="text-muted-foreground font-medium">
                Tiempo promedio de implementación completa
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-signalYellow/80 mb-2">
                100%
              </div>
              <div className="text-muted-foreground font-medium">
                De clientes adoptaron exitosamente los nuevos procesos
              </div>
            </div>
          </div>
        </div>

        {/* Mini Case Studies Links */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            ¿Querés conocer más detalles de estos casos de transformación?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {clients.map((client, index) => (
              <button
                key={index}
                className="px-6 py-2 bg-card border border-border rounded-full text-foreground hover:bg-muted/50 transition-colors duration-300 font-medium"
                onClick={() => {
                  // Here you would link to individual case studies
                  console.log(`View case study for ${client.name}`);
                }}
              >
                Ver caso {client.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 