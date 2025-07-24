import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary (solo servidor)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para subir videos (solo servidor)
export async function uploadVideo(
  filePath: string,
  publicId: string,
  options: {
    folder?: string;
    transformation?: any[];
    overwrite?: boolean;
  } = {}
) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      public_id: publicId,
      folder: options.folder || 'fomo/demos',
      overwrite: options.overwrite ?? true,
      transformation: options.transformation,
    });

    return {
      success: true,
      public_id: result.public_id,
      secure_url: result.secure_url,
      duration: result.duration,
      format: result.format,
    };
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Función para obtener información de un video (solo servidor)
export async function getVideoInfo(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: 'video',
    });

    return {
      success: true,
      public_id: result.public_id,
      secure_url: result.secure_url,
      duration: result.duration,
      format: result.format,
      bytes: result.bytes,
      created_at: result.created_at,
    };
  } catch (error) {
    console.error('Error getting video info:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Video not found',
    };
  }
}

// Función para eliminar un video (solo servidor)
export async function deleteVideo(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting video:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export default cloudinary; 