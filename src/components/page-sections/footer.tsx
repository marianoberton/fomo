"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-primary mb-2">FOMO</h3>
              <p className="text-muted-foreground">
                Soluciones digitales inteligentes para impulsar el crecimiento de tu negocio.
              </p>
            </motion.div>
            
            {/* Social Icons */}
            <motion.div 
              className="flex space-x-4 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                staggerChildren: 0.1
              }}
            >
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map(({ Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.3 + (index * 0.1)
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Links */}
          <div className="space-y-4">
            <motion.h4 
              className="text-lg font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Enlaces Rápidos
            </motion.h4>
            <ul className="space-y-2">
              {[
                { label: "Inicio", href: "#" },
                { label: "Servicios", href: "#servicios" },
                { label: "Quiénes Somos", href: "#about" },
                { label: "Contacto", href: "#contacto" }
              ].map(({ label, href }, index) => (
                <motion.li 
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2 + (index * 0.1)
                  }}
                >
                  <Link 
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <circle cx="3" cy="3" r="3" fill="currentColor" />
                    </svg>
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <motion.h4 
              className="text-lg font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Servicios
            </motion.h4>
            <ul className="space-y-2">
              {[
                { label: "Diagnóstico Digital", href: "#servicios" },
                { label: "Optimización de Procesos", href: "#servicios" },
                { label: "IA Aplicada", href: "#servicios" },
                { label: "Acompañamiento", href: "#servicios" }
              ].map(({ label, href }, index) => (
                <motion.li 
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.3 + (index * 0.1)
                  }}
                >
                  <Link 
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <circle cx="3" cy="3" r="3" fill="currentColor" />
                    </svg>
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <motion.h4 
              className="text-lg font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contacto
            </motion.h4>
            <ul className="space-y-3">
              {[
                { Icon: MapPin, text: "Buenos Aires, Argentina" },
                { Icon: Mail, text: "info@fomo.com.ar" },
                { Icon: Phone, text: "+54 11 1234-5678" }
              ].map(({ Icon, text }, index) => (
                <motion.li 
                  key={text}
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.4 + (index * 0.1)
                  }}
                >
                  <span className="text-primary">
                    <Icon size={16} />
                  </span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="border-t border-border mt-10 pt-6 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>© {currentYear} FOMO. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
} 