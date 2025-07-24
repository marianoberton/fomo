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
import CloudinaryVideo from "@/components/ui/cloudinary-video";
import { DEMO_VIDEOS } from "@/lib/cloudinary";

interface DemoItem {
  id: keyof typeof DEMO_VIDEOS;
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
          border: 'border-brilliantBlue/20'
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
    <section id="demo-gallery" className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 py-16 pb-8 bg-white relative overflow-hidden">
      {/* Background decoration with brand colors */}
        <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-brilliantBlue/5 to-signalYellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-r from-plum/5 to-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brilliantBlue/3 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-plum to-brilliantBlue text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            viewport={{ once: true }}
          >
            <Eye className="w-4 h-4" />
            Casos Reales
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brilliantBlue to-plum">
                Conocé resultados reales
              </span>{" "}
              de nuestros clientes
            </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explorá casos concretos y soluciones que generaron impacto en PyMEs como la tuya. Proyectos reales, métricas verificables y resultados tangibles que hablan por sí solos.
            </p>
        </motion.div>

        {/* Floating Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {demoItems.map((item, index) => {
            const theme = getThemeColors(item.colorTheme);
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;

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
                    {/* Cloudinary Video Component */}
                    <CloudinaryVideo 
                      demoId={item.id}
                      className="w-full h-full"
                      autoPlayOnHover={true}
                      showThumbnail={true}
                      onVideoStart={() => setHoveredItem(item.id)}
                      onVideoEnd={() => setHoveredItem(null)}
                    />

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
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                🚀 Todo esto lo podés tener en tu PyME
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Estos no son casos hipotéticos. Son soluciones reales que podemos implementar específicamente para tu negocio.
              </p>
              <motion.a 
                href="https://wa.me/5491139066421?text=Hola%2C%20quiero%20saber%20más%20sobre%20cómo%20pueden%20ayudarme%20con%20los%20procesos%20de%20mi%20PyME"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-brilliantBlue to-plum hover:from-brilliantBlue/90 hover:to-plum/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <span>Hablemos de tu PyME</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
  );
} 