export interface CameraParameters {
  width: number;
  height: number;
  quality: number;
  facing: 'front' | 'back';
  flash: 'auto' | 'on' | 'off';
  zoom: number;
  focus: 'auto' | 'manual';
  whiteBalance: 'auto' | 'manual';
  exposure: number;
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
