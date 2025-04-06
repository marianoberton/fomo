"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    loading: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would send the form data to your backend here
    
    setFormState(prev => ({ 
      ...prev, 
      submitted: true, 
      loading: false,
      name: "",
      email: "",
      message: ""
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Contactanos
            </h1>
            <p className="text-xl text-neutral/80">
              Estamos listos para ayudarte a transformar tu negocio
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-primary">Información de contacto</h2>
              <p className="text-neutral/80">
                Completá el formulario o contactanos directamente a través de los siguientes medios:
              </p>
              
              <div className="space-y-6 mt-8">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-neutral">Email</h3>
                    <p className="text-neutral/70">info@fomo.com.ar</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-neutral">Teléfono</h3>
                    <p className="text-neutral/70">+54 11 3906-6421</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-neutral">Ubicación</h3>
                    <p className="text-neutral/70">Av. Cordoba 1886, Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="p-6 shadow-md">
              {formState.submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">¡Mensaje enviado!</h3>
                  <p className="text-neutral/80">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                  <Button 
                    onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                    className="mt-4 bg-primary hover:bg-primary/90"
                  >
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral mb-1">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral mb-1">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={formState.loading}
                    className="w-full bg-accent hover:bg-primary transition-colors"
                  >
                    {formState.loading ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}