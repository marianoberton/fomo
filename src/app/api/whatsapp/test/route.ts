import { NextRequest, NextResponse } from 'next/server';
import { WhatsAppBotUtils } from '@/lib/whatsapp/utils';

/**
 * POST - Test WhatsApp bot functionality
 * Endpoint for testing various bot features
 */
export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();
    const utils = new WhatsAppBotUtils();

    switch (action) {
      case 'test_webhook':
        const { webhookUrl, verifyToken } = params;
        if (!webhookUrl || !verifyToken) {
          return NextResponse.json({ 
            error: 'webhookUrl and verifyToken are required' 
          }, { status: 400 });
        }

        const webhookResult = await utils.testWebhook(webhookUrl, verifyToken);
        return NextResponse.json({ 
          success: webhookResult,
          message: webhookResult ? 'Webhook test passed' : 'Webhook test failed'
        });

      case 'test_message':
        const { phoneNumberId, testPhone } = params;
        if (!phoneNumberId || !testPhone) {
          return NextResponse.json({ 
            error: 'phoneNumberId and testPhone are required' 
          }, { status: 400 });
        }

        const messageResult = await utils.testMessageSending(phoneNumberId, testPhone);
        return NextResponse.json(messageResult);

      case 'validate_phone':
        const { phone } = params;
        if (!phone) {
          return NextResponse.json({ 
            error: 'phone is required' 
          }, { status: 400 });
        }

        const isValid = WhatsAppBotUtils.validatePhoneNumber(phone);
        const formatted = isValid ? WhatsAppBotUtils.formatPhoneNumber(phone) : null;
        
        return NextResponse.json({ 
          valid: isValid,
          formatted: formatted,
          original: phone
        });

      case 'check_spam':
        const { message } = params;
        if (!message) {
          return NextResponse.json({ 
            error: 'message is required' 
          }, { status: 400 });
        }

        const isSpam = WhatsAppBotUtils.isSpamMessage(message);
        return NextResponse.json({ 
          isSpam,
          message: message
        });

      case 'get_stats':
        const stats = await utils.getBotStats();
        return NextResponse.json({ stats });

      case 'generate_token':
        const token = WhatsAppBotUtils.generateVerifyToken();
        return NextResponse.json({ 
          token,
          message: 'Use this token in your webhook configuration'
        });

      default:
        return NextResponse.json({ 
          error: 'Invalid action. Supported actions: test_webhook, test_message, validate_phone, check_spam, get_stats, generate_token' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * GET - Get test information and available actions
 */
export async function GET() {
  return NextResponse.json({
    message: 'WhatsApp Bot Test API',
    version: '1.0.0',
    availableActions: [
      {
        action: 'test_webhook',
        description: 'Test webhook connectivity',
        required: ['webhookUrl', 'verifyToken']
      },
      {
        action: 'test_message',
        description: 'Test message sending',
        required: ['phoneNumberId', 'testPhone']
      },
      {
        action: 'validate_phone',
        description: 'Validate and format phone number',
        required: ['phone']
      },
      {
        action: 'check_spam',
        description: 'Check if message is spam',
        required: ['message']
      },
      {
        action: 'get_stats',
        description: 'Get bot statistics',
        required: []
      },
      {
        action: 'generate_token',
        description: 'Generate webhook verification token',
        required: []
      }
    ],
    examples: {
      testWebhook: {
        action: 'test_webhook',
        webhookUrl: 'https://yoursite.com/api/webhooks/whatsapp',
        verifyToken: 'your_verify_token'
      },
      testMessage: {
        action: 'test_message',
        phoneNumberId: 'your_phone_number_id',
        testPhone: '5491139066421'
      },
      validatePhone: {
        action: 'validate_phone',
        phone: '+54 11 3906-6421'
      }
    }
  });
} 