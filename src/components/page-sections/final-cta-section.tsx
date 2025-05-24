"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Clock, CheckCircle } from "lucide-react";

export default function FinalCTASection() {
  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-neutral-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brilliantBlue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-signalYellow/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-signalYellow text-neutral-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Tu momento es ahora
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            No esperes a que tus competidores{" "}
            <span className="text-brilliantBlue">
              se adelanten
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada día que pasás con procesos manuales es un día que perdés ventaja competitiva. 
            La pregunta no es si vas a optimizar tu empresa, sino cuándo.
          </p>
        </div>

        {/* Value props quick */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
            <Clock className="w-8 h-8 text-brilliantBlue mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">Implementación en 3 meses</h3>
            <p className="text-sm text-muted-foreground">
              No proyectos que duran años. Resultados tangibles desde el primer mes.
            </p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
            <CheckCircle className="w-8 h-8 text-brilliantBlue mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">Adopción garantizada</h3>
            <p className="text-sm text-muted-foreground">
              Tu equipo va a usar las nuevas herramientas. Lo garantizamos.
            </p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
            <ArrowRight className="w-8 h-8 text-brilliantBlue mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">ROI desde el día 1</h3>
            <p className="text-sm text-muted-foreground">
              Ahorro inmediato en tiempo y costos operativos.
            </p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-gradient-to-r from-brilliantBlue to-brilliantBlue/80 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Comenzá tu transformación hoy mismo
          </h3>
          <p className="text-lg mb-6 text-white/90">
            Diagnóstico completo + 3 quick wins de automatización. 
            <strong>100% bonificado hasta el 30/06.</strong>
          </p>
          
          <Button 
            onClick={handleCTAClick}
            size="lg"
            className="bg-white hover:bg-gray-100 text-brilliantBlue font-bold py-4 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Solicitar diagnóstico de transformación
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Sin compromiso de contratación</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Respuesta en 24hs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>+5 PyMEs transformadas en 2024-2025</span>
          </div>
        </div>

        {/* Urgency footer */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <p className="text-muted-foreground text-lg">
            <strong className="text-foreground">Últimos cupos disponibles para junio 2025.</strong>
            <br />
            Solo trabajamos con 3 clientes por mes para garantizar resultados excepcionales.
          </p>
        </div>
      </div>
    </section>
  );
} 