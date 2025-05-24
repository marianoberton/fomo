"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings, 
  BarChart3, 
  ChevronDown, 
  ChevronUp,
  Target
} from "lucide-react";

interface PillarData {
  id: string;
  icon: React.ElementType;
  title: string;
  promise: string;
  bullets: string[];
  details: string[];
  color: string;
}

const pillarsData: PillarData[] = [
  {
    id: "procesos",
    icon: Users,
    title: "Procesos & Cultura Digital",
    promise: "Estandarizá y ordená tu operación.",
    bullets: [
      "Mapeo y optimización de procesos",
      "Gestión del cambio & training",
      "Selección de herramientas (CRM/ERP ligero, colaboración)",
      "Roadmap de transformación"
    ],
    details: [
      "Diagnóstico completo de procesos actuales y mapeo de workflows",
      "Identificación de cuellos de botella y oportunidades de mejora",
      "Plan de gestión del cambio con capacitación personalizada",
      "Selección e implementación de herramientas CRM y ERP adaptadas",
      "Diseño de nuevos procesos estandarizados y documentación",
      "Acompañamiento en la adopción de cultura digital"
    ],
    color: "brilliantBlue"
  },
  {
    id: "automatizacion",
    icon: Settings,
    title: "Automatización & Implementación Tech",
    promise: "La tecnología ejecuta lo que diseñamos.",
    bullets: [
      "Workflows n8n / RPA",
      "Web y e-commerce integrados a stock y ERP",
      "Chatbots y formularios inteligentes",
      "Integraciones API a medida"
    ],
    details: [
      "Automatización de procesos repetitivos con n8n y RPA",
      "Desarrollo de sitios web y e-commerce integrados a sistemas",
      "Implementación de chatbots para atención al cliente",
      "Creación de formularios inteligentes con validaciones",
      "Integraciones custom entre sistemas existentes",
      "Configuración de workflows automáticos end-to-end"
    ],
    color: "neutral"
  },
  {
    id: "datos",
    icon: BarChart3,
    title: "Datos, Dashboards & IA",
    promise: "Decidí con evidencia, no con intuición.",
    bullets: [
      "Centro de Comando en Looker / Next.js",
      "KPIs y alertas en tiempo real",
      "Modelos predictivos / scoring",
      "Acompañamiento de mejora continua"
    ],
    details: [
      "Dashboards ejecutivos centralizados con métricas clave",
      "Sistema de alertas automáticas para situaciones críticas",
      "Modelos de machine learning para predicciones de negocio",
      "Sistemas de scoring automático para leads y clientes",
      "Reportes automatizados y análisis de tendencias",
      "Soporte continuo y optimización basada en datos"
    ],
    color: "signalYellow"
  }
];

export default function ThreePillarsSection() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const toggleExpanded = (pillarId: string) => {
    setExpandedPillar(expandedPillar === pillarId ? null : pillarId);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      brilliantBlue: {
        bg: "bg-brilliantBlue/5",
        border: "border-brilliantBlue/20",
        icon: "text-brilliantBlue",
        accent: "bg-brilliantBlue",
        button: "text-brilliantBlue hover:text-brilliantBlue/80",
        hover: "hover:border-brilliantBlue/40 hover:shadow-brilliantBlue/10"
      },
      neutral: {
        bg: "bg-neutral-900/5",
        border: "border-neutral-900/20",
        icon: "text-neutral-900",
        accent: "bg-neutral-900",
        button: "text-neutral-900 hover:text-neutral-900/80",
        hover: "hover:border-neutral-900/40 hover:shadow-neutral-900/10"
      },
      signalYellow: {
        bg: "bg-signalYellow/5",
        border: "border-signalYellow/20",
        icon: "text-signalYellow/80",
        accent: "bg-signalYellow",
        button: "text-signalYellow/80 hover:text-signalYellow",
        hover: "hover:border-signalYellow/40 hover:shadow-signalYellow/10"
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Nuestros 3 Pilares
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Todo lo que necesitás para{" "}
            <span className="text-brilliantBlue">
              transformar tu PyME
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Rediseñamos procesos, implementamos tecnología y convertimos datos en decisiones estratégicas
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {pillarsData.map((pillar, index) => {
            const Icon = pillar.icon;
            const colors = getColorClasses(pillar.color);
            const isExpanded = expandedPillar === pillar.id;

            return (
              <Card 
                key={pillar.id}
                className={`group relative overflow-hidden transition-all duration-500 ${colors.bg} ${colors.border} ${colors.hover} border-2 rounded-3xl hover:scale-105 hover:shadow-2xl`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 rounded-2xl bg-card shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Pilar {index + 1}
                      </div>
                      <CardTitle className={`text-xl font-bold text-foreground`}>
                        {pillar.title}
                      </CardTitle>
                    </div>
                  </div>
                  
                  <p className="text-lg font-semibold text-foreground leading-relaxed">
                    "{pillar.promise}"
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Main Bullets */}
                  <ul className="space-y-3 mb-6">
                    {pillar.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full ${colors.accent} mt-2 flex-shrink-0`}></div>
                        <span className="text-muted-foreground font-medium">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Expand/Collapse Button */}
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(pillar.id)}
                    className={`w-full ${colors.button} font-semibold rounded-full transition-all duration-300`}
                  >
                    Ver detalles
                    {isExpanded ? (
                      <ChevronUp className="ml-2 w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-2 w-4 h-4" />
                    )}
                  </Button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-border animate-in slide-in-from-top-2 duration-300">
                      <h4 className="font-semibold text-foreground mb-4">
                        Incluye:
                      </h4>
                      <ul className="space-y-2">
                        {pillar.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Transition */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-brilliantBlue/10 to-signalYellow/10 rounded-3xl p-8 border border-border/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ¿Cómo se conectan estos 3 pilares en la práctica?
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cada pilar se complementa con los otros: no implementamos tecnología sin antes entender tus procesos, 
              y no rediseñamos procesos sin datos que justifiquen los cambios. Es un enfoque integral.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 