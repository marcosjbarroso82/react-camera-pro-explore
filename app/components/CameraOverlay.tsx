import type { CameraParameters } from '../types/camera';

interface CameraOverlayProps {
  parameters: CameraParameters;
}

export function CameraOverlay({ parameters }: CameraOverlayProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <div className="bg-black bg-opacity-75 text-white rounded-lg p-3 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-300">Resolución:</span>
            <span className="font-mono">{parameters.width}×{parameters.height}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Calidad:</span>
            <span className="font-mono">{Math.round(parameters.quality * 100)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Cámara:</span>
            <span className="font-mono">{parameters.facing === 'back' ? 'Trasera' : 'Frontal'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Flash:</span>
            <span className="font-mono">
              {parameters.flash === 'auto' ? 'Auto' : parameters.flash === 'on' ? 'On' : 'Off'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Zoom:</span>
            <span className="font-mono">{parameters.zoom.toFixed(1)}x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Enfoque:</span>
            <span className="font-mono">{parameters.focus === 'auto' ? 'Auto' : 'Manual'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Balance:</span>
            <span className="font-mono">{parameters.whiteBalance === 'auto' ? 'Auto' : 'Manual'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Exposición:</span>
            <span className="font-mono">{parameters.exposure > 0 ? '+' : ''}{parameters.exposure.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
