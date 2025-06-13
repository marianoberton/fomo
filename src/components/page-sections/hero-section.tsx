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
  const highlightRef = useRef<HTMLSpanElement>(null);
  const wordContainerRef = useRef<HTMLSpanElement>(null);

  const handleCTAClick = () => {
    // Scroll to contact form section
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Remove forced white background to allow our gradient to show
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = '';
      document.body.style.background = '';
      document.documentElement.style.backgroundColor = '';
      document.documentElement.style.background = '';
    }

    if (!titleRef.current || !mockupRef.current) return;

    // Split only the middle line for character animation
    const middleLine = titleRef.current?.querySelector('.middle-line') as HTMLElement;
    let split = null;
    if (middleLine) {
      split = new SplitType(middleLine, { 
        types: 'chars',
      });
    }

    // Set initial states
    if (split?.chars) {
      gsap.set(split.chars, { y: 100, opacity: 0 });
    }
    gsap.set(".hero-gradient-text", { y: 50, opacity: 0 });
    gsap.set(mockupRef.current, { y: 50, opacity: 0, rotateX: 10 });
    gsap.set(".hero-content > *:not(h1)", { y: 30, opacity: 0 });
    
    // Ensure tu-pyme line stays together
    gsap.set(".tu-pyme-line", { 
      whiteSpace: "nowrap",
      display: "block",
      width: "fit-content"
    });

    // Create main timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate gradient text first
    tl.to(".hero-gradient-text", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      ease: "back.out(1.7)",
    }, 0);

    // Animate middle line characters
    if (split?.chars) {
      tl.to(split.chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
      }, 0.6);
    }

    // Other content animation
    tl.to(".hero-content > *:not(h1)", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.8");

    // Mockup animation
    tl.to(mockupRef.current, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");

    // Dashboard animations after mockup appears
    tl.add(() => {
      // Animate number counting
      const numberElements = document.querySelectorAll('.count-number');
      const targetValues = [45, 187]; // Define target values explicitly
      
      numberElements.forEach((el, index) => {
        const target = targetValues[index] || 0;
        gsap.fromTo(el, 
          { textContent: 0 },
          { 
            textContent: target,
            duration: 2,
            delay: index * 0.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].textContent).toString();
            }
          }
        );
      });

      // Animate progress bars filling
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        if (width) {
          gsap.fromTo(bar, 
            { width: '0%' },
            { 
              width: width,
              duration: 2,
              delay: 1 + index * 0.3,
              ease: "power2.out"
            }
          );
        }
      });

      // AI notification popup animation
      const notification = document.querySelector('.ai-notification');
      if (notification) {
        gsap.fromTo(notification,
          { scale: 0, opacity: 0, y: 20 },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            delay: 2.5,
            ease: "back.out(1.7)"
          }
        );
      }

      // Floating arrows animation
      const arrows = document.querySelectorAll('.floating-arrow');
      arrows.forEach((arrow, index) => {
        gsap.to(arrow, {
          y: -10,
          duration: 1.5,
          delay: 3 + index * 0.2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      });
    }, "+=0.5");

    // Word rotation animation with GSAP
    const words = ["disparan", "potencian", "transforman"];
    let currentWordIndex = 0;
    
    const animateWordChange = () => {
      if (!wordContainerRef.current) return;
      
      const currentWord = words[currentWordIndex];
      const nextWordIndex = (currentWordIndex + 1) % words.length;
      const nextWord = words[nextWordIndex];
      
      // Timeline for word change
      const wordTl = gsap.timeline();
      
      // Phase 1: Show current word normally (2s)
      wordTl.set(wordContainerRef.current, { 
        textContent: currentWord,
        textDecoration: "none",
        scale: 1
      })
      
      // Phase 2: Strike through effect (0.5s)
      .to(wordContainerRef.current, {
        textDecoration: "line-through",
        textDecorationColor: "#f97316",
        scale: 1.05,
        duration: 0.3,
        delay: 2.2
      })
      
      // Phase 3: Fade out and change text (0.3s)
      .to(wordContainerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        delay: 0.2
      })
      
      // Phase 4: Change text and fade in (0.3s)
      .set(wordContainerRef.current, { 
        textContent: nextWord,
        textDecoration: "none",
        scale: 1,
        y: 10
      })
      .to(wordContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3
      });
      
      currentWordIndex = nextWordIndex;
    };
    
    // Start the word rotation after initial animations
    const wordRotationTimer = setInterval(animateWordChange, 3000);
    
    // Initial call after delay
    setTimeout(animateWordChange, 3000);

    // Enhanced Mouse move parallax effect with magnetic interactions
    const handleMouseMove = (e: MouseEvent) => {
      if (!mockupRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      // Enhanced 3D effect for mockup
      gsap.to(mockupRef.current, {
        rotateY: x * 8,
        rotateX: -y * 8,
        transformPerspective: 1000,
        duration: 0.8,
        ease: "power2.out"
      });

      // Animate floating elements based on cursor position
      gsap.to(".particle", {
        x: x * 20,
        y: y * 20,
        duration: 1.5,
        ease: "power2.out"
      });

      // Magnetic effect for interactive elements
      const interactiveElements = document.querySelectorAll('.group\\/card, .group\\/ai');
      interactiveElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clientX - elementX, 2) + Math.pow(clientY - elementY, 2)
        );
        
        if (distance < 100) {
          const pullX = (clientX - elementX) * 0.1;
          const pullY = (clientY - elementY) * 0.1;
          
          gsap.to(el, {
            x: pullX,
            y: pullY,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    };

    // Cursor leave effect
    const handleMouseLeave = () => {
      if (!mockupRef.current) return;
      
      gsap.to(mockupRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(".particle", {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Reset magnetic elements
      const interactiveElements = document.querySelectorAll('.group\\/card, .group\\/ai');
      interactiveElements.forEach(el => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (split) {
        split.revert();
      }
      clearInterval(wordRotationTimer);
    };
  }, []);

  return (
    <>
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden w-full pt-24 md:pt-20 lg:pt-16"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 30%, #f8fafc 60%, rgba(0, 119, 182, 0.02) 90%, #ffffff 100%)'
        }}
      >
        <div className="relative w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 items-center z-30 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 max-w-7xl py-4 md:py-6 lg:py-8">
          {/* Left Column - Content */}
          <div className="space-y-3 md:space-y-4 lg:space-y-5 hero-content flex flex-col justify-center w-full order-1 lg:order-1">
            {/* Main Headline - 3 Lines with elegant gradient */}
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <h1 
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                style={{ 
                  letterSpacing: '-0.015em', 
                  lineHeight: '1.0'
                }}
              >
                <span 
                  className="block mb-0.5 md:mb-1 lg:mb-1.5"
                  style={{
                    display: 'block',
                    paddingBottom: '0.05em',
                    color: '#1f2937'
                  }}
                >
                  Procesos inteligentes
                </span>
                <span className="block text-slate-800 mb-0.5 md:mb-1 lg:mb-1.5 middle-line overflow-visible" style={{ paddingBottom: '0.05em', overflow: 'visible' }}>
                  <span 
                    ref={wordContainerRef}
                    className="inline-block animated-word-gsap font-extrabold overflow-visible"
                    style={{ 
                      color: '#f97316',
                      textShadow: '0 0 20px rgba(249, 115, 22, 0.3)',
                      minWidth: '8ch',
                      display: 'inline-block',
                      overflow: 'visible',
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    disparan
                  </span>
                </span>
                <span 
                  className="block text-slate-800 middle-line tu-pyme-line" 
                  style={{ 
                    paddingBottom: '0.05em', 
                    whiteSpace: 'nowrap',
                    display: 'block',
                    width: 'fit-content',
                    marginTop: '0.05em'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                    tu <span 
                      style={{
                        color: '#1f2937',
                        whiteSpace: 'nowrap',
                        display: 'inline'
                      }}
                    >PyME</span>
                  </span>
                </span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-slate-700 max-w-xl leading-relaxed mt-2 md:mt-3 lg:mt-4" style={{ lineHeight: '1.7', letterSpacing: '0.01em' }}>
                Transformamos tu empresa con automatización inteligente, datos en tiempo real y decisiones que impulsan el crecimiento.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-2 md:space-y-3 pt-0.5 md:pt-1 lg:pt-1.5">
              <Button 
                onClick={handleCTAClick}
                size="lg" 
                className="w-full sm:w-auto text-black px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group min-w-fit inline-flex items-center justify-center gap-3 md:gap-4"
                style={{
                  background: 'linear-gradient(135deg, #FCCD12 0%, #f97316 100%)'
                }}
              >
                <Rocket className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="whitespace-nowrap flex-shrink-0">Solicitá diagnóstico gratuito</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Button>
            </div>
          </div>

          {/* Right Column - Enhanced 3D Mockup */}
          <div className="relative perspective-1000 w-full flex items-center justify-center lg:justify-end xl:justify-end order-2 lg:order-2 lg:pl-4 xl:pl-6 pb-6 md:pb-2 lg:pb-0">
            <div 
              ref={mockupRef}
              className="relative rounded-2xl shadow-2xl p-3.5 md:p-4.5 lg:p-5.5 pb-5 md:pb-6 lg:pb-7 transform-gpu w-full max-w-xs md:max-w-sm lg:max-w-md group mobile-dashboard-float"
              style={{ 
                transformStyle: 'preserve-3d',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                transform: 'scale(0.95)'
              }}
            >
              <div className="space-y-4 md:space-y-5 lg:space-y-6">
                {/* Enhanced Dashboard Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 md:pb-4 lg:pb-5">
                  <h3 className="font-bold text-sm md:text-base lg:text-lg text-slate-800 group-hover:text-brilliantBlue transition-colors duration-300">Dashboard FOMO</h3>
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#FCCD12', animationDelay: '0.3s' }}></div>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 rounded-full animate-pulse bg-brilliantBlue" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>

                {/* Enhanced Visual Metrics with hover effects */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                  <div 
                    className="p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl backdrop-blur-sm group/card hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer"
                    style={{
                      background: '#0077B6',
                      border: '1px solid rgba(0, 119, 182, 0.3)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                    <div className="absolute inset-0 bg-white/5 scale-0 group-hover/card:scale-100 transition-transform duration-500 rounded-xl md:rounded-2xl"></div>
                    <BarChart3 className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9 mb-2 md:mb-3 group-hover/card:rotate-12 group-hover/card:scale-110 transition-transform duration-500 relative z-10 text-white" />
                    <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 relative z-10 text-white">
                      <span className="count-number">0</span>%
                    </div>
                    <div className="text-xs md:text-sm font-semibold relative z-10 text-white/90">Menos tiempo</div>
                    <ArrowRight className="absolute top-2 md:top-3 right-2 md:right-3 w-3 h-3 md:w-4 md:h-4 floating-arrow opacity-60 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-300 text-white/60" />
                  </div>

                  <div 
                    className="p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl backdrop-blur-sm group/card hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer"
                    style={{
                      background: '#f97316',
                      border: '1px solid rgba(249, 115, 22, 0.3)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-0 bg-white/5 scale-0 group-hover/card:scale-100 transition-transform duration-500 rounded-xl md:rounded-2xl"></div>
                    <TrendingUp className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9 mb-2 md:mb-3 group-hover/card:rotate-12 group-hover/card:scale-110 transition-transform duration-500 relative z-10 text-white" />
                    <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 relative z-10 text-white">
                      <span className="count-number">0</span>%
                    </div>
                    <div className="text-xs md:text-sm font-semibold relative z-10 text-white/90">Aumento de ventas</div>
                    <TrendingUp className="absolute top-2 md:top-3 right-2 md:right-3 w-3 h-3 md:w-4 md:h-4 floating-arrow opacity-60 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-300 text-white/60" />
                  </div>
                </div>

                {/* Enhanced AI Alert with more interactivity */}
                <div 
                  className="rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 backdrop-blur-sm hover:border-opacity-60 transition-all duration-500 relative overflow-hidden group/ai cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(49, 6, 41, 0.1) 0%, rgba(0, 119, 182, 0.1) 100%)',
                    border: '1px solid rgba(49, 6, 41, 0.2)'
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-1 animate-pulse bg-gradient-to-r from-plum via-brilliantBlue to-signalYellow"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-plum/5 to-brilliantBlue/5 scale-0 group-hover/ai:scale-100 transition-transform duration-500 rounded-xl md:rounded-2xl"></div>
                  <div className="flex items-center gap-4 md:gap-5 lg:gap-6 relative z-10">
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl flex items-center justify-center relative animate-pulse group-hover/ai:animate-bounce bg-gradient-to-br from-plum to-brilliantBlue"
                    >
                      <Brain className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white group-hover/ai:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full animate-ping group-hover/ai:bg-green-500"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm md:text-base lg:text-lg font-bold text-slate-800 mb-1 md:mb-2 group-hover/ai:text-brilliantBlue transition-colors duration-300">IA detectó oportunidad</div>
                      <div className="text-xs md:text-sm lg:text-base text-slate-600 group-hover/ai:text-slate-700 transition-colors duration-300">Automatización sugerida lista</div>
                    </div>
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl flex items-center justify-center group-hover/ai:scale-110 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)'
                      }}
                    >
                      <Zap className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-green-500 animate-pulse floating-arrow group-hover/ai:text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Enhanced Animated Progress Bars */}
                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base font-semibold text-slate-600 group-hover:text-slate-800 transition-colors duration-300">Procesos automatizados</span>
                      <span className="text-sm md:text-base font-bold text-brilliantBlue">87%</span>
                  </div>
                    <div className="h-2.5 md:h-3 lg:h-4 bg-slate-200 rounded-full overflow-hidden relative group/progress">
                    <div 
                      className="progress-fill h-full rounded-full relative overflow-hidden bg-brilliantBlue" 
                      data-width="87%"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse group-hover/progress:animate-none"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base font-semibold text-slate-600 group-hover:text-slate-800 transition-colors duration-300">Decisiones basadas en datos</span>
                      <span className="text-sm md:text-base font-bold text-orange-500">92%</span>
                  </div>
                    <div className="h-2.5 md:h-3 lg:h-4 bg-slate-200 rounded-full overflow-hidden relative group/progress">
                    <div 
                      className="progress-fill h-full rounded-full relative overflow-hidden bg-orange-500" 
                      data-width="92%"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse group-hover/progress:animate-none" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating elements - Los 4 que quieres mantener */}
              <div 
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-xl animate-float"
                style={{
                  background: 'linear-gradient(45deg, #FCCD12 0%, rgba(252, 205, 18, 0.8) 100%)'
                }}
              >
                <Zap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-neutral-900" />
              </div>
              <div 
                className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-xl animate-float bg-gradient-to-br from-brilliantBlue to-brilliantBlue/80"
                style={{
                  animationDelay: '-1.5s'
                }}
              >
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div 
                className="absolute top-1/2 -left-2 md:-left-3 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg animate-float"
                style={{
                  background: 'linear-gradient(45deg, #310629 0%, rgba(49, 6, 41, 0.8) 100%)',
                  animationDelay: '-0.8s'
                }}
              >
                <Brain className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div 
                className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg animate-float"
                style={{
                  background: 'linear-gradient(45deg, #f97316 0%, rgba(249, 115, 22, 0.8) 100%)',
                  animationDelay: '-2.2s'
                }}
              >
                <Users className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Custom Styles for Dynamic Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.7;
          }
          25% { 
            transform: translateY(-12px) rotate(2deg) scale(1.05); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-8px) rotate(-1deg) scale(1.02); 
            opacity: 0.9;
          }
          75% { 
            transform: translateY(-15px) rotate(1deg) scale(1.03); 
            opacity: 0.8;
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(0, 119, 182, 0.3), 0 0 10px rgba(0, 119, 182, 0.2); 
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 20px rgba(0, 119, 182, 0.6), 0 0 30px rgba(0, 119, 182, 0.4); 
            transform: scale(1.02);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }
        
        @keyframes rotate-360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0px) scale(1);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-arrow {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-rotate {
          animation: rotate-360 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .count-number {
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .progress-fill {
          width: 0%;
          transition: width 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }
        
        .ai-notification {
          transform: scale(0);
          opacity: 0;
        }
        
        /* Enhanced hover effects */
        .group:hover .floating-arrow {
          animation-duration: 1s;
        }
        
        .group/card:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .group/ai:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 30px rgba(49, 6, 41, 0.2);
        }
        
        /* Particle animations */
        .particle {
          pointer-events: none;
        }
        
        /* Enhanced Responsive adjustments */
        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 1.875rem;
            line-height: 1.15;
            overflow: visible !important;
          }
          
          .hero-content p {
            font-size: 0.875rem;
            line-height: 1.6;
          }
          
          .animate-float {
            animation-duration: 4s;
          }
          
          .min-w-fit {
            min-width: auto;
          }
          
          /* Mobile portrait specific adjustments */
          section {
            padding-top: 6rem !important;
            padding-bottom: 1.5rem !important;
            min-height: 100vh;
          }
          
          .grid {
            gap: 2.5rem !important;
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
            align-items: flex-start !important;
          }
          
          .hero-content {
            gap: 1.5rem !important;
            overflow: visible !important;
          }
          
          /* Ensure dashboard comes after text in mobile */
          .order-2:first-child {
            order: 2;
          }
          
          /* Fix animated word overflow on mobile */
          .animated-word-gsap {
            overflow: visible !important;
            min-width: 9ch !important;
            max-width: none !important;
            white-space: nowrap !important;
          }
          
          .middle-line {
            overflow: visible !important;
            position: relative !important;
            z-index: 10 !important;
          }
          
          /* Better mobile spacing */
          .space-y-3 > * + * {
            margin-top: 1rem !important;
          }
          
          .space-y-2 > * + * {
            margin-top: 0.75rem !important;
          }
        }
        
        @media (max-width: 640px) {
          .hero-content h1 {
            font-size: 2.25rem;
            line-height: 1.15;
            overflow: visible !important;
          }
          
          .hero-content p {
            font-size: 1rem;
            line-height: 1.7;
          }
          
          .animate-float {
            animation-duration: 5s;
          }
          
          /* Mobile general adjustments */
          section {
            padding-top: 5.5rem;
            padding-bottom: 1.5rem;
          }
          
          .grid {
            gap: 3rem;
            align-items: flex-start;
          }
          
          .hero-content {
            gap: 1.25rem;
            overflow: visible !important;
          }
          
          /* Fix animated word on larger mobile */
          .animated-word-gsap {
            overflow: visible !important;
            min-width: 10ch !important;
          }
          
          /* Better mobile spacing distribution */
          .space-y-3 > * + * {
            margin-top: 1.25rem !important;
          }
          
          .space-y-4 > * + * {
            margin-top: 1.5rem !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.75rem;
            line-height: 1.1;
          }
          
          .hero-content p {
            font-size: 1.125rem;
            line-height: 1.7;
          }
          
          section {
            padding-top: 4rem;
            padding-bottom: 2rem;
          }
          
          .grid {
            gap: 3rem;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-content h1 {
            font-size: 3.5rem;
            line-height: 0.95;
          }
          
          .hero-content p {
            font-size: 1.25rem;
            line-height: 1.7;
          }
          
          section {
            padding-top: 3.5rem;
            padding-bottom: 2rem;
          }
          
          .grid {
            gap: 3.5rem;
          }
        }
        
        @media (min-width: 1025px) {
          .hero-content h1 {
            line-height: 0.9;
          }
          
          .hero-content {
            gap: 1.25rem;
          }
          
          section {
            padding-top: 3rem;
            padding-bottom: 2rem;
          }
          
          .grid {
            gap: 3.5rem;
          }
        }
        
        @media (max-width: 1024px) {
          .grid.lg\\:grid-cols-\\[1\\.1fr_0\\.9fr\\] {
            gap: 1.5rem;
          }
        }
        
        /* Improved CTA responsiveness */
        @media (max-width: 640px) {
          .group .whitespace-nowrap {
            white-space: normal;
            text-align: center;
            line-height: 1.3;
          }
          
          /* Better CTA spacing */
          Button {
            margin-top: 0.75rem;
          }
        }
        
        /* Enhanced spacing for better visual hierarchy - more conservative */
        @media (min-width: 768px) {
          .space-y-3 > * + * {
            margin-top: 1rem;
          }
          
          .space-y-4 > * + * {
            margin-top: 1.25rem;
          }
          
          .space-y-5 > * + * {
            margin-top: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .space-y-3 > * + * {
            margin-top: 1.25rem;
          }
          
          .space-y-4 > * + * {
            margin-top: 1.5rem;
          }
          
          .space-y-5 > * + * {
            margin-top: 1.75rem;
          }
        }
        
        /* Better button alignment */
        .group.min-w-fit {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          line-height: 1 !important;
        }
        
        .group.min-w-fit svg {
          margin-left: 0 !important;
          margin-right: 0 !important;
          vertical-align: middle !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        /* Remove floating animation from CTA arrow to prevent misalignment */
        .group.min-w-fit .w-4,
        .group.min-w-fit .w-5 {
          align-self: center !important;
        }
        
        .hero-gradient-text {
          display: block !important;
        }
        
        .animated-word-gsap {
          transition: all 0.3s ease;
          overflow: visible !important;
          position: relative;
          z-index: 10;
          transform-origin: left center;
        }
        
        .middle-line {
          overflow: visible !important;
          position: relative;
          z-index: 5;
        }
        
        .tu-pyme-line {
          white-space: nowrap !important;
          display: block !important;
          width: fit-content !important;
        }
        
        .tu-pyme-line span {
          white-space: nowrap !important;
          display: inline-block !important;
        }
        
        /* Prevenir corte de letras con descenders */
        .hero-gradient-text, 
        .hero-content h1 span {
          overflow: visible;
          padding-bottom: 0.2em;
        }
        
        /* Ensure animated word doesn't get clipped */
        .hero-content h1 {
          overflow: visible !important;
        }
        
        .hero-content h1 > span {
          overflow: visible !important;
        }
        
        /* Enhanced mockup animations */
        .dashboard-mockup {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .dashboard-mockup:hover {
          transform: translateY(-8px) rotateX(5deg) rotateY(5deg);
          box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.3);
        }
        
        /* Particle systems */
        .particle-blue {
          background: radial-gradient(circle, rgba(0, 119, 182, 0.6) 0%, transparent 70%);
          animation: float 8s ease-in-out infinite;
        }
        
        .particle-yellow {
          background: radial-gradient(circle, rgba(252, 205, 18, 0.7) 0%, transparent 70%);
          animation: bounce-gentle 6s ease-in-out infinite;
        }
        
        .particle-plum {
          background: radial-gradient(circle, rgba(49, 6, 41, 0.5) 0%, transparent 70%);
          animation: float 10s ease-in-out infinite reverse;
        }
        
        /* Mobile Dashboard Float Animation */
        @keyframes mobile-dashboard-float {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translateY(-8px) rotateX(2deg) rotateY(1deg); 
          }
          50% { 
            transform: translateY(-5px) rotateX(-1deg) rotateY(-1deg); 
          }
          75% { 
            transform: translateY(-12px) rotateX(1deg) rotateY(2deg); 
          }
        }
        
        .mobile-dashboard-float {
          animation: mobile-dashboard-float 6s ease-in-out infinite;
        }
        
        /* Disable mobile animation on desktop */
        @media (min-width: 768px) {
          .mobile-dashboard-float {
            animation: none;
          }
        }
        
        /* Disable floating animation for CTA button arrows */
        .group.min-w-fit .floating-arrow {
          animation: none !important;
        }
      `}</style>
    </>
  );
} 