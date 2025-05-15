// page.tsx
"use client";

import React from "react";
import HeroSection from "@/components/page-sections/hero-section";
import PopularServices from "@/components/page-sections/ServicesSection";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";

// Main Home component
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center bg-background text-foreground">
      <Navbar />
      <div className="flex flex-col w-full items-center">
        <HeroSection />
        <PopularServices />
      </div>
      
    </main>
  );
}