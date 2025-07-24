"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTASection() {
  const handleCTAClick = () => {
    window.open('https://wa.me/5491139066421?text=Hola%2C%20quiero%20saber%20más%20sobre%20cómo%20pueden%20ayudarme%20con%20los%20procesos%20de%20mi%20PyME', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brilliantBlue/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-signalYellow/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-signalYellow to-orange-500 text-slate-900 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            viewport={{ once: true }}
          >
            <Rocket className="w-4 h-4" />
            Tu momento es ahora
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            No esperes a que tus competidores{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum to-brilliantBlue">
              se adelanten
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed">
            Cada día que pasás con procesos manuales es un día que perdés ventaja competitiva. 
            La pregunta no es si vas a optimizar tu empresa, sino cuándo.
          </p>
        </div>

        {/* Value props quick */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
            <Clock className="w-8 h-8 text-plum mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 mb-2">Implementación en 3 meses</h3>
            <p className="text-sm text-slate-600">
              No proyectos que duran años. Resultados tangibles desde el primer mes.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
            <CheckCircle className="w-8 h-8 text-brilliantBlue mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 mb-2">Adopción garantizada</h3>
            <p className="text-sm text-slate-600">
              Tu equipo va a usar las nuevas herramientas. Lo garantizamos.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
            <ArrowRight className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 mb-2">ROI desde el día 1</h3>
            <p className="text-sm text-slate-600">
              Ahorro inmediato en tiempo y costos operativos.
            </p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-gradient-to-r from-signalYellow to-orange-500 rounded-3xl p-8 mb-8 text-slate-900 shadow-2xl">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Comenzá tu transformación hoy mismo
          </h3>
          <p className="text-lg mb-6 text-slate-800">
            Diagnóstico completo + 3 quick wins de automatización. 
            <strong>100% bonificado hasta el 30/06.</strong>
          </p>
          
          <Button 
            onClick={handleCTAClick}
            size="lg"
            className="bg-white hover:bg-gray-100 text-slate-900 font-bold py-4 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Contáctanos ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-brilliantBlue" />
            <span>Sin compromiso de contratación</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-brilliantBlue" />
            <span>Respuesta en 24hs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-brilliantBlue" />
            <span>+5 PyMEs transformadas en 2024-2025</span>
          </div>
        </div>

        {/* Urgency footer */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-600 text-lg">
            <strong className="text-slate-800">Últimos cupos disponibles para junio 2025.</strong>
            <br />
            Solo trabajamos con 3 clientes por mes para garantizar resultados excepcionales.
          </p>
        </div>
      </div>

      {/* Elegant Divider Section */}
      <div className="relative py-8">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white"></div>
        
        {/* Main divider line with decorative elements */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
          <div className="flex items-center justify-center">
            {/* Left decorative element */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-plum/20 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-brilliantBlue/30 rounded-full"></div>
              <div className="w-1 h-1 bg-signalYellow/40 rounded-full"></div>
            </div>
            
            {/* Main gradient line */}
            <div className="flex-1 mx-8 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent"></div>
            
            {/* Central decorative circle */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-white shadow-sm flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-plum/60 to-brilliantBlue/60"></div>
              </div>
            </div>
            
            {/* Main gradient line */}
            <div className="flex-1 mx-8 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent"></div>
            
            {/* Right decorative element */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-signalYellow/40 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-brilliantBlue/30 rounded-full"></div>
              <div className="w-2 h-2 bg-plum/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 