import { HeatMapCell } from '../types/dashboard';

interface HeatMapProps {
  data: HeatMapCell[];
  isDark: boolean;
  title: string;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['0', '4', '8', '12', '16', '20'];

export default function HeatMap({ data, isDark, title }: HeatMapProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  const getColor = (value: number) => {
    const intensity = value / maxValue;
    if (isDark) {
      return `rgba(6, 182, 212, ${intensity * 0.8})`;
    }
    return `rgba(59, 130, 246, ${intensity * 0.8})`;
  };

  return (
    <div className={`shadow-md ${
      isDark ? 'bg-gray-800/50' : 'bg-white/50'
    } backdrop-blur-xl rounded-2xl p-6 border ${
      isDark ? 'border-gray-700/50' : 'border-gray-200/50'
    } transition-all duration-500`}>
      <h3 className={`text-lg font-semibold mb-6 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>

      <div className="space-y-1">
        {days.map((day, dayIndex) => (
          <div key={day} className="flex items-center gap-2">
            <span className={`text-xs w-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {day}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 24 }).map((_, hourIndex) => {
                const cell = data.find(d => d.y === dayIndex && d.x === hourIndex);
                const value = cell?.value || 0;

                return (
                  <div
                    key={hourIndex}
                    className="w-3 h-6 rounded transition-all duration-300 hover:scale-125 cursor-pointer group relative"
                    style={{
                      backgroundColor: getColor(value),
                      animationDelay: `${(dayIndex * 24 + hourIndex) * 5}ms`
                    }}
                  >
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded ${
                      isDark ? 'bg-gray-900' : 'bg-gray-800'
                    } text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10`}>
                      {day} {hourIndex}:00 - {value.toFixed(0)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 mt-4">
          <span className={`text-xs w-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <div className="flex gap-8">
            {hours.map(hour => (
              <span key={hour} className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {hour}h
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Less</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded"
              style={{
                backgroundColor: getColor((i + 1) * (maxValue / 5))
              }}
            />
          ))}
        </div>
        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>More</span>
      </div>
    </div>
  );
}
