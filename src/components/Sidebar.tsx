import { LayoutDashboard, BarChart3, Users, Settings, TrendingUp, Activity } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isDark: boolean;
}

const tabs = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
  { id: 'charts', icon: BarChart3, label: 'Charts' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'activity', icon: Activity, label: 'Activity' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

export default function Sidebar({ isDark }: SidebarProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className={`fixed left-0 top-0 h-screen w-20 ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-r flex flex-col items-center py-6 transition-all duration-300 z-50`}>
      <div className="mb-12">
        <div className={`w-10 h-10 rounded-xl ${
          isDark ? 'bg-gradient-to-br from-cyan-400 to-blue-500' : 'bg-gradient-to-br from-cyan-500 to-blue-600'
        } flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300`}>
          <div className="text-white font-bold text-lg">N</div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative group w-full h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400'
                  : 'bg-gradient-to-br from-cyan-50 to-blue-50 text-blue-600'
                : isDark
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={22} />

            {activeTab === tab.id && (
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${
                isDark ? 'bg-cyan-400' : 'bg-blue-600'
              } animate-pulse`} />
            )}

            <div className={`absolute left-full ml-4 px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-900 text-white'
            } shadow-xl z-50`}>
              {tab.label}
              <div className={`absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent ${
                isDark ? 'border-r-gray-800' : 'border-r-gray-900'
              }`} />
            </div>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className={`w-10 h-10 rounded-full ${
          isDark ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-purple-600 to-pink-600'
        } flex items-center justify-center text-white font-semibold shadow-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer`}>
          JD
        </div>
      </div>
    </div>
  );
}
