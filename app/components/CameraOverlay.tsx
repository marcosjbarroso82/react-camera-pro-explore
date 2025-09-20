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
            <span className="text-slate-300">Cámara:</span>
            <span className="font-mono">{parameters.facing === 'back' ? 'Trasera' : 'Frontal'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Aspecto:</span>
            <span className="font-mono">{parameters.aspectRatio.toFixed(2)}:1</span>
          </div>
          <div className="col-span-2 flex justify-between">
            <span className="text-slate-300">Resolución:</span>
            <span className="font-mono text-yellow-400">Auto (FullHD)</span>
          </div>
          <div className="col-span-2 flex justify-between">
            <span className="text-slate-300">Calidad:</span>
            <span className="font-mono text-yellow-400">Máxima</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-600">
          <p className="text-xs text-slate-400 text-center">
            ⚠️ Solo cámara y aspecto son configurables
          </p>
        </div>
      </div>
    </div>
  );
}
