import type { CameraInfo } from '../types/camera';

interface CameraInfoPanelProps {
  cameraInfo: CameraInfo | null;
  onCameraInfoUpdate: (info: CameraInfo) => void;
}

export function CameraInfoPanel({ cameraInfo, onCameraInfoUpdate }: CameraInfoPanelProps) {
  if (!cameraInfo) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📷</div>
        <p className="text-slate-600 dark:text-slate-400">
          Inicializando cámara...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Basic Info */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Información Básica</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Dispositivo:</span>
            <span className="font-medium">{cameraInfo.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">ID:</span>
            <span className="font-mono text-xs">{cameraInfo.deviceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Orientación:</span>
            <span className="font-medium">
              {cameraInfo.facing === 'back' ? 'Trasera' : 'Frontal'}
            </span>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Capacidades</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${cameraInfo.capabilities.flash ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>Flash</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${cameraInfo.capabilities.zoom ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>Zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${cameraInfo.capabilities.focus ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>Enfoque</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${cameraInfo.capabilities.whiteBalance ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>Balance Blancos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${cameraInfo.capabilities.exposure ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>Exposición</span>
          </div>
        </div>
      </div>

      {/* Supported Resolutions */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Resoluciones Soportadas</h3>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {cameraInfo.supportedResolutions.map((resolution, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {resolution.width} × {resolution.height}
              </span>
              <span className="text-slate-500 dark:text-slate-500">
                {Math.round((resolution.width * resolution.height) / 1000000 * 10) / 10}MP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specs */}
      {cameraInfo.technicalSpecs && (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Especificaciones Técnicas</h3>
          <div className="space-y-2 text-sm">
            {cameraInfo.technicalSpecs.aperture && (
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Apertura:</span>
                <span className="font-medium">{cameraInfo.technicalSpecs.aperture}</span>
              </div>
            )}
            {cameraInfo.technicalSpecs.iso && (
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">ISO:</span>
                <span className="font-medium">{cameraInfo.technicalSpecs.iso}</span>
              </div>
            )}
            {cameraInfo.technicalSpecs.focalLength && (
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Distancia Focal:</span>
                <span className="font-medium">{cameraInfo.technicalSpecs.focalLength}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={() => {
          // This would trigger a camera refresh
          console.log('Refreshing camera info...');
        }}
        className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
      >
        🔄 Actualizar Información
      </button>
    </div>
  );
}
