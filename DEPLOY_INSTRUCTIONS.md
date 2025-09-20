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

## 🎯 Deploy Manual (Recomendado)

### **Opción 1: Desde GitHub (Más Fácil)**
1. Ve a tu repositorio en GitHub
2. Pestaña **"Actions"**
3. Selecciona **"Deploy to GitHub Pages"**
4. Botón **"Run workflow"**
5. Selecciona la rama (master)
6. **Run workflow**

### **Opción 2: Con Tags de Versión**
```bash
# Crear un tag para deploy
git tag v1.0.0
git push origin v1.0.0

# Esto automáticamente ejecutará el deploy
```

### **Opción 3: Deploy Local (Respaldo)**
```bash
# Deploy local directo
npm run deploy:local

# O paso a paso
npm run build
npm run deploy
```

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Build para producción
npm run start            # Servidor de producción local

# Deploy
npm run deploy:local     # Deploy local (build + deploy)
npm run deploy:tag       # Crear tag y deploy automático
npm run deploy           # Solo deploy (requiere build previo)
```

## ✅ Verificar el Deploy

1. Ve a tu repositorio en GitHub
2. En la pestaña "Actions" verás el workflow ejecutándose
3. Una vez completado, tu app estará disponible en:
   `https://marcosjbarroso82.github.io/react-camera-pro-explore`

## 🔧 Solución de Problemas

### **Error 404 en Rutas**
Si ves un 404 al navegar a rutas como `/camera` o `/settings`:

1. **Verifica que los archivos estén incluidos:**
   - `public/404.html` ✅
   - `public/.nojekyll` ✅
   - `public/index.html` ✅

2. **Haz un nuevo deploy:**
   ```bash
   npm run deploy:local
   ```

3. **Espera 5-10 minutos** para que GitHub Pages actualice

### **Página en Blanco o Error de Manifest**
Si ves una página en blanco o errores de manifest.json:

1. **Verifica la configuración de Vite:**
   - `vite.config.ts` está configurado para copiar archivos públicos ✅
   - `publicDir: 'public'` está configurado ✅

2. **Verifica que los archivos estén en public/:**
   - `public/manifest.json` ✅
   - `public/sw.js` ✅
   - `public/favicon.ico` ✅

3. **Haz un build limpio:**
   ```bash
   rm -rf build/
   npm run build
   npm run deploy
   ```

4. **Verifica en la consola del navegador:**
   - Abre DevTools (F12)
   - Ve a la pestaña Network
   - Recarga la página
   - Verifica que manifest.json se cargue correctamente

### **La App No Carga**
- Verifica que el build sea exitoso
- Revisa la consola del navegador para errores
- Asegúrate de que el manifest.json esté accesible
- Verifica que no haya errores de CORS

## 🔧 Configuración PWA

La app está configurada como PWA y se puede instalar en dispositivos móviles:

- **Manifest:** `/public/manifest.json`
- **Service Worker:** `/public/sw.js`
- **Orientación:** Landscape (optimizada para móviles)
- **Tema:** Oscuro por defecto con toggle

## 📱 Estructura de la App

- **📷 Camera:** Página principal para explorar funcionalidades de cámara
- **🖼️ Gallery:** Galería de fotos con estadísticas
- **⚙️ Settings:** Configuraciones de la app y cámara

## 🎯 Ventajas del Deploy Manual

- **Control total** sobre cuándo se hace deploy
- **No deploy accidental** de código en desarrollo
- **Deploy solo cuando esté listo** para producción
- **Historial limpio** de releases

## 📝 Notas Importantes

- La app está optimizada para orientación landscape en móviles
- El tema se persiste en localStorage
- Los bottom tabs están optimizados para landscape
- La app es completamente responsive y funcional como PWA
- **El deploy NO es automático** - solo manual o con tags
- **Archivos 404.html y .nojekyll** están incluidos para GitHub Pages
- **Vite está configurado** para copiar archivos públicos correctamente