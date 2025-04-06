"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Quiénes Somos", href: "/#quienes-somos" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Casos de Éxito", href: "/#casos-exito" },
  { name: "Planes y Abonos", href: "/#planes" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/#contacto" },
];

// Animation variants
const logoVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const navItemVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 }
};

const mobileMenuVariants = {
  closed: { 
    opacity: 0,
    clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: { 
    opacity: 1, 
    clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
};

const mobileNavItemVariants = {
  closed: { opacity: 0, x: -50 },
  open: { opacity: 1, x: 0 }
};

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
  
  // Get background based on scroll state and current page
  const getHeaderBg = () => {
    if (scrolled || !isHomePage) {
      return "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm";
    }
    return "bg-transparent";
  };

  // Get text color based on scroll state and current page
  const getTextColor = () => {
    if (isOpen) return "text-primary";
    if (scrolled) return "text-foreground";
    if (!isHomePage) return "text-foreground";
    return "text-white";
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${getHeaderBg()}`}
    >
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={logoVariants}
        >
          <Link href="/" className="z-50 group">
            <span className={`text-2xl font-bold font-accent ${getTextColor()} transition-colors duration-300 group-hover:text-primary`}>
              <span className="text-primary">F</span>OMO
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
              custom={index}
            >
              <Link
                href={link.href}
                className={`text-sm font-medium relative px-1 py-2 transition-colors group ${
                  scrolled || !isHomePage ? "text-foreground" : "text-white"
                }`}
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`z-50 p-2 rounded-full md:hidden ${
            scrolled || isOpen || !isHomePage ? "text-primary" : "text-white"
          } hover:bg-primary/10 transition-colors`}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-background flex flex-col items-center justify-center z-40"
          >
            <div className="absolute inset-0 z-0 opacity-5">
              <div className="absolute right-0 top-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
              <div className="absolute left-0 bottom-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
            </div>
            
            <nav className="flex flex-col items-center space-y-8 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  variants={mobileNavItemVariants}
                  custom={index}
                  className="overflow-hidden"
                >
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-3xl font-heading font-bold text-foreground hover:text-primary transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
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