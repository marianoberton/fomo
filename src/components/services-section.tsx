"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Bot, Database, Brain, LineChart } from "lucide-react";
import Link from "next/link";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
  link: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, example, link, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    
    if (card) {
      gsap.fromTo(
        card,
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          },
          delay: index * 0.2 // Stagger effect
        }
      );
    }
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full transform transition-transform hover:scale-105 hover:shadow-xl"
    >
      <div className="text-primary mb-6 flex justify-center">
        <div className="p-4 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-neutral mb-3 text-center">{title}</h3>
      
      <p className="text-neutral/80 mb-4 flex-grow">{description}</p>
      
      <div className="bg-secondary/30 p-4 rounded-lg mb-6">
        <p className="text-neutral/90 italic text-sm">"{example}"</p>
      </div>
      
      <div className="mt-auto text-center">
        <Link href={link}>
          <Button 
            className="bg-primary hover:bg-accent text-white transition-colors duration-300"
          >
            Ver más
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    
    if (section && title && desc) {
      // Animate title
      gsap.fromTo(
        title,
        { y: -50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate description
      gsap.fromTo(
        desc,
        { y: -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const services = [
    {
      icon: <Code size={32} className="text-primary" />,
      title: "Desarrollo Web y Aplicaciones",
      description: "Creamos sitios web y aplicaciones móviles modernas, funcionales y optimizadas, con integraciones como Mercado Pago, AFIP y más.",
      example: "Tienda online con pago seguro y facturación automática en minutos.",
      link: "/servicios/desarrollo-web"
    },
    {
      icon: <Bot size={32} className="text-primary" />,
      title: "Automatizaciones y Bots",
      description: "Optimizá tus procesos con bots y automatizaciones que ahorran tiempo, como chatbots en WhatsApp o reportes automáticos.",
      example: "Bot de WhatsApp que atiende clientes 24/7 sin que levantes un dedo.",
      link: "/servicios/automatizaciones"
    },
    {
      icon: <Database size={32} className="text-primary" />,
      title: "Sistemas de Gestión a Medida",
      description: "Desarrollamos sistemas personalizados como CRMs y ERPs, integrados con herramientas clave como AFIP y Mercado Libre.",
      example: "CRM que captura leads de WhatsApp y los organiza automáticamente.",
      link: "/servicios/sistemas-gestion"
    },
    {
      icon: <Brain size={32} className="text-primary" />,
      title: "Soluciones de IA para Pymes",
      description: "Usá inteligencia artificial para analizar datos, crear chatbots avanzados o predecir tendencias, todo adaptado a tu negocio.",
      example: "Dashboard de IA que te dice cuánto vas a vender el próximo mes.",
      link: "/servicios/ia-pymes"
    },
    {
      icon: <LineChart size={32} className="text-primary" />,
      title: "Consultoría en Transformación Digital",
      description: "Te acompañamos en el camino hacia la digitalización con diagnósticos claros y planes hechos a tu medida.",
      example: "Diagnóstico digital con un dashboard de KPIs para tomar decisiones.",
      link: "/servicios/consultoria-digital"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-secondary/30" id="services">
      <div className="container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 ref={titleRef} className="text-4xl font-bold text-neutral mb-6">
            Nuestros Servicios
          </h2>
          <p ref={descRef} className="text-lg text-neutral/80">
            Ofrecemos soluciones tecnológicas completas para pymes argentinas. Desde sitios web que venden hasta inteligencia artificial que predice, estamos acá para que tu negocio crezca con herramientas modernas y a tu medida.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              example={service.example}
              link={service.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}