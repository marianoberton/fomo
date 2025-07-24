#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('🌥️  FOMO Cloudinary Setup');
  console.log('=========================\n');

  console.log('Este script te ayudará a configurar Cloudinary para los videos de la galería de demos.\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  let envContent = '';
  if (envExists) {
    envContent = fs.readFileSync(envPath, 'utf8');
    const overwrite = await question('Ya existe un archivo .env.local. ¿Quieres agregar/actualizar las variables de Cloudinary? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('Setup cancelado.');
      rl.close();
      return;
    }
  }

  console.log('\n📋 Configuración de Cloudinary\n');

  // Collect Cloudinary configuration
  const cloudName = await question('   Cloud Name (ej: tu-cloud-name): ');
  const apiKey = await question('   API Key: ');
  const apiSecret = await question('   API Secret: ');

  // Generate new env content
  const cloudinaryConfig = `
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${cloudName}
CLOUDINARY_API_KEY=${apiKey}
CLOUDINARY_API_SECRET=${apiSecret}
`;

  // Remove existing Cloudinary config if any
  envContent = envContent.replace(/# Cloudinary Configuration[\s\S]*?(?=\n#|\n[A-Z]|$)/g, '');

  // Add new Cloudinary config
  let finalContent = envContent.trim() + '\n' + cloudinaryConfig;

  // Check if leads API config exists, if not add it
  if (!envContent.includes('NEXT_PUBLIC_LEADS_API_URL')) {
    const leadsApiConfig = `
# Leads API Configuration (External Multitenant System)
NEXT_PUBLIC_LEADS_API_URL=https://your-multitenant-system.com
NEXT_PUBLIC_TENANT_ID=your-tenant-id-here
`;
    finalContent += '\n' + leadsApiConfig;
  }

  // Write .env.local file
  try {
    fs.writeFileSync(envPath, finalContent);
    console.log('\n✅ Variables de Cloudinary agregadas a .env.local!');
  } catch (error) {
    console.error('\n❌ Error al actualizar .env.local:', error.message);
    rl.close();
    return;
  }

  // Display video upload instructions
  console.log('\n🎥 Próximos Pasos - Subir Videos:');
  console.log('=================================\n');

  console.log('Necesitas subir los siguientes videos a tu cuenta de Cloudinary:');
  console.log('(Usa la carpeta "fomo/demos/" en Cloudinary)\n');

  const videos = [
    { name: 'ecommerce', description: 'Video del e-commerce integrado', publicId: 'fomo/demos/ecommerce' },
    { name: 'chatbot', description: 'Video del bot de WhatsApp', publicId: 'fomo/demos/chatbot' },
    { name: 'procesos', description: 'Video del mapeo de procesos', publicId: 'fomo/demos/procesos' },
    { name: 'inted', description: 'Video de automatización', publicId: 'fomo/demos/inted' },
    { name: 'lamoderna', description: 'Video de integración de sistemas', publicId: 'fomo/demos/lamoderna' },
    { name: 'dashboard-default', description: 'Video por defecto/dashboard', publicId: 'fomo/demos/dashboard-default' }
  ];

  videos.forEach((video, index) => {
    console.log(`${index + 1}. ${video.description}`);
    console.log(`   Public ID: ${video.publicId}`);
    console.log(`   Archivo local: public/videos/${video.name}.mp4\n`);
  });

  console.log('📖 Cómo subir los videos:');
  console.log('========================\n');

  console.log('Opción 1 - Manual (Cloudinary Dashboard):');
  console.log('1. Ve a tu dashboard de Cloudinary');
  console.log('2. Crea la carpeta "fomo/demos/"');
  console.log('3. Sube cada video con el nombre exacto especificado arriba\n');

  console.log('Opción 2 - Cloudinary CLI:');
  console.log('1. Instala: npm install -g cloudinary-cli');
  console.log('2. Configura: cld config');
  console.log('3. Sube videos:');
  videos.forEach(video => {
    console.log(`   cld uploader upload public/videos/${video.name}.mp4 --public-id ${video.publicId} --resource-type video`);
  });

  console.log('\n⚡ Optimizaciones recomendadas:');
  console.log('==============================\n');
  console.log('- Formato: MP4 con codec H.264');
  console.log('- Resolución máxima: 1920x1080');
  console.log('- Duración recomendada: 10-30 segundos');
  console.log('- Tamaño máximo: 10MB por video');
  console.log('- Cloudinary se encargará de la optimización automática\n');

  console.log('🚀 Para probar:');
  console.log('===============\n');
  console.log('1. Asegúrate de haber subido al menos un video');
  console.log('2. Ejecuta: npm run dev');
  console.log('3. Ve a la sección de demos en el sitio');
  console.log('4. Haz hover sobre las tarjetas para ver los videos\n');

  console.log('✨ ¡Listo! Los videos ahora se servirán desde Cloudinary con optimización automática.');

  rl.close();
}

main().catch(console.error); 