#!/usr/bin/env node

/**
 * WhatsApp Bot Setup Script
 * Helps configure the WhatsApp Business API bot for FOMO
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('🤖 FOMO WhatsApp Bot Setup');
  console.log('===========================\n');

  console.log('Este script te ayudará a configurar el bot de WhatsApp Business.\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  if (envExists) {
    const overwrite = await question('Ya existe un archivo .env.local. ¿Quieres sobrescribirlo? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('Setup cancelado.');
      rl.close();
      return;
    }
  }

  console.log('\n📋 Configuración de Variables de Entorno\n');

  // Collect configuration
  const config = {};

  console.log('1. Configuración de WhatsApp Business API:');
  config.WHATSAPP_ACCESS_TOKEN = await question('   Access Token: ');
  config.WHATSAPP_PHONE_NUMBER_ID = await question('   Phone Number ID: ');
  config.WHATSAPP_BUSINESS_ACCOUNT_ID = await question('   Business Account ID: ');
  
  const customVerifyToken = await question('   Verify Token (presiona Enter para generar uno automático): ');
  config.WHATSAPP_VERIFY_TOKEN = customVerifyToken || `fomo_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  
  config.WHATSAPP_API_VERSION = 'v21.0';

  console.log('\n2. Configuración de Meta App:');
  config.META_APP_ID = await question('   App ID: ');
  config.META_APP_SECRET = await question('   App Secret: ');

  console.log('\n3. Configuración de OpenAI (opcional para IA):');
  const openaiKey = await question('   OpenAI API Key (opcional): ');
  if (openaiKey) {
    config.OPENAI_API_KEY = openaiKey;
  }

  console.log('\n4. Configuración General:');
  const appUrl = await question('   URL de la aplicación (ej: https://tu-dominio.com): ');
  config.NEXT_PUBLIC_APP_URL = appUrl || 'http://localhost:3000';
  config.NODE_ENV = 'development';

  // Generate .env.local content
  let envContent = '# WhatsApp Business API Configuration\n';
  envContent += `WHATSAPP_ACCESS_TOKEN=${config.WHATSAPP_ACCESS_TOKEN}\n`;
  envContent += `WHATSAPP_PHONE_NUMBER_ID=${config.WHATSAPP_PHONE_NUMBER_ID}\n`;
  envContent += `WHATSAPP_BUSINESS_ACCOUNT_ID=${config.WHATSAPP_BUSINESS_ACCOUNT_ID}\n`;
  envContent += `WHATSAPP_VERIFY_TOKEN=${config.WHATSAPP_VERIFY_TOKEN}\n`;
  envContent += `WHATSAPP_API_VERSION=${config.WHATSAPP_API_VERSION}\n\n`;

  envContent += '# Meta App Configuration\n';
  envContent += `META_APP_ID=${config.META_APP_ID}\n`;
  envContent += `META_APP_SECRET=${config.META_APP_SECRET}\n\n`;

  if (config.OPENAI_API_KEY) {
    envContent += '# OpenAI Configuration\n';
    envContent += `OPENAI_API_KEY=${config.OPENAI_API_KEY}\n\n`;
  }

  envContent += '# General Configuration\n';
  envContent += `NEXT_PUBLIC_APP_URL=${config.NEXT_PUBLIC_APP_URL}\n`;
  envContent += `NODE_ENV=${config.NODE_ENV}\n`;

  // Write .env.local file
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Archivo .env.local creado exitosamente!');
  } catch (error) {
    console.error('\n❌ Error al crear .env.local:', error.message);
    rl.close();
    return;
  }

  // Display next steps
  console.log('\n🚀 Próximos Pasos:');
  console.log('==================\n');

  console.log('1. Configurar el webhook en Meta Developers:');
  console.log(`   URL: ${config.NEXT_PUBLIC_APP_URL}/api/webhooks/whatsapp`);
  console.log(`   Verify Token: ${config.WHATSAPP_VERIFY_TOKEN}`);
  console.log('   Eventos: messages, message_status\n');

  console.log('2. Instalar dependencias si no lo has hecho:');
  console.log('   npm install\n');

  console.log('3. Ejecutar en modo desarrollo:');
  console.log('   npm run dev\n');

  console.log('4. Para testing local con webhook público:');
  console.log('   npx ngrok http 3000');
  console.log('   Usar la URL de ngrok en Meta Developers\n');

  console.log('5. Probar el bot:');
  console.log(`   curl -X GET "${config.NEXT_PUBLIC_APP_URL}/api/whatsapp/test"`);
  console.log('   Envía un mensaje WhatsApp al número configurado\n');

  console.log('📖 Documentación completa: fomo/docs/whatsapp-bot-setup.md\n');

  const openDocs = await question('¿Quieres abrir la documentación ahora? (y/N): ');
  if (openDocs.toLowerCase() === 'y' || openDocs.toLowerCase() === 'yes') {
    const { exec } = require('child_process');
    const docsPath = path.join(process.cwd(), 'docs', 'whatsapp-bot-setup.md');
    
    // Try to open with default editor
    exec(`code "${docsPath}"`, (error) => {
      if (error) {
        console.log(`No se pudo abrir automáticamente. Abre manualmente: ${docsPath}`);
      }
    });
  }

  console.log('\n🎉 ¡Setup completado! El bot de WhatsApp está listo para usar.');
  rl.close();
}

main().catch((error) => {
  console.error('Error durante el setup:', error);
  rl.close();
  process.exit(1);
}); 