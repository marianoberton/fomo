"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, MessageSquare } from "lucide-react";

const AnimatedInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  name,
  required = true,
  textarea = false
}: { 
  label: string; 
  type?: string; 
  placeholder: string; 
  name: string;
  required?: boolean;
  textarea?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-neutral/90">
        {label}
      </Label>
      <motion.div
        animate={{
          boxShadow: isFocused 
            ? `0 0 0 2px #4A90E2` 
            : `0 0 0 1px rgba(0, 0, 0, 0.1)`
        }}
        transition={{ duration: 0.2 }}
        className="rounded-md"
      >
        {textarea ? (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            className="resize-none min-h-[120px]"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <Input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    e.currentTarget.reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-24 bg-secondary/30" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">
              Contáctanos
            </h2>
            <p className="text-lg text-neutral/80">
              Estamos listos para ayudarte a llevar tu negocio al siguiente nivel. 
              Completá el formulario o escribinos a{" "}
              <a 
                href="mailto:info@fomo.com.ar" 
                className="text-primary hover:underline"
              >
                info@fomo.com.ar
              </a>.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput
                label="Nombre"
                name="name"
                placeholder="Tu nombre"
              />
              
              <AnimatedInput
                label="Email"
                type="email"
                name="email"
                placeholder="tu@email.com"
              />
              
              <AnimatedInput
                label="Mensaje"
                name="message"
                placeholder="¿En qué podemos ayudarte?"
                textarea
              />
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-white flex-1"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Enviado
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Enviar
                    </span>
                  )}
                </Button>
                
                <a 
                  href="https://wa.me/5491112345678" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-md px-4 py-2 transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}