import { NextRequest, NextResponse } from 'next/server';

// WhatsApp API Types
interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

interface WhatsAppStatus {
  id: string;
  status: string;
  timestamp: string;
  recipient_id: string;
}

interface WhatsAppValue {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: Array<{
    profile: { name: string };
    wa_id: string;
  }>;
  messages?: WhatsAppMessage[];
  statuses?: WhatsAppStatus[];
}

interface WhatsAppWebhookBody {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: WhatsAppValue;
      field: string;
    }>;
  }>;
}

// Environment variables
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_ID;

// Send WhatsApp message function
async function sendMessage(to: string, text: string): Promise<void> {
  if (!WHATSAPP_TOKEN || !PHONE_ID) {
    console.error('❌ Missing WhatsApp credentials');
    return;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v23.0/${PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: text }
        })
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Message sent:', data);
    } else {
      const error = await response.text();
      console.error('❌ Error sending message:', error);
    }
  } catch (error: any) {
    console.error('❌ Error sending message:', error.message);
  }
}

// Process incoming message
function processMessage(messageText: string): string {
  const text = messageText.toLowerCase().trim();
  
  // Greetings
  if (text.includes('hola') || text.includes('hello') || text.includes('hi')) {
    return '¡Hola! 👋 Gracias por contactarte con FOMO. ¿En qué puedo ayudarte hoy?\n\n• Información sobre servicios\n• Consultas técnicas\n• Soporte\n\nEscribe tu consulta y te responderé enseguida.';
  }
  
  // Services
  if (text.includes('servicio') || text.includes('service') || text.includes('que hacen')) {
    return '🚀 *Servicios FOMO:*\n\n• Análisis de sitios web\n• Inteligencia competitiva\n• Optimización de performance\n• Auditorías técnicas\n• Reportes automatizados\n\n¿Te interesa algún servicio en particular?';
  }
  
  // Pricing
  if (text.includes('precio') || text.includes('cost') || text.includes('cuanto')) {
    return '💰 *Precios:*\n\nNuestros precios varían según el proyecto. Ofrecemos:\n\n• Consulta gratuita (30 min)\n• Auditorías desde $299\n• Proyectos personalizados\n\n¿Quieres agendar una consulta gratuita?';
  }
  
  // Contact
  if (text.includes('contacto') || text.includes('hablar') || text.includes('reunión')) {
    return '📞 *Contacto:*\n\n• Email: info@fomo.com\n• WhatsApp: Este chat\n• Web: fomo.com\n\n¿Prefieres que te llame o seguimos por WhatsApp?';
  }
  
  // Default response
  return `Gracias por tu mensaje: "${messageText}"\n\n🤖 Soy el asistente de FOMO. Puedo ayudarte con:\n\n• Información sobre servicios\n• Precios y consultas\n• Soporte técnico\n\n¿En qué puedo ayudarte específicamente?`;
}

// GET - Webhook verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('🔍 Webhook verification:', { mode, token, challenge });
  console.log('🔑 Environment VERIFY_TOKEN:', VERIFY_TOKEN ? 'SET' : 'UNDEFINED');
  console.log('🔍 Token comparison:', {
    received: token,
    expected: VERIFY_TOKEN,
    match: token === VERIFY_TOKEN
  });

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  }

  console.log('❌ Webhook verification failed');
  return new NextResponse('Forbidden', { status: 403 });
}

// POST - Handle incoming messages
export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppWebhookBody = await request.json();
    console.log('📨 Webhook received:', JSON.stringify(body, null, 2));

    for (const entry of body.entry) {
      for (const change of entry.changes) {
        const { value } = change;

        // Handle messages
        if (value.messages?.length) {
          for (const message of value.messages) {
            console.log('💬 Processing message:', message);
            
            if (message.type === 'text' && message.text) {
              const responseText = processMessage(message.text.body);
              await sendMessage(message.from, responseText);
            }
          }
        }

        // Handle statuses
        if (value.statuses?.length) {
          for (const status of value.statuses) {
            console.log(`📊 Message status: ${status.id} -> ${status.status}`);
          }
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    console.error('❌ Webhook processing error:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Handle other HTTP methods
export async function PUT() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}

export async function DELETE() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}

export async function PATCH() {
  return new NextResponse('Method Not Allowed', { status: 405 });
} 