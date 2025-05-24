"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Award,
  Lightbulb,
  Code,
  BookOpen,
  Zap
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  expertise: string[];
  description: string;
  highlight: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Guillermina",
    role: "Experta en Procesos y Cambio Organizacional",
    photo: "/images/team/guillermina.jpg", // Placeholder
    expertise: [
      "Mapeo y optimización de procesos",
      "Gestión del cambio organizacional", 
      "Adopción de cultura digital"
    ],
    description: "Con más de 8 años liderando transformaciones en PyMEs, Guillermina se especializa en que los equipos adopten nuevas formas de trabajar sin resistencia.",
    highlight: "Garantiza 100% de adopción en procesos rediseñados"
  },
  {
    name: "Mariano",
    role: "Arquitecto de Soluciones Tech",
    photo: "/images/team/mariano.jpg", // Placeholder
    expertise: [
      "Desarrollo de dashboards y automatizaciones",
      "Integración de sistemas y APIs",
      "IA aplicada a procesos de negocio"
    ],
    description: "Mariano traduce necesidades de negocio en soluciones tecnológicas concretas. Su enfoque: tecnología que funciona desde el día 1.",
    highlight: "Implementaciones sin downtime en producción"
  }
];

export default function TeamSection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Nuestro Equipo
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Conocé a las personas detrás de{" "}
            <span className="text-brilliantBlue">
              tu transformación
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un dúo complementario: una experta en procesos y cambio + un arquitecto de soluciones tech. 
            Juntos garantizan que la tecnología funcione Y que tu equipo la adopte.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className="group bg-card/90 backdrop-blur-sm border border-border/50 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden transform hover:scale-105 hover:rotate-1"
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              <CardContent className="p-8">
                {/* Photo */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-brilliantBlue/20 to-signalYellow/20 rounded-full overflow-hidden border-4 border-border/30 group-hover:border-brilliantBlue/50 transition-all duration-500">
                    {/* Placeholder for actual photos */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-brilliantBlue/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-brilliantBlue">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-signalYellow text-neutral-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <Award className="w-3 h-3 inline mr-1" />
                      Expert
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-brilliantBlue font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Expertise */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-signalYellow" />
                    Especialidades:
                  </h4>
                  <ul className="space-y-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-brilliantBlue rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlight */}
                <div className="bg-gradient-to-r from-brilliantBlue/10 to-signalYellow/10 rounded-2xl p-4 border border-brilliantBlue/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-brilliantBlue" />
                    <span className="font-semibold text-brilliantBlue text-sm">
                      Track record:
                    </span>
                  </div>
                  <p className="text-foreground font-medium text-sm">
                    {member.highlight}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-brilliantBlue" />
              <span className="font-semibold text-xl text-foreground">
                Un equipo, dos enfoques complementarios
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Mientras Guillermina se asegura de que tu equipo adopte los nuevos procesos sin resistencia, 
              Mariano construye la tecnología que los soporta. El resultado: transformaciones que realmente funcionan.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-brilliantBlue" />
                  <span className="font-semibold text-foreground">Proceso</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mapeo, rediseño y gestión del cambio que garantiza adopción
                </p>
              </div>
              <div className="bg-muted/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-brilliantBlue" />
                  <span className="font-semibold text-foreground">Tecnología</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatización, dashboards e IA que ejecutan lo diseñado
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              En el diagnóstico trabajás directamente con ambos para entender tu situación específica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 