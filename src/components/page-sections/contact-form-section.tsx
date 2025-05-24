"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Send, 
  CheckCircle, 
  Mail, 
  User, 
  Globe, 
  AlertCircle,
  Phone
} from "lucide-react";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    painPoint: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresá un email válido';
    }

    if (!formData.painPoint.trim()) {
      newErrors.painPoint = 'Contanos tu principal desafío';
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
      // Here you would integrate with your form handling service
      // For now, we'll simulate a submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Facebook Pixel track for form submission
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

  if (isSubmitted) {
    return (
      <section id="contact-form" className="w-full py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-3xl shadow-xl p-12 border border-border">
            <CheckCircle className="w-16 h-16 text-brilliantBlue mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ¡Solicitud enviada exitosamente!
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Gracias <strong>{formData.name}</strong>, recibimos tu solicitud para el diagnóstico de transformación digital.
            </p>
            <div className="bg-muted/50 rounded-2xl p-6 mb-8 border border-border">
              <h3 className="font-semibold text-foreground mb-4">
                ¿Qué sigue ahora?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-brilliantBlue text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-muted-foreground">En las próximas 24hs te contactamos para coordinar una llamada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-brilliantBlue text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-muted-foreground">Realizamos el mapeo y auditoría de tus procesos actuales</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-brilliantBlue text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-muted-foreground">En 5 días tenés tu diagnóstico completo con roadmap de transformación</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Revisá tu email (incluí spam) por si te enviamos alguna info adicional.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="w-full py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brilliantBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-signalYellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Solicitá tu{" "}
            <span className="text-brilliantBlue">
              diagnóstico de transformación
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Completá el formulario y en 5 días tenés un análisis completo de las oportunidades de optimización en tu PyME
          </p>
        </div>

        <Card className="bg-card/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-border/50 max-w-4xl mx-auto">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Formulario de Diagnóstico
            </CardTitle>
            <p className="text-muted-foreground">
              Solo te llevará 2 minutos completarlo
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email in Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-base font-medium text-foreground">
                    <User className="inline w-4 h-4 mr-2" />
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre y apellido"
                    className={`mt-2 rounded-2xl h-12 ${errors.name ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-base font-medium text-foreground">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email corporativo *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@empresa.com"
                    className={`mt-2 rounded-2xl h-12 ${errors.email ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone and Website in Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <div>
                  <Label htmlFor="phone" className="text-base font-medium text-foreground">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Teléfono / WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+54 9 11 1234-5678"
                    className="mt-2 rounded-2xl h-12 border-border"
                  />
                </div>

                {/* Website Field */}
                <div>
                  <Label htmlFor="website" className="text-base font-medium text-foreground">
                    <Globe className="inline w-4 h-4 mr-2" />
                    Sitio web o redes sociales
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="www.tuempresa.com o @tuinstagram"
                    className="mt-2 rounded-2xl h-12 border-border"
                  />
                  <p className="mt-1 text-sm text-muted-foreground">
                    Si no tenés web, podés poner tu Instagram o Facebook
                  </p>
                </div>
              </div>

              {/* Pain Point Field - Full Width */}
              <div>
                <Label htmlFor="painPoint" className="text-base font-medium text-foreground">
                  <AlertCircle className="inline w-4 h-4 mr-2" />
                  ¿Cuál es tu principal desafío operativo? *
                </Label>
                <Textarea
                  id="painPoint"
                  name="painPoint"
                  value={formData.painPoint}
                  onChange={handleInputChange}
                  placeholder="Ej: Perdemos tiempo en procesos manuales, necesito automatizar tareas repetitivas, no tengo visibilidad de lo que pasa en mi negocio..."
                  className={`mt-2 min-h-[120px] rounded-2xl ${errors.painPoint ? 'border-red-500' : 'border-border'}`}
                />
                {errors.painPoint && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.painPoint}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brilliantBlue to-brilliantBlue/80 hover:from-brilliantBlue/90 hover:to-brilliantBlue/70 text-white py-5 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Solicitar diagnóstico de transformación
                    </>
                  )}
                </Button>
              </div>

              {/* Privacy Notice */}
              <div className="text-center pt-4">
                <p className="text-xs text-muted-foreground">
                  Al enviar este formulario aceptás que FOMO te contacte para coordinar tu diagnóstico.{" "}
                  <br />
                  No compartimos tu información con terceros.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Trust Signals */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/30">
              <CheckCircle className="w-6 h-6 text-brilliantBlue" />
              <span className="text-muted-foreground font-medium">Respuesta en 24hs</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/30">
              <CheckCircle className="w-6 h-6 text-brilliantBlue" />
              <span className="text-muted-foreground font-medium">100% confidencial</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/30">
              <CheckCircle className="w-6 h-6 text-brilliantBlue" />
              <span className="text-muted-foreground font-medium">Sin compromiso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 