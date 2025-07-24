"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  CheckCircle, 
  Mail, 
  User, 
  Building2, 
  AlertCircle,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  DollarSign,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PymeFormData {
  full_name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  how_found_us: string;
  monthly_revenue: string;
  additional_info: string;
}

const revenueOptions = [
  "Menos de $1 millón",
  "$1 - $10 millones",
  "$10 - $50 millones", 
  "$50 - $250 millones",
  "Más de $250 millones"
];

const howFoundOptions = [
  "Google / Búsqueda web",
  "LinkedIn",
  "Redes sociales (Instagram, Facebook)",
  "Referencia de un colega",
  "Recomendación de un cliente",
  "Evento / Conferencia",
  "Email marketing",
  "Publicidad online",
  "Otro"
];

const countries = [
  "Argentina", "Chile", "Uruguay", "Paraguay", "Bolivia",
  "Brasil", "Colombia", "Perú", "Ecuador", "Venezuela",
  "México", "España", "Estados Unidos", "Otro"
];

export default function PymeFormPage() {
  const [formData, setFormData] = useState<PymeFormData>({
    full_name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    how_found_us: '',
    monthly_revenue: '',
    additional_info: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Hide navbar and footer for this page only
  useEffect(() => {
    // Hide navigation and footer
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    
    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (header) header.style.display = 'none';
    
    // Also try to hide by common class names
    const navElements = document.querySelectorAll('[class*="nav"], [class*="Nav"], [class*="header"], [class*="Header"]');
    const footerElements = document.querySelectorAll('[class*="footer"], [class*="Footer"]');
    
    navElements.forEach(el => (el as HTMLElement).style.display = 'none');
    footerElements.forEach(el => (el as HTMLElement).style.display = 'none');

    // Cleanup function to restore elements when leaving the page
    return () => {
      if (nav) nav.style.display = '';
      if (footer) footer.style.display = '';
      if (header) header.style.display = '';
      navElements.forEach(el => (el as HTMLElement).style.display = '');
      footerElements.forEach(el => (el as HTMLElement).style.display = '');
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    const requiredFields = [
      { key: 'full_name', label: 'Nombre y Apellido' },
      { key: 'company', label: 'Empresa' },
      { key: 'position', label: 'Puesto' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'country', label: 'País' },
      { key: 'how_found_us', label: 'Cómo nos conociste' },
      { key: 'monthly_revenue', label: 'Facturación mensual' }
    ];

    requiredFields.forEach(field => {
      if (!formData[field.key as keyof PymeFormData].trim()) {
        newErrors[field.key] = `${field.label} es requerido`;
      }
    });

    // Email validation
    if (formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ingresá un email válido';
      }
    }

    // Phone validation
    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{8,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Ingresá un número de WhatsApp válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/pyme-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          page_url: window.location.href,
          submitted_at: new Date().toISOString()
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        console.log('PYME lead submitted successfully:', result);
      } else {
        throw new Error(result.error || 'Error al enviar el formulario');
      }

    } catch (error) {
      console.error('Error submitting PYME form:', error);
      alert('Hubo un error al enviar tu información. Por favor, intenta nuevamente o contáctanos directamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }}>
        {/* Left Column - Success Message */}
        <div className="w-1/2 bg-white flex items-center justify-center p-8 overflow-y-auto">
          <motion.div 
            className="max-w-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-16 h-16 text-plum mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              ¡Perfecto, {formData.full_name.split(' ')[0]}!
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Tu información fue enviada exitosamente. Nuestro equipo se contactará contigo en las próximas 24 horas.
            </p>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 text-base">
                Próximos pasos:
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-plum text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-slate-700 text-sm">Te contactamos en 24hs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-brilliantBlue text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span className="text-slate-700 text-sm">Agendamos tu reunión gratuita</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-signalYellow text-slate-900 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-slate-700 text-sm">Te damos una propuesta personalizada</span>
                </div>
              </div>
            </div>
            
            <p className="text-slate-500 text-sm">
              Revisá tu email por si te enviamos información adicional
            </p>
          </motion.div>
        </div>

        {/* Right Column - Enhanced Visual Area */}
        <div className="w-1/2 bg-gradient-to-br from-plum via-plum to-plum/90 relative overflow-hidden">
          {/* Enhanced Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-signalYellow/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brilliantBlue/15 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/8 rounded-full blur-3xl"></div>
            <div className="absolute top-20 left-20 w-32 h-32 bg-signalYellow/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-brilliantBlue/10 rounded-full blur-2xl"></div>
          </div>

          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-32 right-32 w-16 h-16 border-2 border-white rotate-45"></div>
            <div className="absolute bottom-40 left-32 w-12 h-12 border-2 border-signalYellow rotate-12"></div>
            <div className="absolute top-1/2 right-16 w-8 h-8 bg-brilliantBlue rounded-full"></div>
            <div className="absolute top-3/4 left-1/4 w-6 h-6 border border-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              {/* FOMO Logo */}
              <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl font-black text-plum tracking-tight">FOMO</div>
                  <div className="text-xs font-medium text-slate-600 tracking-wider">AUTOMATION</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                ¡Gracias por<br />confiar en nosotros!
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-md">
                Tu PyME está a punto de dar el salto hacia la automatización inteligente.
              </p>

              <div className="space-y-4 text-left max-w-sm mx-auto">
                <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-signalYellow flex-shrink-0" />
                  <span className="text-white/95 text-sm">Información recibida correctamente</span>
                </div>
                <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-brilliantBlue flex-shrink-0" />
                  <span className="text-white/95 text-sm">Equipo de expertos notificado</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 text-white/70 text-sm"
            >
              <p>🚀 El futuro de tu PyME comienza ahora</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }}>
      {/* Left Column - Form */}
      <div className="w-1/2 bg-white p-8 overflow-y-auto">
        <div className="w-full max-w-lg mx-auto py-4">
          {/* Header */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Hablemos
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Completa este formulario y nuestro equipo se contactará contigo a la brevedad.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
                                           <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Nombre y Empresa */}
              <div className="space-y-4">
                             {/* Nombre */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <User className="w-4 h-4 text-plum" />
                   Nombre y Apellido *
                 </label>
                 <Input
                   name="full_name"
                   value={formData.full_name}
                   onChange={handleInputChange}
                   className={`h-11 border-slate-300 text-slate-900 focus:border-plum focus:ring-plum ${errors.full_name ? 'border-red-400' : ''}`}
                   placeholder="Tu nombre completo"
                 />
                 {errors.full_name && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.full_name}
                   </p>
                 )}
               </div>

               {/* Empresa */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <Building2 className="w-4 h-4 text-plum" />
                   Empresa *
                 </label>
                 <Input
                   name="company"
                   value={formData.company}
                   onChange={handleInputChange}
                   className={`h-11 border-slate-300 text-slate-900 focus:border-plum focus:ring-plum ${errors.company ? 'border-red-400' : ''}`}
                   placeholder="Nombre de tu empresa"
                   maxLength={255}
                 />
                 <div className="text-right text-xs text-slate-500 mt-1">
                   {formData.company.length}/255
                 </div>
                 {errors.company && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.company}
                   </p>
                 )}
               </div>

               {/* Puesto */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <Briefcase className="w-4 h-4 text-plum" />
                   Puesto *
                 </label>
                 <Input
                   name="position"
                   value={formData.position}
                   onChange={handleInputChange}
                   className={`h-11 border-slate-300 text-slate-900 focus:border-plum focus:ring-plum ${errors.position ? 'border-red-400' : ''}`}
                   placeholder="CEO, Gerente, Director, etc."
                 />
                 {errors.position && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.position}
                   </p>
                 )}
               </div>

               {/* Email */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <Mail className="w-4 h-4 text-plum" />
                   Email *
                 </label>
                 <Input
                   name="email"
                   type="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   className={`h-11 border-slate-300 text-slate-900 focus:border-plum focus:ring-plum ${errors.email ? 'border-red-400' : ''}`}
                   placeholder="tu@empresa.com"
                 />
                 {errors.email && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.email}
                   </p>
                 )}
               </div>

               {/* Teléfono */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <Phone className="w-4 h-4 text-plum" />
                   Teléfono (WhatsApp) *
                 </label>
                 <Input
                   name="phone"
                   value={formData.phone}
                   onChange={handleInputChange}
                   className={`h-11 border-slate-300 text-slate-900 focus:border-plum focus:ring-plum ${errors.phone ? 'border-red-400' : ''}`}
                   placeholder="+54 11 1234-5678"
                 />
                 {errors.phone && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.phone}
                   </p>
                 )}
               </div>

               {/* Website */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <Globe className="w-4 h-4 text-plum" />
                   URL de tu web (si la hay)
                 </label>
                 <Input
                   name="website"
                   value={formData.website}
                   onChange={handleInputChange}
                   className="h-11 border-slate-300 text-slate-900 focus:border-plum focus:ring-plum"
                   placeholder="www.tuempresa.com"
                 />
               </div>

               {/* País */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <MapPin className="w-4 h-4 text-plum" />
                   País *
                 </label>
                 <select
                   name="country"
                   value={formData.country}
                   onChange={handleInputChange}
                   className={`h-11 w-full border-slate-300 text-slate-900 rounded-md px-3 focus:border-plum focus:ring-plum ${errors.country ? 'border-red-400' : ''}`}
                 >
                   <option value="">Selecciona tu país</option>
                   {countries.map(country => (
                     <option key={country} value={country}>{country}</option>
                   ))}
                 </select>
                 {errors.country && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.country}
                   </p>
                 )}
               </div>

               {/* Cómo nos conociste */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <MessageSquare className="w-4 h-4 text-plum" />
                   Cómo nos conociste *
                 </label>
                 <select
                   name="how_found_us"
                   value={formData.how_found_us}
                   onChange={handleInputChange}
                   className={`h-11 w-full border-slate-300 text-slate-900 rounded-md px-3 focus:border-plum focus:ring-plum ${errors.how_found_us ? 'border-red-400' : ''}`}
                 >
                   <option value="">Selecciona una opción</option>
                   {howFoundOptions.map(option => (
                     <option key={option} value={option}>{option}</option>
                   ))}
                 </select>
                 {errors.how_found_us && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.how_found_us}
                   </p>
                 )}
               </div>

               {/* Facturación */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <DollarSign className="w-4 h-4 text-plum" />
                   Facturación mensual de tu PyME (en pesos) *
                 </label>
                 <select
                   name="monthly_revenue"
                   value={formData.monthly_revenue}
                   onChange={handleInputChange}
                   className={`h-11 w-full border-slate-300 text-slate-900 rounded-md px-3 focus:border-plum focus:ring-plum ${errors.monthly_revenue ? 'border-red-400' : ''}`}
                 >
                   <option value="">Selecciona el rango de facturación</option>
                   {revenueOptions.map(option => (
                     <option key={option} value={option}>{option}</option>
                   ))}
                 </select>
                 {errors.monthly_revenue && (
                   <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                     <AlertCircle className="w-4 h-4" />
                     {errors.monthly_revenue}
                   </p>
                 )}
               </div>

               {/* Información adicional */}
               <div>
                 <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                   <MessageSquare className="w-4 h-4 text-plum" />
                   Compartinos cualquier información que pueda ayudarnos a prepararnos mejor para esta primera reunión
                 </label>
                 <Textarea
                   name="additional_info"
                   value={formData.additional_info}
                   onChange={handleInputChange}
                   className="min-h-[100px] border-slate-300 text-slate-900 focus:border-plum focus:ring-plum"
                   placeholder="Contanos sobre tus desafíos actuales, qué procesos querés automatizar, qué herramientas usás actualmente, etc."
                 />
               </div>

               {/* Submit Button */}
               <div className="pt-4">
                 <Button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full h-12 bg-plum hover:bg-plum/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                 >
                   {isSubmitting ? (
                     <>
                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                       Enviando...
                     </>
                   ) : (
                     <>
                       <Send className="mr-2 w-5 h-5" />
                       Enviar y Agendar Reunión
                     </>
                   )}
                 </Button>
               </div>
             </div>
           </form>
         </motion.div>
       </div>
     </div>

     {/* Right Column - Visual Area */}
     <div className="w-1/2 bg-gradient-to-br from-plum via-plum to-plum/90 relative overflow-hidden">
       {/* Enhanced Background decoration */}
       <div className="absolute inset-0">
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-signalYellow/15 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brilliantBlue/15 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/8 rounded-full blur-3xl"></div>
         <div className="absolute top-20 left-20 w-32 h-32 bg-signalYellow/10 rounded-full blur-2xl"></div>
         <div className="absolute bottom-20 right-20 w-40 h-40 bg-brilliantBlue/10 rounded-full blur-2xl"></div>
       </div>

       {/* Geometric patterns */}
       <div className="absolute inset-0 opacity-10">
         <div className="absolute top-32 right-32 w-16 h-16 border-2 border-white rotate-45"></div>
         <div className="absolute bottom-40 left-32 w-12 h-12 border-2 border-signalYellow rotate-12"></div>
         <div className="absolute top-1/2 right-16 w-8 h-8 bg-brilliantBlue rounded-full"></div>
         <div className="absolute top-3/4 left-1/4 w-6 h-6 border border-white rounded-full"></div>
       </div>

       {/* Content */}
       <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="mb-8"
         >
           {/* FOMO Logo */}
           <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl">
             <div className="text-center">
               <div className="text-4xl font-black text-plum tracking-tight">FOMO</div>
               <div className="text-xs font-medium text-slate-600 tracking-wider">AUTOMATION</div>
             </div>
           </div>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.7 }}
           className="text-white"
         >
           <h2 className="text-4xl font-bold mb-6 leading-tight">
             Automatiza tu PyME<br />con IA
           </h2>
           <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-md">
             Transformamos procesos manuales en sistemas automatizados que te ahorran tiempo y dinero.
           </p>

           <div className="space-y-4 text-left max-w-sm mx-auto">
             <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
               <div className="w-3 h-3 bg-signalYellow rounded-full flex-shrink-0"></div>
               <span className="text-white/95 text-sm">Bots inteligentes de WhatsApp</span>
             </div>
             <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
               <div className="w-3 h-3 bg-brilliantBlue rounded-full flex-shrink-0"></div>
               <span className="text-white/95 text-sm">Integración de sistemas</span>
             </div>
             <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
               <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
               <span className="text-white/95 text-sm">Dashboards en tiempo real</span>
             </div>
             <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
               <div className="w-3 h-3 bg-signalYellow rounded-full flex-shrink-0"></div>
               <span className="text-white/95 text-sm">Automatización de procesos</span>
             </div>
           </div>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1 }}
           className="mt-8 text-white/70 text-sm"
         >
           <p>🔒 Tu información está segura y protegida</p>
         </motion.div>
       </div>
     </div>
   </div>
  );
} 