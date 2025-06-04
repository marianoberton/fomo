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
      numberElements.forEach((el, index) => {
        const target = parseInt(el.textContent || '0');
        gsap.fromTo(el, 
          { textContent: 0 },
          { 
            textContent: target,
            duration: 2,
            delay: index * 0.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].textContent) + '%';
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
    };
  }, []);

  return (
    <>
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden w-full"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 30%, #f8fafc 60%, rgba(0, 119, 182, 0.02) 90%, #ffffff 100%)'
        }}
      >
        {/* Clean decorative background patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-3">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230077B6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        {/* Refined floating elements with brand colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {/* Large organic shapes */}
          <div 
            className="absolute top-1/6 right-1/5 w-72 h-72 rounded-full blur-3xl animate-float"
            style={{
              background: 'radial-gradient(circle, rgba(0, 119, 182, 0.06) 0%, rgba(0, 119, 182, 0.02) 40%, transparent 70%)',
              animationDuration: '12s'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/6 w-64 h-64 rounded-full blur-3xl animate-float"
            style={{
              background: 'radial-gradient(circle, rgba(252, 205, 18, 0.08) 0%, rgba(252, 205, 18, 0.03) 40%, transparent 70%)',
              animationDelay: '-3s',
              animationDuration: '15s'
            }}
          ></div>
          <div 
            className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full blur-2xl animate-float"
            style={{
              background: 'radial-gradient(circle, rgba(49, 6, 41, 0.04) 0%, rgba(49, 6, 41, 0.01) 40%, transparent 70%)',
              animationDelay: '-6s',
              animationDuration: '18s'
            }}
          ></div>

          {/* Medium floating elements with icons */}
          <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '-2s', animationDuration: '14s' }}>
            <div className="w-12 h-12 bg-brilliantBlue/8 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-brilliantBlue/10">
              <BarChart3 className="w-6 h-6 text-brilliantBlue/50" />
            </div>
          </div>
          <div className="absolute bottom-1/3 right-1/5 animate-float" style={{ animationDelay: '-8s', animationDuration: '16s' }}>
            <div className="w-10 h-10 bg-signalYellow/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-signalYellow/15">
              <TrendingUp className="w-5 h-5 text-signalYellow/60" />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/12 animate-float" style={{ animationDelay: '-5s', animationDuration: '13s' }}>
            <div className="w-8 h-8 bg-plum/6 rounded-xl flex items-center justify-center backdrop-blur-sm border border-plum/10">
              <Brain className="w-4 h-4 text-plum/50" />
            </div>
          </div>
          <div className="absolute top-1/3 right-1/6 animate-float" style={{ animationDelay: '-1s', animationDuration: '17s' }}>
            <div className="w-9 h-9 bg-orange-500/6 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange-500/10">
              <Zap className="w-4 h-4 text-orange-500/50" />
            </div>
          </div>

          {/* Small accent elements */}
          <div className="absolute top-1/5 left-1/3 w-3 h-3 bg-brilliantBlue/15 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/5 left-2/3 w-4 h-4 bg-signalYellow/20 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
          <div className="absolute top-3/5 right-1/4 w-2 h-2 bg-plum/20 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-2/5 left-1/5 w-5 h-5 bg-orange-500/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
        </div>

        <div className="relative w-full mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center z-30 px-4 sm:px-6 lg:px-8 max-w-7xl min-h-screen py-8">
          {/* Left Column - Content */}
          <div className="space-y-8 hero-content flex flex-col justify-center max-w-2xl">
            {/* Main Headline - 3 Lines with improved gradients */}
            <div className="space-y-6">
              <h1 
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                style={{ 
                  letterSpacing: '-0.01em', 
                  lineHeight: '1.1'
                }}
              >
                <span 
                  className="block hero-gradient-text mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #310629 0%, #0077B6 45%, #00a8cc 80%, #310629 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: '#0077B6',
                    display: 'block',
                    paddingBottom: '0.2em'
                  }}
                >
                  Procesos inteligentes
                </span>
                <span className="block text-slate-800 mb-3 middle-line" style={{ paddingBottom: '0.2em' }}>
                  que <span className="inline-block">disparan</span> tu
                </span>
                <span 
                  className="block hero-gradient-text"
                  style={{
                    background: 'linear-gradient(135deg, #0077B6 0%, #310629 35%, #FCCD12 70%, #310629 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: '#0077B6',
                    display: 'block',
                    paddingBottom: '0.2em'
                  }}
                >
                  PyME
                </span>
              </h1>
              
              {/* Enhanced separator */}
              <div 
                className="w-24 h-1 mt-6 rounded-full"
                style={{
                  background: 'linear-gradient(to right, rgba(0, 119, 182, 0.6), rgba(252, 205, 18, 0.8), transparent)'
                }}
              ></div>
              
              <p className="text-lg lg:text-xl text-slate-700 max-w-xl leading-relaxed" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
                Transformamos tu empresa con automatización inteligente, datos en tiempo real y decisiones que impulsan el crecimiento.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 pt-4">
              <Button 
                onClick={handleCTAClick}
                size="lg" 
                className="w-full sm:w-auto text-white px-8 py-5 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
                style={{
                  background: 'linear-gradient(135deg, #0077B6 0%, #310629 100%)'
                }}
              >
                <Rocket className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Solicitá diagnóstico gratuito
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 floating-arrow" />
              </Button>
            </div>
          </div>

          {/* Right Column - Enhanced 3D Mockup */}
          <div className="relative perspective-1000 w-full flex items-center justify-center lg:justify-end">
            <div 
              ref={mockupRef}
              className="relative rounded-2xl shadow-2xl p-4 lg:p-6 transform-gpu w-full max-w-lg group"
              style={{ 
                transformStyle: 'preserve-3d',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="space-y-4">
                {/* Enhanced Dashboard Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-base text-slate-800 group-hover:text-brilliantBlue transition-colors duration-300">Dashboard Inteligente</h3>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FCCD12', animationDelay: '0.3s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#0077B6', animationDelay: '0.6s' }}></div>
                  </div>
                </div>

                {/* Enhanced Visual Metrics with hover effects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  <div 
                    className="p-4 lg:p-5 rounded-2xl backdrop-blur-sm group/card hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.2) 0%, rgba(0, 119, 182, 0.1) 100%)',
                      border: '1px solid rgba(0, 119, 182, 0.3)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                    <div className="absolute inset-0 bg-brilliantBlue/5 scale-0 group-hover/card:scale-100 transition-transform duration-500 rounded-2xl"></div>
                    <BarChart3 className="w-7 h-7 lg:w-9 lg:h-9 mb-3 group-hover/card:rotate-12 group-hover/card:scale-110 transition-transform duration-500 relative z-10" style={{ color: '#0077B6' }} />
                    <div className="text-3xl lg:text-4xl font-black mb-2 relative z-10" style={{ color: '#0077B6' }}>
                      <span className="count-number">45</span>%
                    </div>
                    <div className="text-sm font-semibold relative z-10" style={{ color: '#0077B6' }}>Menos tiempo</div>
                    <ArrowRight className="absolute top-3 right-3 w-4 h-4 floating-arrow opacity-60 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-300" style={{ color: 'rgba(0, 119, 182, 0.6)' }} />
                  </div>

                  <div 
                    className="p-4 lg:p-5 rounded-2xl backdrop-blur-sm group/card hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(252, 205, 18, 0.2) 0%, rgba(252, 205, 18, 0.1) 100%)',
                      border: '1px solid rgba(252, 205, 18, 0.3)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-0 bg-signalYellow/5 scale-0 group-hover/card:scale-100 transition-transform duration-500 rounded-2xl"></div>
                    <TrendingUp className="w-7 h-7 lg:w-9 lg:h-9 mb-3 group-hover/card:rotate-12 group-hover/card:scale-110 transition-transform duration-500 relative z-10" style={{ color: 'rgba(252, 205, 18, 0.9)' }} />
                    <div className="text-3xl lg:text-4xl font-black mb-2 relative z-10" style={{ color: 'rgba(252, 205, 18, 0.9)' }}>
                      <span className="count-number">134</span>%
                    </div>
                    <div className="text-sm font-semibold relative z-10" style={{ color: 'rgba(252, 205, 18, 0.9)' }}>Más eficiencia</div>
                    <TrendingUp className="absolute top-3 right-3 w-4 h-4 floating-arrow opacity-60 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-300" style={{ color: 'rgba(252, 205, 18, 0.6)' }} />
                  </div>
                </div>

                {/* Enhanced AI Alert with more interactivity */}
                <div 
                  className="rounded-2xl p-4 backdrop-blur-sm hover:border-opacity-60 transition-all duration-500 relative overflow-hidden group/ai cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(49, 6, 41, 0.1) 0%, rgba(0, 119, 182, 0.1) 100%)',
                    border: '1px solid rgba(49, 6, 41, 0.2)'
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-1 animate-pulse"
                    style={{
                      background: 'linear-gradient(90deg, #310629 0%, #0077B6 50%, #FCCD12 100%)'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-plum/5 to-brilliantBlue/5 scale-0 group-hover/ai:scale-100 transition-transform duration-500 rounded-2xl"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div 
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center relative animate-pulse group-hover/ai:animate-bounce"
                      style={{
                        background: 'linear-gradient(45deg, #310629 0%, #0077B6 100%)'
                      }}
                    >
                      <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover/ai:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping group-hover/ai:bg-green-500"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm lg:text-base font-bold text-slate-800 mb-1 group-hover/ai:text-brilliantBlue transition-colors duration-300">IA detectó oportunidad</div>
                      <div className="text-sm text-slate-600 group-hover/ai:text-slate-700 transition-colors duration-300">Automatización sugerida lista</div>
                    </div>
                    <div 
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center group-hover/ai:scale-110 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)'
                      }}
                    >
                      <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-green-500 animate-pulse floating-arrow group-hover/ai:text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Enhanced Animated Progress Bars */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors duration-300">Procesos automatizados</span>
                    <span className="text-sm font-bold" style={{ color: '#0077B6' }}>87%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden relative group/progress">
                    <div 
                      className="progress-fill h-full rounded-full relative overflow-hidden" 
                      data-width="87%"
                      style={{
                        background: 'linear-gradient(90deg, #0077B6 0%, #FCCD12 100%)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse group-hover/progress:animate-none"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors duration-300">Decisiones basadas en datos</span>
                    <span className="text-sm font-bold" style={{ color: '#310629' }}>92%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden relative group/progress">
                    <div 
                      className="progress-fill h-full rounded-full relative overflow-hidden" 
                      data-width="92%"
                      style={{
                        background: 'linear-gradient(90deg, #310629 0%, #0077B6 100%)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse group-hover/progress:animate-none" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating elements - Los 4 que quieres mantener */}
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-xl animate-float"
                style={{
                  background: 'linear-gradient(45deg, #FCCD12 0%, rgba(252, 205, 18, 0.8) 100%)'
                }}
              >
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900" />
              </div>
              <div 
                className="absolute -bottom-4 -left-4 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-xl animate-float"
                style={{
                  background: 'linear-gradient(45deg, #0077B6 0%, rgba(0, 119, 182, 0.8) 100%)',
                  animationDelay: '-1.5s'
                }}
              >
                <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div 
                className="absolute top-1/2 -left-3 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg animate-float"
                style={{
                  background: 'linear-gradient(45deg, #310629 0%, rgba(49, 6, 41, 0.8) 100%)',
                  animationDelay: '-0.8s'
                }}
              >
                <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div 
                className="absolute -bottom-4 -right-4 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg animate-float"
                style={{
                  background: 'linear-gradient(45deg, #f97316 0%, rgba(249, 115, 22, 0.8) 100%)',
                  animationDelay: '-2.2s'
                }}
              >
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center">
          <div className="text-sm text-slate-600 mb-2 font-medium">Descubre más</div>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-slate-600 to-transparent rounded-full animate-bounce mt-2"></div>
          </div>
          <div className="mt-2">
            <svg 
              className="w-4 h-4 text-slate-500 animate-bounce" 
              style={{ animationDelay: '0.5s' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .hero-content h1 {
            font-size: 2.25rem;
            line-height: 1.15;
          }
          
          .hero-content p {
            font-size: 1.125rem;
          }
          
          .animate-float {
            animation-duration: 4s;
          }
        }
        
        @media (max-width: 1024px) {
          .hero-content h1 {
            font-size: 3.5rem;
            line-height: 1.1;
          }
        }
        
        .hero-gradient-text {
          background: linear-gradient(135deg, #310629 0%, #0077B6 45%, #00a8cc 80%, #310629 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          display: block !important;
          background-size: 200% 100% !important;
          animation: gradient-flow 8s ease-in-out infinite !important;
        }
        
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Prevenir corte de letras con descenders */
        .hero-gradient-text, 
        .hero-content h1 span {
          overflow: visible;
          padding-bottom: 0.2em;
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
      `}</style>
    </>
  );
} 