/**
 * Script para verificar que todo esté listo para el despliegue
 */
import fs from 'fs';
import path from 'path';
import process from 'process';

// Verificar existencia de archivos críticos
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'index.html',
  'vercel.json',
  'src/main.tsx',
  'src/App.tsx',
  'src/firebase/config.ts',
  '.env.example'
];

// Verificar existencia de variables de entorno
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

console.log('🔍 Verificando archivos necesarios para el despliegue...');

let hasErrors = false;

// Comprobar archivos requeridos
for (const file of requiredFiles) {
  const filePath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ No se encontró el archivo: ${file}`);
    hasErrors = true;
  }
}

// Verificar si existe archivo .env
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.warn('⚠️ No se encontró el archivo .env - Asegúrate de configurar las variables de entorno en Vercel');
} else {
  // Verificar variables de entorno
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const envVar of requiredEnvVars) {
    if (!envContent.includes(envVar)) {
      console.warn(`⚠️ Variable de entorno ${envVar} no encontrada en .env`);
    }
  }
}

// Verificar Firebase config
const firebaseConfigPath = path.resolve(process.cwd(), 'src/firebase/config.ts');
if (fs.existsSync(firebaseConfigPath)) {
  const firebaseConfig = fs.readFileSync(firebaseConfigPath, 'utf8');
  if (firebaseConfig.includes('"your-api-key"') || firebaseConfig.includes('"your-project-id"')) {
    console.warn('⚠️ Parece que la configuración de Firebase contiene valores de placeholder');
  }
}

if (hasErrors) {
  console.error('❌ Hay problemas que deben resolverse antes del despliegue.');
  process.exit(1);
} else {
  console.log('✅ Todos los archivos necesarios están presentes.');
  console.log('✅ La aplicación está lista para ser desplegada en Vercel');
  console.log('\n🚀 Ejecuta "vercel" para desplegar en desarrollo o "vercel --prod" para producción');
}