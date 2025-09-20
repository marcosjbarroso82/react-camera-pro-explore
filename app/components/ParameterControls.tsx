import type { CameraParameters } from '../types/camera';

interface ParameterControlsProps {
  parameters: CameraParameters;
  onParameterChange: (parameters: Partial<CameraParameters>) => void;
  onApply: () => void;
}

export function ParameterControls({ parameters, onParameterChange, onApply }: ParameterControlsProps) {
  const handleChange = (key: keyof CameraParameters, value: any) => {
    onParameterChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Información sobre limitaciones */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          ⚠️ Limitaciones de react-camera-pro
        </h3>
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          Esta librería solo soporta cámara frontal/trasera y relación de aspecto. 
          No permite control de resolución, calidad, flash, zoom, enfoque, balance de blancos o exposición.
        </p>
      </div>

      {/* Facing */}
      <div>
        <label className="block text-sm font-medium mb-2">Cámara</label>
        <select
          value={parameters.facing}
          onChange={(e) => handleChange('facing', e.target.value as 'front' | 'back')}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
        >
          <option value="back">Trasera</option>
          <option value="front">Frontal</option>
        </select>
      </div>

      {/* Aspect Ratio */}
      <div>
        <label className="block text-sm font-medium mb-2">Relación de Aspecto</label>
        <select
          value={parameters.aspectRatio}
          onChange={(e) => handleChange('aspectRatio', parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
        >
          <option value={16/9}>16:9 (Paisaje)</option>
          <option value={4/3}>4:3 (Retrato)</option>
          <option value={1}>1:1 (Cuadrado)</option>
          <option value={9/16}>9:16 (Vertical)</option>
          <option value={3/2}>3:2 (Clásica)</option>
        </select>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Actual: {parameters.aspectRatio.toFixed(2)}:1
        </p>
      </div>

      {/* Información sobre resolución */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
          📷 Resolución de Captura
        </h4>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          La resolución se determina automáticamente por la cámara (usualmente FullHD o máxima disponible).
          No es configurable con esta librería.
        </p>
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Aplicar Cambios
      </button>
    </div>
  );
}
