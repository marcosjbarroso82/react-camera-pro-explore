# 📷 React Camera Pro Explorer

Una aplicación PWA para explorar la librería `react-camera-pro` con diseño optimizado para landscape en móviles.

## 🚀 Deploy Súper Simple

**Un solo comando para hacer deploy:**

```bash
npm run deploy
```

¡Eso es todo! Tu app estará disponible en:
`https://marcosjbarroso82.github.io/react-camera-pro-explore/`

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Deploy a producción
npm run deploy
```

## 📱 Características

- **PWA** - Se puede instalar en móviles
- **Tema oscuro/claro** - Con persistencia en localStorage
- **Orientación landscape** - Optimizada para móviles
- **Bottom tabs** - Navegación intuitiva
- **Diseño minimalista** - Enfocado en funcionalidad

## 🎯 Páginas

- **📷 Camera** - Exploración avanzada de funcionalidades de cámara con configuración de parámetros
- **🖼️ Gallery** - Galería de fotos con estadísticas y parámetros de captura
- **⚙️ Settings** - Configuraciones de la app

## 🔧 Funcionalidades de Cámara

### 🎛️ Panel de Configuración
- **Sidebar lateral** con controles de parámetros
- **Parámetros disponibles**: Resolución, Calidad, Facing (front/back), Flash, Zoom, Focus, White balance, Exposure
- **Aplicación**: Botón "Apply" para confirmar cambios

### 📱 Preview de Cámara
- **Overlay de parámetros**: Siempre visible superpuesto sobre el preview
- **Información en tiempo real**: Parámetros actuales mostrados en el overlay

### 🏷️ Sistema de Presets
- **Presets fijos** (no editables, no borrables):
  - "Alta Calidad" - Máxima resolución y mejor calidad
  - "Foto de Documento para OCR" - Optimizado para documentos
  - "Foto de Pantalla para OCR" - Optimizado para capturas de pantalla
- **Presets personalizados**: Crear, guardar, nombrar y editar
- **Clonación**: Todos los presets se pueden clonar para crear nuevos
- **Aplicación directa**: Los presets se aplican al seleccionarlos

### 🖼️ Gestión de Fotos
- **Almacenamiento**: localStorage para persistencia
- **Información**: Parámetros de captura mostrados junto a cada foto
- **Eliminación**: Botón para borrar fotos individualmente

### 📊 Panel de Información de Cámara
- **Panel separado** con información técnica
- **Información básica**: Tipo de cámara, resoluciones disponibles, capacidades
- **Información técnica**: Apertura, ISO, etc. (si está disponible)

## 🔧 Configuración

- **Deploy automático** - Solo con `npm run deploy`
- **GitHub Pages** - Configurado automáticamente
- **Rutas SPA** - Funcionan correctamente en GitHub Pages