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

      {/* Capabilities - Limited by react-camera-pro */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Capacidades</h3>
        <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
          <p className="text-yellow-800 dark:text-yellow-200">
            ⚠️ react-camera-pro no expone estas capacidades. Solo se muestran para referencia.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="text-slate-500">Flash (N/A)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="text-slate-500">Zoom (N/A)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="text-slate-500">Enfoque (N/A)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="text-slate-500">Balance Blancos (N/A)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="text-slate-500">Exposición (N/A)</span>
          </div>
        </div>
      </div>

      {/* Supported Resolutions - Limited by react-camera-pro */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Resoluciones Soportadas</h3>
        <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
          <p className="text-yellow-800 dark:text-yellow-200">
            ⚠️ react-camera-pro usa resolución automática (usualmente FullHD)
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Resolución Actual:
            </span>
            <span className="text-slate-500 dark:text-slate-500">
              Auto (FullHD)
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Control Manual:
            </span>
            <span className="text-red-500">
              No Disponible
            </span>
          </div>
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
