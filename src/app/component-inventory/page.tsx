"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Eye,
  EyeOff,
  Trash2,
  Archive,
  Code,
  AlertTriangle,
  ExternalLink,
  PlayCircle
} from "lucide-react";
import Link from "next/link";

interface ComponentInfo {
  id: number;
  name: string;
  path: string;
  size: string;
  lines: number;
  status: 'active' | 'unused' | 'future' | 'legacy';
  description: string;
  usedIn: string[];
  category: 'page-sections' | 'ui' | 'transitions' | 'utilities' | 'root';
  visualDescription?: string;
  previewUrl?: string;
  canView?: boolean;
}

const componentInventory: ComponentInfo[] = [
  // COMPONENTES ACTIVOS (EN USO)
  {
    id: 1,
    name: "hero-section.tsx",
    path: "src/components/page-sections/hero-section.tsx",
    size: "33KB",
    lines: 829,
    status: 'active',
    description: "Sección hero principal con animaciones GSAP y partículas",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "🚀 Hero principal: Título grande, botón CTA, animaciones de fondo con partículas doradas",
    previewUrl: "/",
    canView: true
  },
  {
    id: 2,
    name: "pain-points-section.tsx", 
    path: "src/components/page-sections/pain-points-section.tsx",
    size: "34KB",
    lines: 781,
    status: 'active',
    description: "Sección de puntos de dolor con storytelling scrollytelling",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "😰 Sección morada: 3 pasos de storytelling scroll + 4 cards de dolores expandibles",
    previewUrl: "/",
    canView: true
  },
  {
    id: 3,
    name: "three-pillars-section.tsx",
    path: "src/components/page-sections/three-pillars-section.tsx", 
    size: "25KB",
    lines: 664,
    status: 'active',
    description: "Sección de 3 pilares/servicios con cards interactivas",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "⚡ 3 cards de servicios: Automatización (amarillo), Dashboards (azul), Integración (naranja)",
    previewUrl: "/",
    canView: true
  },
  {
    id: 4,
    name: "process-timeline-section.tsx",
    path: "src/components/page-sections/process-timeline-section.tsx",
    size: "16KB", 
    lines: 430,
    status: 'active',
    description: "Timeline del proceso con animaciones pinned scroll",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "📋 Fondo negro blueprint: 5 pasos del proceso con timeline central y cards que cambian",
    previewUrl: "/",
    canView: true
  },
  {
    id: 5,
    name: "demo-gallery-section.tsx",
    path: "src/components/page-sections/demo-gallery-section.tsx",
    size: "16KB",
    lines: 369,
    status: 'active', 
    description: "Galería de demos/casos de éxito",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "🎨 Galería de casos: Grid de 6 demos con hover effects y modales",
    previewUrl: "/",
    canView: true
  },
  {
    id: 6,
    name: "team-section.tsx",
    path: "src/components/page-sections/team-section.tsx",
    size: "15KB",
    lines: 331,
    status: 'active',
    description: "Sección del equipo con cards animadas",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "👥 2 cards del equipo: Una amarilla (Ana) y una azul (Martin) con iconos y expertise",
    previewUrl: "/",
    canView: true
  },
  {
    id: 7,
    name: "faq-section.tsx",
    path: "src/components/page-sections/faq-section.tsx",
    size: "7.1KB",
    lines: 154,
    status: 'active',
    description: "Sección de preguntas frecuentes",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "❓ FAQ accordion: Lista de preguntas expandibles con iconos",
    previewUrl: "/",
    canView: true
  },
  {
    id: 8,
    name: "contact-form-section.tsx",
    path: "src/components/page-sections/contact-form-section.tsx", 
    size: "16KB",
    lines: 445,
    status: 'active',
    description: "Formulario de contacto conversacional step-by-step",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "💬 Fondo morado: Formulario conversacional 4 pasos + elementos flotantes con ejemplos",
    previewUrl: "/",
    canView: true
  },
  {
    id: 9,
    name: "final-cta-section.tsx",
    path: "src/components/page-sections/final-cta-section.tsx",
    size: "5.3KB", 
    lines: 118,
    status: 'active',
    description: "CTA final con fondo blanco",
    usedIn: ["page.tsx (main)"],
    category: 'page-sections',
    visualDescription: "📞 Fondo blanco: CTA final con 3 cards de valor y botón grande de WhatsApp",
    previewUrl: "/",
    canView: true
  },
  {
    id: 10,
    name: "navigation.tsx",
    path: "src/components/navigation.tsx",
    size: "6.3KB",
    lines: 136,
    status: 'active',
    description: "Navegación principal del sitio",
    usedIn: ["Layout"],
    category: 'root',
    visualDescription: "🧭 Nav fijo: Logo FOMO + links + botón 'Hablemos' azul + hamburger móvil",
    previewUrl: "/",
    canView: true
  },
  {
    id: 11,
    name: "footer.tsx",
    path: "src/components/footer.tsx", 
    size: "8.8KB",
    lines: 222,
    status: 'active',
    description: "Footer principal con colores FOMO",
    usedIn: ["Layout"],
    category: 'root',
    visualDescription: "🦶 Footer gris oscuro: Descripción, links, newsletter, iconos de contacto coloridos",
    previewUrl: "/",
    canView: true
  },

  // COMPONENTES COMENTADOS/FUTUROS
  {
    id: 12,
    name: "maturity-score-section.tsx",
    path: "src/components/page-sections/maturity-score-section.tsx",
    size: "15KB",
    lines: 371,
    status: 'future',
    description: "Lead magnet - calculadora de madurez digital (comentado en page.tsx)",
    usedIn: ["Comentado en page.tsx"],
    category: 'page-sections',
    visualDescription: "📊 Calculadora interactiva: Quiz de madurez digital con score y recomendaciones",
    canView: true
  },

  // COMPONENTES LEGACY/NO USADOS
  {
    id: 13,
    name: "hero-ai-section.tsx",
    path: "src/components/page-sections/hero-ai-section.tsx",
    size: "25KB", 
    lines: 646,
    status: 'legacy',
    description: "Hero alternativo con historias de IA (no se usa)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🤖 Hero IA: Historias cinematicas de transformación con controles de video",
    canView: true
  },
  {
    id: 14,
    name: "ServicesSection_loka.tsx",
    path: "src/components/page-sections/ServicesSection_loka.tsx",
    size: "25KB",
    lines: 621,
    status: 'legacy',
    description: "Sección de servicios legacy (versión antigua)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🏢 Servicios antiguos: Grid de servicios con animaciones básicas (diseño anterior)",
    canView: true
  },
  {
    id: 15,
    name: "hero-section_loka.tsx",
    path: "src/components/page-sections/hero-section_loka.tsx", 
    size: "12KB",
    lines: 277,
    status: 'legacy',
    description: "Hero legacy (versión antigua)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🎯 Hero viejo: Versión anterior del hero, más simple, sin partículas",
    canView: true
  },
  {
    id: 16,
    name: "hero-section_old.tsx",
    path: "src/components/page-sections/hero-section_old.tsx",
    size: "6.9KB",
    lines: 167,
    status: 'legacy',
    description: "Hero muy antiguo (backup)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "📰 Hero primitivo: Versión muy básica, solo texto y botón",
    canView: true
  },
  {
    id: 17,
    name: "WhatWeDoSection.tsx",
    path: "src/components/page-sections/WhatWeDoSection.tsx",
    size: "3.9KB",
    lines: 104,
    status: 'legacy',
    description: "Sección qué hacemos (legacy)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "📝 Qué hacemos: Cards simples explicando servicios (diseño básico)",
    canView: true
  },
  {
    id: 18,
    name: "description-section.tsx",
    path: "src/components/page-sections/description-section.tsx",
    size: "18KB",
    lines: 426,
    status: 'legacy',
    description: "Sección de descripción (legacy)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "📄 Descripción larga: Párrafos explicativos con iconos (muy verboso)",
    canView: true
  },
  {
    id: 19,
    name: "about-section.tsx",
    path: "src/components/page-sections/about-section.tsx",
    size: "13KB",
    lines: 333,
    status: 'legacy',
    description: "Sección about (legacy)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "ℹ️ About us: Historia de la empresa con timeline y fotos",
    canView: true
  },
  {
    id: 20,
    name: "cards.tsx",
    path: "src/components/page-sections/cards.tsx",
    size: "15KB",
    lines: 425,
    status: 'legacy',
    description: "Cards genéricas (legacy)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🎴 Cards genéricas: Componentes de cards reutilizables básicos",
    canView: false
  },
  {
    id: 21,
    name: "contact-section.tsx",
    path: "src/components/page-sections/contact-section.tsx",
    size: "6.8KB",
    lines: 137,
    status: 'legacy',
    description: "Contacto legacy (reemplazado por contact-form-section)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "📧 Contacto simple: Formulario básico sin pasos, estilo clásico",
    canView: true
  },
  {
    id: 22,
    name: "plans-section.tsx",
    path: "src/components/page-sections/plans-section.tsx",
    size: "6.5KB",
    lines: 188,
    status: 'legacy',
    description: "Sección de planes (legacy)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "💰 Planes de pricing: 3 columnas con precios y features",
    canView: true
  },
  {
    id: 23,
    name: "success-cases-section.tsx",
    path: "src/components/page-sections/success-cases-section.tsx",
    size: "5.6KB",
    lines: 155,
    status: 'legacy',
    description: "Casos de éxito legacy (reemplazado por demo-gallery)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🏆 Casos simples: Lista básica de casos sin galería interactiva",
    canView: true
  },
  {
    id: 24,
    name: "cta-section.tsx",
    path: "src/components/page-sections/cta-section.tsx",
    size: "1.4KB",
    lines: 35,
    status: 'legacy',
    description: "CTA genérico legacy (reemplazado por final-cta-section)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "📢 CTA básico: Botón simple centrado sin diseño especial",
    canView: false
  },
  {
    id: 25,
    name: "services-section.tsx",
    path: "src/components/page-sections/services-section.tsx",
    size: "5.5KB",
    lines: 148,
    status: 'legacy',
    description: "Servicios legacy (reemplazado por three-pillars-section)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "⚙️ Servicios antiguos: Grid simple de servicios sin los 3 pilares",
    canView: true
  },
  {
    id: 26,
    name: "footer.tsx (page-sections)",
    path: "src/components/page-sections/footer.tsx",
    size: "7.9KB",
    lines: 208,
    status: 'legacy',
    description: "Footer duplicado en page-sections (usar el de /components/)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🦶 Footer duplicado: Misma funcionalidad que el footer principal",
    canView: false
  },
  {
    id: 27,
    name: "footer-section.tsx",
    path: "src/components/page-sections/footer-section.tsx",
    size: "8.7KB",
    lines: 221,
    status: 'legacy',
    description: "Footer como sección (duplicado)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🦶 Footer-sección: Otro duplicado del footer como sección interna",
    canView: false
  },
  {
    id: 28,
    name: "animated-text.tsx",
    path: "src/components/page-sections/animated-text.tsx",
    size: "7.0KB",
    lines: 227,
    status: 'legacy',
    description: "Componente de texto animado (no se usa)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "✨ Texto animado: Efectos de typewriter y animaciones de texto",
    canView: false
  },
  {
    id: 29,
    name: "irresistible-offer-section.tsx",
    path: "src/components/page-sections/irresistible-offer-section.tsx",
    size: "9.6KB",
    lines: 242,
    status: 'legacy',
    description: "Oferta irresistible (no se usa)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "🎁 Oferta especial: Sección de marketing con oferta limitada y countdown",
    canView: true
  },
  {
    id: 30,
    name: "social-proof-section.tsx", 
    path: "src/components/page-sections/social-proof-section.tsx",
    size: "8.1KB",
    lines: 205,
    status: 'legacy',
    description: "Prueba social (no se usa, parcialmente integrado en otras secciones)",
    usedIn: [],
    category: 'page-sections',
    visualDescription: "⭐ Testimonios: Cards de clientes con estrellas y quotes",
    canView: true
  },

  // COMPONENTES DE NAVEGACIÓN
  {
    id: 31,
    name: "navigation-backup.tsx",
    path: "src/components/navigation-backup.tsx",
    size: "5.9KB",
    lines: 129,
    status: 'legacy',
    description: "Backup de navegación (no se usa)",
    usedIn: [],
    category: 'root',
    visualDescription: "🧭 Nav backup: Navegación de respaldo con diseño anterior",
    canView: true
  },

  // COMPONENTES UTILITARIOS
  {
    id: 32,
    name: "HeroVectorAnimation.tsx",
    path: "src/components/HeroVectorAnimation.tsx",
    size: "3.1KB",
    lines: 95,
    status: 'unused',
    description: "Animación vectorial para hero (no se usa)",
    usedIn: [],
    category: 'utilities',
    visualDescription: "🎨 Animación SVG: Vectores animados para hero (nunca implementado)",
    canView: false
  },
  {
    id: 33,
    name: "ClientParticles.tsx",
    path: "src/components/ClientParticles.tsx", 
    size: "2.4KB",
    lines: 86,
    status: 'unused',
    description: "Sistema de partículas (no se usa)",
    usedIn: [],
    category: 'utilities',
    visualDescription: "✨ Partículas: Sistema de partículas flotantes (reemplazado por otras animaciones)",
    canView: false
  },

  // COMPONENTES DE TRANSICIONES  
  {
    id: 34,
    name: "mask-reveal-effect.tsx",
    path: "src/components/transitions/mask-reveal-effect.tsx",
    size: "2.7KB",
    lines: 85,
    status: 'unused',
    description: "Efecto de revelación con máscara (no se usa)",
    usedIn: [],
    category: 'transitions',
    visualDescription: "🎭 Máscara: Efecto de reveal con máscara circular (nunca usado)",
    canView: false
  },
  {
    id: 35,
    name: "WipeTransition.tsx",
    path: "src/components/transitions/WipeTransition.tsx",
    size: "5.8KB", 
    lines: 150,
    status: 'unused',
    description: "Transición de barrido (no se usa)",
    usedIn: [],
    category: 'transitions',
    visualDescription: "🌊 Wipe: Transición de barrido entre secciones (nunca implementado)",
    canView: false
  },

  // COMPONENTES UI (MANTENER - SHADCN)
  {
    id: 36,
    name: "UI Components",
    path: "src/components/ui/",
    size: "~15KB",
    lines: 0,
    status: 'active',
    description: "Todos los componentes UI de shadcn/ui (button, card, input, etc.) - MANTENER TODOS",
    usedIn: ["Toda la app"],
    category: 'ui',
    visualDescription: "🎨 Shadcn UI: Botones, cards, inputs, dialogs - sistema de diseño base",
    canView: false
  }
];

export default function ComponentInventory() {
  const [filter, setFilter] = useState<'all' | 'active' | 'unused' | 'future' | 'legacy'>('all');
  const [selectedForDeletion, setSelectedForDeletion] = useState<number[]>([]);
  const [showVisualDescriptions, setShowVisualDescriptions] = useState(true);

  const filteredComponents = componentInventory.filter(comp => 
    filter === 'all' || comp.status === filter
  );

  const toggleSelection = (id: number) => {
    setSelectedForDeletion(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'unused': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'future': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'legacy': return <Archive className="w-5 h-5 text-gray-500" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'unused': return 'bg-red-50 text-red-700 border-red-200';
      case 'future': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'legacy': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'page-sections': return 'bg-blue-100 text-blue-800';
      case 'ui': return 'bg-purple-100 text-purple-800';
      case 'transitions': return 'bg-pink-100 text-pink-800';
      case 'utilities': return 'bg-yellow-100 text-yellow-800';
      case 'root': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: componentInventory.length,
    active: componentInventory.filter(c => c.status === 'active').length,
    unused: componentInventory.filter(c => c.status === 'unused').length,
    future: componentInventory.filter(c => c.status === 'future').length,
    legacy: componentInventory.filter(c => c.status === 'legacy').length,
    viewable: componentInventory.filter(c => c.canView).length,
  };

  // Auto-seleccionar algunos componentes legacy obvios para borrar
  const autoSuggestedForDeletion = [
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
  ];

  const selectAllLegacy = () => {
    setSelectedForDeletion(autoSuggestedForDeletion);
  };

  const clearSelection = () => {
    setSelectedForDeletion([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            🔍 Inventario Visual de Componentes FOMO
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Revisá cada componente numerado y decidí qué mantener y qué borrar<br/>
            <span className="text-sm text-slate-500">Hacé clic en "Ver Componente" para verlo individualmente en su propia página</span>
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={selectAllLegacy} variant="destructive" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Sugerir Legacy/Unused para borrar ({autoSuggestedForDeletion.length})
            </Button>
            <Button onClick={clearSelection} variant="outline" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Limpiar selección
            </Button>
            <Button 
              onClick={() => setShowVisualDescriptions(!showVisualDescriptions)} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              {showVisualDescriptions ? 'Ocultar' : 'Mostrar'} descripciones
            </Button>
            <Button 
              onClick={() => window.open('/', '_blank')} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Ver página principal
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
              <div className="text-sm text-slate-600">Total</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-green-600">Activos</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">{stats.unused}</div>
              <div className="text-sm text-red-600">Sin usar</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-orange-600">{stats.future}</div>
              <div className="text-sm text-orange-600">Futuros</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-gray-600">{stats.legacy}</div>
              <div className="text-sm text-gray-600">Legacy</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.viewable}</div>
              <div className="text-sm text-blue-600">Visibles</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'active', 'unused', 'future', 'legacy'].map(filterType => (
              <Button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                variant={filter === filterType ? "default" : "outline"}
                className="capitalize"
              >
                {filterType}
              </Button>
            ))}
          </div>
        </div>

        {/* Component List */}
        <div className="grid gap-6">
          {filteredComponents.map((component) => (
            <Card 
              key={component.id} 
              className={`transition-all duration-200 ${
                selectedForDeletion.includes(component.id) 
                  ? 'ring-2 ring-red-500 bg-red-50' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {component.id}
                      </div>
                      {getStatusIcon(component.status)}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-800">
                        {component.name}
                      </CardTitle>
                      <p className="text-sm text-slate-500 font-mono">
                        {component.path}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(component.category)}`}>
                      {component.category}
                    </span>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(component.status)}`}>
                      {component.status}
                    </span>
                    {component.canView && (
                      <Link href={`/component-inventory/${component.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs px-2 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <PlayCircle className="w-3 h-3 mr-1" />
                          Ver Componente
                        </Button>
                      </Link>
                    )}
                    {component.previewUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(component.previewUrl, '_blank')}
                        className="text-xs px-2 py-1"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ver en vivo
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={selectedForDeletion.includes(component.id) ? "destructive" : "outline"}
                      onClick={() => toggleSelection(component.id)}
                      disabled={component.status === 'active' && component.category === 'ui'}
                    >
                      {selectedForDeletion.includes(component.id) ? (
                        <>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Borrar
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Marcar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Descripción</h4>
                    <p className="text-sm text-slate-600">{component.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Detalles</h4>
                    <div className="text-sm text-slate-600 space-y-1">
                      <div>Tamaño: {component.size}</div>
                      <div>Líneas: {component.lines}</div>
                      <div>Visible: {component.canView ? "✅ Sí" : "❌ No"}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Usado en</h4>
                    {component.usedIn.length > 0 ? (
                      <ul className="text-sm text-slate-600 space-y-1">
                        {component.usedIn.map((usage, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-green-500" />
                            {usage}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No se usa</p>
                    )}
                  </div>
                </div>
                
                {/* Descripción Visual */}
                {showVisualDescriptions && component.visualDescription && (
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Cómo se ve
                    </h5>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">{component.visualDescription}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        {selectedForDeletion.length > 0 && (
          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              Componentes marcados para borrar ({selectedForDeletion.length})
            </h3>
            <div className="grid md:grid-cols-2 gap-2 text-sm mb-4">
              {selectedForDeletion.map(id => {
                const comp = componentInventory.find(c => c.id === id);
                return comp ? (
                  <div key={id} className="flex items-center gap-2 text-red-700">
                    <span className="font-mono text-xs">#{comp.id}</span>
                    <span>{comp.name}</span>
                  </div>
                ) : null;
              })}
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">¿Listos para borrar?</h4>
                  <p className="text-sm text-yellow-700">
                    Escribí en el chat: <code className="bg-yellow-200 px-1 rounded">"Borrar componentes: {selectedForDeletion.join(', ')}"</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}