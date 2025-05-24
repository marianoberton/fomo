"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, TrendingUp, Users } from "lucide-react";

export default function HeroSection() {
  const handleCTAClick = () => {
    // Scroll to contact form section
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center pt-20">
        {/* Left Column - Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Brain className="w-4 h-4" />
            Consultora FOMO
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              <span className="text-brilliantBlue">
                Procesos inteligentes
              </span>{" "}
              que disparan tu PyME
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              En FOMO rediseñamos tu forma de trabajar, automatizamos tareas clave y convertimos datos en decisiones.
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <Button 
              onClick={handleCTAClick}
              size="lg" 
              className="bg-brilliantBlue hover:bg-brilliantBlue/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Solicitá diagnóstico de transformación
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-brilliantBlue" />
              Con la guía de Guillermina · Experta en procesos y cambio organizacional
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-brilliantBlue rounded-full"></div>
              <span className="text-sm font-medium text-foreground">+5 PyMEs transformadas en 2024-2025</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-signalYellow rounded-full"></div>
              <span className="text-sm font-medium text-foreground">Diagnóstico 100% bonificado</span>
            </div>
          </div>
        </div>

        {/* Right Column - Visual */}
        <div className="relative">
          <div className="relative bg-card rounded-3xl shadow-2xl p-8 border border-border">
            <div className="space-y-6">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-semibold text-card-foreground">Centro de Comando PyME</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-signalYellow rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Mock Charts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brilliantBlue/10 p-4 rounded-2xl">
                  <BarChart3 className="w-6 h-6 text-brilliantBlue mb-2" />
                  <div className="text-2xl font-bold text-brilliantBlue">-45%</div>
                  <div className="text-sm text-muted-foreground">Tiempo procesos</div>
                </div>
                <div className="bg-signalYellow/10 p-4 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-signalYellow/80 mb-2" />
                  <div className="text-2xl font-bold text-signalYellow/80">+134%</div>
                  <div className="text-sm text-muted-foreground">Eficiencia</div>
                </div>
              </div>

              {/* Mock IA Insights */}
              <div className="bg-muted rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-brilliantBlue" />
                  <span className="font-medium text-foreground">Alerta Automatizada</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Stock bajo detectado: Ordenar 50 unidades del producto X antes del viernes"
                </p>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-signalYellow rounded-full flex items-center justify-center shadow-lg">
            <span className="text-neutral-900 font-bold text-sm">AUTO</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-brilliantBlue rounded-full flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
} 