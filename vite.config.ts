import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  publicDir: 'public',
  base: isDev ? '/' : '/react-camera-pro-explore/',
  build: {
    outDir: 'build/client',
    assetsDir: 'assets',
    copyPublicDir: true
  }
});