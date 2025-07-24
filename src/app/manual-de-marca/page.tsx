"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Type, 
  Copy, 
  Check, 

  ArrowLeft,
  Eye,
  Code2
} from "lucide-react";
import Link from "next/link";

interface ColorInfo {
  name: string;
  hex: string;
  tailwind: string;
  usage: string[];
  examples: string[];
}

interface TypographyInfo {
  name: string;
  fontFamily: string;
  variable: string;
  usage: string[];
  examples: string[];
}

const colors: ColorInfo[] = [
  {
    name: "Signal Yellow",
    hex: "#FCCD12",
    tailwind: "signalYellow",
    usage: ["Botones CTA", "Badges", "Hover states", "Iconografía destacada"],
    examples: ["Botón 'Contáctanos'", "Badge 'Nuestro Equipo'", "Fondo tarjeta Mariano"]
  },
  {
    name: "Orange 500",
    hex: "#f97316",
    tailwind: "orange-500",
    usage: ["Gradientes CTA", "Animaciones", "Decoraciones"],
    examples: ["Gradiente botones", "Línea tachado hero", "Círculos decorativos"]
  },
  {
    name: "Brilliant Blue",
    hex: "#0077B6",
    tailwind: "brilliantBlue",
    usage: ["Hover navegación", "Fondos profesionales", "Gradientes texto"],
    examples: ["Hover navbar", "Fondo tarjeta Guillermina", "Títulos gradiente"]
  },
  {
    name: "Plum",
    hex: "#310629",
    tailwind: "plum",
    usage: ["Gradientes sofisticados", "Decoraciones profundidad"],
    examples: ["Final gradiente títulos", "Círculos fondo"]
  },
  {
    name: "Slate 900",
    hex: "#0f172a",
    tailwind: "slate-900",
    usage: ["Texto principal", "Logo", "Títulos"],
    examples: ["Logo FOMO", "Títulos principales", "Texto tarjetas"]
  },
  {
    name: "White",
    hex: "#FFFFFF",
    tailwind: "white",
    usage: ["Fondos principales", "Texto sobre colores", "Componentes"],
    examples: ["Fondo general", "Navbar", "Footer"]
  }
];

const typography: TypographyInfo[] = [
  {
    name: "Concert One",
    fontFamily: "'Concert One', cursive",
    variable: "font-concert",
    usage: ["Logo FOMO exclusivamente"],
    examples: ["Logo navbar", "Logo footer"]
  },
  {
    name: "Space Grotesk",
    fontFamily: "'Space Grotesk', sans-serif",
    variable: "font-heading",
    usage: ["Títulos principales", "Subtítulos", "Headers"],
    examples: ["Títulos secciones", "H2, H3, H4", "Encabezados tarjetas"]
  },
  {
    name: "Manrope",
    fontFamily: "'Manrope', sans-serif",
    variable: "font-body",
    usage: ["Texto cuerpo", "Párrafos", "Descripciones"],
    examples: ["Texto general", "Descripciones equipo", "FAQ", "Formularios"]
  }
];

export default function ManualDeMarca() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'usage'>('colors');

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(`${type}-${text}`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const ColorCard = ({ color }: { color: ColorInfo }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-signalYellow/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-heading">{color.name}</CardTitle>
          <div 
            className="w-12 h-12 rounded-xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: color.hex }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
            <span className="font-mono text-sm font-semibold">{color.hex}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(color.hex, 'hex')}
              className="h-8 w-8 p-0"
            >
              {copiedColor === `hex-${color.hex}` ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
            <span className="font-mono text-sm">{color.tailwind}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(color.tailwind, 'tailwind')}
              className="h-8 w-8 p-0"
            >
              {copiedColor === `tailwind-${color.tailwind}` ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm text-slate-700 mb-2">Uso Principal:</h4>
          <ul className="space-y-1">
            {color.usage.map((use, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-signalYellow" />
                {use}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-slate-700 mb-2">Ejemplos:</h4>
          <ul className="space-y-1">
            {color.examples.map((example, index) => (
              <li key={index} className="text-sm text-slate-500 italic">
                • {example}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  const TypographyCard = ({ typo }: { typo: TypographyInfo }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-brilliantBlue/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-heading flex items-center gap-3">
          <Type className="w-5 h-5" />
          {typo.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div 
            className="text-2xl font-semibold p-4 bg-slate-50 rounded-lg text-center"
            style={{ fontFamily: typo.fontFamily }}
          >
            FOMO - Ejemplo de Texto
          </div>
          
          <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
            <span className="font-mono text-sm">{typo.variable}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(typo.variable, 'font')}
              className="h-8 w-8 p-0"
            >
              {copiedColor === `font-${typo.variable}` ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-slate-700 mb-2">Uso Principal:</h4>
          <ul className="space-y-1">
            {typo.usage.map((use, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brilliantBlue" />
                {use}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-slate-700 mb-2">Ejemplos:</h4>
          <ul className="space-y-1">
            {typo.examples.map((example, index) => (
              <li key={index} className="text-sm text-slate-500 italic">
                • {example}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Volver
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-signalYellow to-orange-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-heading text-slate-900">Manual de Marca</h1>
                  <p className="text-sm text-slate-600">Guía de identidad visual FOMO</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 bg-white rounded-xl p-2 shadow-sm border border-slate-200 w-fit">
          <Button
            variant={activeTab === 'colors' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('colors')}
            className={`gap-2 ${activeTab === 'colors' ? 'bg-signalYellow text-slate-900 hover:bg-signalYellow/90' : ''}`}
          >
            <Palette className="w-4 h-4" />
            Colores
          </Button>
          <Button
            variant={activeTab === 'typography' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('typography')}
            className={`gap-2 ${activeTab === 'typography' ? 'bg-brilliantBlue text-white hover:bg-brilliantBlue/90' : ''}`}
          >
            <Type className="w-4 h-4" />
            Tipografía
          </Button>
          <Button
            variant={activeTab === 'usage' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('usage')}
            className={`gap-2 ${activeTab === 'usage' ? 'bg-plum text-white hover:bg-plum/90' : ''}`}
          >
            <Eye className="w-4 h-4" />
            Ejemplos de Uso
          </Button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        {activeTab === 'colors' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">
                Paleta de Colores
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Nuestra paleta combina calidez y profesionalismo, diseñada para transmitir 
                confianza, energía y modernidad.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colors.map((color, index) => (
                <ColorCard key={index} color={color} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">
                Sistema Tipográfico
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tres fuentes complementarias que crean una jerarquía visual clara 
                y una personalidad distintiva.
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {typography.map((typo, index) => (
                <TypographyCard key={index} typo={typo} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">
                Ejemplos de Uso
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Aplicación práctica de nuestra identidad visual en diferentes contextos.
              </p>
            </div>

            <div className="grid gap-8">
              {/* Logo Examples */}
              <Card className="p-8">
                <h3 className="text-xl font-bold font-heading mb-6">Logo Principal</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl border-2 border-slate-200">
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 129.44 128.96" className="h-12 w-12 fill-slate-900">
                        <path d="M85.77.59C76,3.83,72.44,9.12,69.9,24.29c-.77,4.8-2,10.13-2.46,11.85s-.86,3.45-1.06,4-1.06,3.1-2.33,5.78C59,56.24,51.21,62.38,27.87,74.09,15.45,80.29,13.27,81.7,9.1,85.8a27.89,27.89,0,0,0-7,9.52C0,100,0,108.36,0,108.67c0,.5.64,8.87,2.54,12.67C5,126.28,7.41,128,10.44,127a5.92,5.92,0,0,0,3-2.61c.7-1.71.91-2.33-.64-7.06-2.4-7.33-2.26-13.12.5-19,2.39-4.94,4.3-7.34,8.39-10C24.9,86.15,33.78,84,37.8,84c5.57.08,15,2.32,21.59,5.7C66.94,93.55,74.7,101,85.28,114.15,94.94,126.28,99.11,129,108,129c6.21,0,10.37-1.55,14.82-5.57a18.81,18.81,0,0,0,6.63-15.09c.07-5.72-1.13-8.82-4.94-13.34-5.36-6.41-14.6-8.11-25-4.65-4.87,1.62-6.63,1.9-10.93,1.62C76.11,91.09,67.79,82.34,67.79,70c0-7.13,1.62-11.15,6.49-16.44,4.3-4.58,8.25-7,20.45-12.27,7.69-3.32,12.13-6.77,15.17-11.85,1.76-3,2.43-8.09,2.45-9.19a19.06,19.06,0,0,0-2.59-10.14c-2.33-3.67-7.2-7.69-10.8-8.89C95.09-.12,88.81-.4,85.77.59Z"/>
                      </svg>
                      <span className="text-3xl font-bold font-concert text-slate-900">FOMO</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-4">Sobre fondo claro</p>
                  </div>
                  <div className="bg-slate-900 p-8 rounded-xl">
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 129.44 128.96" className="h-12 w-12 fill-white">
                        <path d="M85.77.59C76,3.83,72.44,9.12,69.9,24.29c-.77,4.8-2,10.13-2.46,11.85s-.86,3.45-1.06,4-1.06,3.1-2.33,5.78C59,56.24,51.21,62.38,27.87,74.09,15.45,80.29,13.27,81.7,9.1,85.8a27.89,27.89,0,0,0-7,9.52C0,100,0,108.36,0,108.67c0,.5.64,8.87,2.54,12.67C5,126.28,7.41,128,10.44,127a5.92,5.92,0,0,0,3-2.61c.7-1.71.91-2.33-.64-7.06-2.4-7.33-2.26-13.12.5-19,2.39-4.94,4.3-7.34,8.39-10C24.9,86.15,33.78,84,37.8,84c5.57.08,15,2.32,21.59,5.7C66.94,93.55,74.7,101,85.28,114.15,94.94,126.28,99.11,129,108,129c6.21,0,10.37-1.55,14.82-5.57a18.81,18.81,0,0,0,6.63-15.09c.07-5.72-1.13-8.82-4.94-13.34-5.36-6.41-14.6-8.11-25-4.65-4.87,1.62-6.63,1.9-10.93,1.62C76.11,91.09,67.79,82.34,67.79,70c0-7.13,1.62-11.15,6.49-16.44,4.3-4.58,8.25-7,20.45-12.27,7.69-3.32,12.13-6.77,15.17-11.85,1.76-3,2.43-8.09,2.45-9.19a19.06,19.06,0,0,0-2.59-10.14c-2.33-3.67-7.2-7.69-10.8-8.89C95.09-.12,88.81-.4,85.77.59Z"/>
                      </svg>
                      <span className="text-3xl font-bold font-concert text-white">FOMO</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-4">Sobre fondo oscuro</p>
                  </div>
                </div>
              </Card>

              {/* Button Examples */}
              <Card className="p-8">
                <h3 className="text-xl font-bold font-heading mb-6">Botones y CTAs</h3>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-signalYellow to-orange-500 text-slate-900 hover:from-signalYellow/90 hover:to-orange-500/90">
                    Botón Principal
                  </Button>
                  <Button variant="outline" className="border-brilliantBlue text-brilliantBlue hover:bg-brilliantBlue hover:text-white">
                    Botón Secundario
                  </Button>
                  <Button variant="ghost" className="text-slate-700 hover:text-signalYellow hover:bg-signalYellow/10">
                    Botón Terciario
                  </Button>
                </div>
              </Card>

              {/* Typography Hierarchy */}
              <Card className="p-8">
                <h3 className="text-xl font-bold font-heading mb-6">Jerarquía Tipográfica</h3>
                <div className="space-y-4">
                  <div>
                    <h1 className="text-4xl font-bold font-concert text-slate-900">
                      Título Principal - Concert One
                    </h1>
                    <code className="text-sm text-slate-500">font-concert text-4xl font-bold</code>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-slate-800">
                      Subtítulo - Space Grotesk
                    </h2>
                    <code className="text-sm text-slate-500">font-heading text-2xl font-bold</code>
                  </div>
                  <div>
                    <p className="text-lg font-body text-slate-700">
                      Párrafo principal usando Manrope para máxima legibilidad y claridad en textos largos.
                    </p>
                    <code className="text-sm text-slate-500">font-body text-lg</code>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}