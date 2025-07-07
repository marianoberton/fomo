import { WhatsAppClient } from './client';
import { MessageProcessor } from './message-processor';
import { ConversationManager } from './conversation-manager';

export interface WhatsAppWebhookData {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts?: Array<{
          profile: {
            name: string;
          };
          wa_id: string;
        }>;
        messages?: Array<{
          from: string;
          id: string;
          timestamp: string;
          text?: {
            body: string;
          };
          type: string;
          interactive?: any;
          image?: any;
          document?: any;
        }>;
        statuses?: Array<{
          id: string;
          status: string;
          timestamp: string;
          recipient_id: string;
        }>;
      };
      field: string;
    }>;
  }>;
}

export class WhatsAppWebhookHandler {
  private whatsappClient: WhatsAppClient;
  private messageProcessor: MessageProcessor;
  private conversationManager: ConversationManager;

  constructor() {
    this.whatsappClient = new WhatsAppClient();
    this.messageProcessor = new MessageProcessor();
    this.conversationManager = new ConversationManager();
  }

  /**
   * Process incoming WhatsApp webhook data
   */
  async processWebhook(webhookData: WhatsAppWebhookData): Promise<void> {
    try {
      if (webhookData.object !== 'whatsapp_business_account') {
        console.log('Ignoring non-WhatsApp webhook');
        return;
      }

      for (const entry of webhookData.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            await this.handleMessageChanges(change.value);
          }
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  }

  /**
   * Handle message-related changes (new messages, status updates)
   */
  private async handleMessageChanges(value: WhatsAppWebhookData['entry'][0]['changes'][0]['value']): Promise<void> {
    // Handle incoming messages
    if (value.messages) {
      for (const message of value.messages) {
        await this.handleIncomingMessage(message, value.metadata.phone_number_id);
      }
    }

    // Handle message status updates
    if (value.statuses) {
      for (const status of value.statuses) {
        await this.handleMessageStatus(status);
      }
    }
  }

  /**
   * Process incoming messages and generate appropriate responses
   */
  private async handleIncomingMessage(
    message: NonNullable<WhatsAppWebhookData['entry'][0]['changes'][0]['value']['messages']>[0],
    phoneNumberId: string
  ): Promise<void> {
    try {
      const { from, text, type } = message;

      // Only handle text messages for now
      if (type !== 'text' || !text?.body) {
        console.log(`Ignoring message type: ${type}`);
        return;
      }

      const userMessage = text.body.trim();
      const userId = from;

      console.log(`Processing message from ${userId}: ${userMessage}`);

      // Get or create conversation context
      const conversation = await this.conversationManager.getOrCreateConversation(userId);

      // Process the message and get a response
      const response = await this.messageProcessor.processMessage(userMessage, conversation);

      // Update conversation with the new message and response
      await this.conversationManager.updateConversation(userId, userMessage, response);

      // Send the response back to the user
      await this.whatsappClient.sendMessage(phoneNumberId, userId, response);

      console.log(`Response sent to ${userId}: ${response}`);
    } catch (error) {
      console.error('Error handling incoming message:', error);
      
      // Send error response to user
      const errorMessage = "Lo siento, ha ocurrido un error. Por favor intenta de nuevo o contacta a nuestro equipo de soporte.";
      await this.whatsappClient.sendMessage(phoneNumberId, message.from, errorMessage);
    }
  }

  /**
   * Handle message status updates (sent, delivered, read, failed)
   */
  private async handleMessageStatus(
    status: NonNullable<WhatsAppWebhookData['entry'][0]['changes'][0]['value']['statuses']>[0]
  ): Promise<void> {
    try {
      console.log(`Message ${status.id} status updated to: ${status.status}`);
      
      // You can implement message status tracking here
      // For example, updating a database with delivery status
      
    } catch (error) {
      console.error('Error handling message status:', error);
    }
  }
} 