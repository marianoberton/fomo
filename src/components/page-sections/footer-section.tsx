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
                <h3 className="text-2xl font-bold text-white mb-2">
                  <span className="text-signalYellow">FO</span>MO
                </h3>
                <p className="text-brilliantBlue font-semibold text-lg mb-4">
                  Procesos inteligentes que disparan tu PyME
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Transformamos PyMEs a través de automatización, datos y gestión del cambio. 
                  Resultados reales en 3 meses.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-brilliantBlue" />
                  <span>hola@fomo.consulting</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-brilliantBlue" />
                  <span>+54 9 11 1234-5678</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-brilliantBlue" />
                  <span>Buenos Aires, Argentina</span>
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
              <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-signalYellow" />
                  <span className="font-semibold text-white">Tips semanales</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Recibí insights de transformación digital directo en tu inbox
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="flex-1 bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-brilliantBlue"
                  />
                  <Button
                    size="sm"
                    className="bg-brilliantBlue hover:bg-brilliantBlue/80 text-white px-4 py-2 rounded-lg"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-300 text-sm mb-3">Seguinos en:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 bg-white/10 hover:bg-brilliantBlue/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 hover:border-brilliantBlue/40"
                      >
                        <Icon className="w-5 h-5 text-gray-300 hover:text-brilliantBlue" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {currentYear} FOMO. Hecho con</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>en Buenos Aires</span>
              </div>

              {/* Legal Links */}
              <div className="flex gap-6 text-sm">
                <button
                  onClick={() => handleLinkClick('/privacidad')}
                  className="text-gray-400 hover:text-brilliantBlue transition-colors duration-200"
                >
                  Política de Privacidad
                </button>
                <button
                  onClick={() => handleLinkClick('/terminos')}
                  className="text-gray-400 hover:text-brilliantBlue transition-colors duration-200"
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