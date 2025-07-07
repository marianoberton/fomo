export interface Conversation {
  userId: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  context: {
    name?: string;
    preferredLanguage?: string;
    lastInteraction: Date;
    conversationStage: 'greeting' | 'information' | 'service_inquiry' | 'support';
    userType?: 'potential_client' | 'existing_client' | 'general_inquiry';
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    messageCount: number;
  };
}

export class ConversationManager {
  private conversations: Map<string, Conversation> = new Map();
  private readonly MAX_MESSAGES_PER_CONVERSATION = 50;

  /**
   * Get existing conversation or create a new one
   */
  async getOrCreateConversation(userId: string): Promise<Conversation> {
    let conversation = this.conversations.get(userId);

    if (!conversation) {
      conversation = {
        userId,
        messages: [],
        context: {
          lastInteraction: new Date(),
          conversationStage: 'greeting'
        },
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 0
        }
      };
      
      this.conversations.set(userId, conversation);
      console.log(`Created new conversation for user: ${userId}`);
    } else {
      // Update last interaction time
      conversation.context.lastInteraction = new Date();
      conversation.metadata.updatedAt = new Date();
    }

    return conversation;
  }

  /**
   * Update conversation with new message and response
   */
  async updateConversation(userId: string, userMessage: string, botResponse: string): Promise<void> {
    const conversation = this.conversations.get(userId);
    if (!conversation) {
      console.error(`Conversation not found for user: ${userId}`);
      return;
    }

    const now = new Date();

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: now
    });

    // Add bot response
    conversation.messages.push({
      role: 'assistant',
      content: botResponse,
      timestamp: now
    });

    // Update metadata
    conversation.metadata.messageCount += 2;
    conversation.metadata.updatedAt = now;
    conversation.context.lastInteraction = now;

    // Update conversation stage based on content
    this.updateConversationStage(conversation, userMessage);

    // Trim old messages if conversation gets too long
    if (conversation.messages.length > this.MAX_MESSAGES_PER_CONVERSATION) {
      conversation.messages = conversation.messages.slice(-this.MAX_MESSAGES_PER_CONVERSATION);
    }

    console.log(`Updated conversation for user ${userId}. Total messages: ${conversation.messages.length}`);
  }

  /**
   * Get conversation history for AI context
   */
  getConversationHistory(conversation: Conversation): Array<{ role: string; content: string }> {
    // Return last 10 messages for context (to avoid token limits)
    return conversation.messages
      .slice(-10)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));
  }

  /**
   * Update conversation stage based on user message content
   */
  private updateConversationStage(conversation: Conversation, userMessage: string): void {
    const message = userMessage.toLowerCase();
    
    // Keywords for different stages
    const serviceKeywords = ['servicio', 'precio', 'costo', 'cotización', 'automatización', 'bot', 'proceso'];
    const supportKeywords = ['problema', 'error', 'ayuda', 'soporte', 'técnico', 'falla'];
    const infoKeywords = ['información', 'sobre', 'empresa', 'equipo', 'que hacen', 'explica'];

    if (serviceKeywords.some(keyword => message.includes(keyword))) {
      conversation.context.conversationStage = 'service_inquiry';
    } else if (supportKeywords.some(keyword => message.includes(keyword))) {
      conversation.context.conversationStage = 'support';
    } else if (infoKeywords.some(keyword => message.includes(keyword))) {
      conversation.context.conversationStage = 'information';
    }
    // If no specific keywords, keep current stage
  }

  /**
   * Clear old conversations (cleanup task)
   */
  async cleanupOldConversations(olderThanDays: number = 7): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    for (const [userId, conversation] of this.conversations) {
      if (conversation.context.lastInteraction < cutoffDate) {
        this.conversations.delete(userId);
        console.log(`Cleaned up old conversation for user: ${userId}`);
      }
    }
  }

  /**
   * Get conversation stats
   */
  getStats(): { totalConversations: number; activeConversations: number } {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    let activeConversations = 0;
    for (const conversation of this.conversations.values()) {
      if (conversation.context.lastInteraction > twentyFourHoursAgo) {
        activeConversations++;
      }
    }

    return {
      totalConversations: this.conversations.size,
      activeConversations
    };
  }
} 