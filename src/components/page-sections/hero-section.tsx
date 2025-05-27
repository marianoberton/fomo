"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, BarChart3, Brain, TrendingUp, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const dataWaveRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCTAClick = () => {
    // Scroll to contact form section
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!titleRef.current || !mockupRef.current || !dataWaveRef.current) return;

    // Split text for animation
    const split = new SplitType(titleRef.current, { 
      types: 'lines,words,chars',
      lineClass: 'line-wrapper'
    });

    // Set initial states
    gsap.set(split.chars, { y: 100, opacity: 0 });
    gsap.set(mockupRef.current, { y: 50, opacity: 0, rotateX: 10 });
    gsap.set(".hero-content > *:not(h1)", { y: 30, opacity: 0 });

    // Create main timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Title animation - stagger by lines, then words, then chars
    split.lines?.forEach((line, i) => {
      const lineWords = line.querySelectorAll('.word');
      const lineChars = line.querySelectorAll('.char');
      
      tl.to(lineChars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
      }, i * 0.3);
    });

    // Other content animation
    tl.to(".hero-content > *:not(h1)", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");

    // Mockup animation
    tl.to(mockupRef.current, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");

    // Highlight animation for "disparan" and "PyME"
    const highlightTl = gsap.timeline({ delay: 2.5 });
    
    highlightTl.to(".highlight-word", {
      backgroundColor: "rgba(252, 205, 18, 0.3)",
      duration: 0.4,
      stagger: 0.8,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    });

    // Data wave animation
    gsap.to(dataWaveRef.current, {
      backgroundPosition: "100% 0%",
      duration: 20,
      ease: "none",
      repeat: -1
    });

    // Mouse move parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!mockupRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      gsap.to(mockupRef.current, {
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Video scroll control
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Add error handling and logging
      video.addEventListener('loadedmetadata', () => {
        console.log('Video loaded successfully:', video.duration);
        // Let the video play normally in loop
        video.play().catch(e => console.log('Autoplay prevented:', e));
      });

      video.addEventListener('error', (e) => {
        console.error('Video failed to load:', e);
      });

      video.addEventListener('canplay', () => {
        console.log('Video can start playing');
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      split.revert();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Background Video Loop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        style={{ filter: 'brightness(0.6) contrast(1.1)' }}
      >
        <source src="/videos/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Enhanced Data Wave Texture Background */}
      <div 
        ref={dataWaveRef}
        className="absolute inset-0 opacity-20 z-10"
        style={{
          background: `
            linear-gradient(45deg, transparent 30%, rgba(49, 6, 41, 0.1) 50%, transparent 70%), 
            radial-gradient(circle at 20% 50%, rgba(49, 6, 41, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(49, 6, 41, 0.15) 0%, transparent 50%),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(49, 6, 41, 0.05) 2px, rgba(49, 6, 41, 0.05) 4px),
            linear-gradient(135deg, rgba(252, 205, 18, 0.03) 0%, transparent 25%, rgba(49, 6, 41, 0.08) 50%, transparent 75%, rgba(252, 205, 18, 0.03) 100%)
          `,
          backgroundSize: '200% 100%, 600px 600px, 600px 600px, 20px 20px, 300% 300%'
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-plum/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-orange-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="relative w-full mx-auto grid lg:grid-cols-2 gap-20 items-center pt-20 z-30 px-4 sm:px-6 lg:px-8">
        {/* Left Column - Content */}
        <div className="space-y-10 hero-content">
          {/* Main Headline - 3 Lines */}
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-wide"
              style={{ letterSpacing: '0.02em', lineHeight: '1.1' }}
            >
              <span className="block text-brilliantBlue">
                Procesos inteligentes
              </span>
              <span className="block text-foreground">
                que <span className="highlight-word inline-block">disparan</span> tu
              </span>
              <span className="block text-brilliantBlue highlight-word">
                PyME
              </span>
            </h1>
            
            {/* Subtle separator */}
            <div className="w-16 h-px bg-gradient-to-r from-plum/20 to-transparent my-6"></div>
            
            <p className="text-xl text-muted-foreground max-w-2xl" style={{ lineHeight: '1.5', letterSpacing: '0.01em' }}>
              En FOMO rediseñamos tu forma de trabajar, automatizamos tareas clave y convertimos datos en decisiones.
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <Button 
              onClick={handleCTAClick}
              size="lg" 
              className="w-full sm:w-auto bg-brilliantBlue hover:bg-brilliantBlue/90 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
            >
              <Rocket className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              Solicitá diagnóstico de transformación
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Right Column - Enhanced 3D Mockup */}
        <div className="relative perspective-1000">
          <div 
            ref={mockupRef}
            className="relative bg-card rounded-3xl shadow-2xl p-8 border border-border transform-gpu"
            style={{ 
              transformStyle: 'preserve-3d',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            }}
          >
            <div className="space-y-6">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-semibold text-card-foreground">Dashboard Inteligente • En Vivo</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-signalYellow rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>

              {/* Enhanced Mock Charts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brilliantBlue/10 p-6 rounded-2xl border border-brilliantBlue/20 backdrop-blur-sm group hover:bg-brilliantBlue/15 transition-all duration-300 relative overflow-hidden">
                  <BarChart3 className="w-8 h-8 text-brilliantBlue mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-black text-brilliantBlue mb-1">-45%</div>
                  <div className="text-sm font-semibold text-brilliantBlue/80 uppercase tracking-wide">Tiempo procesos</div>
                  <div className="mt-3 h-3 bg-brilliantBlue/20 rounded-full overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-brilliantBlue to-brilliantBlue/60 rounded-full animate-pulse relative" style={{ width: '75%' }}>
                      <div className="absolute right-0 top-0 h-full w-2 bg-white/70 animate-pulse shadow-lg"></div>
                    </div>
                  </div>
                  <div className="text-xs text-brilliantBlue/70 mt-2 font-medium">🚀 Desde implementación</div>
                </div>
                
                <div className="bg-signalYellow/10 p-6 rounded-2xl border border-signalYellow/20 backdrop-blur-sm group hover:bg-signalYellow/15 transition-all duration-300 relative overflow-hidden">
                  <TrendingUp className="w-8 h-8 text-signalYellow/80 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-black text-signalYellow/80 mb-1">+134%</div>
                  <div className="text-sm font-semibold text-signalYellow/80 uppercase tracking-wide">Eficiencia</div>
                  <div className="mt-3 h-3 bg-signalYellow/20 rounded-full overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-signalYellow/80 to-signalYellow/40 rounded-full animate-pulse relative" style={{ width: '90%', animationDelay: '0.5s' }}>
                      <div className="absolute right-0 top-0 h-full w-2 bg-white/70 animate-pulse shadow-lg"></div>
                    </div>
                  </div>
                  <div className="text-xs text-signalYellow/70 mt-2 font-medium">📈 Últimos 3 meses</div>
                </div>
              </div>

              {/* Enhanced IA Insights */}
              <div className="bg-gradient-to-r from-plum/5 to-brilliantBlue/5 rounded-2xl p-6 border border-plum/20 backdrop-blur-sm hover:border-plum/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-plum rounded-full flex items-center justify-center relative">
                      <Brain className="w-5 h-5 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Alerta Automatizada</span>
                      <div className="text-xs text-muted-foreground">IA en tiempo real • Hace 2 min</div>
                    </div>
                  </div>
                  <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-medium">
                    PRIORIDAD ALTA
                  </div>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border-l-4 border-plum">
                  <p className="text-sm text-muted-foreground font-medium">
                    📦 "Stock bajo detectado: Ordenar 50 unidades del producto X antes del viernes"
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <span className="text-green-600">✓ Proveedor contactado</span>
                    <span className="text-blue-600">📧 Email enviado</span>
                    <span className="text-purple-600">📊 Predicción: -3 días stock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-signalYellow to-signalYellow/80 rounded-full flex items-center justify-center shadow-xl animate-float">
              <Zap className="w-8 h-8 text-neutral-900" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-brilliantBlue to-brilliantBlue/80 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '-1.5s' }}>
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-1/2 -left-4 w-12 h-12 bg-gradient-to-r from-plum to-plum/80 rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '-0.8s' }}>
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-500/80 rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '-2.2s' }}>
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 