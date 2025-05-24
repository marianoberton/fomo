"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {   AlertTriangle,  Clock,   Database,  EyeOff,  TrendingDown} from "lucide-react";

interface PainPoint {
  icon: React.ElementType;
  title: string;
  description: string;
  symptoms: string[];
}

const painPoints: PainPoint[] = [
  {
    icon: TrendingDown,
    title: "Procesos desordenados",
    description: "Cada empleado hace las cosas a su manera, no hay estándares claros",
    symptoms: [
      "Tareas que deberían tomar 1 hora toman 3",
      "Información perdida entre áreas", 
      "Clientes esperando respuestas que nunca llegan"
    ]
  },
  {
    icon: Clock,
    title: "Horas perdidas en tareas manuales",
    description: "Tu equipo pierde tiempo en actividades repetitivas que podrían automatizarse",
    symptoms: [
      "Copiar datos de un sistema a otro manualmente",
      "Enviar el mismo email 20 veces al día",
      "Buscar información dispersa en WhatsApp y Excel"
    ]
  },
    {    icon: Database,    title: "Datos dispersos por todos lados",
    description: "La información está fragmentada en múltiples herramientas sin conexión",
    symptoms: [
      "Ventas en Excel, stock en otro sistema",
      "Clientes repartidos entre WhatsApp, email y cuadernos",
      "Imposible tener una vista unificada del negocio"
    ]
  },
  {
    icon: EyeOff,
    title: "Decisiones tomadas a ciegas",
    description: "Sin dashboards claros, decidís basándote en intuición en lugar de datos reales",
    symptoms: [
      "No sabés cuál producto realmente genera más ganancia",
      "Desconocés el costo real de adquirir un cliente",
      "Reaccionás a problemas en lugar de anticiparlos"
    ]
  }
];

export default function PainPointsSection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            ¿Te suena familiar?
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Los{" "}
            <span className="text-red-600">
              dolores más comunes
            </span>{" "}
            que vemos en PyMEs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Si te identificás con alguno de estos escenarios, no estás solo. Son los desafíos que resolvemos todos los días.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((pain, index) => {
            const Icon = pain.icon;
            
            return (
              <Card 
                key={index}
                className="group bg-card/90 backdrop-blur-sm border border-red-200/20 hover:border-red-300/40 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3 leading-tight">
                      {pain.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {pain.description}
                    </p>

                    {/* Symptoms */}
                    <div className="space-y-2">
                      {pain.symptoms.map((symptom, symptomIndex) => (
                        <div key={symptomIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {symptom}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="mt-4 pt-4 border-t border-red-100/50">
                    <div className="text-xs text-red-600 font-medium">
                      ¿Te pasa esto?
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Transition to solution */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brilliantBlue/10 to-signalYellow/10 rounded-3xl p-8 border border-border/30">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              La buena noticia es que{" "}
              <span className="text-brilliantBlue">todo esto se puede resolver</span>
            </h3>
            <p className="text-muted-foreground text-lg">
              Y no necesitás cambiar todo de la noche a la mañana. Te mostramos cómo hacerlo paso a paso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 