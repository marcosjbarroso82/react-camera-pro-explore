import { Link, useLocation } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { path: '/camera', label: 'Camera', icon: '📷' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Main content area - optimized for landscape */}
      <main className="pb-20 min-h-screen">
        {children}
      </main>

      {/* Bottom navigation - landscape optimized */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex justify-around items-center h-16 px-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-0 flex-1 ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <span className="text-lg mb-1">{tab.icon}</span>
                <span className="text-xs font-medium truncate">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Theme toggle button - floating */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

