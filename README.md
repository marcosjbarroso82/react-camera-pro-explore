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

### ⚠️ Limitaciones de react-camera-pro

**IMPORTANTE**: Esta aplicación usa `react-camera-pro` que tiene limitaciones significativas:

- ❌ **NO soporta control de resolución** (width/height)
- ❌ **NO soporta control de calidad** de captura
- ❌ **NO soporta control de flash, zoom, enfoque, balance de blancos, exposición**
- ✅ **Solo soporta**: cámara frontal/trasera y relación de aspecto
- 📷 **Resolución**: Se determina automáticamente (usualmente FullHD)
- 🎯 **Calidad**: Fija en máxima calidad disponible

### 🎛️ Panel de Configuración
- **Sidebar lateral** con controles de parámetros
- **Parámetros disponibles**: Solo Cámara (front/back) y Relación de Aspecto
- **Documentación clara**: Advertencias sobre limitaciones de la librería
- **Aplicación**: Botón "Apply" para confirmar cambios

### 📱 Preview de Cámara
- **Overlay de parámetros**: Siempre visible superpuesto sobre el preview
- **Información en tiempo real**: Solo parámetros soportados mostrados
- **Advertencias**: Indicaciones claras sobre limitaciones

### 🏷️ Sistema de Presets
- **Presets fijos** (no editables, no borrables):
  - "Paisaje (16:9)" - Relación de aspecto horizontal
  - "Retrato (4:3)" - Relación de aspecto vertical clásica
  - "Cuadrado (1:1)" - Relación de aspecto cuadrada
  - "Selfie (9:16)" - Relación de aspecto vertical para selfies
- **Presets personalizados**: Crear, guardar, nombrar y editar
- **Clonación**: Todos los presets se pueden clonar para crear nuevos
- **Aplicación directa**: Los presets se aplican al seleccionarlos

### 🖼️ Gestión de Fotos
- **Almacenamiento**: localStorage para persistencia
- **Información**: Solo parámetros soportados mostrados junto a cada foto
- **Eliminación**: Botón para borrar fotos individualmente

### 📊 Panel de Información de Cámara
- **Panel separado** con información técnica
- **Información básica**: Tipo de cámara y orientación
- **Limitaciones documentadas**: Advertencias sobre capacidades no disponibles
- **Resolución**: Información sobre resolución automática

## 🔧 Configuración

- **Deploy automático** - Solo con `npm run deploy`
- **GitHub Pages** - Configurado automáticamente
- **Rutas SPA** - Funcionan correctamente en GitHub Pages