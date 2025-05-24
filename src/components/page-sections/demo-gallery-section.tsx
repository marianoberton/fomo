"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  Play,
  Maximize2,
  BarChart3,
  GitBranch,
  MessageCircle,
  Eye
} from "lucide-react";

interface DemoItem {
  id: string;
  type: 'dashboard' | 'process-map' | 'chatbot';
  title: string;
  description: string;
  thumbnail: string;
  fullImage?: string;
  videoUrl?: string;
  icon: React.ElementType;
  tech: string;
  benefit: string;
}

const demoItems: DemoItem[] = [
  {
    id: 'dashboard',
    type: 'dashboard',
    title: 'Centro de Comando Real',
    description: 'Dashboard ejecutivo construido en Looker/Next.js para una PyME del sector retail. Datos reales, identidades protegidas.',
    thumbnail: '/images/demo/dashboard-thumbnail.jpg', // Placeholder
    fullImage: '/images/demo/dashboard-full.jpg', // Placeholder
    icon: BarChart3,
    tech: 'Looker Studio + Next.js',
    benefit: 'Decisiones basadas en datos reales'
  },
  {
    id: 'process-map',
    type: 'process-map',
    title: 'Mapeo de Procesos en Miro',
    description: 'Proceso de gestión de leads mapeado y optimizado. De 8 pasos manuales a 3 automatizados.',
    thumbnail: '/images/demo/miro-thumbnail.jpg', // Placeholder
    fullImage: '/images/demo/miro-full.jpg', // Placeholder
    icon: GitBranch,
    tech: 'Miro + Documentación',
    benefit: 'Procesos estandarizados y claros'
  },
  {
    id: 'chatbot',
    type: 'chatbot',
    title: 'Bot WhatsApp en Acción',
    description: 'Bot respondiendo consultas frecuentes y derivando leads calificados. Sandbox de Meta Business.',
    thumbnail: '/images/demo/whatsapp-thumbnail.jpg', // Placeholder
    videoUrl: '/videos/demo/whatsapp-bot.mp4', // Placeholder
    icon: MessageCircle,
    tech: 'Meta Business API + n8n',
    benefit: 'Atención 24/7 automatizada'
  }
];

export default function DemoGallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<DemoItem | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % demoItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + demoItems.length) % demoItems.length);
  };

  const openModal = (item: DemoItem) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const currentItem = demoItems[currentIndex];
  const Icon = currentItem.icon;

  return (
    <>
      <section className="w-full py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              Casos Reales
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <span className="text-brilliantBlue">
                Mirá lo que construimos
              </span>{" "}
              para otros clientes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estos son artefactos reales de proyectos que desarrollamos. Sin métricas inventadas, sin mockups genéricos.
            </p>
          </div>

          {/* Main Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center bg-card/90 backdrop-blur-sm border border-border/50 p-8 rounded-3xl">
                {/* Content Side */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brilliantBlue/10 rounded-2xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brilliantBlue" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-brilliantBlue">
                        {currentItem.tech}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {currentItem.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {currentItem.description}
                  </p>

                  <div className="bg-signalYellow/10 rounded-2xl p-4 border border-signalYellow/20">
                    <div className="text-sm font-semibold text-signalYellow/80 mb-1">
                      Resultado clave:
                    </div>
                    <div className="text-foreground font-medium">
                      {currentItem.benefit}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => openModal(currentItem)}
                      className="bg-brilliantBlue hover:bg-brilliantBlue/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Maximize2 className="w-4 h-4 mr-2" />
                      Ver en detalle
                    </Button>
                    
                    {currentItem.videoUrl && (
                      <Button
                        variant="outline"
                        onClick={() => openModal(currentItem)}
                        className="px-6 py-3 rounded-full font-semibold border-brilliantBlue text-brilliantBlue hover:bg-brilliantBlue hover:text-white transition-all duration-300"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Ver demo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Visual Side */}
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-2xl overflow-hidden border border-border/30 group cursor-pointer"
                       onClick={() => openModal(currentItem)}>
                    {/* Placeholder for actual images/videos */}
                    <div className="w-full h-full bg-gradient-to-br from-brilliantBlue/20 to-signalYellow/20 flex items-center justify-center">
                      <div className="text-center">
                        <Icon className="w-16 h-16 text-brilliantBlue mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-lg font-semibold text-foreground mb-2">
                          {currentItem.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Click para ampliar
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-border hover:bg-muted"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {demoItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-brilliantBlue scale-125' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-border hover:bg-muted"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-4">
                ¿Querés ver estos casos en tu contexto?
              </h3>
              <p className="text-muted-foreground mb-6">
                En el diagnóstico te mostramos exactamente cómo aplicar estas soluciones a tu negocio específico.
              </p>
              <Button 
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-brilliantBlue hover:bg-brilliantBlue/90 text-white px-8 py-3 rounded-full font-semibold"
              >
                Solicitar diagnóstico personalizado
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for detailed view */}
      {isModalOpen && modalContent && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {modalContent.title}
                </h3>
                <Button
                  variant="ghost"
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full"
                >
                  ×
                </Button>
              </div>
              
              <div className="aspect-video bg-muted rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-center">
                  <modalContent.icon className="w-20 h-20 text-brilliantBlue mx-auto mb-4" />
                  <div className="text-lg font-semibold text-foreground mb-2">
                    Vista detallada de {modalContent.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Aquí iría la imagen/video real del proyecto
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                {modalContent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 