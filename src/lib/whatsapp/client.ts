const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || 'v21.0';
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export interface WhatsAppMessage {
  messaging_product: 'whatsapp';
  to: string;
  type: 'text' | 'template' | 'interactive';
  text?: {
    body: string;
  };
  template?: {
    name: string;
    language: {
      code: string;
    };
    components?: any[];
  };
  interactive?: {
    type: string;
    body?: {
      text: string;
    };
    action: any;
  };
}

export interface SendMessageResponse {
  messaging_product: string;
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

export class WhatsAppClient {
  private baseUrl: string;
  private accessToken: string;

  constructor() {
    this.baseUrl = `https://graph.facebook.com/${WHATSAPP_API_VERSION}`;
    this.accessToken = ACCESS_TOKEN || '';
    
    if (!this.accessToken) {
      throw new Error('WHATSAPP_ACCESS_TOKEN is required');
    }
  }

  /**
   * Send a text message to a WhatsApp user
   */
  async sendMessage(phoneNumberId: string, to: string, message: string): Promise<SendMessageResponse> {
    const messageData: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: message
      }
    };

    return this.sendWhatsAppMessage(phoneNumberId, messageData);
  }

  /**
   * Send a template message (for initial conversations)
   */
  async sendTemplate(
    phoneNumberId: string, 
    to: string, 
    templateName: string, 
    languageCode: string = 'es'
  ): Promise<SendMessageResponse> {
    const messageData: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode
        }
      }
    };

    return this.sendWhatsAppMessage(phoneNumberId, messageData);
  }

  /**
   * Send an interactive message with buttons
   */
  async sendInteractiveMessage(
    phoneNumberId: string,
    to: string,
    bodyText: string,
    buttons: Array<{ id: string; title: string }>
  ): Promise<SendMessageResponse> {
    const messageData: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: {
          text: bodyText
        },
        action: {
          buttons: buttons.map(btn => ({
            type: 'reply',
            reply: {
              id: btn.id,
              title: btn.title
            }
          }))
        }
      }
    };

    return this.sendWhatsAppMessage(phoneNumberId, messageData);
  }

  /**
   * Core method to send any WhatsApp message
   */
  private async sendWhatsAppMessage(phoneNumberId: string, messageData: WhatsAppMessage): Promise<SendMessageResponse> {
    try {
      const url = `${this.baseUrl}/${phoneNumberId}/messages`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`WhatsApp API error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();
      console.log('Message sent successfully:', result);
      
      return result;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  /**
   * Mark a message as read
   */
  async markMessageAsRead(phoneNumberId: string, messageId: string): Promise<void> {
    try {
      const url = `${this.baseUrl}/${phoneNumberId}/messages`;
      
      await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId
        })
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }
} 