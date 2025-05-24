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

// Main Home component with new layout
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center bg-background text-foreground">
      <div className="flex flex-col w-full items-center">
        {/* A - Hero: Captar atención en 5s */}
        <HeroSection />
        
        {/* B - "Dolores que resolvemos": Crear empatía */}
        <PainPointsSection />
        
        {/* C - Pilares: Explicar oferta simplificada */}
        <ThreePillarsSection />
        
        {/* D - Demo-Gallery: Mostrar capacidad sin "mentir" */}
        <DemoGallerySection />
        
        {/* E - Metodología "5 Pasos": Transmitir proceso claro */}
        <ProcessTimelineSection />
        
        {/* F - Maturity Score: Lead magnet */}
        <MaturityScoreSection />
        
        {/* G - Equipo: Humanizar */}
        <TeamSection />
        
        {/* H - Preguntas frecuentes: Reducir fricción */}
        <FAQSection />
        
        {/* Contact Form: Still accessible via scroll */}
        <ContactFormSection />
        
        {/* I - CTA final: Cerrar */}
        <FinalCTASection />
      </div>
    </main>
  );
}