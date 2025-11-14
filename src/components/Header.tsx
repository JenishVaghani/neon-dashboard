import { Moon, Sun, Bell, Search } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-20 right-0 h-16 ${
      isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
    } backdrop-blur-xl border-b flex items-center px-8 z-40 transition-colors duration-300`}>
      <div className="flex items-center flex-1 gap-4">
        <div className={`flex-1 max-w-xl relative group`}>
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          } group-hover:text-cyan-500 transition-colors duration-300`} size={18} />
          <input
            type="text"
            placeholder="Search anything..."
            className={`w-full h-10 pl-12 pr-4 rounded-xl ${
              isDark
                ? 'bg-gray-800 text-gray-200 placeholder-gray-500 focus:bg-gray-750'
                : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white'
            } border ${
              isDark ? 'border-gray-700 focus:border-cyan-500' : 'border-gray-200 focus:border-blue-500'
            } outline-none transition-all duration-300 focus:ring-2 ${
              isDark ? 'focus:ring-cyan-500/20' : 'focus:ring-blue-500/20'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-xl ${
            isDark
              ? 'bg-gray-800 text-cyan-400 hover:bg-gray-750'
              : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
          } flex items-center justify-center transition-all duration-300 hover:scale-110`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className={`relative w-10 h-10 rounded-xl ${
          isDark
            ? 'bg-gray-800 text-gray-400 hover:bg-gray-750 hover:text-gray-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
        } flex items-center justify-center transition-all duration-300 hover:scale-110`}>
          <Bell size={18} />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
      </div>
    </header>
  );
}
