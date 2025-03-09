// page.tsx
"use client";

import { useRef } from "react";
import HeroSection from "@/components/Hero/hero-section";
import VideoOverlay from "@/components/Hero/VideoOverlay";
import AboutSection from "@/components/about-section"; // Asegúrate de tener las rutas correctas
import ServicesSection from "@/components/services-section";
import TechnologiesSection from "@/components/technologies-section";
import PortfolioSection from "@/components/portfolio-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <HeroSection ref={heroRef} /> {/* Pasa el ref AQUÍ */}
      <VideoOverlay heroRef={heroRef} /> {/* Recibe el ref */}
      <section id="about">
        <AboutSection />
      </section>
      <ServicesSection />
      <ServicesSection />
      <TechnologiesSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}