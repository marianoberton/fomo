"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="contacto" className="py-28 px-4 bg-secondary/5 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 top-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Contacto</h2>
            <div className="h-1 w-16 bg-accent mb-6"></div>
            <p className="text-muted-foreground mb-8">
              Completa el formulario y nos pondremos en contacto contigo lo antes posible.
            </p>
            
            <div className="space-y-6 pt-4">
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-primary/10 p-2 rounded-md text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-muted-foreground">+54 11 3906-6421</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-primary/10 p-2 rounded-md text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">info@fomo.com.ar</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-primary/10 p-2 rounded-md text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-muted-foreground">Av. Cordoba 1886, Buenos Aires, Argentina</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-background p-8 rounded-lg shadow-lg backdrop-blur-sm z-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                  <input 
                    id="name" 
                    type="text" 
                    className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                <input 
                  id="subject" 
                  type="text" 
                  className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-3 border border-border bg-secondary/5 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all" 
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full py-6 text-lg font-medium">Enviar Mensaje</Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 