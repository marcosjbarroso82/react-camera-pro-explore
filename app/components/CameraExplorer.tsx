import { useState, useEffect, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import type { CameraParameters, CameraInfo, PhotoData, Preset, FixedPresets } from '../types/camera';
import { ParameterControls } from './ParameterControls';
import { PresetManager } from './PresetManager';
import { CameraInfoPanel } from './CameraInfoPanel';
import { PhotoGallery } from './PhotoGallery';
import { CameraOverlay } from './CameraOverlay';

const FIXED_PRESETS: FixedPresets = {
  'landscape': {
    id: 'landscape',
    name: 'Paisaje (16:9)',
    parameters: {
      facing: 'back',
      aspectRatio: 16/9
    },
    isFixed: true,
    isEditable: false
  },
  'portrait': {
    id: 'portrait',
    name: 'Retrato (4:3)',
    parameters: {
      facing: 'back',
      aspectRatio: 4/3
    },
    isFixed: true,
    isEditable: false
  },
  'square': {
    id: 'square',
    name: 'Cuadrado (1:1)',
    parameters: {
      facing: 'back',
      aspectRatio: 1
    },
    isFixed: true,
    isEditable: false
  },
  'selfie': {
    id: 'selfie',
    name: 'Selfie (9:16)',
    parameters: {
      facing: 'front',
      aspectRatio: 9/16
    },
    isFixed: true,
    isEditable: false
  }
};

export default function CameraExplorer() {
  const [cameraParameters, setCameraParameters] = useState<CameraParameters>({
    facing: 'back',
    aspectRatio: 16/9
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
    
    // Si cambió la cámara (facing), usar switchCamera() si está disponible
    if (newParameters.facing && cameraRef.current && cameraRef.current.switchCamera) {
      try {
        const newFacing = newParameters.facing === 'back' ? 'environment' : 'user';
        cameraRef.current.switchCamera();
        console.log('Cámara cambiada a:', newFacing);
      } catch (error) {
        console.error('Error cambiando cámara:', error);
      }
    }
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

  const [isCapturing, setIsCapturing] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<string>('');

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

  const handleQuickCapture = async () => {
    if (!cameraRef.current || !cameraRef.current.takePhoto || isCapturing) {
      return;
    }

    setIsCapturing(true);
    setCaptureStatus('Estabilizando imagen...');

    try {
      // Paso 1: Estabilización (esperar un momento para que la imagen se estabilice)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCaptureStatus('Enfocando...');
      
      // Paso 2: Simular foco automático (la cámara ya maneja esto internamente)
      // En dispositivos móviles, el foco se activa automáticamente al tocar la pantalla
      // o al llamar takePhoto()
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCaptureStatus('Capturando...');
      
      // Paso 3: Capturar la foto
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
      setCaptureStatus('¡Foto capturada!');
      
      // Mostrar mensaje de éxito por un momento
      setTimeout(() => {
        setCaptureStatus('');
      }, 1000);
      
    } catch (error) {
      console.error('Error capturing photo:', error);
      setCaptureStatus('Error al capturar');
      setTimeout(() => {
        setCaptureStatus('');
      }, 2000);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handleCameraInfoUpdate = (info: CameraInfo) => {
    setCameraInfo(info);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Camera Area - Top */}
      <div className="flex-1 relative bg-slate-900 min-h-[50vh]">
        <Camera
          ref={cameraRef}
          facingMode={cameraParameters.facing as 'user' | 'environment'}
          aspectRatio={cameraParameters.aspectRatio}
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
        <CameraOverlay 
          parameters={cameraParameters} 
          isCapturing={isCapturing}
          captureStatus={captureStatus}
        />
      </div>

      {/* Bottom Controls */}
      <div className="bg-white dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleCapturePhoto}
            className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
          >
            📸 Captura Normal
          </button>
          <button
            onClick={handleQuickCapture}
            disabled={isCapturing}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isCapturing
                ? 'bg-yellow-500 text-white cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
            }`}
          >
            {isCapturing ? '⏳ Procesando...' : '⚡ Captura Rápida'}
          </button>
        </div>
        
        {/* Status indicator */}
        {captureStatus && (
          <div className="mt-3 text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              captureStatus.includes('Error') 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                : captureStatus.includes('¡Foto capturada!')
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                captureStatus.includes('Error') 
                  ? 'bg-red-500'
                  : captureStatus.includes('¡Foto capturada!')
                  ? 'bg-green-500'
                  : 'bg-blue-500 animate-pulse'
              }`}></div>
              {captureStatus}
            </div>
          </div>
        )}
      </div>

      {/* Photo Gallery - Below Camera */}
      <div className="border-t border-slate-200 dark:border-slate-700">
        <PhotoGallery
          photos={photos}
          onDeletePhoto={handleDeletePhoto}
        />
      </div>

      {/* Settings - Bottom */}
      <div className="border-t border-slate-200 dark:border-slate-700">
        <div className="bg-slate-50 dark:bg-slate-800">
          {/* Settings Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold">Configuración</h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
            >
              {isSidebarOpen ? 'Ocultar' : 'Mostrar'} Configuración
            </button>
          </div>

          {/* Settings Content */}
          {isSidebarOpen && (
            <div className="p-4">
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
              <div className="max-h-64 overflow-y-auto">
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
          )}
        </div>
      </div>
    </div>
  );
}
