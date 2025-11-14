import { ChartDataPoint } from '../types/dashboard';
import { useState } from 'react';

interface DonutChartProps {
  data: ChartDataPoint[];
  isDark: boolean;
  title: string;
}

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function DonutChart({ data, isDark, title }: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = 100;
  const radius = 80;
  const innerRadius = 55;

  let currentAngle = -90;
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    return {
      pathData,
      percentage,
      color: colors[index % colors.length],
      label: item.label,
      value: item.value
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

      <div className="flex items-center gap-8">
        <div className="relative">
          <svg viewBox="0 0 200 200" className="w-48 h-48 transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.pathData}
                fill={segment.color}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.4,
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                100%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                hoveredIndex === index
                  ? isDark
                    ? 'bg-gray-700/50'
                    : 'bg-gray-50'
                  : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {segment.label}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {segment.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
