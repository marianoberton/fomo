// page.tsx
"use client";

import React from "react";
import { ServicesSection } from "@/components/page-sections/services-section";
import { CtaSection } from "@/components/page-sections/cta-section";
import { AboutSection } from "@/components/page-sections/about-section";
import { DescriptionSection } from "@/components/page-sections/description-section";
import { HeroSection } from "@/components/page-sections/hero-section";
import { SuccessCasesSection } from "@/components/page-sections/success-cases-section";
import { PlansSection } from "@/components/page-sections/plans-section";
import { ContactSection } from "@/components/page-sections/contact-section";

// Main Home component
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      {/* Clase global para todas las secciones */}
      <style jsx global>{`
        section > div.container,
        section > div.w-full {
          max-width: 1800px !important;
          width: 100% !important;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        @media (min-width: 768px) {
          section > div.container,
          section > div.w-full {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
        
        @media (min-width: 1024px) {
          section > div.container,
          section > div.w-full {
            padding-left: 3rem;
            padding-right: 3rem;
          }
        }
        
        @media (min-width: 1280px) {
          section > div.container,
          section > div.w-full {
            padding-left: 4rem;
            padding-right: 4rem;
          }
        }
      `}</style>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Description Section */}
      <DescriptionSection />
      
      {/* Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <CtaSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Success Cases Section */}
      <SuccessCasesSection />

      {/* Plans Section */}
      <PlansSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}