"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  link: string;
  stats: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: "Tienda Online Moda Sustentable",
    description: "Plataforma e-commerce completa con integración de Mercado Pago y facturación AFIP automática.",
    image: "/portfolio/ecommerce.jpg",
    link: "/portfolio/tienda-moda",
    stats: "Aumentó sus ventas un 30% en 3 meses"
  },
  {
    title: "Bot de Atención 24/7",
    description: "Sistema automatizado de atención al cliente vía WhatsApp para empresa de logística.",
    image: "/portfolio/chatbot.jpg",
    link: "/portfolio/bot-atencion",
    stats: "Tiempo de respuesta reducido a segundos"
  },
  {
    title: "CRM Inmobiliario Inteligente",
    description: "Sistema de gestión personalizado con IA para predicción de ventas y seguimiento de clientes.",
    image: "/portfolio/crm.jpg",
    link: "/portfolio/crm-inmobiliario",
    stats: "50% más conversiones de leads"
  }
];

const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-secondary rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative h-48 w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-neutral">{item.title}</h3>
        <p className="text-neutral/80">{item.description}</p>
        <div className="bg-white/50 p-3 rounded-lg">
          <p className="text-sm font-medium text-neutral/90">{item.stats}</p>
        </div>
        <div className="pt-2">
          <Link href={item.link}>
            <Button 
              variant="outline"
              className="w-full hover:bg-primary hover:text-white transition-colors"
            >
              Ver caso
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  return (
    <section className="py-24 bg-white" id="portfolio">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-lg text-neutral/80">
            Mirá cómo ayudamos a otras pymes argentinas a crecer con soluciones tecnológicas prácticas y efectivas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <PortfolioCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}