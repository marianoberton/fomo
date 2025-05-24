"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿Cuánto dura el diagnóstico?",
    answer: "El diagnóstico completo se entrega en 5 días hábiles desde que coordinamos la primera llamada. Incluye: mapeo de procesos actuales, auditoría de herramientas, identificación de 3 quick wins de automatización y roadmap de transformación detallado. La sesión de presentación de resultados dura aproximadamente 90 minutos."
  },
  {
    question: "¿Necesito cambiar todo mi software?",
    answer: "No necesariamente. Primero evaluamos qué herramientas tenés funcionando bien y cuáles están causando ineficiencias. Muchas veces podemos optimizar lo que ya tenés con integraciones y automatizaciones. Solo recomendamos cambios cuando realmente hay una oportunidad significativa de mejora."
  },
  {
    question: "¿Cómo involucran a mi equipo?",
    answer: "El equipo es clave para el éxito. Incluimos sesiones de mapeo colaborativo donde tu equipo nos cuenta cómo trabajan hoy. Diseñamos un plan de gestión del cambio personalizado con capacitaciones y acompañamiento. Guillermina, nuestra experta en cultura digital, se encarga específicamente de que la adopción sea exitosa."
  },
  {
    question: "¿Qué ROI puedo esperar?",
    answer: "Nuestros clientes típicamente ven una reducción del 30-50% en tiempos de procesos manuales dentro de los primeros 3 meses. Esto se traduce en ahorro de horas de trabajo, menos errores, y capacidad de escalar sin contratar más gente. El ROI exacto depende de tu situación específica, pero lo calculamos en el diagnóstico inicial."
  }
];

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Resolvemos tus{" "}
            <span className="text-brilliantBlue">
              dudas más comunes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Las respuestas a las preguntas que más nos hacen las PyMEs antes de iniciar su transformación digital
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Card 
              key={index} 
              className="bg-card/90 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-shadow duration-300 rounded-3xl"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200 rounded-3xl"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-brilliantBlue" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-brilliantBlue" />
                    )}
                  </div>
                </button>
                
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-border/30">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA at the end of FAQ */}
        <div className="mt-16 text-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ¿Tenés otra pregunta?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Coordinamos una llamada de 15 minutos sin compromiso para resolver todas tus dudas sobre transformación digital y procesos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-brilliantBlue to-brilliantBlue/80 hover:from-brilliantBlue/90 hover:to-brilliantBlue/70 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Solicitar llamada gratuita
              </button>
              <div className="text-sm text-muted-foreground">
                📞 Respuesta garantizada en 24hs
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            También podés escribirnos directamente a{" "}
            <a 
              href="mailto:hola@fomo.com.ar" 
              className="text-brilliantBlue hover:underline font-medium"
            >
              hola@fomo.com.ar
            </a>
            {" "}o por WhatsApp al{" "}
            <a 
              href="https://wa.me/5491123456789" 
              className="text-brilliantBlue hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              +54 9 11 2345-6789
            </a>
          </p>
        </div>
      </div>
    </section>
  );
} 