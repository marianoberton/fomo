"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Barriecito } from "next/font/google";

// Load fonts from Google Fonts
const barriecito = Barriecito({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function ComingSoon() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('from')) {
      router.replace('/proximamente?from=root');
    }
  }, [router]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background with ivory color */}
      <div className="absolute inset-0 bg-[#FFFCEF] z-0">
        {/* Dark geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-[#0f0f0f] clip-diagonal"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#0f0f0f] clip-triangle"></div>

        {/* Yellow accents */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/4 bg-[#FFD700] clip-shape"></div>
        <div className="absolute bottom-1/3 left-10 w-24 h-24 bg-[#FFD700] rounded-full"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pattern-grid"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 text-center">
        {/* Main Fomo text with stylized format */}
        <div className="relative inline-block px-8 py-6 bg-[#0f0f0f] rotate-1 shadow-xl">
          <h1 className={`${barriecito.className} text-white text-7xl md:text-9xl lg:text-[12rem] tracking-tight`}>
            <span className="text-[#FFD700]">F</span>
            <span>omo</span>
          </h1>

          {/* Decorative elements - redesigned without borders */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#FFFCEF] shadow-lg transform rotate-12"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#FFD700] shadow-lg transform -rotate-12"></div>
        </div>

        {/* Tagline - redesigned without border */}
        <div className="mt-12 mb-8 relative">
          <div className="absolute inset-0 bg-[#FFD700] transform -rotate-2 translate-x-1 translate-y-1"></div>
          <p
            className={`${barriecito.className} relative bg-[#0f0f0f] text-[#FFFCEF] text-xl md:text-2xl lg:text-3xl px-8 py-3 inline-block transform rotate-1`}
          >
            NO TE LO PIERDAS
          </p>
        </div>
      </div>

      {/* Additional decorative elements - redesigned without borders */}
      <div className="absolute bottom-10 right-10 w-32 h-8 bg-[#FFD700] -rotate-12 shadow-md"></div>
      <div className="absolute top-10 left-10 w-16 h-16 bg-[#0f0f0f] rotate-12 shadow-md"></div>

      {/* New decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#FFD700] rounded-full shadow-md"></div>
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-[#0f0f0f] transform rotate-45 shadow-md"></div>
    </main>
  );
}