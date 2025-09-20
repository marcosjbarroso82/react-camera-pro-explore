import type { CameraParameters } from '../types/camera';

interface CameraOverlayProps {
  parameters: CameraParameters;
  isCapturing?: boolean;
  captureStatus?: string;
}

export function CameraOverlay({ parameters, isCapturing, captureStatus }: CameraOverlayProps) {
  return (
    <>
      {/* Top overlay - compact for mobile */}
      <div className="absolute top-2 left-2 right-2 z-10">
        <div className="bg-black bg-opacity-60 text-white rounded-lg p-2 backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Cámara:</span>
              <span className="font-mono">{parameters.facing === 'back' ? 'Trasera' : 'Frontal'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Aspecto:</span>
              <span className="font-mono">{parameters.aspectRatio.toFixed(1)}:1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Capture status overlay - center */}
      {isCapturing && captureStatus && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">{captureStatus}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom info overlay */}
      <div className="absolute bottom-2 left-2 right-2 z-10">
        <div className="bg-black bg-opacity-60 text-white rounded-lg p-2 backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Res:</span>
              <span className="font-mono text-yellow-400">Auto</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Cal:</span>
              <span className="font-mono text-yellow-400">Max</span>
            </div>
            <div className="text-slate-400 text-xs">
              ⚠️ Solo cámara y aspecto configurables
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
