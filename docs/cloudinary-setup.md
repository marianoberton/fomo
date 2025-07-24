# Configuración de Cloudinary para Videos de Demos

## Descripción General

Los videos de la galería de demos ahora se sirven desde Cloudinary para mejorar el rendimiento, reducir el tamaño del repositorio y aprovechar las optimizaciones automáticas de video.

## Características Implementadas

- ✅ **Reproducción automática al hover** sin controles
- ✅ **Optimización automática** de videos (formato, calidad, compresión)
- ✅ **Thumbnails generados automáticamente** desde los videos
- ✅ **Fallbacks** para casos de error o carga lenta
- ✅ **Lazy loading** y estados de carga
- ✅ **Responsive design** con transformaciones dinámicas

## Configuración Inicial

### 1. Crear cuenta en Cloudinary

1. Ve a [cloudinary.com](https://cloudinary.com) y crea una cuenta gratuita
2. Una vez en el dashboard, encontrarás tus credenciales:
   - **Cloud Name**: Visible en el dashboard
   - **API Key**: En la sección "API Keys"
   - **API Secret**: En la sección "API Keys"

### 2. Configurar variables de entorno

Ejecuta el script de configuración:

```bash
npm run setup:cloudinary
```

O configura manualmente en `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 3. Subir videos a Cloudinary

Los videos deben subirse con los siguientes Public IDs:

| Video Local | Public ID en Cloudinary | Descripción |
|-------------|------------------------|-------------|
| `ecommerce.mp4` | `fomo/demos/ecommerce` | E-commerce integrado |
| `chatbot.mp4` | `fomo/demos/chatbot` | Bot de WhatsApp |
| `procesos.mp4` | `fomo/demos/procesos` | Mapeo de procesos |
| `inted.mp4` | `fomo/demos/inted` | Automatización |
| `lamoderna.mp4` | `fomo/demos/lamoderna` | Integración de sistemas |
| `dashboard-default.mp4` | `fomo/demos/dashboard-default` | Dashboard por defecto |

#### Opción 1: Dashboard Web (Recomendado)

1. Ve a tu dashboard de Cloudinary
2. Crea la carpeta `fomo/demos/`
3. Sube cada video con el Public ID exacto especificado arriba

#### Opción 2: Cloudinary CLI

```bash
# Instalar CLI
npm install -g cloudinary-cli

# Configurar credenciales
cld config

# Subir videos
cld uploader upload public/videos/ecommerce.mp4 --public-id fomo/demos/ecommerce --resource-type video
cld uploader upload public/videos/chatbot.mp4 --public-id fomo/demos/chatbot --resource-type video
cld uploader upload public/videos/procesos.mp4 --public-id fomo/demos/procesos --resource-type video
cld uploader upload public/videos/inted.mp4 --public-id fomo/demos/inted --resource-type video
cld uploader upload public/videos/lamoderna.mp4 --public-id fomo/demos/lamoderna --resource-type video
```

## Arquitectura de la Implementación

### Archivos Creados/Modificados

```
src/
├── lib/
│   └── cloudinary.ts              # Configuración y utilidades
├── components/
│   └── ui/
│       └── cloudinary-video.tsx   # Componente de video optimizado
└── page-sections/
    └── demo-gallery-section.tsx   # Actualizado para usar Cloudinary
```

### Componente CloudinaryVideo

El componente `CloudinaryVideo` incluye:

- **Estados de carga**: Loading, loaded, error
- **Reprodución automática**: Al hacer hover
- **Thumbnails**: Generados automáticamente desde el video
- **Fallbacks**: Para casos de error
- **Optimización**: URLs con transformaciones automáticas

### Transformaciones Aplicadas

```typescript
// Ejemplo de URL generada
https://res.cloudinary.com/tu-cloud/video/upload/
  f_auto,          // Formato automático (MP4/WebM según browser)
  q_auto:good,     // Calidad automática optimizada  
  w_800,           // Ancho máximo 800px
  c_limit,         // Limitar dimensiones
  so_0,            // Empezar desde segundo 0
  du_10            // Duración máxima 10 segundos
  /fomo/demos/ecommerce.mp4
```

## Beneficios de Cloudinary

### Performance
- **CDN Global**: Entrega desde el servidor más cercano
- **Compresión automática**: Reduce tamaño sin perder calidad
- **Formato adaptativo**: WebM para Chrome, MP4 para Safari
- **Streaming optimizado**: Carga progresiva

### Desarrollo
- **Thumbnails automáticos**: Extraídos del video
- **Transformaciones dinámicas**: Cambiar tamaño via URL
- **Fallbacks robustos**: Manejo de errores integrado
- **Analytics**: Métricas de uso incluidas

### Repositorio
- **Tamaño reducido**: Videos no están en Git
- **Git LFS innecesario**: Los videos están en la nube
- **Deploy más rápido**: Menos archivos a transferir

## Resolución de Problemas

### Videos no se cargan

1. **Verificar credenciales**:
   ```bash
   # Revisar variables de entorno
   echo $NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   ```

2. **Verificar Public IDs**:
   - Los nombres deben coincidir exactamente
   - Usar la carpeta `fomo/demos/`
   - Extensión `.mp4`

3. **Verificar URLs**:
   ```typescript
   // Probar URL manualmente
   console.log(getDemoVideoUrl('website'));
   ```

### Errores de CORS

Si ves errores de CORS, asegúrate de:
- Tener el dominio configurado en Cloudinary
- Usar `NEXT_PUBLIC_` para variables del cliente

### Videos lentos

- **Optimizar original**: Videos < 10MB recomendado
- **Reducir duración**: 10-30 segundos para previews
- **Usar compresión**: H.264 con bitrate moderado

## Monitoreo y Analytics

Cloudinary proporciona métricas automáticas:

1. **Dashboard Analytics**: Ve a tu dashboard de Cloudinary
2. **Bandwidth usage**: Monitorea transferencia de datos
3. **Most requested**: Videos más reproducidos
4. **Geographic distribution**: De dónde vienen las requests

## Optimizaciones Adicionales

### Preload Estratégico

```typescript
// Solo preload de metadata para mejorar performance inicial
<video preload="metadata" />
```

### Lazy Loading

```typescript
// Los videos se cargan solo cuando están en viewport
const [isVisible, setIsVisible] = useState(false);
```

### Caching Inteligente

Cloudinary automáticamente cachea:
- Videos transformados por 1 año
- Thumbnails por tiempo indefinido
- Headers de cache optimizados

## Próximas Mejoras

- [ ] **Video player personalizado** con controles opcionales
- [ ] **Análisis de engagement** (tiempo de reproducción)
- [ ] **A/B testing** de thumbnails automático
- [ ] **Subtítulos automáticos** via IA
- [ ] **Adaptive bitrate** para conexiones lentas

## Soporte

Para problemas específicos de Cloudinary:
- [Documentación oficial](https://cloudinary.com/documentation)
- [SDK de Node.js](https://cloudinary.com/documentation/node_integration)
- [Transformación de videos](https://cloudinary.com/documentation/video_manipulation_and_delivery) 