import { NextRequest, NextResponse } from 'next/server';
import { WhatsAppWebhookHandler } from '@/lib/whatsapp/webhook-handler';
import { verifyWhatsAppSignature } from '@/lib/whatsapp/security';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'fomo_whatsapp_bot_2024_secure_token';

/**
 * GET - Webhook verification endpoint
 * WhatsApp will call this to verify the webhook URL during setup
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    console.log('Webhook verification request:', { mode, token: !!token, challenge: !!challenge });

    // Check if the mode and token are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified successfully');
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.log('Webhook verification failed');
      return new NextResponse('Forbidden', { status: 403 });
    }
  } catch (error) {
    console.error('Error in webhook verification:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/**
 * POST - Handle incoming WhatsApp messages and events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // Verify the webhook signature for security
    if (!verifyWhatsAppSignature(body, signature)) {
      console.log('Invalid webhook signature');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const webhookData = JSON.parse(body);
    
    // Log the incoming webhook for debugging
    console.log('Received WhatsApp webhook:', JSON.stringify(webhookData, null, 2));

    // Process the webhook data
    const handler = new WhatsAppWebhookHandler();
    await handler.processWebhook(webhookData);

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing WhatsApp webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 