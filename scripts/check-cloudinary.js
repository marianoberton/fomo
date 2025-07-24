#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Cloudinary...\n');

// Verificar si existe el archivo .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log(`📁 Archivo .env.local: ${envExists ? '✅ Existe' : '❌ No existe'}`);

if (envExists) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Buscar variables de Cloudinary
  const cloudName = envContent.match(/NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=(.+)/);
  const apiKey = envContent.match(/CLOUDINARY_API_KEY=(.+)/);
  const apiSecret = envContent.match(/CLOUDINARY_API_SECRET=(.+)/);
  
  console.log('\n🔧 Variables de entorno encontradas:');
  console.log(`  - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: ${cloudName ? '✅ ' + cloudName[1] : '❌ No encontrada'}`);
  console.log(`  - CLOUDINARY_API_KEY: ${apiKey ? '✅ Configurada' : '❌ No encontrada'}`);
  console.log(`  - CLOUDINARY_API_SECRET: ${apiSecret ? '✅ Configurada' : '❌ No encontrada'}`);
  
  if (!cloudName || !apiKey || !apiSecret) {
    console.log('\n⚠️  Configuración incompleta. Ejecuta:');
    console.log('   npm run setup:cloudinary');
  } else {
    console.log('\n✅ Cloudinary parece estar configurado correctamente');
  }
} else {
  console.log('\n❌ No se encontró archivo .env.local');
  console.log('💡 Crea el archivo ejecutando:');
  console.log('   npm run setup:cloudinary');
}

// Verificar si los videos existen en Cloudinary
console.log('\n🎥 Verificando videos en Cloudinary...');

const { DEMO_VIDEOS } = require('../src/lib/cloudinary.ts');

console.log('📋 Videos esperados:');
Object.entries(DEMO_VIDEOS).forEach(([demoId, publicId]) => {
  console.log(`  - ${demoId}: ${publicId}`);
});

console.log('\n💡 Para verificar si los videos existen, visita:');
console.log('   https://res.cloudinary.com/[tu-cloud-name]/video/upload/[public-id]');

console.log('\n🔧 Para configurar Cloudinary desde cero:');
console.log('   1. npm run setup:cloudinary');
console.log('   2. Sube los videos a Cloudinary');
console.log('   3. Actualiza los IDs en src/lib/cloudinary.ts'); 