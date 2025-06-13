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

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Servicios", href: "#pillars" },
    { name: "Metodología", href: "#process" },
    { name: "Equipo", href: "#team" },
    { name: "Contacto", href: "#contact-form" }
  ];

  const services = [
    { name: "Automatización de Procesos", href: "#pillars" },
    { name: "Dashboards & BI", href: "#pillars" },
    { name: "Gestión del Cambio", href: "#pillars" },
    { name: "Integración de Sistemas", href: "#pillars" }
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
    <footer className="w-full bg-gradient-to-b from-neutral-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-signalYellow to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-5xl font-bold text-white">
                    <span className="text-signalYellow">FO</span>MO
                  </h3>
                </div>
                <p className="text-brilliantBlue font-semibold text-xl mb-4">
                  Automatización que funciona
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Convertimos procesos manuales en sistemas automáticos. 
                  Tu PyME crece mientras vos te enfocás en lo importante.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-300 group">
                  <div className="w-10 h-10 bg-brilliantBlue/20 rounded-xl flex items-center justify-center group-hover:bg-brilliantBlue/30 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-brilliantBlue" />
                  </div>
                  <span className="text-lg">hola@fomo.consulting</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-300 group">
                  <div className="w-10 h-10 bg-brilliantBlue/20 rounded-xl flex items-center justify-center group-hover:bg-brilliantBlue/30 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-brilliantBlue" />
                  </div>
                  <span className="text-lg">+54 9 11 1234-5678</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-300 group">
                  <div className="w-10 h-10 bg-brilliantBlue/20 rounded-xl flex items-center justify-center group-hover:bg-brilliantBlue/30 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-brilliantBlue" />
                  </div>
                  <span className="text-lg">Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">
                Navegación
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-300 hover:text-brilliantBlue transition-colors duration-200 flex items-center gap-2 group"
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
              <h4 className="text-lg font-bold text-white">
                Servicios
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(service.href)}
                      className="text-gray-300 hover:text-brilliantBlue transition-colors duration-200 flex items-center gap-2 group"
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
              <h4 className="text-lg font-bold text-white">
                Mantente conectado
              </h4>
              
              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-signalYellow/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-signalYellow/20 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-signalYellow rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-slate-900" />
                  </div>
                  <span className="font-bold text-white text-lg">Tips semanales</span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Recibí insights de transformación digital directo en tu inbox
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="flex-1 bg-black/40 border border-white/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-signalYellow focus:ring-2 focus:ring-signalYellow/20"
                  />
                  <Button
                    size="sm"
                    className="bg-signalYellow hover:bg-signalYellow/90 text-slate-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-300 mb-4 font-medium">Seguinos en:</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 hover:from-brilliantBlue/20 hover:to-brilliantBlue/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 hover:border-brilliantBlue/40 shadow-lg hover:shadow-xl"
                      >
                        <Icon className="w-6 h-6 text-gray-300 hover:text-brilliantBlue transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-gradient-to-r from-black/30 to-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-base">© {currentYear} FOMO. Hecho con</span>
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-base">en Buenos Aires</span>
              </div>

              {/* Legal Links */}
              <div className="flex gap-8">
                <button
                  onClick={() => handleLinkClick('/privacidad')}
                  className="text-gray-400 hover:text-brilliantBlue transition-all duration-300 hover:scale-105 font-medium"
                >
                  Política de Privacidad
                </button>
                <button
                  onClick={() => handleLinkClick('/terminos')}
                  className="text-gray-400 hover:text-brilliantBlue transition-all duration-300 hover:scale-105 font-medium"
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