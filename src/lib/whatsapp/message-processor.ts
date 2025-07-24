import { Conversation } from './conversation-manager';

export class MessageProcessor {
  private readonly COMPANY_INFO = {
    name: 'FOMO',
    description: 'Especialistas en automatización de procesos para PyMEs usando IA y herramientas no-code',
    services: [
      'Automatización de procesos con IA',
      'Bots de WhatsApp inteligentes',
      'Integración de sistemas',
      'Análisis de datos y reporting',
      'Consultoría en transformación digital'
    ],
    contact: {
      phone: '+54 11 3906-6421',
      email: 'info@fomo.com.ar',
      website: 'https://fomo.com.ar'
    }
  };

  private readonly RESPONSE_TEMPLATES = {
    greeting: "¡Hola! 👋 Soy el asistente de FOMO. Estamos especializados en automatización de procesos para PyMEs usando IA y herramientas no-code. ¿En qué puedo ayudarte hoy?",
    
    services: "Nuestros principales servicios incluyen:\n\n🤖 Automatización de procesos con IA\n📱 Bots de WhatsApp inteligentes\n🔗 Integración de sistemas\n📊 Análisis de datos y reporting\n💡 Consultoría en transformación digital\n\n¿Sobre cuál te gustaría saber más?",
    
    contact: `Para contactar con nuestro equipo:\n\n📞 Teléfono: ${this.COMPANY_INFO.contact.phone}\n📧 Email: ${this.COMPANY_INFO.contact.email}\n🌐 Web: ${this.COMPANY_INFO.contact.website}\n\n¿Prefieres que un especialista te contacte?`,
    
    pricing: "Los precios varían según las necesidades específicas de cada PyME. Factores como:\n\n• Complejidad del proceso a automatizar\n• Número de integraciones requeridas\n• Volumen de transacciones\n• Nivel de personalización\n\n¿Te gustaría agendar una consulta gratuita para evaluar tu caso?",
    
    default: "Entiendo tu consulta. Para brindarte la mejor asistencia, ¿podrías contarme más detalles sobre lo que necesitas? Nuestro equipo está especializado en automatización para PyMEs."
  };

  /**
   * Process incoming message and generate appropriate response
   */
  async processMessage(message: string, conversation: Conversation): Promise<string> {
    try {
      const normalizedMessage = message.toLowerCase().trim();
      
      // Handle common patterns first
      const quickResponse = this.getQuickResponse(normalizedMessage, conversation);
      if (quickResponse) {
        return quickResponse;
      }

      // For more complex queries, use AI if available
      if (process.env.OPENAI_API_KEY) {
        return await this.getAIResponse(message, conversation);
      }

      // Fallback to contextual response
      return this.getContextualResponse(message, conversation);
      
    } catch (error) {
      console.error('Error processing message:', error);
      return "Lo siento, ha ocurrido un error al procesar tu mensaje. ¿Podrías intentar de nuevo? Si el problema persiste, contacta a nuestro equipo de soporte.";
    }
  }

  /**
   * Handle common patterns with quick responses
   */
  private getQuickResponse(message: string, conversation: Conversation): string | null {
    // Greeting patterns
    if (this.isGreeting(message)) {
      return this.RESPONSE_TEMPLATES.greeting;
    }

    // Service inquiry patterns
    if (this.isServiceInquiry(message)) {
      return this.RESPONSE_TEMPLATES.services;
    }

    // Contact patterns
    if (this.isContactInquiry(message)) {
      return this.RESPONSE_TEMPLATES.contact;
    }

    // Pricing patterns
    if (this.isPricingInquiry(message)) {
      return this.RESPONSE_TEMPLATES.pricing;
    }

    return null;
  }

  /**
   * Generate AI-powered response using OpenAI
   */
  private async getAIResponse(message: string, conversation: Conversation): Promise<string> {
    try {
      // This would integrate with OpenAI API
      // For now, return a contextual response
      console.log('AI response requested for:', message);
      return this.getContextualResponse(message, conversation);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      return this.getContextualResponse(message, conversation);
    }
  }

  /**
   * Generate contextual response based on conversation stage
   */
  private getContextualResponse(message: string, conversation: Conversation): string {
    const stage = conversation.context.conversationStage;
    
    switch (stage) {
      case 'greeting':
        return this.RESPONSE_TEMPLATES.greeting;
      
      case 'service_inquiry':
        return "Perfecto, veo que te interesan nuestros servicios. Podemos ayudarte con automatización de procesos, bots inteligentes e integración de sistemas. ¿Hay algún proceso específico en tu empresa que te gustaría automatizar?";
      
      case 'support':
        return "Entiendo que necesitas soporte técnico. Nuestro equipo está aquí para ayudarte. ¿Podrías describir el problema que estás experimentando para derivarte con el especialista adecuado?";
      
      case 'information':
        return `FOMO es una empresa especializada en automatización de procesos para PyMEs. Utilizamos IA y herramientas no-code para hacer más eficientes los procesos empresariales.\n\n${this.RESPONSE_TEMPLATES.services}`;
      
      default:
        return this.RESPONSE_TEMPLATES.default;
    }
  }

  /**
   * Check if message is a greeting
   */
  private isGreeting(message: string): boolean {
    const greetings = ['hola', 'buenos', 'buenas', 'saludos', 'hey', 'hi'];
    return greetings.some(greeting => message.includes(greeting));
  }

  /**
   * Check if message is about services
   */
  private isServiceInquiry(message: string): boolean {
    const serviceWords = ['servicio', 'automatización', 'bot', 'proceso', 'que hacen', 'ofrecen'];
    return serviceWords.some(word => message.includes(word));
  }

  /**
   * Check if message is asking for contact info
   */
  private isContactInquiry(message: string): boolean {
    const contactWords = ['contacto', 'teléfono', 'email', 'llamar', 'comunicar'];
    return contactWords.some(word => message.includes(word));
  }

  /**
   * Check if message is asking about pricing
   */
  private isPricingInquiry(message: string): boolean {
    const priceWords = ['precio', 'costo', 'cuánto', 'cotización', 'presupuesto', 'tarifa'];
    return priceWords.some(word => message.includes(word));
  }
} 