import { NextResponse } from 'next/server';

export async function GET() {
  const privacyPolicy = {
    version: "1.0",
    lastUpdated: new Date().toISOString(),
    company: "FOMO",
    website: "https://www.fomo.com.ar",
    contact: "info@fomo.com.ar",
    policy: {
      dataCollection: [
        "Información de contacto (nombre, email, teléfono)",
        "Información de la empresa (nombre, cargo, sector)",
        "Información técnica (IP, navegador, sistema operativo)",
        "Información de uso (páginas visitadas, tiempo de permanencia)"
      ],
      dataUsage: [
        "Proporcionar y mejorar nuestros servicios",
        "Personalizar la experiencia del usuario",
        "Comunicar actualizaciones y ofertas",
        "Analizar el uso de nuestros servicios",
        "Prevenir fraudes y proteger la seguridad"
      ],
      dataSharing: [
        "No vendemos ni alquilamos información personal",
        "Compartimos solo con proveedores de servicios necesarios",
        "Cuando sea requerido por ley",
        "Con consentimiento explícito del usuario"
      ],
      userRights: [
        "Acceder a datos personales",
        "Corregir datos inexactos",
        "Solicitar eliminación de datos",
        "Oponerse al procesamiento",
        "Retirar consentimiento"
      ],
      security: "Implementamos medidas de seguridad técnicas y organizativas para proteger la información personal",
      cookies: "Utilizamos cookies para mejorar la experiencia, analizar tráfico y personalizar contenido",
      changes: "Esta política puede actualizarse periódicamente. Se recomienda revisarla regularmente"
    },
    whatsappIntegration: {
      dataProcessing: "Los mensajes de WhatsApp se procesan para proporcionar servicio al cliente automatizado",
      messageRetention: "Los mensajes se almacenan temporalmente para mantener el contexto de la conversación",
      userConsent: "Al usar nuestro servicio de WhatsApp, usted acepta el procesamiento de sus mensajes según esta política"
    }
  };

  return NextResponse.json(privacyPolicy, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: "Privacy policy endpoint - GET method only" 
  }, { status: 405 });
} 