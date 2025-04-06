"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function PrivacidadPage() {
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
        <div className="absolute right-0 top-0 w-[40rem] h-[40rem] bg-primary rounded-full filter blur-[12rem] opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-[30rem] h-[30rem] bg-accent rounded-full filter blur-[10rem] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
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
            Política de Privacidad
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
            <h2 className="text-2xl font-bold mb-4 font-heading">1. Información que Recopilamos</h2>
            <p>En FOMO, valoramos su privacidad y nos comprometemos a proteger sus datos personales. Podemos recopilar la siguiente información:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Información de contacto, como nombre, dirección de correo electrónico, número de teléfono y dirección postal</li>
              <li>Información de la empresa, como nombre de la empresa, cargo y sector</li>
              <li>Información técnica, como dirección IP, tipo de navegador y sistema operativo</li>
              <li>Información de uso, como páginas visitadas, tiempo de permanencia y patrones de navegación</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">2. Cómo Utilizamos su Información</h2>
            <p>Utilizamos la información recopilada para los siguientes propósitos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar, mantener y mejorar nuestros servicios</li>
              <li>Personalizar su experiencia y ofrecer contenido relevante</li>
              <li>Comunicarnos con usted sobre actualizaciones, ofertas y eventos</li>
              <li>Analizar y comprender cómo se utilizan nuestros servicios</li>
              <li>Prevenir fraudes y proteger la seguridad de nuestros usuarios</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">3. Compartir Información</h2>
            <p>No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información en las siguientes circunstancias:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
              <li>Cuando sea requerido por ley o para proteger nuestros derechos legales</li>
              <li>En caso de fusión, venta o transferencia de activos de la empresa</li>
              <li>Con su consentimiento explícito</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">4. Seguridad de Datos</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra acceso, uso o divulgación no autorizados. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar su seguridad absoluta.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">5. Sus Derechos</h2>
            <p>Dependiendo de su ubicación, puede tener los siguientes derechos respecto a sus datos personales:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acceder a los datos personales que tenemos sobre usted</li>
              <li>Corregir datos inexactos o incompletos</li>
              <li>Solicitar la eliminación de sus datos personales</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">6. Cookies</h2>
            <p>Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar todas las cookies o para recibir una notificación cuando se envíe una cookie.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">7. Cambios en esta Política</h2>
            <p>Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios. Le recomendamos revisar esta política regularmente.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">8. Contacto</h2>
            <p>Si tiene preguntas o inquietudes sobre esta Política de Privacidad o sobre el manejo de sus datos personales, por favor contáctenos a través de info@fomo.com.ar.</p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 