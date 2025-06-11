"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Clients", href: "/clients" },
  { name: "Blog", href: "/blog" },
];

const contactLink = { name: "Contact Us", href: "/contact" };

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

export default function NavigationBackup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full flex justify-center py-2 md:py-3 fixed top-0 z-50">
      <header 
        className={`bg-neutral-900 text-white rounded-full shadow-xl flex items-center justify-between px-4 sm:px-6 h-12 sm:h-14 w-auto max-w-fit`}
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <svg 
            viewBox="0 0 129.44 128.96" 
            className="h-6 w-6 sm:h-7 sm:w-7 group-hover:opacity-80 transition-opacity fill-current"
          >
            <path d="M85.77.59C76,3.83,72.44,9.12,69.9,24.29c-.77,4.8-2,10.13-2.46,11.85s-.86,3.45-1.06,4-1.06,3.1-2.33,5.78C59,56.24,51.21,62.38,27.87,74.09,15.45,80.29,13.27,81.7,9.1,85.8a27.89,27.89,0,0,0-7,9.52C0,100,0,108.36,0,108.67c0,.5.64,8.87,2.54,12.67C5,126.28,7.41,128,10.44,127a5.92,5.92,0,0,0,3-2.61c.7-1.71.91-2.33-.64-7.06-2.4-7.33-2.26-13.12.5-19,2.39-4.94,4.3-7.34,8.39-10C24.9,86.15,33.78,84,37.8,84c5.57.08,15,2.32,21.59,5.7C66.94,93.55,74.7,101,85.28,114.15,94.94,126.28,99.11,129,108,129c6.21,0,10.37-1.55,14.82-5.57a18.81,18.81,0,0,0,6.63-15.09c.07-5.72-1.13-8.82-4.94-13.34-5.36-6.41-14.6-8.11-25-4.65-4.87,1.62-6.63,1.9-10.93,1.62C76.11,91.09,67.79,82.34,67.79,70c0-7.13,1.62-11.15,6.49-16.44,4.3-4.58,8.25-7,20.45-12.27,7.69-3.32,12.13-6.77,15.17-11.85,1.76-3,2.43-8.09,2.45-9.19a19.06,19.06,0,0,0-2.59-10.14c-2.33-3.67-7.2-7.69-10.8-8.89C95.09-.12,88.81-.4,85.77.59Z"/>
          </svg>
          <span className="text-xl sm:text-2xl font-bold font-concert group-hover:text-primary transition-colors duration-300">
          FOMO
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 pl-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs lg:text-sm font-medium px-2 lg:px-3 py-2 transition-colors duration-200 hover:text-primary`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={contactLink.href}
            className="text-xs lg:text-sm font-medium bg-brilliantBlue hover:bg-brilliantBlue/90 text-white rounded-full px-4 lg:px-5 py-2 transition-colors duration-200 ml-2 shadow-md"
          >
            {contactLink.name}
          </Link>
        </nav>

        <div className="md:hidden flex items-center pl-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full text-white transition-colors hover:bg-white/10 focus:outline-none `}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 bg-neutral-900/95 backdrop-blur-md z-40 flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 p-2 text-white hover:bg-white/10 rounded-full" aria-label="Close menu">
              <X size={28} />
            </button>
            <nav className="flex flex-col items-center space-y-5 mt-10">
              {navLinks.map((link, index) => (
                <motion.div key={link.name} variants={mobileNavItemVariants} initial="closed" animate="open" exit="closed" transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}>
                  <Link href={link.href} onClick={handleLinkClick} className="text-2xl font-medium text-white hover:text-primary transition-colors py-2 block">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileNavItemVariants} initial="closed" animate="open" exit="closed" transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }} className="mt-6">
                <Link href={contactLink.href} onClick={handleLinkClick} className="text-xl font-medium bg-brilliantBlue hover:bg-brilliantBlue/90 text-white rounded-full px-8 py-3 transition-colors">
                  {contactLink.name}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 