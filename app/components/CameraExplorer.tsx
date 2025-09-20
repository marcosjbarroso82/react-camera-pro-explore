import { useState, useEffect, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import type { CameraParameters, CameraInfo, PhotoData, Preset, FixedPresets } from '../types/camera';
import { ParameterControls } from './ParameterControls';
import { PresetManager } from './PresetManager';
import { CameraInfoPanel } from './CameraInfoPanel';
import { PhotoGallery } from './PhotoGallery';
import { CameraOverlay } from './CameraOverlay';

const FIXED_PRESETS: FixedPresets = {
  'high-quality': {
    id: 'high-quality',
    name: 'Alta Calidad',
    parameters: {
      width: 1920,
      height: 1080,
      quality: 0.9,
      facing: 'back',
      flash: 'auto',
      zoom: 1,
      focus: 'auto',
      whiteBalance: 'auto',
      exposure: 0
    },
    isFixed: true,
    isEditable: false
  },
  'document-ocr': {
    id: 'document-ocr',
    name: 'Foto de Documento para OCR',
    parameters: {
      width: 1920,
      height: 1080,
      quality: 0.95,
      facing: 'back',
      flash: 'on',
      zoom: 1,
      focus: 'manual',
      whiteBalance: 'auto',
      exposure: 0.2
    },
    isFixed: true,
    isEditable: false
  },
  'screen-ocr': {
    id: 'screen-ocr',
    name: 'Foto de Pantalla para OCR',
    parameters: {
      width: 1920,
      height: 1080,
      quality: 0.9,
      facing: 'back',
      flash: 'off',
      zoom: 1,
      focus: 'auto',
      whiteBalance: 'auto',
      exposure: -0.2
    },
    isFixed: true,
    isEditable: false
  }
};

export default function CameraExplorer() {
  const [cameraParameters, setCameraParameters] = useState<CameraParameters>({
    width: 1920,
    height: 1080,
    quality: 0.8,
    facing: 'back',
    flash: 'auto',
    zoom: 1,
    focus: 'auto',
    whiteBalance: 'auto',
    exposure: 0
  });

  const [cameraInfo, setCameraInfo] = useState<CameraInfo | null>(null);
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [customPresets, setCustomPresets] = useState<Preset[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'parameters' | 'presets' | 'camera-info'>('parameters');
  
  const cameraRef = useRef<any>(null);

  // Load photos and custom presets from localStorage on mount
  useEffect(() => {
    // Load photos
    try {
      const savedPhotos = localStorage.getItem('camera-photos');
      if (savedPhotos) {
        const parsedPhotos = JSON.parse(savedPhotos);
        if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
          setPhotos(parsedPhotos);
        }
      }
    } catch (error) {
      console.error('Error loading photos from localStorage:', error);
      localStorage.removeItem('camera-photos');
    }

    // Load presets
    try {
      const savedPresets = localStorage.getItem('camera-presets');
      if (savedPresets) {
        const parsedPresets = JSON.parse(savedPresets);
        if (Array.isArray(parsedPresets)) {
          setCustomPresets(parsedPresets);
        }
      }
    } catch (error) {
      console.error('Error loading presets from localStorage:', error);
      localStorage.removeItem('camera-presets');
    }
  }, []);

  // Save photos to localStorage whenever photos change
  useEffect(() => {
    try {
      localStorage.setItem('camera-photos', JSON.stringify(photos));
    } catch (error) {
      console.error('Error saving photos to localStorage:', error);
    }
  }, [photos]);

  // Save custom presets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('camera-presets', JSON.stringify(customPresets));
  }, [customPresets]);

  const handleParameterChange = (newParameters: Partial<CameraParameters>) => {
    setCameraParameters(prev => ({ ...prev, ...newParameters }));
  };

  const handleApplyParameters = () => {
    // Parameters are applied immediately when changed
    // This function can be used for additional validation or effects
    console.log('Parameters applied:', cameraParameters);
  };

  const handlePresetSelect = (preset: Preset) => {
    setCameraParameters(preset.parameters);
  };

  const handlePresetClone = (preset: Preset) => {
    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name: `${preset.name} (Copia)`,
      parameters: { ...preset.parameters },
      isFixed: false,
      isEditable: true
    };
    setCustomPresets(prev => [...prev, newPreset]);
  };

  const handlePresetSave = (preset: Preset) => {
    setCustomPresets(prev => 
      prev.map(p => p.id === preset.id ? preset : p)
    );
  };

  const handlePresetDelete = (presetId: string) => {
    setCustomPresets(prev => prev.filter(p => p.id !== presetId));
  };

  const handleCapturePhoto = () => {
    if (cameraRef.current && cameraRef.current.takePhoto) {
      try {
        const image = cameraRef.current.takePhoto('base64url');
        const newPhoto: PhotoData = {
          id: `photo-${Date.now()}`,
          dataUrl: image,
          timestamp: Date.now(),
          parameters: { ...cameraParameters },
          cameraInfo: cameraInfo || {
            deviceId: 'unknown',
            label: 'Unknown Camera',
            facing: cameraParameters.facing,
            capabilities: {
              flash: true,
              zoom: true,
              focus: true,
              whiteBalance: true,
              exposure: true
            },
            supportedResolutions: [{ width: 1920, height: 1080 }]
          }
        };
        setPhotos(prev => [newPhoto, ...prev]);
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handleCameraInfoUpdate = (info: CameraInfo) => {
    setCameraInfo(info);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700`}>
        <div className="p-4 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Configuración</h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
            >
              {isSidebarOpen ? '←' : '→'}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4 border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('parameters')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'parameters'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Parámetros
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'presets'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Presets
            </button>
            <button
              onClick={() => setActiveTab('camera-info')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'camera-info'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Cámara
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'parameters' && (
              <ParameterControls
                parameters={cameraParameters}
                onParameterChange={handleParameterChange}
                onApply={handleApplyParameters}
              />
            )}
            {activeTab === 'presets' && (
              <PresetManager
                fixedPresets={FIXED_PRESETS}
                customPresets={customPresets}
                onPresetSelect={handlePresetSelect}
                onPresetClone={handlePresetClone}
                onPresetSave={handlePresetSave}
                onPresetDelete={handlePresetDelete}
              />
            )}
            {activeTab === 'camera-info' && (
              <CameraInfoPanel
                cameraInfo={cameraInfo}
                onCameraInfoUpdate={handleCameraInfoUpdate}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Camera Area */}
        <div className="flex-1 relative bg-slate-900">
          <Camera
            ref={cameraRef}
            facingMode={cameraParameters.facing as 'user' | 'environment'}
            aspectRatio={cameraParameters.width / cameraParameters.height}
            errorMessages={{
              noCameraAccessible: 'No se puede acceder a la cámara',
              permissionDenied: 'Permiso denegado para acceder a la cámara',
              switchCamera: 'Error al cambiar de cámara',
              canvas: 'Error al procesar la imagen'
            }}
            videoReadyCallback={() => {
              console.log('Cámara lista');
            }}
          />
          
          {/* Camera Overlay */}
          <CameraOverlay parameters={cameraParameters} />
        </div>

        {/* Bottom Controls */}
        <div className="bg-white dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleCapturePhoto}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              📸 Capturar Foto
            </button>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery
        photos={photos}
        onDeletePhoto={handleDeletePhoto}
      />
    </div>
  );
}
