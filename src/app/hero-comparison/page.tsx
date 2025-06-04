"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ToggleLeft, ToggleRight } from "lucide-react";
import HeroSection from "@/components/page-sections/hero-section";
import HeroAISection from "@/components/page-sections/hero-ai-section";

export default function HeroComparisonPage() {
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Toggle Controls */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-card/90 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-4">
          <span className={`text-sm font-medium ${!showAI ? 'text-foreground' : 'text-muted-foreground'}`}>
            Hero Original
          </span>
          
          <Button
            onClick={() => setShowAI(!showAI)}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-muted/50"
          >
            {showAI ? (
              <ToggleRight className="w-8 h-8 text-purple-500" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-brilliantBlue" />
            )}
          </Button>
          
          <span className={`text-sm font-medium ${showAI ? 'text-foreground' : 'text-muted-foreground'}`}>
            Hero IA (Alternativo)
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground text-center mt-2">
          {showAI ? 'Versión IA - Simulación interactiva' : 'Versión Original - Dashboard inteligente'}
        </div>
      </div>

      {/* Hero Sections */}
      <div className="transition-all duration-500 ease-in-out">
        {showAI ? (
          <HeroAISection />
        ) : (
          <HeroSection />
        )}
      </div>

      {/* Info Panel */}
      <div className="fixed bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg max-w-sm">
        <h3 className="font-semibold text-sm mb-2">
          {showAI ? '🧠 Hero IA (Alternativo)' : '📊 Hero Original'}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          {showAI 
            ? 'Simulación interactiva que muestra cómo la IA toma decisiones en tiempo real en entornos urbanos complejos.'
            : 'Dashboard inteligente con métricas en tiempo real, animaciones de conteo y efectos Three.js sutiles.'
          }
        </p>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Enfoque:</span>
            <span className="font-medium">
              {showAI ? 'IA Interactiva' : 'Procesos Inteligentes'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Interacción:</span>
            <span className="font-medium">
              {showAI ? 'Simulación en vivo' : 'Animaciones automáticas'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Público:</span>
            <span className="font-medium">
              {showAI ? 'Tech-savvy' : 'PyMEs generales'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 