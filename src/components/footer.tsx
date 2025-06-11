"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  Heart,
  Zap
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Servicios", href: "#three-pillars" },
    { name: "Metodología", href: "#process-timeline" },
    { name: "Casos", href: "#demo-gallery" },
    { name: "Equipo", href: "#team" },
    { name: "Contáctanos", href: "#contact-form" }
  ];

  const services = [
    { name: "Automatización de Procesos", href: "#three-pillars" },
    { name: "Dashboards & BI", href: "#three-pillars" },
    { name: "Gestión del Cambio", href: "#three-pillars" },
    { name: "Integración de Sistemas", href: "#three-pillars" }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <svg 
                    viewBox="0 0 129.44 128.96" 
                    className="h-8 w-8 fill-slate-900"
                  >
                    <path d="M85.77.59C76,3.83,72.44,9.12,69.9,24.29c-.77,4.8-2,10.13-2.46,11.85s-.86,3.45-1.06,4-1.06,3.1-2.33,5.78C59,56.24,51.21,62.38,27.87,74.09,15.45,80.29,13.27,81.7,9.1,85.8a27.89,27.89,0,0,0-7,9.52C0,100,0,108.36,0,108.67c0,.5.64,8.87,2.54,12.67C5,126.28,7.41,128,10.44,127a5.92,5.92,0,0,0,3-2.61c.7-1.71.91-2.33-.64-7.06-2.4-7.33-2.26-13.12.5-19,2.39-4.94,4.3-7.34,8.39-10C24.9,86.15,33.78,84,37.8,84c5.57.08,15,2.32,21.59,5.7C66.94,93.55,74.7,101,85.28,114.15,94.94,126.28,99.11,129,108,129c6.21,0,10.37-1.55,14.82-5.57a18.81,18.81,0,0,0,6.63-15.09c.07-5.72-1.13-8.82-4.94-13.34-5.36-6.41-14.6-8.11-25-4.65-4.87,1.62-6.63,1.9-10.93,1.62C76.11,91.09,67.79,82.34,67.79,70c0-7.13,1.62-11.15,6.49-16.44,4.3-4.58,8.25-7,20.45-12.27,7.69-3.32,12.13-6.77,15.17-11.85,1.76-3,2.43-8.09,2.45-9.19a19.06,19.06,0,0,0-2.59-10.14c-2.33-3.67-7.2-7.69-10.8-8.89C95.09-.12,88.81-.4,85.77.59Z"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-slate-900 font-concert">
                    FOMO
                  </h3>
                </div>
                <p className="text-slate-900 font-semibold text-lg mb-4">
                  Procesos inteligentes que disparan tu PyME
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Transformamos PyMEs a través de automatización, datos y gestión del cambio. 
                  Resultados reales en 3 meses.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="w-5 h-5 text-signalYellow" />
                  <span>hola@fomo.consulting</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="w-5 h-5 text-slate-900" />
                  <span>+54 9 11 1234-5678</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">
                Navegación
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-slate-600 hover:text-signalYellow transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">
                Servicios
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(service.href)}
                      className="text-slate-600 hover:text-signalYellow transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">
                Mantente conectado
              </h4>
              
              {/* Newsletter CTA */}
              <div className="bg-slate-100 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-signalYellow" />
                  <span className="font-semibold text-slate-900">Tips semanales</span>
                </div>
                <p className="text-slate-700 text-sm mb-4">
                  Recibí insights de transformación digital directo en tu inbox
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:border-signalYellow focus:ring-1 focus:ring-signalYellow/30 transition-all duration-200"
                  />
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-signalYellow to-orange-500 hover:from-signalYellow/90 hover:to-orange-500/90 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 hover:shadow-signalYellow/25"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-slate-700 text-sm mb-3">Seguinos en:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 bg-slate-100 hover:bg-gradient-to-r hover:from-signalYellow/20 hover:to-orange-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-200 hover:border-signalYellow/50 group"
                      >
                        <Icon className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 bg-slate-50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Copyright */}
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <span>© {currentYear} FOMO. Hecho con</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>en Buenos Aires</span>
              </div>

              {/* Legal Links */}
              <div className="flex gap-6 text-sm">
                <button
                  onClick={() => handleLinkClick('/privacidad')}
                  className="text-slate-600 hover:text-signalYellow transition-colors duration-200"
                >
                  Política de Privacidad
                </button>
                <button
                  onClick={() => handleLinkClick('/terminos')}
                  className="text-slate-600 hover:text-signalYellow transition-colors duration-200"
                >
                  Términos y Condiciones
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 