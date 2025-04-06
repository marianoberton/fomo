"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function TerminosPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="bg-background py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-[40rem] h-[40rem] bg-accent rounded-full filter blur-[12rem] opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-[30rem] h-[30rem] bg-primary rounded-full filter blur-[10rem] opacity-10 transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants} 
          className="max-w-3xl mx-auto"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-5xl font-bold mb-8 font-heading relative inline-block"
          >
            Términos y Condiciones
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent"></span>
          </motion.h1>

          <motion.p 
            variants={fadeIn}
            className="text-muted-foreground mb-8 text-lg"
          >
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>

          <motion.div 
            variants={fadeIn}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="text-2xl font-bold mb-4 font-heading">1. Aceptación de Términos</h2>
            <p>Al acceder y utilizar los servicios proporcionados por FOMO ("la Empresa", "nosotros", "nuestro"), usted acepta estar legalmente vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, no utilice nuestros servicios.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">2. Descripción del Servicio</h2>
            <p>FOMO proporciona servicios de desarrollo tecnológico, incluyendo pero no limitado a desarrollo web, aplicaciones móviles, automatizaciones, implementación de IA y soluciones personalizadas para empresas.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">3. Uso del Servicio</h2>
            <p>Usted se compromete a utilizar nuestros servicios de acuerdo con todas las leyes y regulaciones aplicables. No utilizará nuestros servicios para ningún propósito ilegal o prohibido por estos términos.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">4. Propiedad Intelectual</h2>
            <p>Todo el contenido, diseño, gráficos, compilación, código magnético, software y todos los demás elementos del sitio web y servicios proporcionados están protegidos por leyes de propiedad intelectual y pertenecen a FOMO o a sus proveedores y socios.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">5. Limitación de Responsabilidad</h2>
            <p>En la medida máxima permitida por la ley, FOMO no será responsable por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de ganancias, datos, uso o cualquier otra pérdida intangible, resultante de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>El uso o la imposibilidad de usar nuestros servicios</li>
              <li>Cualquier cambio en el servicio o cese temporal o permanente del servicio</li>
              <li>El acceso no autorizado o alteración de sus transmisiones o datos</li>
              <li>Declaraciones o conductas de terceros respecto al servicio</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">6. Modificaciones del Servicio</h2>
            <p>FOMO se reserva el derecho, a su sola discreción, de modificar o reemplazar cualquier parte de estos Términos y Condiciones. Es su responsabilidad revisar estos Términos periódicamente para verificar los cambios.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">7. Contacto</h2>
            <p>Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos a través de info@fomo.com.ar.</p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 