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
  console.log('🔗 FOMO Leads API Setup');
  console.log('=======================\n');

  console.log('Este script configura la integración con tu sistema multitenant de leads.\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  let envContent = '';
  if (envExists) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  console.log('📋 Configuración de API de Leads\n');

  // Collect API configuration
  const apiUrl = await question('   URL de tu sistema multitenant (ej: https://tu-sistema.com): ');
  const tenantId = await question('   Tu Tenant ID: ');

  // Generate leads API config
  const leadsApiConfig = `
# Leads API Configuration (External Multitenant System)
NEXT_PUBLIC_LEADS_API_URL=${apiUrl}
NEXT_PUBLIC_TENANT_ID=${tenantId}
`;

  // Remove existing leads API config if any
  envContent = envContent.replace(/# Leads API Configuration[\s\S]*?(?=\n#|\n[A-Z]|$)/g, '');

  // Add new leads API config
  const finalContent = envContent.trim() + '\n' + leadsApiConfig;

  // Write .env.local file
  try {
    fs.writeFileSync(envPath, finalContent);
    console.log('\n✅ Variables de API de Leads configuradas en .env.local!');
  } catch (error) {
    console.error('\n❌ Error al actualizar .env.local:', error.message);
    rl.close();
    return;
  }

  // Display integration information
  console.log('\n📊 Integración configurada:');
  console.log('===========================\n');

  console.log('✅ Formulario de contacto enviará datos a:');
  console.log(`   ${apiUrl}/api/leads/submit`);
  console.log(`   Tenant ID: ${tenantId}\n`);

  console.log('📋 Datos que se enviarán:');
  console.log('- name: Nombre completo');
  console.log('- email: Email del contacto');
  console.log('- company: Nombre de la empresa');
  console.log('- website: Website o redes sociales');
  console.log('- pain_point: Principal desafío descrito');
  console.log('- phone: Teléfono (opcional)');
  console.log('- source: "website_form"');
  console.log('- metadata: IP, user agent, referrer, etc.\n');

  console.log('🔄 Flujo de respaldo:');
  console.log('===================\n');
  console.log('1. Intenta enviar al sistema multitenant');
  console.log('2. Si falla, intenta envío por email (fallback)');
  console.log('3. Registra analytics en Facebook Pixel');
  console.log('4. Muestra confirmación al usuario\n');

  console.log('⚠️  Importante:');
  console.log('==============\n');
  console.log('Asegúrate de que tu sistema multitenant tenga:');
  console.log('- Endpoint: POST /api/leads/submit');
  console.log('- Tabla: contact_leads con los campos mencionados');
  console.log('- Políticas RLS configuradas');
  console.log('- CORS habilitado para tu dominio\n');

  console.log('🚀 Para probar:');
  console.log('===============\n');
  console.log('1. Asegúrate de que tu sistema multitenant esté funcionando');
  console.log('2. Ejecuta: npm run dev');
  console.log('3. Ve al formulario de contacto y envía una prueba');
  console.log('4. Revisa los logs de la consola para verificar el envío\n');

  console.log('✨ ¡Listo! Los leads del formulario se guardarán en tu sistema multitenant.');

  rl.close();
}

main().catch(console.error); 