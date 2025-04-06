"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cpu, BarChart2, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Desarrollo Web",
    description: "Sitios web y aplicaciones modernas con un enfoque en experiencia de usuario.",
    icon: <Cpu className="h-6 w-6" />,
    href: "#contacto",
    color: "bg-blue-500/15",
    textColor: "text-blue-500"
  },
  {
    title: "Marketing Digital",
    description: "Estrategias efectivas y medibles para aumentar tu visibilidad online.",
    icon: <BarChart2 className="h-6 w-6" />,
    href: "#contacto",
    color: "bg-violet-500/15",
    textColor: "text-violet-500"
  },
  {
    title: "Social Media",
    description: "Gestión profesional de redes sociales para potenciar tu marca.",
    icon: <Users className="h-6 w-6" />,
    href: "#contacto",
    color: "bg-emerald-500/15",
    textColor: "text-emerald-500"
  },
  {
    title: "Soporte Técnico",
    description: "Asistencia continua para mantener tu presencia digital sin problemas.",
    icon: <MessageSquare className="h-6 w-6" />,
    href: "#contacto",
    color: "bg-amber-500/15",
    textColor: "text-amber-500"
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    },
  },
};

export function ServicesSection() {
  return (
    <section className="py-28 px-4" id="servicios">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            className="large-text mb-6 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nuestros <span className="text-primary font-accent">Servicios</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Soluciones digitales integrales para potenciar tu presencia online y 
            optimizar procesos internos
          </motion.p>
        </div>

        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <motion.div 
                className="card-huggable h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                <CardHeader>
                  <div className={`${service.color} w-14 h-14 flex items-center justify-center rounded-full mb-5`}>
                    {React.cloneElement(service.icon, { className: `${service.textColor}` })}
                  </div>
                  <CardTitle className="text-xl font-accent playful-text">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow py-5">
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto group" asChild>
                    <Link href={service.href} className={`flex items-center ${service.textColor} gap-2 font-medium hover:underline`}>
                      Saber más <motion.div
                        className="inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatDelay: 1.5,
                          duration: 1 
                        }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </Button>
                </CardFooter>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}