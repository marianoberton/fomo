import { NextResponse } from 'next/server';

export async function GET() {
  const privacyText = `POLÍTICA DE PRIVACIDAD - FOMO

Última actualización: ${new Date().toLocaleDateString('es-ES')}

1. INFORMACIÓN QUE RECOPILAMOS
- Información de contacto (nombre, email, teléfono)
- Información de la empresa (nombre, cargo, sector)
- Información técnica (IP, navegador, sistema operativo)
- Información de uso (páginas visitadas, tiempo de permanencia)

2. CÓMO UTILIZAMOS SU INFORMACIÓN
- Proporcionar y mejorar nuestros servicios
- Personalizar la experiencia del usuario
- Comunicar actualizaciones y ofertas
- Analizar el uso de nuestros servicios
- Prevenir fraudes y proteger la seguridad

3. COMPARTIR INFORMACIÓN
- No vendemos ni alquilamos información personal
- Compartimos solo con proveedores de servicios necesarios
- Cuando sea requerido por ley
- Con consentimiento explícito del usuario

4. SUS DERECHOS
- Acceder a datos personales
- Corregir datos inexactos
- Solicitar eliminación de datos
- Oponerse al procesamiento
- Retirar consentimiento

5. SEGURIDAD
Implementamos medidas de seguridad técnicas y organizativas para proteger la información personal.

6. COOKIES
Utilizamos cookies para mejorar la experiencia, analizar tráfico y personalizar contenido.

7. INTEGRACIÓN CON WHATSAPP
- Los mensajes de WhatsApp se procesan para proporcionar servicio al cliente automatizado
- Los mensajes se almacenan temporalmente para mantener el contexto de la conversación
- Al usar nuestro servicio de WhatsApp, usted acepta el procesamiento de sus mensajes según esta política

8. CAMBIOS
Esta política puede actualizarse periódicamente. Se recomienda revisarla regularmente.

9. CONTACTO
Para preguntas sobre esta política: info@fomo.com.ar
Sitio web: https://www.fomo.com.ar`;

  return new NextResponse(privacyText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: "Privacy policy text endpoint - GET method only" 
  }, { status: 405 });
} 