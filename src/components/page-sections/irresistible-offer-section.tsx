"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  CheckCircle, 
  Gift, 
  ArrowRight,
  Zap,
  Workflow,
  Settings,
  Brain
} from "lucide-react";

export default function IrresistibleOfferSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate time left until June 30th
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-06-30T23:59:59');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offerIncludes = [
    {
      icon: Workflow,
      title: "Mapeo de procesos",
      description: "Análisis completo de tus workflows actuales y identificación de cuellos de botella"
    },
    {
      icon: Settings,
      title: "Auditoría de herramientas",
      description: "Evaluación de tus sistemas actuales y recomendaciones de optimización"
    },
    {
      icon: Brain,
      title: "3 Quick Wins de automatización",
      description: "Mejoras inmediatas listas para implementar que ahorran tiempo desde el día 1"
    },
    {
      icon: Zap,
      title: "Roadmap de transformación",
      description: "Plan estratégico personalizado con prioridades y cronograma de implementación"
    }
  ];

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brilliantBlue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-signalYellow/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-signalYellow text-neutral-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            Oferta Limitada
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-signalYellow">Diagnóstico de Transformación Digital</span>
            <br />
            <span className="text-xl font-normal text-gray-300">BONIFICADO hasta el 30/06</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Incluye mapeo de procesos, auditoría de herramientas y 3 quick wins de automatización
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-signalYellow" />
              <span className="text-lg font-semibold text-signalYellow">
                Tiempo restante para aprovechar esta oferta:
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Días', value: timeLeft.days },
                { label: 'Horas', value: timeLeft.hours },
                { label: 'Minutos', value: timeLeft.minutes },
                { label: 'Segundos', value: timeLeft.seconds }
              ].map((time, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 rounded-2xl p-4 mb-2">
                    <div className="text-3xl lg:text-4xl font-bold text-signalYellow">
                      {time.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    {time.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Offer Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - What's Included */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center lg:text-left">
              Lo que incluye tu diagnóstico <span className="text-signalYellow">gratuito</span>:
            </h3>
            
            <div className="space-y-6">
              {offerIncludes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-signalYellow" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-brilliantBlue/20 rounded-2xl border border-brilliantBlue/30">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-brilliantBlue" />
                <span className="font-semibold text-lg">Valor real: $150.000 ARS</span>
              </div>
              <p className="text-gray-300">
                Ofrecemos este diagnóstico completo sin costo para demostrar el valor que podemos aportar a tu transformación digital
              </p>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="text-center lg:text-left">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-6xl lg:text-7xl font-bold text-signalYellow mb-2">
                    100%
                  </div>
                  <div className="text-xl font-semibold mb-4">
                    BONIFICADO
                  </div>
                  <div className="text-gray-300">
                    Solo hasta el 30 de junio de 2025
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brilliantBlue flex-shrink-0" />
                    <span className="text-gray-300">Sin compromiso de contratación</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brilliantBlue flex-shrink-0" />
                    <span className="text-gray-300">Resultados entregados en 5 días hábiles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brilliantBlue flex-shrink-0" />
                    <span className="text-gray-300">Sesión de presentación de 90 minutos incluida</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCTAClick}
                  size="lg" 
                  className="w-full bg-signalYellow hover:bg-signalYellow/90 text-neutral-900 font-bold py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Quiero mi diagnóstico de transformación
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-sm text-gray-400 mt-4">
                  🚀 Últimos cupos disponibles para junio 2025
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 rounded-3xl p-8 max-w-4xl mx-auto border border-white/10">
            <h4 className="text-xl font-semibold mb-6">
              ¿Por qué ofrecemos esto gratis?
            </h4>
            <p className="text-gray-300 leading-relaxed">
              Creemos que la mejor forma de demostrar nuestro valor es a través de resultados concretos. 
              Este diagnóstico te dará una visión clara de las oportunidades de optimización en tu negocio, 
              independientemente de si decidís trabajar con nosotros o no.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 