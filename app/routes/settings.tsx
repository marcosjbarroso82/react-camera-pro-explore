import { Layout } from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout>
      <div className="p-4 h-full">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 h-full">
          <h1 className="text-2xl font-bold mb-6 text-center">⚙️ Settings Explorer</h1>
          
          {/* Settings sections - compact for landscape */}
          <div className="space-y-6">
            {/* Appearance Settings */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">🎨 Appearance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                  >
                    {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Orientation</span>
                  <span className="text-slate-600 dark:text-slate-400">Landscape</span>
                </div>
              </div>
            </div>

            {/* Camera Settings */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">📷 Camera</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Default Resolution</span>
                  <select className="px-3 py-1 bg-white dark:bg-slate-600 rounded border border-slate-300 dark:border-slate-500">
                    <option>1920x1080</option>
                    <option>1280x720</option>
                    <option>3840x2160</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto Focus</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Flash Mode</span>
                  <select className="px-3 py-1 bg-white dark:bg-slate-600 rounded border border-slate-300 dark:border-slate-500">
                    <option>Auto</option>
                    <option>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Storage Settings */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">💾 Storage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Auto Save</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Gallery Size</span>
                  <select className="px-3 py-1 bg-white dark:bg-slate-600 rounded border border-slate-300 dark:border-slate-500">
                    <option>100MB</option>
                    <option>500MB</option>
                    <option>1GB</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>Used Space</span>
                  <span className="text-slate-600 dark:text-slate-400">45MB / 100MB</span>
                </div>
              </div>
            </div>

            {/* App Info */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">ℹ️ App Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="text-slate-600 dark:text-slate-400">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Build:</span>
                  <span className="text-slate-600 dark:text-slate-400">2024.01.15</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform:</span>
                  <span className="text-slate-600 dark:text-slate-400">PWA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <button className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
              💾 Save Settings
            </button>
            <button className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
              🔄 Reset to Default
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

