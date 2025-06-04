"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Award,
  Lightbulb,
  Code,
  BookOpen,
  Zap,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  expertise: string[];
  description: string;
  highlight: string;
  colorTheme: 'signalYellow' | 'brilliantBlue';
}

const teamMembers: TeamMember[] = [
  {
    name: "Guillermina",
    role: "Experta en Procesos y Cambio Organizacional",
    photo: "/images/team/guillermina.jpg", // Placeholder
    expertise: [
      "Mapeo y optimización de procesos",
      "Gestión del cambio organizacional", 
      "Adopción de cultura digital"
    ],
    description: "Con más de 8 años liderando transformaciones en PyMEs, Guillermina se especializa en que los equipos adopten nuevas formas de trabajar sin resistencia.",
    highlight: "Garantiza 100% de adopción en procesos rediseñados",
    colorTheme: 'brilliantBlue'
  },
  {
    name: "Mariano",
    role: "Arquitecto de Soluciones Tech",
    photo: "/images/team/mariano.jpg", // Placeholder
    expertise: [
      "Desarrollo de dashboards y automatizaciones",
      "Integración de sistemas y APIs",
      "IA aplicada a procesos de negocio"
    ],
    description: "Mariano traduce necesidades de negocio en soluciones tecnológicas concretas. Su enfoque: tecnología que funciona desde el día 1.",
    highlight: "Implementaciones sin downtime en producción",
    colorTheme: 'signalYellow'
  }
];

export default function TeamSection() {
  const getThemeColors = (theme: 'signalYellow' | 'brilliantBlue') => {
    if (theme === 'signalYellow') {
      return {
        // Solid vibrant background like pain-points-section
        cardBg: 'bg-signalYellow',
        text: 'text-slate-900',
        iconBg: 'bg-slate-900',
        iconColor: 'text-signalYellow',
        badge: 'bg-slate-900 text-signalYellow',
        border: 'border-yellow-600/20',
        accentBg: 'bg-yellow-600'
      };
    } else {
      return {
        // Solid vibrant background like pain-points-section
        cardBg: 'bg-brilliantBlue',
        text: 'text-white',
        iconBg: 'bg-white',
        iconColor: 'text-brilliantBlue',
        badge: 'bg-white text-brilliantBlue',
        border: 'border-blue-700/20',
        accentBg: 'bg-blue-700'
      };
    }
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Background decoration using brand colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-brilliantBlue/8 to-signalYellow/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-plum/8 to-orange-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brilliantBlue/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brilliantBlue to-plum text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Users className="w-4 h-4" />
            Nuestro Equipo
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Conocé a las personas detrás de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brilliantBlue to-plum">
              tu transformación
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Un dúo complementario: una experta en procesos y cambio + un arquitecto de soluciones tech. 
            Juntos garantizan que la tecnología funcione Y que tu equipo la adopte.
          </p>
        </motion.div>

        {/* Team Members - Solid vibrant cards like pain-points-section */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => {
            const theme = getThemeColors(member.colorTheme);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
            <Card 
                  className={`group ${theme.cardBg} border-2 ${theme.border} hover:border-opacity-80 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden transform hover:scale-105 hover:-rotate-1 shadow-lg`}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
                  <CardContent className="p-8 relative">
                    {/* Decorative element - top right corner */}
                    <div className="absolute top-6 right-6">
                      <motion.div
                        className={`w-12 h-12 rounded-2xl border-2 border-white/20 flex items-center justify-center shadow-lg`}
                        style={{
                          backgroundColor: member.colorTheme === 'signalYellow' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'
                        }}
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 15 
                        }}
                      >
                        {member.colorTheme === 'brilliantBlue' ? (
                          <BookOpen className={`w-6 h-6 ${theme.text} opacity-80`} />
                        ) : (
                          <Code className={`w-6 h-6 ${theme.text} opacity-80`} />
                        )}
                      </motion.div>
                    </div>

                {/* Photo */}
                <div className="relative mb-6">
                      <motion.div 
                        className={`w-32 h-32 mx-auto ${theme.iconBg} rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                    {/* Placeholder for actual photos */}
                        <div className="w-full h-full flex items-center justify-center relative">
                          <motion.div 
                            className={`w-20 h-20 ${theme.cardBg} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}
                            animate={{
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.5
                            }}
                          >
                            <span className={`text-3xl font-bold ${theme.text}`}>
                          {member.name.charAt(0)}
                        </span>
                          </motion.div>
                      </div>
                      </motion.div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                      <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>
                    {member.name}
                  </h3>
                      <p className={`font-semibold mb-3 ${theme.text} opacity-90`}>
                    {member.role}
                  </p>
                      <p className={`${theme.text} opacity-80 leading-relaxed`}>
                    {member.description}
                  </p>
                </div>

                {/* Expertise */}
                <div className="mb-6">
                      <h4 className={`font-semibold ${theme.text} mb-4 flex items-center gap-2 justify-center opacity-90`}>
                        <Lightbulb className={`w-4 h-4 ${theme.text}`} />
                    Especialidades:
                  </h4>
                      <ul className="space-y-3">
                    {member.expertise.map((skill, skillIndex) => (
                          <motion.li 
                            key={skillIndex} 
                            className="flex items-start gap-3 group/skill"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="flex-shrink-0 mt-1">
                              <motion.div
                                className={`w-6 h-6 ${theme.iconBg} rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 group-hover/skill:scale-110 border border-white/20`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <CheckCircle className={`w-3 h-3 ${theme.iconColor}`} />
                              </motion.div>
                            </div>
                            <span className={`text-sm ${theme.text} opacity-80 group-hover/skill:opacity-100 transition-opacity duration-300`}>
                          {skill}
                        </span>
                          </motion.li>
                    ))}
                  </ul>
                </div>

                    {/* Highlight - contrasting solid background */}
                    <motion.div 
                      className={`rounded-2xl p-4 border-2 border-white/20 relative overflow-hidden shadow-lg`}
                      style={{
                        backgroundColor: member.colorTheme === 'signalYellow' ? 'rgb(202 138 4)' : '#005580'
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                          <Zap className={`w-4 h-4 ${member.colorTheme === 'signalYellow' ? 'text-slate-900' : 'text-white'}`} />
                          <span className={`font-semibold text-sm ${member.colorTheme === 'signalYellow' ? 'text-slate-900' : 'text-white'}`}>
                      Track record:
                    </span>
                  </div>
                        <p className={`font-medium text-sm opacity-95 ${member.colorTheme === 'signalYellow' ? 'text-slate-900' : 'text-white'}`}>
                    {member.highlight}
                  </p>
                </div>
                    </motion.div>
              </CardContent>
            </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-200/50 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brilliantBlue/5 via-transparent to-signalYellow/5"></div>
            
            <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-brilliantBlue" />
                <span className="font-semibold text-xl text-slate-800">
                Un equipo, dos enfoques complementarios
              </span>
            </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
              Mientras Guillermina se asegura de que tu equipo adopte los nuevos procesos sin resistencia, 
              Mariano construye la tecnología que los soporta. El resultado: transformaciones que realmente funcionan.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  className="bg-signalYellow rounded-2xl p-6 border border-orange-300/20 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-slate-900" />
                    <span className="font-bold text-slate-900">Proceso</span>
                </div>
                  <p className="text-sm text-slate-800">
                  Mapeo, rediseño y gestión del cambio que garantiza adopción
                </p>
                </motion.div>
                <motion.div 
                  className="bg-brilliantBlue rounded-2xl p-6 border border-blue-300/20 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-5 h-5 text-white" />
                    <span className="font-bold text-white">Tecnología</span>
              </div>
                  <p className="text-sm text-white opacity-90">
                  Automatización, dashboards e IA que ejecutan lo diseñado
                </p>
                </motion.div>
            </div>

              <p className="text-sm text-slate-500">
              En el diagnóstico trabajás directamente con ambos para entender tu situación específica.
            </p>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
} 