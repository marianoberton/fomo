// page.tsx
"use client";

import React from "react";
import { ServicesSection } from "@/components/page-sections/services-section";
import { CtaSection } from "@/components/page-sections/cta-section";
import { AboutSection } from "@/components/page-sections/about-section";
import { DescriptionSection } from "@/components/page-sections/description-section";
import HeroSection from "@/components/page-sections/hero-section";
import { SuccessCasesSection } from "@/components/page-sections/success-cases-section";
import { PlansSection } from "@/components/page-sections/plans-section";
import { ContactSection } from "@/components/page-sections/contact-section";
import WhatWeDoSection from "@/components/page-sections/WhatWeDoSection";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";

// Main Home component
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden items-center bg-background text-foreground">
      <Navbar />
      <div className="flex flex-col w-full items-center">
        <HeroSection />
        <WhatWeDoSection />
        <DescriptionSection />
        <ServicesSection />
        <CtaSection />
        <AboutSection />
        <SuccessCasesSection />
        <PlansSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}