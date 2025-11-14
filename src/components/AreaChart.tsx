import { TimeSeriesData } from '../types/dashboard';

interface AreaChartProps {
  data: TimeSeriesData[];
  isDark: boolean;
  title: string;
}

export default function AreaChart({ data, isDark, title }: AreaChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const padding = 40;
  const width = 600;
  const height = 200;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((point, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - (point.value / maxValue) * chartHeight;
    return { x, y, value: point.value, label: point.timestamp };
  });

  const pathData = points.map((p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ');

  const areaData = `${pathData} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

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

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>

        {Array.from({ length: 4 }).map((_, i) => {
          const y = padding + (i / 3) * chartHeight;
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke={isDark ? '#374151' : '#e5e7eb'}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        <path
          d={areaData}
          fill="url(#area-gradient)"
          className="transition-all duration-1000 animate-fade-in"
        />

        <path
          d={pathData}
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 animate-draw-line"
        />

        {points.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#6366f1"
              className="transition-all duration-300 hover:r-6"
            />
            <text
              x={point.x}
              y={height - 10}
              textAnchor="middle"
              className={`text-xs ${isDark ? 'fill-gray-500' : 'fill-gray-400'}`}
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
