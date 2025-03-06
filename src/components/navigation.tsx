"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Quiénes Somos", href: "/#about" },
  { name: "Servicios", href: "/#services" },
  { name: "Tecnologías", href: "/#technologies" },
  { name: "Proyectos", href: "/#portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Determine if we're on the homepage
  const isHomePage = pathname === "/";
  
  // Get text color based on scroll state and current page
  const getTextColor = () => {
    if (isOpen) return "text-primary";
    if (scrolled) return "text-primary";
    if (!isHomePage) return "text-primary";
    return "text-white";
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="z-50">
          <span className={`text-2xl font-bold font-heading ${getTextColor()}`}>
            FOMO
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`z-50 p-2 rounded-full ${
            scrolled || isOpen || !isHomePage ? "text-primary bg-white/10" : "text-white bg-black/10"
          } hover:bg-primary/10 transition-colors`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center z-40"
          >
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-2xl font-medium text-neutral hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}