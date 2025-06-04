"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, DollarSign, Clock, TrendingUp, Play, Pause, RotateCcw, Users, Package, AlertTriangle, Coffee, Smartphone, CheckCircle, XCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryScene {
  id: string;
  title: string;
  time: string;
  character: string;
  situation: string;
  emotion: 'stressed' | 'frustrated' | 'overwhelmed' | 'calm' | 'confident' | 'happy';
  problem?: string;
  solution?: string;
  icon: React.ReactNode;
}

interface BusinessStory {
  id: string;
  title: string;
  character: string;
  industry: string;
  beforeScenes: StoryScene[];
  afterScenes: StoryScene[];
  savings: string;
  timeframe: string;
}

interface CinematicState {
  isPlaying: boolean;
  currentStory: 'inventory' | 'customers' | 'operations';
  currentScene: number;
  showingAfter: boolean;
  stories: BusinessStory[];
  autoPlay: boolean;
}

export default function HeroAISection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cinemaRef = useRef<HTMLDivElement>(null);
  const [cinema, setCinema] = useState<CinematicState>({
    isPlaying: false,
    currentStory: 'inventory',
    currentScene: 0,
    showingAfter: false,
    autoPlay: false,
    stories: [
      {
        id: 'inventory',
        title: 'El Drama del Stock',
        character: 'María, Dueña de Boutique',
        industry: 'Retail de Moda',
        beforeScenes: [
          {
            id: 'morning-chaos',
            title: 'Lunes 8:00 AM',
            time: '8:00 AM',
            character: 'María llega al local',
            situation: 'Descubre que se agotó el vestido más vendido del fin de semana',
            emotion: 'stressed',
            problem: 'Stock agotado = Ventas perdidas',
            icon: <XCircle className="w-6 h-6 text-red-500" />
          },
          {
            id: 'afternoon-crisis',
            title: 'Lunes 3:00 PM',
            time: '3:00 PM',
            character: 'María en el depósito',
            situation: 'Encuentra 50 abrigos de invierno que no vendió, capital inmovilizado',
            emotion: 'frustrated',
            problem: 'Exceso de stock = $200.000 perdidos',
            icon: <Package className="w-6 h-6 text-orange-500" />
          },
          {
            id: 'night-stress',
            title: 'Lunes 10:00 PM',
            time: '10:00 PM',
            character: 'María en casa',
            situation: 'Haciendo pedidos manualmente, sin saber qué va a vender mañana',
            emotion: 'overwhelmed',
            problem: 'Decisiones a ciegas',
            icon: <AlertTriangle className="w-6 h-6 text-red-600" />
          }
        ],
        afterScenes: [
          {
            id: 'smart-morning',
            title: 'Martes 8:00 AM',
            time: '8:00 AM',
            character: 'María revisa su app',
            situation: 'La IA ya predijo demanda y reordenó stock automáticamente',
            emotion: 'calm',
            solution: 'Stock optimizado 24/7',
            icon: <CheckCircle className="w-6 h-6 text-green-500" />
          },
          {
            id: 'confident-afternoon',
            title: 'Martes 3:00 PM',
            time: '3:00 PM',
            character: 'María atendiendo clientes',
            situation: 'Tiene exactamente lo que necesita, cuando lo necesita',
            emotion: 'confident',
            solution: 'Inventario inteligente',
            icon: <TrendingUp className="w-6 h-6 text-blue-500" />
          },
          {
            id: 'relaxed-night',
            title: 'Martes 10:00 PM',
            time: '10:00 PM',
            character: 'María cenando tranquila',
            situation: 'La IA maneja todo automáticamente, ella disfruta su tiempo libre',
            emotion: 'happy',
            solution: 'Libertad total',
            icon: <Coffee className="w-6 h-6 text-purple-500" />
          }
        ],
        savings: '$45.000/mes',
        timeframe: '3 meses'
      },
      {
        id: 'customers',
        title: 'La Fuga de Clientes',
        character: 'Carlos, Dueño de Gimnasio',
        industry: 'Fitness & Wellness',
        beforeScenes: [
          {
            id: 'surprise-cancellation',
            title: 'Miércoles 9:00 AM',
            time: '9:00 AM',
            character: 'Carlos recibe llamada',
            situation: 'Su mejor cliente cancela la membresía sin aviso',
            emotion: 'frustrated',
            problem: 'Cancelaciones inesperadas',
            icon: <XCircle className="w-6 h-6 text-red-500" />
          },
          {
            id: 'pattern-blindness',
            title: 'Miércoles 2:00 PM',
            time: '2:00 PM',
            character: 'Carlos revisando números',
            situation: 'Ve que perdió 15 clientes este mes, pero no sabe por qué',
            emotion: 'stressed',
            problem: 'Sin visibilidad de patrones',
            icon: <AlertTriangle className="w-6 h-6 text-orange-500" />
          },
          {
            id: 'reactive-mode',
            title: 'Miércoles 8:00 PM',
            time: '8:00 PM',
            character: 'Carlos llamando clientes',
            situation: 'Intentando recuperar clientes que ya se fueron',
            emotion: 'overwhelmed',
            problem: 'Siempre reaccionando tarde',
            icon: <Smartphone className="w-6 h-6 text-red-600" />
          }
        ],
        afterScenes: [
          {
            id: 'early-warning',
            title: 'Jueves 9:00 AM',
            time: '9:00 AM',
            character: 'Carlos recibe alerta IA',
            situation: 'La IA detecta que Ana está en riesgo de cancelar',
            emotion: 'calm',
            solution: 'Predicción temprana',
            icon: <Brain className="w-6 h-6 text-blue-500" />
          },
          {
            id: 'proactive-action',
            title: 'Jueves 2:00 PM',
            time: '2:00 PM',
            character: 'Carlos habla con Ana',
            situation: 'Le ofrece descuento personalizado antes de que cancele',
            emotion: 'confident',
            solution: 'Retención proactiva',
            icon: <Users className="w-6 h-6 text-green-500" />
          },
          {
            id: 'growth-mode',
            title: 'Jueves 8:00 PM',
            time: '8:00 PM',
            character: 'Carlos planificando expansión',
            situation: 'Retención subió 25%, planifica abrir segundo local',
            emotion: 'happy',
            solution: 'Crecimiento sostenible',
            icon: <TrendingUp className="w-6 h-6 text-purple-500" />
          }
        ],
        savings: '$78.000/mes',
        timeframe: '4 meses'
      },
      {
        id: 'operations',
        title: 'La Esclavitud Operativa',
        character: 'Ana, Dueña de Restaurante',
        industry: 'Gastronomía',
        beforeScenes: [
          {
            id: 'manual-hell',
            title: 'Viernes 6:00 AM',
            time: '6:00 AM',
            character: 'Ana haciendo inventario',
            situation: 'Contando ingredientes manualmente, calculando pedidos a proveedores',
            emotion: 'overwhelmed',
            problem: '3 horas diarias en administración',
            icon: <Clock className="w-6 h-6 text-red-500" />
          },
          {
            id: 'error-cascade',
            title: 'Viernes 12:00 PM',
            time: '12:00 PM',
            character: 'Ana en la cocina',
            situation: 'Se quedó sin ingredientes por error en cálculos manuales',
            emotion: 'stressed',
            problem: 'Errores humanos costosos',
            icon: <XCircle className="w-6 h-6 text-orange-500" />
          },
          {
            id: 'burnout-night',
            title: 'Viernes 11:00 PM',
            time: '11:00 PM',
            character: 'Ana cerrando local',
            situation: 'Agotada, sin tiempo para familia, trabajando 14 horas',
            emotion: 'overwhelmed',
            problem: 'Sin vida personal',
            icon: <AlertTriangle className="w-6 h-6 text-red-600" />
          }
        ],
        afterScenes: [
          {
            id: 'automated-morning',
            title: 'Sábado 6:00 AM',
            time: '6:00 AM',
            character: 'Ana desayunando tranquila',
            situation: 'La IA ya hizo inventario y ordenó ingredientes automáticamente',
            emotion: 'calm',
            solution: 'Automatización total',
            icon: <CheckCircle className="w-6 h-6 text-green-500" />
          },
          {
            id: 'focus-cooking',
            title: 'Sábado 12:00 PM',
            time: '12:00 PM',
            character: 'Ana creando nuevos platos',
            situation: 'Se enfoca en cocinar, no en administrar',
            emotion: 'confident',
            solution: 'Tiempo para innovar',
            icon: <Brain className="w-6 h-6 text-blue-500" />
          },
          {
            id: 'family-time',
            title: 'Sábado 8:00 PM',
            time: '8:00 PM',
            character: 'Ana con su familia',
            situation: 'Cerró temprano, disfruta cena familiar',
            emotion: 'happy',
            solution: 'Vida equilibrada',
            icon: <Coffee className="w-6 h-6 text-purple-500" />
          }
        ],
        savings: '$32.000/mes',
        timeframe: '2 meses'
      }
    ]
  });

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleCinema = () => {
    setCinema(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      autoPlay: !prev.isPlaying
    }));
  };

  const resetCinema = () => {
    setCinema(prev => ({
      ...prev,
      isPlaying: false,
      currentScene: 0,
      showingAfter: false,
      autoPlay: false
    }));
  };

  const changeStory = (storyId: 'inventory' | 'customers' | 'operations') => {
    setCinema(prev => ({
      ...prev,
      currentStory: storyId,
      currentScene: 0,
      showingAfter: false,
      isPlaying: false
    }));
  };

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text for animation
    const split = new SplitType(titleRef.current, { 
      types: 'lines,words,chars',
      lineClass: 'line-wrapper'
    });

    // Set initial states
    gsap.set(split.chars, { y: 100, opacity: 0 });
    gsap.set(".hero-ai-content > *:not(h1)", { y: 30, opacity: 0 });

    // Create main timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Title animation
    split.lines?.forEach((line, i) => {
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
    tl.to(".hero-ai-content > *:not(h1)", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      split.revert();
    };
  }, []);

  // Cinematic auto-play logic
  useEffect(() => {
    if (!cinema.isPlaying || !cinema.autoPlay) return;

    const currentStory = cinema.stories.find(s => s.id === cinema.currentStory);
    if (!currentStory) return;

    const totalScenes = currentStory.beforeScenes.length;
    
    const interval = setInterval(() => {
      setCinema(prev => {
        if (prev.currentScene >= totalScenes - 1 && !prev.showingAfter) {
          // Switch to "after" scenes
          return {
            ...prev,
            showingAfter: true,
            currentScene: 0
          };
        } else if (prev.currentScene >= totalScenes - 1 && prev.showingAfter) {
          // End of story
          return {
            ...prev,
            isPlaying: false,
            autoPlay: false
          };
        } else {
          // Next scene
          return {
            ...prev,
            currentScene: prev.currentScene + 1
          };
        }
      });
    }, 3000); // 3 seconds per scene

    return () => clearInterval(interval);
  }, [cinema.isPlaying, cinema.autoPlay, cinema.currentScene, cinema.showingAfter, cinema.currentStory]);

  const currentStory = cinema.stories.find(s => s.id === cinema.currentStory);
  const currentScenes = cinema.showingAfter ? currentStory?.afterScenes : currentStory?.beforeScenes;
  const currentScene = currentScenes?.[cinema.currentScene];

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'stressed': return 'border-red-500 bg-red-50';
      case 'frustrated': return 'border-orange-500 bg-orange-50';
      case 'overwhelmed': return 'border-red-600 bg-red-100';
      case 'calm': return 'border-blue-500 bg-blue-50';
      case 'confident': return 'border-green-500 bg-green-50';
      case 'happy': return 'border-purple-500 bg-purple-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden w-full"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #3B82F6 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, #10B981 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0, 50px 50px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      <div className="relative w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-20 z-30 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Left Column - Content */}
        <div className="space-y-10 hero-ai-content">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium border border-blue-500/30 backdrop-blur-sm">
            <Brain className="w-5 h-5" />
            Historias Reales de Transformación IA
          </div>

          {/* Main Headline */}
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide"
              style={{ letterSpacing: '0.02em', lineHeight: '1.1' }}
            >
              <span className="block text-white">
                Del caos
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                al control total
              </span>
              <span className="block text-white">
                en 90 días
              </span>
            </h1>
            
            <div className="w-16 h-px bg-gradient-to-r from-blue-400/40 to-transparent my-6"></div>
            
            <p className="text-xl text-gray-300 max-w-2xl" style={{ lineHeight: '1.5', letterSpacing: '0.01em' }}>
              Mirá cómo empresarios como vos transformaron sus negocios con IA. Historias reales, resultados reales.
            </p>
          </div>

          {/* Story Selector */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-200">Elegí tu historia:</h3>
            <div className="grid grid-cols-1 gap-3">
              {cinema.stories.map((story) => (
                <Button
                  key={story.id}
                  onClick={() => changeStory(story.id as any)}
                  variant={cinema.currentStory === story.id ? "default" : "outline"}
                  className={`p-4 h-auto flex items-center justify-between text-left transition-all duration-300 ${
                    cinema.currentStory === story.id 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25' 
                      : 'border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-bold text-base">{story.title}</span>
                    <span className="text-sm opacity-80">{story.character}</span>
                    <span className="text-xs opacity-60">{story.industry}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">{story.savings}</div>
                    <div className="text-xs opacity-60">en {story.timeframe}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Cinema Controls */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={toggleCinema}
                className={`${cinema.isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg`}
              >
                {cinema.isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {cinema.isPlaying ? 'Pausar' : 'Ver'} Historia
              </Button>
              
              <Button
                onClick={resetCinema}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800/50 px-6 py-3 rounded-xl font-semibold"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reiniciar
              </Button>
            </div>

            {/* CTA */}
            <Button 
              onClick={handleCTAClick}
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
            >
              <DollarSign className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              Quiero mi transformación
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Right Column - Cinematic Story Player */}
        <div className="relative">
          <div 
            ref={cinemaRef}
            className="relative bg-black/40 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700 overflow-hidden"
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Cinema Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{currentStory?.title}</h3>
                  <p className="text-sm text-gray-400">{currentStory?.character}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${cinema.isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-sm text-gray-400">{cinema.isPlaying ? 'EN VIVO' : 'PAUSADO'}</span>
              </div>
            </div>

            {/* Story Timeline */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-400">
                  {cinema.showingAfter ? 'DESPUÉS (Con IA)' : 'ANTES (Sin IA)'}
                </span>
                <span className="text-sm text-gray-500">
                  Escena {cinema.currentScene + 1} de {currentScenes?.length || 0}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    cinema.showingAfter ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}
                  style={{ 
                    width: `${((cinema.currentScene + 1) / (currentScenes?.length || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Current Scene */}
            {currentScene && (
              <div className={`mx-6 mb-6 p-6 rounded-2xl border-2 transition-all duration-500 ${getEmotionColor(currentScene.emotion)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {currentScene.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-gray-900">{currentScene.time}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cinema.showingAfter ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {cinema.showingAfter ? 'CON IA' : 'SIN IA'}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 mb-2">{currentScene.character}</p>
                    <p className="text-gray-700 mb-3">{currentScene.situation}</p>
                    {currentScene.problem && (
                      <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                        <p className="text-red-800 font-medium">💸 {currentScene.problem}</p>
                      </div>
                    )}
                    {currentScene.solution && (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                        <p className="text-green-800 font-medium">✨ {currentScene.solution}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Story Results */}
            {currentStory && (
              <div className="p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{currentStory.savings}</div>
                    <div className="text-sm text-gray-400">Ahorro mensual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{currentStory.timeframe}</div>
                    <div className="text-sm text-gray-400">Tiempo de implementación</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
} 