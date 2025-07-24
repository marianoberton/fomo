// Note: No importamos cloudinary directamente en el cliente para evitar errores de módulos Node.js
// La configuración se maneja solo en el servidor cuando es necesario

// URLs de videos en Cloudinary (usando los IDs reales de los videos subidos)
export const DEMO_VIDEOS = {
  website: 'istockphoto-1223693297-640_adpp_is_qghynr', // Usando video por defecto para website
  chatbot: 'istockphoto-1223693297-640_adpp_is_qghynr', // Usando video por defecto para chatbot  
  'process-flow': 'procesos_e55wur',
  automation: 'inted_im3spc',
  integration: 'lamoderna_v323t0',
  dashboard: 'istockphoto-1223693297-640_adpp_is_qghynr' // Usando video por defecto para dashboard
} as const;

// Función para generar URL de video optimizada
export function getOptimizedVideoUrl(
  publicId: string, 
  options: {
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best';
    format?: 'auto' | 'mp4' | 'webm';
    transformation?: string[];
  } = {}
): string {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`;
  
  const transformations = [
    'f_auto', // Formato automático
    'q_auto', // Calidad automática
    'w_800', // Ancho máximo de 800px
    'c_limit', // Limitar dimensiones
    ...(options.transformation || [])
  ];

  return `${baseUrl}/video/upload/${transformations.join(',')}/${publicId}.mp4`;
}

// Función para obtener la URL del video según el ID del demo
export function getDemoVideoUrl(demoId: keyof typeof DEMO_VIDEOS): string {
  const publicId = DEMO_VIDEOS[demoId];
  
  if (!publicId) {
    console.warn(`Video not found for demo: ${demoId}`);
    return getOptimizedVideoUrl(DEMO_VIDEOS.dashboard); // Fallback
  }

  return getOptimizedVideoUrl(publicId, {
    quality: 'auto:good',
    transformation: [
      'so_0', // Empezar desde el segundo 0
      'du_10', // Duración máxima de 10 segundos para preview
    ]
  });
}

// Función para obtener thumbnail del video
export function getVideoThumbnail(demoId: keyof typeof DEMO_VIDEOS): string {
  const publicId = DEMO_VIDEOS[demoId];
  
  if (!publicId) {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_400,h_225,c_fill,f_auto,q_auto/fomo/demos/dashboard-default.jpg`;
  }

  // Generar thumbnail desde el video
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/w_400,h_225,c_fill,so_1.0,f_jpg,q_auto/${publicId}.jpg`;
}

// Verificar si Cloudinary está configurado
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET
  );
} 