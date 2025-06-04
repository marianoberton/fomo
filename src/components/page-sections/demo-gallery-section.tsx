"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3,
  GitBranch,
  MessageCircle,
  Eye,
  Play,
  Globe,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

interface DemoItem {
  id: string;
  type: 'dashboard' | 'website' | 'automation' | 'chatbot';
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  icon: React.ElementType;
  tech: string;
  benefit: string;
  colorTheme: 'signalYellow' | 'brilliantBlue' | 'plum' | 'orange';
}

const demoItems: DemoItem[] = [
  {
    id: 'dashboard',
    type: 'dashboard',
    title: 'Centro de Comando Real',
    description: 'Dashboard ejecutivo construido en Looker/Next.js para una PyME del sector retail. Datos reales, decisiones inteligentes.',
    thumbnail: '/images/demo/dashboard-thumbnail.jpg',
    videoUrl: '/videos/demo/dashboard.mp4',
    icon: BarChart3,
    tech: 'Looker Studio + Next.js',
    benefit: 'Decisiones basadas en datos reales',
    colorTheme: 'brilliantBlue'
  },
  {
    id: 'website',
    type: 'website',
    title: 'Web + E-commerce Integrado',
    description: 'Sitio web completo con carrito integrado a stock y CRM. Todo conectado en tiempo real.',
    thumbnail: '/images/demo/website-thumbnail.jpg',
    videoUrl: '/videos/demo/website.mp4',
    icon: Globe,
    tech: 'Next.js + Integrations',
    benefit: 'Ventas online automatizadas',
    colorTheme: 'signalYellow'
  },
  {
    id: 'automation',
    type: 'automation',
    title: 'Flujo de Automatización',
    description: 'Proceso completo automatizado: de lead a cliente en 3 pasos. Sin intervención manual.',
    thumbnail: '/images/demo/automation-thumbnail.jpg',
    videoUrl: '/videos/demo/automation.mp4',
    icon: Zap,
    tech: 'n8n + APIs',
    benefit: 'Procesos que funcionan solos',
    colorTheme: 'orange'
  },
  {
    id: 'chatbot',
    type: 'chatbot',
    title: 'Bot WhatsApp Inteligente',
    description: 'Bot que responde consultas, califica leads y agenda reuniones. Atención 24/7 real.',
    thumbnail: '/images/demo/whatsapp-thumbnail.jpg',
    videoUrl: '/videos/demo/whatsapp-bot.mp4',
    icon: MessageCircle,
    tech: 'Meta Business API + IA',
    benefit: 'Atención que nunca duerme',
    colorTheme: 'plum'
  },
  {
    id: 'process-flow',
    type: 'automation',
    title: 'Mapeo de Procesos Visual',
    description: 'De 8 pasos manuales a 3 automatizados. Procesos claros que todo el equipo entiende.',
    thumbnail: '/images/demo/miro-thumbnail.jpg',
    videoUrl: '/videos/demo/process-map.mp4',
    icon: GitBranch,
    tech: 'Miro + Documentación',
    benefit: 'Procesos estandarizados',
    colorTheme: 'brilliantBlue'
  },
  {
    id: 'integration',
    type: 'automation',
    title: 'Integración Total de Sistemas',
    description: 'CRM, inventario, contabilidad y web hablando entre sí. Un solo sistema unificado.',
    thumbnail: '/images/demo/integration-thumbnail.jpg',
    videoUrl: '/videos/demo/integration.mp4',
    icon: GitBranch,
    tech: 'APIs + Webhooks',
    benefit: 'Datos siempre sincronizados',
    colorTheme: 'signalYellow'
  }
];

export default function DemoGallerySection() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getThemeColors = (theme: 'signalYellow' | 'brilliantBlue' | 'plum' | 'orange') => {
    switch (theme) {
      case 'signalYellow':
        return {
          bg: 'bg-signalYellow',
          text: 'text-slate-900',
          border: 'border-yellow-600/20'
        };
      case 'brilliantBlue':
        return {
          bg: 'bg-brilliantBlue',
          text: 'text-white',
          border: 'border-blue-700/20'
        };
      case 'plum':
        return {
          bg: 'bg-plum',
          text: 'text-white',
          border: 'border-purple-700/20'
        };
      case 'orange':
        return {
          bg: 'bg-orange-500',
          text: 'text-white',
          border: 'border-orange-700/20'
        };
    }
  };

  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      {/* Background decoration with brand colors */}
        <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-brilliantBlue/5 to-signalYellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-r from-plum/5 to-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brilliantBlue/3 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brilliantBlue to-plum text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Eye className="w-4 h-4" />
              Casos Reales
            </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brilliantBlue to-plum">
                Mirá lo que construimos
              </span>{" "}
              para otros clientes
            </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Estos son artefactos reales de proyectos que desarrollamos. Sin métricas inventadas, sin mockups genéricos.
            </p>
        </motion.div>

        {/* Floating Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {demoItems.map((item, index) => {
            const theme = getThemeColors(item.colorTheme);
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;

            // Determine video source based on card type
            const getVideoSource = () => {
              switch (item.id) {
                case 'website':
                  return '/videos/ecommerce.mp4';
                case 'chatbot':
                  return '/videos/chatbot.mp4';
                case 'process-flow':
                  return '/videos/procesos.mp4';
                case 'automation':
                  return '/videos/inted.mp4';
                case 'integration':
                  return '/videos/lamoderna.mp4';
                default:
                  return '/videos/istockphoto-1223693297-640_adpp_is.mp4';
              }
            };

            return (
              <motion.div
                key={item.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className={`relative ${theme.bg} rounded-3xl shadow-lg border-2 ${theme.border} overflow-hidden cursor-pointer transition-all duration-500`}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 2 : -2,
                    zIndex: 10
                  }}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Video Preview Area */}
                  <div className="aspect-video relative overflow-hidden">
                    {/* Actual video element */}
                    <video
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play();
                      }}
                      onMouseLeave={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.pause();
                        video.currentTime = 0;
                      }}
                    >
                      <source src={getVideoSource()} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Play overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: isHovered ? 0 : 0.3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                        animate={{ scale: isHovered ? 0.8 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </motion.div>

                    {/* Icon overlay for branding */}
                    <div className="absolute top-4 left-4">
                      <div className={`w-10 h-10 ${theme.bg} rounded-lg flex items-center justify-center shadow-lg border-2 border-white/20`}>
                        {React.createElement(Icon, {
                          className: `w-4 h-4 ${theme.text}`
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Content that appears on hover */}
                  <motion.div
                    className="p-6"
                    initial={{ height: 80 }}
                    animate={{ height: isHovered ? 'auto' : 80 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center`}>
                          {React.createElement(Icon, {
                            className: `w-4 h-4 ${theme.text}`
                          })}
                        </div>
                        <h3 className={`text-lg font-bold ${theme.text} leading-tight`}>
                          {item.title}
                        </h3>
                  </div>

                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: isHovered ? 1 : 0,
                          height: isHovered ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
                    >
                        <p className={`${theme.text} opacity-90 text-sm leading-relaxed mb-3`}>
                          {item.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className={`text-xs font-medium ${theme.text} opacity-70`}>
                            {item.tech}
                  </div>
                          <div className={`text-xs ${theme.text} opacity-80 bg-white/10 rounded-lg px-3 py-2`}>
                            ✨ {item.benefit}
                </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                    
                  {/* Decorative corner element */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="w-3 h-3 bg-white/30 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          </div>

          {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-50/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-200/50 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brilliantBlue/5 via-transparent to-signalYellow/5"></div>
            
            <div className="relative">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                ¿Querés ver estos casos en tu contexto?
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                En el diagnóstico te mostramos exactamente cómo aplicar estas soluciones a tu negocio específico.
              </p>
              <motion.button 
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-brilliantBlue to-plum hover:from-brilliantBlue/90 hover:to-plum/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar diagnóstico personalizado
              </motion.button>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
  );
} 