import { WhatsAppClient } from './client';

export interface BotStats {
  totalMessages: number;
  messagesLast24h: number;
  activeConversations: number;
  averageResponseTime: number;
  topQueries: Array<{ query: string; count: number }>;
  errorRate: number;
}

export interface MessageTestResult {
  success: boolean;
  messageId?: string;
  error?: string;
  responseTime: number;
}

export class WhatsAppBotUtils {
  private client: WhatsAppClient;

  constructor() {
    this.client = new WhatsAppClient();
  }

  /**
   * Test webhook connectivity
   */
  async testWebhook(webhookUrl: string, verifyToken: string): Promise<boolean> {
    try {
      const testUrl = `${webhookUrl}?hub.mode=subscribe&hub.verify_token=${verifyToken}&hub.challenge=test_challenge`;
      
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.ok && (await response.text()) === 'test_challenge';
    } catch (error) {
      console.error('Webhook test failed:', error);
      return false;
    }
  }

  /**
   * Test message sending capability
   */
  async testMessageSending(phoneNumberId: string, testPhoneNumber: string): Promise<MessageTestResult> {
    const startTime = Date.now();
    
    try {
      const testMessage = `🧪 Test del bot FOMO - ${new Date().toLocaleString('es-AR')}`;
      
      const response = await this.client.sendMessage(phoneNumberId, testPhoneNumber, testMessage);
      
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        messageId: response.messages[0].id,
        responseTime
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime
      };
    }
  }

  /**
   * Get bot statistics (placeholder - would connect to analytics service)
   */
  async getBotStats(): Promise<BotStats> {
    // En una implementación real, esto conectaría a una base de datos o servicio de analytics
    return {
      totalMessages: 0,
      messagesLast24h: 0,
      activeConversations: 0,
      averageResponseTime: 0,
      topQueries: [],
      errorRate: 0
    };
  }

  /**
   * Send broadcast message to multiple users
   */
  async sendBroadcast(
    phoneNumberId: string,
    recipients: string[],
    message: string
  ): Promise<Array<{ phone: string; success: boolean; messageId?: string; error?: string }>> {
    const results = [];

    for (const phone of recipients) {
      try {
        const response = await this.client.sendMessage(phoneNumberId, phone, message);
        results.push({
          phone,
          success: true,
          messageId: response.messages[0].id
        });
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push({
          phone,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Validate phone number format
   */
  static validatePhoneNumber(phone: string): boolean {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a valid international format (8-15 digits)
    if (cleanPhone.length < 8 || cleanPhone.length > 15) {
      return false;
    }

    // Must start with country code (not 0 or 1)
    if (cleanPhone.startsWith('0') || cleanPhone.startsWith('1')) {
      return false;
    }

    return true;
  }

  /**
   * Format phone number for WhatsApp API
   */
  static formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Add 54 for Argentina if not present and phone seems Argentine
    if (cleanPhone.length === 10 && cleanPhone.startsWith('9')) {
      cleanPhone = '54' + cleanPhone;
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('11')) {
      cleanPhone = '549' + cleanPhone;
    }

    return cleanPhone;
  }

  /**
   * Generate webhook verification token
   */
  static generateVerifyToken(): string {
    return `fomo_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  /**
   * Check if message contains spam indicators
   */
  static isSpamMessage(message: string): boolean {
    const spamKeywords = [
      'viagra', 'casino', 'loan', 'credit', 'bitcoin', 'investment', 'prize', 'winner',
      'congratulations', 'click here', 'urgent', 'act now', 'limited time'
    ];

    const lowerMessage = message.toLowerCase();
    
    // Check for spam keywords
    const hasSpamKeywords = spamKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Check for excessive caps
    const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
    const excessiveCaps = capsRatio > 0.7 && message.length > 10;
    
    // Check for excessive special characters
    const specialCharsRatio = (message.match(/[!@#$%^&*()]/g) || []).length / message.length;
    const excessiveSpecialChars = specialCharsRatio > 0.3;

    return hasSpamKeywords || excessiveCaps || excessiveSpecialChars;
  }

  /**
   * Log bot activity for monitoring
   */
  static logActivity(activity: {
    type: 'message_received' | 'message_sent' | 'error' | 'webhook_verified';
    userId?: string;
    message?: string;
    error?: string;
    timestamp?: Date;
  }): void {
    const logEntry = {
      ...activity,
      timestamp: activity.timestamp || new Date()
    };

    console.log('Bot Activity:', JSON.stringify(logEntry, null, 2));
    
    // En producción, enviaríamos esto a un servicio de logging como Datadog, LogRocket, etc.
  }
} 