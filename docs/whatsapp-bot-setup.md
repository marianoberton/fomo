# WhatsApp Business Bot - Guía de Configuración

## Descripción General

El bot de WhatsApp de FOMO está diseñado para automatizar la atención al cliente y proporcionar información sobre nuestros servicios de automatización para PyMEs. Utiliza la API oficial de WhatsApp Business Cloud API de Meta.

## Prerrequisitos

### 1. Cuenta de Meta Business
- Crear una cuenta en [Meta Business](https://business.facebook.com/)
- Verificar la cuenta empresarial con documentación válida

### 2. Aplicación de Meta Developers
1. Ir a [Meta Developers](https://developers.facebook.com/)
2. Crear una nueva aplicación tipo "Business"
3. Agregar el producto "WhatsApp" a la aplicación
4. Completar la configuración básica

### 3. WhatsApp Business Phone Number
- Registrar un número de teléfono empresarial
- Verificar el número en la plataforma de Meta
- Nota: El número no puede estar asociado a WhatsApp personal

## Configuración Paso a Paso

### Paso 1: Configurar la Aplicación en Meta Developers

1. **Obtener Credenciales**:
   - App ID: En el dashboard de la aplicación
   - App Secret: En Configuración Básica
   - Access Token: En WhatsApp > Configuración (temporal o permanente)
   - Phone Number ID: En WhatsApp > Configuración

2. **Configurar Webhook**:
   - URL del webhook: `https://tu-dominio.com/api/webhooks/whatsapp`
   - Verify Token: Usar el valor configurado en `WHATSAPP_VERIFY_TOKEN`
   - Suscribirse a eventos: `messages` y `message_status`

### Paso 2: Variables de Entorno

Crear archivo `.env.local` con las siguientes variables:

```env
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=tu_access_token_aqui
WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id_aqui
WHATSAPP_BUSINESS_ACCOUNT_ID=tu_business_account_id_aqui
WHATSAPP_VERIFY_TOKEN=fomo_whatsapp_bot_2024_secure_token
WHATSAPP_API_VERSION=v21.0

# Meta App Configuration
META_APP_ID=tu_meta_app_id_aqui
META_APP_SECRET=tu_meta_app_secret_aqui

# OpenAI Configuration (opcional para IA)
OPENAI_API_KEY=tu_openai_api_key_aqui
```

### Paso 3: Configuración del Webhook

1. **Verificación del Webhook**:
   - Endpoint: `GET /api/webhooks/whatsapp`
   - Verificará el token y responderá con el challenge

2. **Eventos del Webhook**:
   - Endpoint: `POST /api/webhooks/whatsapp`
   - Maneja mensajes entrantes y actualizaciones de estado

### Paso 4: Testing

1. **Test Local**:
   ```bash
   npm run dev
   # Usar ngrok para exponer el webhook localmente
   ngrok http 3000
   ```

2. **Test de Verificación**:
   ```bash
   curl -X GET "tu-webhook-url?hub.mode=subscribe&hub.verify_token=tu_verify_token&hub.challenge=test_challenge"
   ```

3. **Test de Mensaje**:
   Enviar un mensaje de WhatsApp al número configurado

## Funcionalidades del Bot

### Respuestas Automáticas

El bot maneja diferentes tipos de consultas:

1. **Saludos**: Respuesta de bienvenida con información de la empresa
2. **Servicios**: Lista de servicios ofrecidos por FOMO
3. **Precios**: Información sobre cotizaciones y consultas gratuitas
4. **Contacto**: Datos de contacto del equipo
5. **Soporte**: Derivación a soporte técnico

### Gestión de Conversaciones

- **Contexto**: Mantiene el historial de conversación
- **Estados**: Greeting, Information, Service Inquiry, Support
- **Persistencia**: Conversaciones se mantienen en memoria (configurable para BD)

### Características Avanzadas

- **Verificación de Firmas**: Seguridad mediante verificación de webhooks
- **Rate Limiting**: Protección contra spam
- **Error Handling**: Manejo robusto de errores
- **Logging**: Registro detallado para debugging

## Deployment en Producción

### 1. Configurar SSL
El webhook debe ser HTTPS en producción:
```bash
# Ejemplo con Certbot
sudo certbot --nginx -d tu-dominio.com
```

### 2. Variables de Entorno de Producción
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

### 3. Monitoreo
- Configurar logs para webhooks
- Monitorear errores de API
- Revisar métricas de respuesta

## Escalabilidad y Mejoras

### Integración con Base de Datos
Para almacenar conversaciones persistentes:
```typescript
// Ejemplo de implementación con Prisma
const conversation = await prisma.conversation.create({
  data: {
    userId,
    messages: {
      create: [
        { role: 'user', content: userMessage },
        { role: 'assistant', content: botResponse }
      ]
    }
  }
});
```

### Integración con IA (OpenAI)
Para respuestas más inteligentes:
```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: conversationHistory,
  max_tokens: 150,
  temperature: 0.7
});
```

### Métricas y Analytics
- Número de conversaciones activas
- Tipos de consultas más frecuentes
- Tiempo de respuesta promedio
- Satisfacción del usuario

## Troubleshooting

### Errores Comunes

1. **Webhook no verifica**:
   - Verificar URL y SSL
   - Comprobar verify token
   - Revisar logs del servidor

2. **Mensajes no se envían**:
   - Verificar access token
   - Comprobar phone number ID
   - Revisar permisos de la aplicación

3. **Respuestas duplicadas**:
   - Implementar idempotencia
   - Verificar configuración de webhooks

### Logs Útiles
```bash
# Ver logs de webhook
tail -f /var/log/whatsapp-bot.log

# Logs específicos de Next.js
npm run dev -- --verbose
```

## Contacto y Soporte

Para soporte técnico del bot:
- Email: dev@fomo.com.ar
- Slack: #whatsapp-bot-support
- Documentación: [docs.fomo.com.ar/whatsapp-bot](docs.fomo.com.ar/whatsapp-bot) 