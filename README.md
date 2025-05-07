# FakeStore

Una tienda online de productos con React, Redux Toolkit, Firebase y Chakra UI.

## Características

- Catálogo de productos con buscador
- Carrito de compras
- Proceso de checkout
- Almacenamiento de órdenes en Firebase
- Diseño responsive con Chakra UI

## Requisitos previos

- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Firebase
- Cuenta de Vercel (para despliegue)

## Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Crea una aplicación web en tu proyecto
3. Habilita Firestore Database en tu proyecto
4. Copia las credenciales de configuración
5. Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`
6. Completa las variables de entorno con tus credenciales de Firebase

## Instalación local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com/)
2. Instala la CLI de Vercel `npm install -g vercel`
3. Ejecuta `vercel login` y sigue las instrucciones
4. Desde la raíz del proyecto, ejecuta `vercel`
5. Configura las variables de entorno en el dashboard de Vercel (desde las que tienes en .env)
6. Para actualizar tu aplicación después de cambios, ejecuta `vercel --prod`

También puedes desplegar directamente conectando tu repositorio de GitHub a Vercel para despliegues automáticos.

## Estructura del proyecto

- `/src/api`: Configuración y endpoints de API
- `/src/assets`: Recursos estáticos
- `/src/components`: Componentes reutilizables
- `/src/firebase`: Configuración de Firebase
- `/src/hooks`: Hooks personalizados
- `/src/pages`: Páginas de la aplicación
- `/src/services`: Servicios para datos (productos, carrito, órdenes)
- `/src/store`: Estado global con Redux Toolkit
- `/src/types`: Tipos de TypeScript

## Licencia

MIT
