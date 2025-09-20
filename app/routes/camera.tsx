import { Layout } from '../components/Layout';

export default function Camera() {
  return (
    <Layout>
      <div className="p-4 h-full">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 h-full">
          <h1 className="text-2xl font-bold mb-6 text-center">📷 Camera Explorer</h1>
          
          {/* Camera preview area - landscape optimized */}
          <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-8 mb-6 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-slate-600 dark:text-slate-400">
                Camera preview will be here
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                Landscape orientation optimized
              </p>
            </div>
          </div>

          {/* Camera controls - compact layout for landscape */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Capture Settings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="text-slate-600 dark:text-slate-400">1920x1080</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="text-slate-600 dark:text-slate-400">High</span>
                </div>
                <div className="flex justify-between">
                  <span>Flash:</span>
                  <span className="text-slate-600 dark:text-slate-400">Auto</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Camera Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Facing:</span>
                  <span className="text-slate-600 dark:text-slate-400">Back</span>
                </div>
                <div className="flex justify-between">
                  <span>Zoom:</span>
                  <span className="text-slate-600 dark:text-slate-400">1x</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span className="text-slate-600 dark:text-slate-400">Auto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
              📸 Capture Photo
            </button>
            <button className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
              🎥 Record Video
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

