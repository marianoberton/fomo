# Configuración de Variables de Entorno

## Variables Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

### 1. Cloudinary (Videos)
```env
# Cloudinary - Para gestión de videos
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

### 2. FOMO Platform CRM (Formulario de Contacto)
```env
# Webhook URL para enviar leads al CRM de FOMO Platform
NEXT_PUBLIC_FOMO_WEBHOOK_URL=https://tu-dominio.vercel.app/api/webhook/contact-lead
```

## Ejemplo completo de .env.local

```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=fomo-platform
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz1234567890

# FOMO Platform CRM
NEXT_PUBLIC_FOMO_WEBHOOK_URL=https://fomo-crm.vercel.app/api/webhook/contact-lead
```

## Cómo obtener las credenciales

### Cloudinary:
1. Ve a [cloudinary.com](https://cloudinary.com)
2. Crea una cuenta gratuita
3. En el Dashboard encontrarás:
   - Cloud Name
   - API Key  
   - API Secret

### FOMO Platform CRM:
1. Reemplaza `https://tu-dominio.vercel.app` con la URL real de tu sistema CRM
2. La ruta `/api/webhook/contact-lead` debe ser el endpoint que recibe los leads

## Configuración en Vercel (Producción)

Cuando deploys a Vercel, agrega estas variables en:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega cada variable con su valor correspondiente

## Scripts de configuración

Para configurar rápidamente las variables puedes usar:

```bash
# Configurar Cloudinary
npm run setup:cloudinary

# Configurar leads API  
npm run setup:leads
```

## Verificar configuración

Puedes verificar que las variables estén configuradas correctamente revisando la consola del navegador cuando uses el formulario de contacto o los videos de Cloudinary. 