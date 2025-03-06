"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

// Technology logo interface
interface TechLogo {
  name: string;
  image: string;
  category: string;
}

export default function TechnologiesSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Technology logos data
  const logos: TechLogo[] = [
    // Development
    { name: "Next.js", image: "/logos/nextjs.svg", category: "Desarrollo Web" },
    { name: "React", image: "/logos/react.svg", category: "Desarrollo Web" },
    { name: "Supabase", image: "/logos/supabase.svg", category: "Desarrollo Web" },
    { name: "Node.js", image: "/logos/nodejs.svg", category: "Desarrollo Web" },
    
    // Automation
    { name: "Python", image: "/logos/python.svg", category: "Automatizaciones" },
    { name: "Selenium", image: "/logos/selenium.svg", category: "Automatizaciones" },
    { name: "Zapier", image: "/logos/zapier.svg", category: "Automatizaciones" },
    
    // AI
    { name: "OpenAI", image: "/logos/openai.svg", category: "IA" },
    { name: "DeepSeek", image: "/logos/deepseek.svg", category: "IA" },
    { name: "AnteLogic", image: "/logos/antelogic.svg", category: "IA" },
    
    // Integrations
    { name: "Mercado Pago", image: "/logos/mercadopago.svg", category: "Integraciones" },
    { name: "AFIP", image: "/logos/afip.svg", category: "Integraciones" },
    { name: "WhatsApp", image: "/logos/whatsapp.svg", category: "Integraciones" },
    { name: "Mercado Libre", image: "/logos/mercadolibre.svg", category: "Integraciones" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const marquee = marqueeRef.current;
    const marqueeInner = marqueeInnerRef.current;
    
    if (section && title && desc && marquee && marqueeInner) {
      // Animate title and description
      gsap.fromTo(
        title,
        { y: -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        desc,
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Create infinite marquee animation
      const marqueeAnimation = gsap.to(marqueeInner, {
        x: "-50%",
        ease: "none",
        duration: 20,
        repeat: -1,
        repeatDelay: 0
      });
      
      // Pause animation on hover
      marquee.addEventListener("mouseenter", () => {
        marqueeAnimation.pause();
      });
      
      marquee.addEventListener("mouseleave", () => {
        marqueeAnimation.play();
      });
      
      return () => {
        marqueeAnimation.kill();
        marquee.removeEventListener("mouseenter", () => {});
        marquee.removeEventListener("mouseleave", () => {});
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white" id="technologies">
      <div className="container mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 ref={titleRef} className="text-3xl font-bold text-neutral mb-4">
            Tecnologías que Impulsan Nuestras Soluciones
          </h2>
          <p ref={descRef} className="text-lg text-neutral/80">
            Usamos las herramientas más modernas del mercado para que tus proyectos sean rápidos, escalables y seguros. 
            Desde desarrollo web hasta inteligencia artificial, estas son las tecnologías que nos hacen diferentes.
          </p>
        </div>
      </div>
      
      <div 
        ref={marqueeRef}
        className="overflow-hidden py-8 relative"
      >
        <div 
          ref={marqueeInnerRef}
          className="flex whitespace-nowrap"
          style={{ width: "fit-content" }}
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div 
              key={`logo-1-${index}`} 
              className="mx-8 flex flex-col items-center group"
            >
              <div className="w-24 h-24 relative flex items-center justify-center mb-2">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={80}
                  height={80}
                  className="filter grayscale transition-all duration-300 group-hover:filter-none group-hover:scale-110"
                  style={{ 
                    maxWidth: "100%", 
                    height: "auto",
                    filter: "grayscale(100%)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
              <span className="text-sm text-neutral/70 whitespace-nowrap">{logo.name}</span>
              <span className="text-xs text-primary/80 whitespace-nowrap">{logo.category}</span>
            </div>
          ))}
          
          {/* Duplicate logos for seamless loop */}
          {logos.map((logo, index) => (
            <div 
              key={`logo-2-${index}`} 
              className="mx-8 flex flex-col items-center group"
            >
              <div className="w-24 h-24 relative flex items-center justify-center mb-2">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={80}
                  height={80}
                  className="filter grayscale transition-all duration-300 group-hover:filter-none group-hover:scale-110"
                  style={{ 
                    maxWidth: "100%", 
                    height: "auto",
                    filter: "grayscale(100%)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
              <span className="text-sm text-neutral/70 whitespace-nowrap">{logo.name}</span>
              <span className="text-xs text-primary/80 whitespace-nowrap">{logo.category}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mt-8">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-secondary/30 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-neutral">Desarrollo Web</span>
          </div>
          <div className="bg-secondary/30 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-neutral">Automatizaciones</span>
          </div>
          <div className="bg-secondary/30 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-neutral">IA</span>
          </div>
          <div className="bg-secondary/30 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-neutral">Integraciones</span>
          </div>
        </div>
      </div>
    </section>
  );
}