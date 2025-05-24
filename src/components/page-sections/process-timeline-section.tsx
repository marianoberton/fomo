"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Workflow,
  Cog,
  TrendingUp,
  LifeBuoy,
  Zap
} from "lucide-react";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Diagnóstico 360°",
    description: "Auditamos procesos, cultura y datos para mapear tu situación actual",
    icon: Search,
    details: [
      "Entrevistas con equipo clave",
      "Mapeo de procesos actuales",
      "Auditoría de herramientas existentes",
      "Análisis de cultura organizacional"
    ]
  },
  {
    number: 2,
    title: "Rediseño y plan de cambio",
    description: "Diseñamos nuevos procesos optimizados y el plan de transformación",
    icon: Workflow,
    details: [
      "Procesos rediseñados y documentados",
      "Plan de gestión del cambio",
      "Roadmap de implementación",
      "Estrategia de capacitación"
    ]
  },
  {
    number: 3,
    title: "Implementación tech & automatización",
    description: "Ejecutamos la tecnología, integraciones y automatizaciones",
    icon: Cog,
    details: [
      "Desarrollo de automatizaciones",
      "Integración de sistemas",
      "Configuración de herramientas",
      "Testing y puesta en producción"
    ]
  },
  {
    number: 4,
    title: "Dashboards e IA",
    description: "Construimos tu centro de comando con datos en tiempo real",
    icon: TrendingUp,
    details: [
      "Dashboard ejecutivo centralizado",
      "KPIs y alertas automáticas",
      "Modelos predictivos",
      "Reportes automatizados"
    ]
  },
  {
    number: 5,
    title: "Soporte y mejora continua",
    description: "Acompañamos la optimización y evolución constante",
    icon: LifeBuoy,
    details: [
      "Soporte técnico ongoing",
      "Optimización basada en uso",
      "Nuevas automatizaciones",
      "Evolución de la solución"
    ]
  }
];

export default function ProcessTimelineSection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Workflow className="w-4 h-4" />
            Cómo Trabajamos
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nuestro proceso{" "}
            <span className="text-brilliantBlue">
              paso a paso
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una metodología probada que garantiza resultados tangibles y adopción exitosa
          </p>
        </div>

        {/* Process Steps - Enhanced Design */}
        <div className="relative">
          {/* Enhanced Connection Line */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-brilliantBlue via-neutral-300 to-signalYellow rounded-full transform z-0 opacity-30"></div>
          
          <div className="grid lg:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isOdd = index % 2 === 1;
              
              return (
                <div key={step.number} className={`text-center ${isOdd ? 'lg:mt-20' : 'lg:mt-0'} group`}>
                  {/* Enhanced Step Circle */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-brilliantBlue to-brilliantBlue/80 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-background group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-signalYellow to-signalYellow/80 rounded-full flex items-center justify-center text-neutral-900 font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Enhanced Step Content */}
                  <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl group-hover:scale-105 group-hover:bg-card">
                    <CardContent className="p-8">
                      <h3 className="text-lg font-bold text-foreground mb-4 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      {/* Step Details */}
                      <div className="text-left">
                        <h4 className="font-semibold text-foreground text-sm mb-2">Incluye:</h4>
                        <ul className="space-y-1">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-brilliantBlue rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-muted-foreground">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-brilliantBlue mb-2">
              5 días
            </div>
            <div className="text-muted-foreground font-medium">
              Duración del diagnóstico inicial
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
              3 meses
            </div>
            <div className="text-muted-foreground font-medium">
              Implementación completa promedio
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-signalYellow/80 mb-2">
              100%
            </div>
            <div className="text-muted-foreground font-medium">
              Adopción exitosa garantizada
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border border-border/50">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-signalYellow" />
              <span className="font-bold text-xl text-foreground">
                ¿Listo para comenzar tu transformación?
              </span>
            </div>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Empezamos con el diagnóstico 360° para mapear tu situación actual y diseñar el roadmap personalizado
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brilliantBlue to-brilliantBlue/80 hover:from-brilliantBlue/90 hover:to-brilliantBlue/70 text-white px-10 py-5 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const contactSection = document.getElementById('contact-form');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Empezar diagnóstico de transformación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 