// API functions for FOMO Platform CRM integration

// Tipos para el formulario de contacto
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  website?: string;
  painPoint: string;
  phone?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  leadId?: string;
  error?: string;
  lead?: any;
}

/**
 * Función auxiliar para obtener parámetros UTM de la URL
 */
function getUTMParameter(param: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Función para enviar contact lead al CRM de FOMO Platform
 */
export async function submitContactLead(data: ContactFormData): Promise<LeadSubmissionResponse> {
  try {
    // Preparar los datos para el webhook
    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      website: data.website || null,
      phone: data.phone || null,
      pain_point: data.painPoint,
      source: 'contact_form',
      // Metadata adicional
      lead_source_detail: 'multi_step_form',
      form_version: '2.0',
      // UTM parameters (se capturan automáticamente si están en la URL)
      utm_source: getUTMParameter('utm_source'),
      utm_medium: getUTMParameter('utm_medium'),
      utm_campaign: getUTMParameter('utm_campaign'),
      utm_term: getUTMParameter('utm_term'),
      utm_content: getUTMParameter('utm_content'),
      // Información técnica
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof window !== 'undefined' ? document.referrer : null,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      // Timestamp
      submitted_at: new Date().toISOString()
    };

    // URL del webhook - usa nuestro proxy interno
    const webhookUrl = `${window.location.origin}/api/contact`;

    console.log('Enviando contact lead:', payload);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Contact lead enviado exitosamente:', result);
      return {
        success: true,
        leadId: result.id || result.leadId,
        lead: result.lead
      };
    } else {
      console.error('Error en webhook:', result);
      return {
        success: false,
        error: result.error || 'Error al enviar contact lead'
      };
    }

  } catch (error) {
    console.error('Error submitting contact lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

/**
 * Fallback function to send email notification if API fails
 */
export async function sendFallbackEmail(formData: ContactFormData): Promise<boolean> {
  try {
    // This could be implemented with a service like EmailJS, Resend, or similar
    // For now, we'll just log the attempt
    console.log('Fallback email would be sent with data:', formData);
    
    // Example implementation with EmailJS (commented out)
    /*
    const emailData = {
      to_email: 'leads@fomo.com.ar',
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company,
      website: formData.website,
      message: formData.painPoint,
      phone: formData.phone
    };
    
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID', 
      emailData,
      'YOUR_PUBLIC_KEY'
    );
    
    return response.status === 200;
    */
    
    return true;
  } catch (error) {
    console.error('Error sending fallback email:', error);
    return false;
  }
}

/**
 * Track form submission events for analytics
 */
export function trackFormSubmission(formData: ContactFormData, success: boolean) {
  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: 'Contact Form Submission',
      content_category: 'Lead Generation',
      value: 1,
      currency: 'ARS',
      status: success ? 'success' : 'error'
    });
  }

  // Google Analytics tracking (if implemented)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_submit', {
      event_category: 'Contact',
      event_label: 'Contact Form',
      value: success ? 1 : 0
    });
  }

  // Custom analytics tracking
  console.log('Form submission tracked:', {
    success,
    company: formData.company,
    timestamp: new Date().toISOString()
  });
} 