"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Servicios", href: "#three-pillars" },
  { name: "Metodología", href: "#process-timeline" },
  { name: "Casos", href: "#demo-gallery" },
  { name: "Equipo", href: "#team" },
];

const contactLink = { name: "Contáctanos", href: "#contact-form" };

const mobileMenuVariants = {
  closed: { 
    opacity: 0,
    scale: 0.95, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
  open: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.25, ease: "easeOut" } 
  }
};

const mobileNavItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Container principal - mobile first approach */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4 pb-3 md:px-0 md:pt-6 md:pb-0 md:flex md:justify-center">
      <header 
          className={`
            bg-white/90 backdrop-blur-md text-slate-800 rounded-full shadow-lg border border-gray-200/50 
            flex items-center justify-between transition-all duration-300 hover:shadow-xl
            w-full h-14 px-3 sm:px-4
            md:w-auto md:max-w-fit md:px-6 md:h-14
          `}
      >
          {/* Logo - siempre visible */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <svg 
            viewBox="0 0 129.44 128.96" 
            className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform duration-300 fill-slate-900"
          >
            <path d="M85.77.59C76,3.83,72.44,9.12,69.9,24.29c-.77,4.8-2,10.13-2.46,11.85s-.86,3.45-1.06,4-1.06,3.1-2.33,5.78C59,56.24,51.21,62.38,27.87,74.09,15.45,80.29,13.27,81.7,9.1,85.8a27.89,27.89,0,0,0-7,9.52C0,100,0,108.36,0,108.67c0,.5.64,8.87,2.54,12.67C5,126.28,7.41,128,10.44,127a5.92,5.92,0,0,0,3-2.61c.7-1.71.91-2.33-.64-7.06-2.4-7.33-2.26-13.12.5-19,2.39-4.94,4.3-7.34,8.39-10C24.9,86.15,33.78,84,37.8,84c5.57.08,15,2.32,21.59,5.7C66.94,93.55,74.7,101,85.28,114.15,94.94,126.28,99.11,129,108,129c6.21,0,10.37-1.55,14.82-5.57a18.81,18.81,0,0,0,6.63-15.09c.07-5.72-1.13-8.82-4.94-13.34-5.36-6.41-14.6-8.11-25-4.65-4.87,1.62-6.63,1.9-10.93,1.62C76.11,91.09,67.79,82.34,67.79,70c0-7.13,1.62-11.15,6.49-16.44,4.3-4.58,8.25-7,20.45-12.27,7.69-3.32,12.13-6.77,15.17-11.85,1.76-3,2.43-8.09,2.45-9.19a19.06,19.06,0,0,0-2.59-10.14c-2.33-3.67-7.2-7.69-10.8-8.89C95.09-.12,88.81-.4,85.77.59Z"/>
          </svg>
          <span className="text-xl sm:text-2xl font-bold font-concert group-hover:text-slate-700 transition-colors duration-300 text-slate-900">
          FOMO
          </span>
        </Link>

          {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 pl-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs lg:text-sm font-medium px-3 lg:px-4 py-2 transition-all duration-200 hover:text-brilliantBlue hover:bg-brilliantBlue/10 rounded-full text-slate-700"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick(contactLink.href)}
            className="text-xs lg:text-sm font-semibold bg-gradient-to-r from-signalYellow to-orange-500 hover:from-signalYellow/90 hover:to-orange-500/90 text-black rounded-full px-4 lg:px-5 py-2 transition-all duration-200 ml-2 shadow-md hover:shadow-lg transform hover:scale-105 hover:shadow-orange-500/25"
          >
            {contactLink.name}
          </button>
        </nav>

          {/* Mobile Menu Button - only visible on mobile */}
          <div className="md:hidden flex items-center flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full text-slate-700 transition-colors hover:bg-brilliantBlue/10 hover:text-brilliantBlue focus:outline-none"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 p-2 text-slate-700 hover:bg-brilliantBlue/10 hover:text-brilliantBlue rounded-full" aria-label="Close menu">
              <X size={28} />
            </button>
            <nav className="flex flex-col items-center space-y-5 mt-10">
              {navLinks.map((link, index) => (
                <motion.div key={link.name} variants={mobileNavItemVariants} initial="closed" animate="open" exit="closed" transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}>
                  <button onClick={() => handleLinkClick(link.href)} className="text-2xl font-medium text-slate-700 hover:text-brilliantBlue transition-colors py-2 block">
                    {link.name}
                  </button>
                </motion.div>
              ))}
              <motion.div variants={mobileNavItemVariants} initial="closed" animate="open" exit="closed" transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }} className="mt-6">
                <button onClick={() => handleLinkClick(contactLink.href)} className="text-xl font-semibold bg-gradient-to-r from-signalYellow to-orange-500 hover:from-signalYellow/90 hover:to-orange-500/90 text-black rounded-full px-8 py-3 transition-all duration-200 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105">
                  {contactLink.name}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}