// page.tsx
"use client";

import React from "react";
import HeroSection from "@/components/page-sections/hero-section";
import PainPointsSection from "@/components/page-sections/pain-points-section";
import ThreePillarsSection from "@/components/page-sections/three-pillars-section";
import DemoGallerySection from "@/components/page-sections/demo-gallery-section";
import ProcessTimelineSection from "@/components/page-sections/process-timeline-section";
import MaturityScoreSection from "@/components/page-sections/maturity-score-section";
import TeamSection from "@/components/page-sections/team-section";
import FAQSection from "@/components/page-sections/faq-section";
import FinalCTASection from "@/components/page-sections/final-cta-section";
import ContactFormSection from "@/components/page-sections/contact-form-section";

// Main Home component with optimized conversion funnel
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center bg-background text-foreground">
      <div className="flex flex-col w-full items-center">
        {/* A - Hero: Captar atención en 5s */}
        <HeroSection />
        
        {/* B - Pain Points: Crear empatía con los dolores */}
        <PainPointsSection />
        
        {/* C - Servicios (3 Pilares): ¿QUÉ hacemos? */}
        <ThreePillarsSection />
        
        {/* D - Metodología (Proceso): ¿CÓMO lo hacemos? */}
        <ProcessTimelineSection />
        
        {/* E - Casos (Demo Gallery): ¿FUNCIONA? Probar resultados */}
        <DemoGallerySection />
        
        {/* F - Maturity Score: Lead magnet */}
        {/* <MaturityScoreSection /> */}
        
        {/* G - Equipo: ¿QUIÉN lo hace? Generar confianza */}
        <TeamSection />
        
        {/* H - FAQ: Resolver objeciones finales */}
        <FAQSection />
        
        {/* I - Contact Form: Punto de conversión principal */}
        <ContactFormSection />
        
        {/* J - CTA Final: Último empuje para conversión */}
        <FinalCTASection />
      </div>
    </main>
  );
}