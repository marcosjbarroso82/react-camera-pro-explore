import { useState, useEffect } from 'react';
import type { PhotoData } from '../types/camera';

interface PhotoGalleryProps {
  photos: PhotoData[];
  onDeletePhoto: (photoId: string) => void;
}

export function PhotoGallery({ photos, onDeletePhoto }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handlePhotoClick = (photo: PhotoData) => {
    const index = photos.findIndex(p => p.id === photo.id);
    setCurrentPhotoIndex(index);
    setSelectedPhoto(photo);
  };

  const handlePreviousPhoto = () => {
    if (currentPhotoIndex > 0) {
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(photos[newIndex]);
    }
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) {
      const newIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(photos[newIndex]);
    }
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
    setCurrentPhotoIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      if (event.key === 'ArrowLeft') {
        handlePreviousPhoto();
      } else if (event.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedPhoto, currentPhotoIndex, photos.length]);

  const formatParameters = (parameters: PhotoData['parameters']) => {
    return {
      resolución: `${parameters.width}×${parameters.height}`,
      calidad: `${Math.round(parameters.quality * 100)}%`,
      cámara: parameters.facing === 'back' ? 'Trasera' : 'Frontal',
      flash: parameters.flash === 'auto' ? 'Auto' : parameters.flash === 'on' ? 'On' : 'Off',
      zoom: `${parameters.zoom.toFixed(1)}x`,
      enfoque: parameters.focus === 'auto' ? 'Auto' : 'Manual',
      balance: parameters.whiteBalance === 'auto' ? 'Auto' : 'Manual',
      exposición: `${parameters.exposure > 0 ? '+' : ''}${parameters.exposure.toFixed(1)}`
    };
  };

  if (photos.length === 0) {
    return (
      <div className="w-80 bg-slate-100 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-4">
        <h3 className="text-lg font-semibold mb-4">Galería de Fotos</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📸</div>
          <p className="text-slate-600 dark:text-slate-400">
            No hay fotos capturadas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-slate-100 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-4">
      <h3 className="text-lg font-semibold mb-4">Galería de Fotos ({photos.length})</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {photos.map((photo) => {
          const params = formatParameters(photo.parameters);
          
          return (
            <div key={photo.id} className="bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm">
              {/* Photo Thumbnail */}
              <div className="mb-3">
                <img
                  src={photo.dataUrl}
                  alt={`Foto capturada ${photo.id}`}
                  className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handlePhotoClick(photo)}
                />
              </div>

              {/* Photo Info */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    {formatTimestamp(photo.timestamp)}
                  </span>
                  <button
                    onClick={() => onDeletePhoto(photo.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Res:</span>
                    <span className="font-mono">{params.resolución}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cal:</span>
                    <span className="font-mono">{params.calidad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cam:</span>
                    <span className="font-mono">{params.cámara}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Flash:</span>
                    <span className="font-mono">{params.flash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Zoom:</span>
                    <span className="font-mono">{params.zoom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Foco:</span>
                    <span className="font-mono">{params.enfoque}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl max-h-full overflow-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Detalles de la Foto ({currentPhotoIndex + 1} de {photos.length})
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>

              {/* Photo with Navigation */}
              <div className="relative mb-4">
                <img
                  src={selectedPhoto.dataUrl}
                  alt="Foto detallada"
                  className="w-full max-h-96 object-contain rounded"
                />
                
                {/* Navigation Arrows */}
                {photos.length > 1 && (
                  <>
                    {/* Previous Button */}
                    {currentPhotoIndex > 0 && (
                      <button
                        onClick={handlePreviousPhoto}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                      >
                        ←
                      </button>
                    )}
                    
                    {/* Next Button */}
                    {currentPhotoIndex < photos.length - 1 && (
                      <button
                        onClick={handleNextPhoto}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                      >
                        →
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Photo Navigation Dots */}
              {photos.length > 1 && (
                <div className="flex justify-center space-x-2 mb-4">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentPhotoIndex(index);
                        setSelectedPhoto(photos[index]);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentPhotoIndex
                          ? 'bg-blue-600'
                          : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Parameters */}
              <div className="space-y-3">
                <h4 className="font-semibold">Parámetros de Captura</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(formatParameters(selectedPhoto.parameters)).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400 capitalize">
                        {key}:
                      </span>
                      <span className="font-mono">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Camera Info */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Información de Cámara</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Dispositivo:</span>
                      <span>{selectedPhoto.cameraInfo.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Orientación:</span>
                      <span>{selectedPhoto.cameraInfo.facing === 'back' ? 'Trasera' : 'Frontal'}</span>
                    </div>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Capturada: {formatTimestamp(selectedPhoto.timestamp)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
