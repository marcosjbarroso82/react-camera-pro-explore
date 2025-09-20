# 🚀 Instrucciones de Deploy en GitHub Pages

## Configuración Inicial

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar GitHub Pages en tu repositorio:**
   - Ve a Settings > Pages en tu repositorio de GitHub
   - En "Source", selecciona "GitHub Actions"
   - El workflow ya está configurado en `.github/workflows/deploy.yml`

## Deploy Automático

El deploy se ejecuta automáticamente cuando haces push a la rama `master`:

```bash
git add .
git commit -m "feat: initial PWA setup"
git push origin master
```

## Deploy Manual

Si quieres hacer deploy manualmente:

```bash
# Instalar gh-pages si no está instalado
npm install --save-dev gh-pages

# Hacer build
npm run build

# Deploy
npm run deploy
```

## Verificar el Deploy

1. Ve a tu repositorio en GitHub
2. En la pestaña "Actions" verás el workflow ejecutándose
3. Una vez completado, tu app estará disponible en:
   `https://marcosjbarroso82.github.io/react-camera-pro-explore`

## Configuración PWA

La app está configurada como PWA y se puede instalar en dispositivos móviles:

- **Manifest:** `/public/manifest.json`
- **Service Worker:** `/public/sw.js`
- **Orientación:** Landscape (optimizada para móviles)
- **Tema:** Oscuro por defecto con toggle

## Estructura de la App

- **📷 Camera:** Página principal para explorar funcionalidades de cámara
- **🖼️ Gallery:** Galería de fotos con estadísticas
- **⚙️ Settings:** Configuraciones de la app y cámara

## Notas Importantes

- La app está optimizada para orientación landscape en móviles
- El tema se persiste en localStorage
- Los bottom tabs están optimizados para landscape
- La app es completamente responsive y funcional como PWA

