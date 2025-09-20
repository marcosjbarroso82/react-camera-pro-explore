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
      {/* Resolution */}
      <div>
        <label className="block text-sm font-medium mb-2">Resolución</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Ancho</label>
            <input
              type="number"
              value={parameters.width}
              onChange={(e) => handleChange('width', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
              min="320"
              max="4096"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Alto</label>
            <input
              type="number"
              value={parameters.height}
              onChange={(e) => handleChange('height', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
              min="240"
              max="2160"
            />
          </div>
        </div>
      </div>

      {/* Quality */}
      <div>
        <label className="block text-sm font-medium mb-2">Calidad</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={parameters.quality}
          onChange={(e) => handleChange('quality', parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-1">
          <span>Baja</span>
          <span>{Math.round(parameters.quality * 100)}%</span>
          <span>Alta</span>
        </div>
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

      {/* Flash */}
      <div>
        <label className="block text-sm font-medium mb-2">Flash</label>
        <select
          value={parameters.flash}
          onChange={(e) => handleChange('flash', e.target.value as 'auto' | 'on' | 'off')}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
        >
          <option value="auto">Automático</option>
          <option value="on">Encendido</option>
          <option value="off">Apagado</option>
        </select>
      </div>

      {/* Zoom */}
      <div>
        <label className="block text-sm font-medium mb-2">Zoom</label>
        <input
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={parameters.zoom}
          onChange={(e) => handleChange('zoom', parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-1">
          <span>1x</span>
          <span>{parameters.zoom.toFixed(1)}x</span>
          <span>5x</span>
        </div>
      </div>

      {/* Focus */}
      <div>
        <label className="block text-sm font-medium mb-2">Enfoque</label>
        <select
          value={parameters.focus}
          onChange={(e) => handleChange('focus', e.target.value as 'auto' | 'manual')}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
        >
          <option value="auto">Automático</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* White Balance */}
      <div>
        <label className="block text-sm font-medium mb-2">Balance de Blancos</label>
        <select
          value={parameters.whiteBalance}
          onChange={(e) => handleChange('whiteBalance', e.target.value as 'auto' | 'manual')}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
        >
          <option value="auto">Automático</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Exposure */}
      <div>
        <label className="block text-sm font-medium mb-2">Exposición</label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={parameters.exposure}
          onChange={(e) => handleChange('exposure', parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-1">
          <span>-2</span>
          <span>{parameters.exposure.toFixed(1)}</span>
          <span>+2</span>
        </div>
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
