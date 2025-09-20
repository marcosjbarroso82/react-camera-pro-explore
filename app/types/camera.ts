/**
 * Parámetros de cámara soportados por react-camera-pro
 * 
 * LIMITACIONES IMPORTANTES:
 * - react-camera-pro NO soporta control de resolución (width/height)
 * - react-camera-pro NO soporta control de calidad, flash, zoom, focus, whiteBalance, exposure
 * - Solo soporta: facingMode y aspectRatio
 * - La resolución se determina automáticamente por la cámara (usualmente FullHD)
 * - La calidad de captura es fija (JPEG con máxima calidad disponible)
 */
export interface CameraParameters {
  // ✅ SOPORTADO: Cámara frontal o trasera
  facing: 'front' | 'back';
  
  // ✅ SOPORTADO: Relación de aspecto (se calcula como width/height)
  aspectRatio: number;
  
  // ❌ NO SOPORTADO: Resolución específica (react-camera-pro usa resolución automática)
  // width: number;
  // height: number;
  
  // ❌ NO SOPORTADO: Calidad de captura (react-camera-pro usa calidad fija)
  // quality: number;
  
  // ❌ NO SOPORTADO: Control de flash (no disponible en la API)
  // flash: 'auto' | 'on' | 'off';
  
  // ❌ NO SOPORTADO: Zoom (no disponible en la API)
  // zoom: number;
  
  // ❌ NO SOPORTADO: Control de enfoque (no disponible en la API)
  // focus: 'auto' | 'manual';
  
  // ❌ NO SOPORTADO: Balance de blancos (no disponible en la API)
  // whiteBalance: 'auto' | 'manual';
  
  // ❌ NO SOPORTADO: Control de exposición (no disponible en la API)
  // exposure: number;
}

export interface CameraInfo {
  deviceId: string;
  label: string;
  facing: 'front' | 'back';
  capabilities: {
    flash: boolean;
    zoom: boolean;
    focus: boolean;
    whiteBalance: boolean;
    exposure: boolean;
  };
  supportedResolutions: Array<{ width: number; height: number }>;
  technicalSpecs?: {
    aperture?: string;
    iso?: string;
    focalLength?: string;
  };
}

export interface PhotoData {
  id: string;
  dataUrl: string;
  timestamp: number;
  parameters: CameraParameters;
  cameraInfo: CameraInfo;
}

export interface Preset {
  id: string;
  name: string;
  parameters: CameraParameters;
  isFixed: boolean;
  isEditable: boolean;
}

export interface FixedPresets {
  [key: string]: Preset;
}
