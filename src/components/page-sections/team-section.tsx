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
    role: "Especialista en Procesos y Transformación Digital",
    photo: "/images/team/guillermina.jpg", // Placeholder
    expertise: [
      "Optimización práctica de procesos",
      "Gestión efectiva del cambio organizacional",
      "Implementación sencilla de cultura digital"
    ],
    description: "Hace que tu equipo trabaje mejor, más rápido y con menos estrés. Con más de 8 años facilitando cambios reales en PyMEs, logra que las mejoras sean adoptadas naturalmente por toda tu organización.",
    highlight: "Garantiza 100% de adopción en procesos rediseñados",
    colorTheme: 'brilliantBlue'
  },
  {
    name: "Mariano",
    role: "Experto en Soluciones Digitales & IA",
    photo: "/images/team/mariano.jpg", // Placeholder
    expertise: [
      "Desarrollo de software a medida",
      "Integración fluida de sistemas y APIs",
      "Automatizaciones inteligentes",
      "Dashboards claros e IA aplicada"
    ],
    description: "Convierte tus desafíos de negocio en soluciones digitales que funcionan desde el primer día. Combina tecnología simple, desarrollos prácticos e inteligencia artificial que te dan resultados visibles y medibles.",
    highlight: "Resultados prácticos que simplifican y potencian tu operación",
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
        border: 'border-brilliantBlue/20',
        accentBg: 'bg-brilliantBlue'
      };
    }
  };

  return (
    <section id="team" className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 pt-12 pb-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Background decoration using brand colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-brilliantBlue/8 to-signalYellow/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-plum/8 to-orange-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brilliantBlue/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-signalYellow to-orange-500 text-slate-900 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            viewport={{ once: true }}
          >
            <Users className="w-4 h-4" />
            Nuestro Equipo
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Conocé a los especialistas que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brilliantBlue to-plum">
              impulsan tu negocio
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Te acompañamos de punta a punta: desde mejorar tus procesos hasta implementar soluciones tecnológicas efectivas y fáciles de usar.
          </p>
        </motion.div>

        {/* Team Members - Solid vibrant cards like pain-points-section */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
          {teamMembers.map((member, index) => {
            const theme = getThemeColors(member.colorTheme);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative overflow-visible"
              >
                <Card 
                  className={`group ${theme.cardBg} border-2 ${theme.border} hover:border-opacity-80 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden transform hover:scale-[1.02] shadow-lg`}
                >
                  <CardContent className="p-6 relative">
                    {/* Decorative element - top right corner */}
                    <div className="absolute top-4 right-4 z-10">
                      <motion.div
                        className={`w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center shadow-md`}
                        style={{
                          backgroundColor: member.colorTheme === 'signalYellow' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)'
                        }}
                        animate={{
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                        whileHover={{ 
                          scale: 1.05
                        }}
                      >
                        {member.colorTheme === 'brilliantBlue' ? (
                          <BookOpen className={`w-4 h-4 ${theme.text} opacity-80`} />
                        ) : (
                          <Code className={`w-4 h-4 ${theme.text} opacity-80`} />
                        )}
                      </motion.div>
                    </div>

                    {/* Header with photo and basic info */}
                    <div className="flex items-start gap-4 mb-5">
                      {/* Photo */}
                      <motion.div 
                        className={`w-20 h-20 ${theme.iconBg} rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all duration-500 shadow-lg flex-shrink-0`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-full h-full flex items-center justify-center relative">
                          <motion.div 
                            className={`w-14 h-14 ${theme.cardBg} rounded-full flex items-center justify-center shadow-md border-2 border-white/30`}
                            animate={{
                              rotate: [0, 2, -2, 0],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.5
                            }}
                          >
                            <span className={`text-xl font-bold ${theme.text}`}>
                              {member.name.charAt(0)}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Basic Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xl font-bold ${theme.text} mb-2 leading-tight`}>
                          {member.name}
                        </h3>
                        <p className={`text-sm font-semibold ${theme.text} opacity-90 leading-tight`}>
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                      <p className={`text-sm ${theme.text} opacity-80 leading-relaxed`}>
                        {member.description}
                      </p>
                    </div>

                    {/* Expertise - Balanced size */}
                    <div className="mb-5">
                      <h4 className={`text-sm font-semibold ${theme.text} mb-3 flex items-center gap-2 opacity-90`}>
                        <Lightbulb className={`w-4 h-4 ${theme.text}`} />
                        Especialidades:
                      </h4>
                      <div className="space-y-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <motion.div 
                            key={skillIndex} 
                            className="flex items-center gap-3 group/skill"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="flex-shrink-0">
                              <motion.div
                                className={`w-4 h-4 ${theme.iconBg} rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 border border-white/20`}
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className={`w-2.5 h-2.5 ${theme.iconColor}`} />
                              </motion.div>
                            </div>
                            <span className={`text-xs ${theme.text} opacity-80 group-hover/skill:opacity-100 transition-opacity duration-300 leading-relaxed`}>
                              {skill}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Highlight - balanced size */}
                    <motion.div 
                      className={`rounded-lg p-3 border border-white/20 relative overflow-hidden shadow-lg`}
                      style={{
                        backgroundColor: member.colorTheme === 'signalYellow' ? 'rgb(202 138 4)' : '#005580'
                      }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className={`w-3 h-3 ${member.colorTheme === 'signalYellow' ? 'text-slate-900' : 'text-white'}`} />
                          <span className={`font-semibold text-xs ${member.colorTheme === 'signalYellow' ? 'text-slate-900' : 'text-white'}`}>
                            Track record:
                          </span>
                        </div>
                        <p className={`font-medium text-xs opacity-95 leading-relaxed ${member.colorTheme === 'signalYellow' ? 'text-slate-900' : 'text-white'}`}>
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

        {/* Bottom CTA - Standardized with pain-points-section style */}
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
                Un equipo alineado con lo que realmente necesitás
              </span>
            </div>
              <p className="text-slate-600 mb-8 leading-relaxed">
              Combinamos procesos claros y tecnología práctica para generar transformaciones que podés ver desde el primer día. En tu diagnóstico inicial participamos personalmente para entender tu negocio y ofrecerte la mejor solución.
            </p>

              {/* Enhanced CTA section - Single prominent button matching pain-points style */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.a 
                  href="https://wa.me/5491139066421?text=Hola%2C%20quiero%20saber%20más%20sobre%20cómo%20pueden%20ayudarme%20con%20los%20procesos%20de%20mi%20PyME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-signalYellow to-orange-500 hover:from-signalYellow/90 hover:to-orange-500/90 text-black px-12 py-6 rounded-3xl font-bold text-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden transform hover:scale-105"
                  whileHover={{ 
                    scale: 1.06,
                    boxShadow: '0 25px 50px -12px rgba(247, 217, 23, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    <span>Hablemos de tu PyME</span>
                    <div className="flex items-center justify-center w-12 h-12 bg-black/20 rounded-full p-2">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                  </span>
                  
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-signalYellow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-white/5 scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </motion.a>
              </motion.div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
} 