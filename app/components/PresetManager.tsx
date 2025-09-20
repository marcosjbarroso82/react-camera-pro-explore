import { useState } from 'react';
import type { Preset, FixedPresets } from '../types/camera';

interface PresetManagerProps {
  fixedPresets: FixedPresets;
  customPresets: Preset[];
  onPresetSelect: (preset: Preset) => void;
  onPresetClone: (preset: Preset) => void;
  onPresetSave: (preset: Preset) => void;
  onPresetDelete: (presetId: string) => void;
}

export function PresetManager({ 
  fixedPresets, 
  customPresets, 
  onPresetSelect, 
  onPresetClone, 
  onPresetSave, 
  onPresetDelete 
}: PresetManagerProps) {
  const [editingPreset, setEditingPreset] = useState<Preset | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');

  const handleCreatePreset = () => {
    if (newPresetName.trim()) {
      const newPreset: Preset = {
        id: `custom-${Date.now()}`,
        name: newPresetName.trim(),
        parameters: {
          width: 1920,
          height: 1080,
          quality: 0.8,
          facing: 'back',
          flash: 'auto',
          zoom: 1,
          focus: 'auto',
          whiteBalance: 'auto',
          exposure: 0
        },
        isFixed: false,
        isEditable: true
      };
      onPresetSave(newPreset);
      setNewPresetName('');
      setShowCreateForm(false);
    }
  };

  const handleEditPreset = (preset: Preset) => {
    setEditingPreset(preset);
  };

  const handleSaveEdit = () => {
    if (editingPreset) {
      onPresetSave(editingPreset);
      setEditingPreset(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPreset(null);
  };

  const handleDeletePreset = (presetId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este preset?')) {
      onPresetDelete(presetId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Create New Preset */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          + Crear Nuevo Preset
        </button>
        
        {showCreateForm && (
          <div className="mt-3 space-y-2">
            <input
              type="text"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="Nombre del preset"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreatePreset}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Crear
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-3 py-1 bg-slate-500 text-white rounded text-sm hover:bg-slate-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Presets */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Presets Fijos</h3>
        <div className="space-y-2">
          {Object.values(fixedPresets).map((preset) => (
            <div key={preset.id} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{preset.name}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onPresetSelect(preset)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                  >
                    Usar
                  </button>
                  <button
                    onClick={() => onPresetClone(preset)}
                    className="px-2 py-1 bg-slate-600 text-white rounded text-xs hover:bg-slate-700"
                  >
                    Clonar
                  </button>
                </div>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {preset.parameters.width}x{preset.parameters.height} • 
                {Math.round(preset.parameters.quality * 100)}% • 
                {preset.parameters.facing === 'back' ? 'Trasera' : 'Frontal'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Presets */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Presets Personalizados</h3>
        <div className="space-y-2">
          {customPresets.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
              No hay presets personalizados
            </p>
          ) : (
            customPresets.map((preset) => (
              <div key={preset.id} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                {editingPreset?.id === preset.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingPreset.name}
                      onChange={(e) => setEditingPreset({ ...editingPreset, name: e.target.value })}
                      className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleSaveEdit}
                        className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-2 py-1 bg-slate-500 text-white rounded text-xs hover:bg-slate-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{preset.name}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onPresetSelect(preset)}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                        >
                          Usar
                        </button>
                        <button
                          onClick={() => onPresetClone(preset)}
                          className="px-2 py-1 bg-slate-600 text-white rounded text-xs hover:bg-slate-700"
                        >
                          Clonar
                        </button>
                        <button
                          onClick={() => handleEditPreset(preset)}
                          className="px-2 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeletePreset(preset.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {preset.parameters.width}x{preset.parameters.height} • 
                      {Math.round(preset.parameters.quality * 100)}% • 
                      {preset.parameters.facing === 'back' ? 'Trasera' : 'Frontal'}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
