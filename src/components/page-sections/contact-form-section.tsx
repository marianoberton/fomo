"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  CheckCircle, 
  Mail, 
  User, 
  Globe, 
  AlertCircle,
  Phone,
  ArrowLeft,
  ArrowRight,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Example queries for floating elements
const floatingExamples = [
  {
    text: "Perdemos tiempo en procesos manuales, necesitamos automatizar",
    category: "Automatización",
    position: { top: "8%", left: "2%" },
    color: "signalYellow"
  },
  {
    text: "Necesitamos un CRM que integre con nuestro sistema actual",
    category: "Integración",
    position: { top: "12%", right: "2%" },
    color: "brilliantBlue"
  },
  {
    text: "No tenemos visibilidad de lo que pasa en el negocio",
    category: "Dashboards",
    position: { bottom: "25%", left: "1%" },
    color: "orange"
  },
  {
    text: "Queremos digitalizar toda la gestión de clientes",
    category: "Digitalización",
    position: { bottom: "8%", right: "3%" },
    color: "plum"
  }
];

export default function ContactFormSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    painPoint: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const steps = [
    {
      id: 1,
      title: "¡Hola! ¿Cómo te llamas?",
      subtitle: "Empezamos con lo básico",
      field: "name",
      type: "text",
      placeholder: "Tu nombre completo",
      icon: User,
      required: true
    },
    {
      id: 2,
      title: "¿Cuál es tu email?",
      subtitle: "Para mantenernos en contacto",
      field: "email",
      type: "email", 
      placeholder: "tu@email.com",
      icon: Mail,
      required: true
    },
    {
      id: 3,
      title: "¿Cómo se llama tu empresa?",
      subtitle: "Y si tenés web o redes, compartinos",
      field: "company",
      type: "text",
      placeholder: "Nombre de tu empresa",
      icon: Building2,
      required: true,
      extraField: {
        field: "website",
        placeholder: "www.tuempresa.com o @instagram"
      }
    },
    {
      id: 4,
      title: "¿Cuál es tu principal desafío?",
      subtitle: "Contanos qué te está frenando para crecer",
      field: "painPoint",
      type: "textarea",
      placeholder: "Ej: Perdemos tiempo en procesos manuales, necesito automatizar tareas repetitivas, no tengo visibilidad de lo que pasa en mi negocio...",
      icon: AlertCircle,
      required: true
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    const step = currentStepData;

    if (step.required && !formData[step.field as keyof typeof formData].trim()) {
      newErrors[step.field] = 'Este campo es requerido';
    }

    if (step.field === 'email' && formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ingresá un email válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Diagnóstico de Transformación Digital',
          content_category: 'Lead Generation'
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact-form" className="w-screen h-screen bg-plum flex items-center justify-center relative overflow-hidden p-0 m-0">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-signalYellow/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brilliantBlue/8 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
                     <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
             <CheckCircle className="w-20 h-20 text-signalYellow mx-auto mb-8" />
             <h2 className="text-4xl font-bold text-white mb-6">
               ¡Perfecto, {formData.name}!
             </h2>
             <p className="text-xl text-white/90 mb-8">
               Tu mensaje fue enviado exitosamente. Te contactamos en las próximas 24hs.
             </p>
             
             <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
               <h3 className="font-semibold text-white mb-6 text-lg">
                 ¿Qué sigue ahora?
               </h3>
               <div className="space-y-4 text-left">
                 <div className="flex items-center gap-4">
                   <div className="w-8 h-8 bg-signalYellow text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                   <span className="text-white/90">Te contactamos en las próximas 24hs</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-8 h-8 bg-brilliantBlue text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                   <span className="text-white/90">Mapeamos y auditamos tus procesos actuales</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
   <span className="text-white/90">En 5 días tenés una propuesta personalizada</span>
                 </div>
               </div>
             </div>
             
             <p className="text-white/70 text-sm">
               Revisá tu email (incluí spam) por si te enviamos info adicional
             </p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="w-screen h-screen bg-plum relative overflow-hidden flex items-center justify-center p-0 m-0">
             {/* Floating examples - Enhanced design */}
       {floatingExamples.map((example, index) => {
         const getColorClasses = (color: string) => {
           switch (color) {
             case 'signalYellow':
               return {
                 bg: 'bg-signalYellow/10',
                 border: 'border-signalYellow/30',
                 accent: 'bg-signalYellow',
                 text: 'text-signalYellow'
               };
             case 'orange':
               return {
                 bg: 'bg-orange-500/10',
                 border: 'border-orange-500/30',
                 accent: 'bg-orange-500',
                 text: 'text-orange-500'
               };
                           case 'brilliantBlue':
                return {
                  bg: 'bg-brilliantBlue/10',
                  border: 'border-brilliantBlue/30',
                  accent: 'bg-brilliantBlue',
                  text: 'text-brilliantBlue'
                };
              case 'plum':
                return {
                  bg: 'bg-plum/10',
                  border: 'border-plum/30',
                  accent: 'bg-plum',
                  text: 'text-plum'
                };
              default:
               return {
                 bg: 'bg-white/10',
                 border: 'border-white/30',
                 accent: 'bg-white',
                 text: 'text-white'
               };
           }
         };
         
         const colors = getColorClasses(example.color);
         
         return (
           <motion.div
             key={index}
             className="absolute hidden xl:block max-w-xs z-10"
             style={example.position}
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ 
               opacity: [0.9, 1, 0.9],
               scale: [0.98, 1.02, 0.98],
               y: [0, -8, 0]
             }}
             transition={{
               duration: 6 + index * 0.5,
               repeat: Infinity,
               ease: "easeInOut",
               delay: index * 1.2
             }}
             whileHover={{
               scale: 1.05,
               y: -5,
               transition: { duration: 0.2 }
             }}
           >
             <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-5 border-2 ${colors.border} shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}>
               {/* Accent line */}
               <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent}`}></div>
               
               {/* Content */}
               <div className="relative">
                 <div className="flex items-start gap-3 mb-3">
                   <div className={`w-2 h-2 rounded-full ${colors.accent} mt-2 flex-shrink-0`}></div>
                   <p className="text-slate-700 text-sm leading-relaxed font-medium">
                     "{example.text}"
                   </p>
                 </div>
                 
                 <div className="flex items-center justify-between">
                   <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                     {example.category}
                   </span>
                   <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center`}>
                     <div className={`w-2 h-2 rounded-full ${colors.accent}`}></div>
                   </div>
                 </div>
               </div>
               
               {/* Subtle background pattern */}
               <div className={`absolute bottom-0 right-0 w-16 h-16 ${colors.bg} rounded-full blur-xl opacity-30`}></div>
             </div>
           </motion.div>
         );
       })}

             {/* Background decoration */}
       <div className="absolute inset-0">
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-signalYellow/8 rounded-full blur-3xl"></div>
         <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brilliantBlue/8 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl"></div>
       </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Badge */}
        <div className="flex justify-center mb-4 md:mb-8">
          <motion.div 
            className="inline-flex items-center gap-2 bg-white text-plum px-6 py-3 rounded-full text-sm font-medium shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            viewport={{ once: true }}
          >
            <Send className="w-4 h-4 text-signalYellow" />
            Contáctanos
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8 md:mb-16">
          <div className="flex items-center gap-3">
            {Array.from({ length: totalSteps }, (_, i) => (
              <React.Fragment key={i}>
                <div className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${i + 1 === currentStep ? 'bg-signalYellow scale-125' : 
                    i + 1 < currentStep ? 'bg-signalYellow' : 'bg-white/20'}
                `} />
                {i < totalSteps - 1 && (
                  <div className={`
                    w-8 h-0.5 transition-all duration-300
                    ${i + 1 < currentStep ? 'bg-signalYellow' : 'bg-white/20'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8 md:mb-12"
          >
            {/* Step header */}
            <div className="mb-6 md:mb-8">
                             <div className="flex items-center justify-center gap-3 mb-6">
                 <div className="w-12 h-12 bg-signalYellow rounded-2xl flex items-center justify-center">
                   <currentStepData.icon className="w-6 h-6 text-slate-900" />
                 </div>
                 <div className="text-xs font-bold text-signalYellow uppercase tracking-widest">
                   Paso {currentStep}
                 </div>
               </div>
               
               <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                 {currentStepData.title}
               </h2>
               <p className="text-xl text-white/80">
                 {currentStepData.subtitle}
               </p>
            </div>

            {/* Form field */}
            <div className="w-80 md:w-96 mx-auto mb-6 md:mb-8">
              {currentStepData.type === 'textarea' ? (
                <Textarea
                  name={currentStepData.field}
                  value={formData[currentStepData.field as keyof typeof formData]}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={currentStepData.placeholder}
                                     className={`
                     w-full min-h-[120px] text-lg bg-white border-gray-300 text-slate-900 placeholder:text-slate-500 
                     rounded-2xl px-6 py-4 transition-all duration-300
                     focus:border-signalYellow focus:ring-2 focus:ring-signalYellow/20
                     ${errors[currentStepData.field] ? 'border-red-400' : ''}
                   `}
                />
              ) : (
                <div className="space-y-4">
                  <Input
                    name={currentStepData.field}
                    type={currentStepData.type}
                    value={formData[currentStepData.field as keyof typeof formData]}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={currentStepData.placeholder}
                                         className={`
                       w-full h-16 text-lg bg-white border-gray-300 text-slate-900 placeholder:text-slate-500 
                       rounded-2xl px-6 transition-all duration-300
                       focus:border-signalYellow focus:ring-2 focus:ring-signalYellow/20
                       ${errors[currentStepData.field] ? 'border-red-400' : ''}
                     `}
                  />
                  
                  {/* Extra field for step 3 */}
                  {currentStepData.extraField && (
                    <Input
                      name={currentStepData.extraField.field}
                      type="text"
                      value={formData[currentStepData.extraField.field as keyof typeof formData]}
                      onChange={handleInputChange}
                      placeholder={currentStepData.extraField.placeholder}
                                             className="w-full h-16 text-lg bg-white border-gray-300 text-slate-900 placeholder:text-slate-500 rounded-2xl px-6 transition-all duration-300 focus:border-signalYellow focus:ring-2 focus:ring-signalYellow/20"
                    />
                  )}
                </div>
              )}
              
              {errors[currentStepData.field] && (
                                 <motion.p 
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="mt-3 text-red-300 flex items-center justify-center gap-2"
                 >
                  <AlertCircle className="w-4 h-4" />
                  {errors[currentStepData.field]}
                </motion.p>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-4">
              {currentStep > 1 && (
                                 <Button
                   onClick={handlePrev}
                   variant="outline"
                   className="h-14 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full"
                 >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Regresar
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="h-14 px-12 bg-signalYellow hover:bg-signalYellow/90 text-slate-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-2"></div>
                    Enviando...
                  </>
                                 ) : currentStep === totalSteps ? (
                   <>
                     <Send className="mr-2 w-5 h-5" />
                     Contáctanos
                   </>
                 ) : (
                  <>
                    Próxima
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>


      </div>
    </section>
  );
} 