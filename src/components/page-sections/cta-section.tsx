"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-24 px-4 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl z-10 relative">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="large-text">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Solicita un diagnóstico gratuito y descubre cómo la tecnología puede impulsar tu pyme.
          </p>
          <Button asChild size="lg" variant="primary" className="font-medium px-8 py-6 text-lg">
            <Link href="#contacto">Solicitar Diagnóstico</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 