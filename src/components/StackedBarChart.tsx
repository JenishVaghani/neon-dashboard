import { ChartDataPoint } from '../types/dashboard';
import { useState } from 'react';

interface StackedBarChartProps {
  data: ChartDataPoint[];
  isDark: boolean;
  title: string;
}

const categoryColors: Record<string, string> = {
  'Sales': '#3b82f6',
  'Marketing': '#10b981',
  'Support': '#f59e0b'
};

export default function StackedBarChart({ data, isDark, title }: StackedBarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const labels = [...new Set(data.map(d => d.label))];
  const categories = [...new Set(data.map(d => d.category))];

  const groupedData = labels.map(label => {
    const items = data.filter(d => d.label === label);
    const total = items.reduce((sum, item) => sum + item.value, 0);
    return {
      label,
      total,
      items: items.map(item => ({
        category: item.category!,
        value: item.value,
        percentage: (item.value / total) * 100
      }))
    };
  });

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

      <div className="flex items-center gap-6 mb-6">
        {categories.map(category => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category ? categoryColors[category] : '#ccc' }}
            />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {category}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {groupedData.map((group, groupIndex) => (
          <div key={group.label} className="space-y-0">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {group.label}
              </span>
              <span className={`text-sm font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {group.total}
              </span>
            </div>

            <div className="flex h-8 rounded-lg overflow-hidden">
              {group.items.map((item, index) => (
                <div
                  key={`${group.label}-${item.category}`}
                  className="relative transition-all duration-500 cursor-pointer group"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.category ? categoryColors[item.category] : '#ccc',
                    opacity: hoveredBar === null || hoveredBar === `${group.label}-${item.category}` ? 1 : 0.5,
                    animationDelay: `${groupIndex * 100 + index * 50}ms`
                  }}
                  onMouseEnter={() => setHoveredBar(`${group.label}-${item.category}`)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg ${
                    isDark ? 'bg-gray-900' : 'bg-gray-800'
                  } text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-xl`}>
                    {item.category}: {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
