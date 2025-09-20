import type { Config } from "@react-router/dev/config";

const isDev = process.env.NODE_ENV === 'development';

export default {
  // Configuración dinámica para desarrollo vs producción
  basename: isDev ? "/" : "/react-camera-pro-explore",
  // Configuración para manejar rutas SPA
  ssr: false,
} satisfies Config;