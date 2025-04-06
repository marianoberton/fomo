"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute right-0 top-0 w-[30rem] h-[30rem] bg-primary rounded-full filter blur-[10rem] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-[20rem] h-[20rem] bg-accent rounded-full filter blur-[8rem] transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <h3 className="text-2xl font-bold font-accent mb-6">
              <span className="text-accent">F</span>OMO
            </h3>
            <p className="text-secondary-foreground/80 max-w-xs mb-8 text-lg">
              Transformamos tu negocio con tecnología a medida. Desarrollo, 
              automatizaciones, IA y soluciones personalizadas para pymes.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-secondary-foreground/80 group">
                <span className="h-6 w-6 text-accent flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="group-hover:text-accent transition-colors">Av. Cordoba 1886, Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-start gap-3 text-secondary-foreground/80 group">
                <span className="h-6 w-6 text-accent flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="group-hover:text-accent transition-colors">info@fomo.com.ar</span>
              </div>
              <div className="flex items-start gap-3 text-secondary-foreground/80 group">
                <span className="h-6 w-6 text-accent flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span className="group-hover:text-accent transition-colors">+54 11 3906-6421</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Enlaces
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Quiénes Somos", href: "/#quienes-somos" },
                { name: "Servicios", href: "/#servicios" },
                { name: "Casos de Éxito", href: "/#casos-exito" },
                { name: "Planes y Abonos", href: "/#planes" },
                { name: "Blog", href: "/blog" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-secondary-foreground/80 hover:text-accent transition-colors relative group flex items-center"
                  >
                    <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="ml-0 group-hover:ml-4 transition-all">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Legal
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Términos y Condiciones", href: "/terminos" },
                { name: "Política de Privacidad", href: "/privacidad" },
                { name: "Contacto", href: "/#contacto" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-secondary-foreground/80 hover:text-accent transition-colors relative group flex items-center"
                  >
                    <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="ml-0 group-hover:ml-4 transition-all">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-secondary-foreground/60">© {new Date().getFullYear()} FOMO. Todos los derechos reservados.</p>
          
          <div className="flex space-x-6">
            {[
              { name: "Facebook", href: "https://facebook.com", icon: "M9.198 21.5h4v-8.01h3.604l.396-3.98h-4v-2.01c0-.55.448-1 1-1h3v-4h-3c-2.761 0-5 2.24-5 5v2.01h-2.001l-.396 3.98h2.397v8.01z" },
              { name: "Twitter", href: "https://twitter.com", icon: "M22 5.8a8.49 8.49 0 01-2.36.64 4.13 4.13 0 001.81-2.27 8.21 8.21 0 01-2.61 1 4.1 4.1 0 00-7 3.74 11.64 11.64 0 01-8.45-4.29 4.16 4.16 0 001.26 5.48 4.09 4.09 0 01-1.84-.51v.05a4.14 4.14 0 003.29 4 4.15 4.15 0 01-1.85.07 4.13 4.13 0 003.83 2.87A8.33 8.33 0 012 18.34a11.54 11.54 0 006.29 1.85A11.54 11.54 0 0020 8.59v-.5a8.3 8.3 0 002-2.1z" },
              { name: "LinkedIn", href: "https://linkedin.com", icon: "M6.5 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM5 10a1 1 0 011-1h1a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8zm6 0a1 1 0 011-1h1a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1v-8zm6-3a2.002 2.002 0 012-2h1.5a2.5 2.5 0 012.5 2.5V19a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6a1 1 0 00-1-1h-1a1 1 0 00-1 1v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-8a1 1 0 011-1h1z" },
              { name: "Instagram", href: "https://instagram.com", icon: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.504.344 1.857.182.466.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-secondary-foreground/60 hover:text-accent transition-colors"
              >
                <span className="sr-only">{social.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 