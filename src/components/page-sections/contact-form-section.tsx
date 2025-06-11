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
    position: { top: "15%", left: "8%" }
  },
  {
    text: "No tenemos visibilidad de lo que pasa en el negocio",
    category: "Dashboards",
    position: { top: "60%", left: "5%" }
  },
  {
    text: "Necesitamos un CRM que integre con nuestro sistema actual",
    category: "Integración",
    position: { top: "25%", right: "8%" }
  },
  {
    text: "Queremos digitalizar toda la gestión de clientes",
    category: "Digitalización",
    position: { top: "70%", right: "5%" }
  },
  {
    text: "Buscamos optimizar el flujo de trabajo del equipo",
    category: "Procesos",
    position: { bottom: "20%", left: "10%" }
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
      subtitle: "Para enviarte el diagnóstico",
      field: "email",
      type: "email", 
      placeholder: "tu@empresa.com",
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
      <section id="contact-form" className="w-full min-h-screen bg-plum flex items-center justify-center relative overflow-hidden">
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
    <section id="contact-form" className="w-full min-h-screen bg-plum relative overflow-hidden flex items-center justify-center">
             {/* Floating examples */}
       {floatingExamples.map((example, index) => (
        <motion.div
          key={index}
                     className="absolute hidden lg:block max-w-xs"
           style={example.position}
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ 
             opacity: [0.6, 0.8, 0.6],
             scale: [0.95, 1, 0.95],
             y: [0, -10, 0]
           }}
           transition={{
             duration: 4 + index,
             repeat: Infinity,
             ease: "easeInOut",
             delay: index * 0.5
           }}
         >
           <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xl">
             <p className="text-slate-700 text-sm mb-2">"{example.text}"</p>
             <p className="text-slate-500 text-xs font-medium">{example.category}</p>
           </div>
        </motion.div>
      ))}

             {/* Background decoration */}
       <div className="absolute inset-0">
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-signalYellow/8 rounded-full blur-3xl"></div>
         <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brilliantBlue/8 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl"></div>
       </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3">
            {Array.from({ length: totalSteps }, (_, i) => (
              <React.Fragment key={i}>
                <div className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${i + 1 === currentStep ? 'bg-signalYellow scale-125' : 
                    i + 1 < currentStep ? 'bg-brilliantBlue' : 'bg-white/20'}
                `} />
                {i < totalSteps - 1 && (
                  <div className={`
                    w-8 h-0.5 transition-all duration-300
                    ${i + 1 < currentStep ? 'bg-brilliantBlue' : 'bg-white/20'}
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
            className="text-center mb-12"
          >
            {/* Step header */}
            <div className="mb-8">
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
            <div className="max-w-lg mx-auto mb-8">
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

        {/* Contact info */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
                     <p className="text-white/70 text-sm">
             o envianos un correo electrónico a{" "}
             <a href="mailto:hola@fomo.com.ar" className="text-signalYellow hover:text-signalYellow/80 transition-colors">
               hola@fomo.com.ar
             </a>
           </p>
        </motion.div>
      </div>
    </section>
  );
} 