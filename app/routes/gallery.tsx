import { Layout } from '../components/Layout';

export default function Gallery() {
  // Dummy gallery data
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Photo ${i + 1}`,
    date: new Date(Date.now() - i * 3600000).toLocaleDateString(),
    size: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}MB`,
  }));

  return (
    <Layout>
      <div className="p-4 h-full">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 h-full">
          <h1 className="text-2xl font-bold mb-6 text-center">🖼️ Gallery Explorer</h1>
          
          {/* Stats bar - compact for landscape */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">12</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Photos</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Videos</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">45MB</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Size</div>
            </div>
          </div>

          {/* Gallery grid - optimized for landscape */}
          <div className="grid grid-cols-4 gap-3 h-64 overflow-y-auto">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
              >
                <div className="aspect-square bg-slate-200 dark:bg-slate-600 rounded mb-2 flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <div className="text-xs">
                  <div className="font-medium truncate">{photo.title}</div>
                  <div className="text-slate-500 dark:text-slate-400">{photo.date}</div>
                  <div className="text-slate-500 dark:text-slate-400">{photo.size}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <button className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
              📤 Export All
            </button>
            <button className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
              🗑️ Clear Gallery
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

