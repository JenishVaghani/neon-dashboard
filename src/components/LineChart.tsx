import { TimeSeriesData } from "../types/dashboard";
import { useState } from "react";

interface LineChartProps {
  data: TimeSeriesData[];
  isDark: boolean;
  title: string;
}

export default function LineChart({ data, isDark, title }: LineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const series1 = data.filter((d) => d.series === "Revenue");
  const series2 = data.filter((d) => d.series === "Costs");

  const maxValue = Math.max(...data.map((d) => d.value));
  const padding = 40;
  const width = 800;
  const height = 300;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const createPath = (seriesData: TimeSeriesData[]) => {
    return seriesData
      .map((point, i) => {
        const x = padding + (i / (seriesData.length - 1)) * chartWidth;
        const y =
          padding + chartHeight - (point.value / maxValue) * chartHeight;
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div
      className={`shadow-md ${
        isDark ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-xl rounded-2xl p-6 border ${
        isDark ? "border-gray-700/50" : "border-gray-200/50"
      } transition-all duration-500`}
    >
      <h3
        className={`text-lg font-semibold mb-6 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500" />
          <span
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Revenue
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Costs
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="gradient-purple"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
        </defs>

        {Array.from({ length: 5 }).map((_, i) => {
          const y = padding + (i / 4) * chartHeight;
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke={isDark ? "#374151" : "#e5e7eb"}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className={`text-xs ${
                  isDark ? "fill-gray-500" : "fill-gray-400"
                }`}
              >
                ${Math.round((maxValue * (4 - i)) / 4 / 1000)}k
              </text>
            </g>
          );
        })}

        <path
          d={`${createPath(series1)} L ${width - padding} ${
            padding + chartHeight
          } L ${padding} ${padding + chartHeight} Z`}
          fill="url(#gradient-cyan)"
          className="transition-all duration-1000"
        />

        <path
          d={createPath(series1)}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 animate-draw-line"
        />

        <path
          d={`${createPath(series2)} L ${width - padding} ${
            padding + chartHeight
          } L ${padding} ${padding + chartHeight} Z`}
          fill="url(#gradient-purple)"
          className="transition-all duration-1000"
        />

        <path
          d={createPath(series2)}
          fill="none"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 animate-draw-line"
          style={{ animationDelay: "200ms" }}
        />

        {series1.map((point, i) => {
          const x = padding + (i / (series1.length - 1)) * chartWidth;
          const y =
            padding + chartHeight - (point.value / maxValue) * chartHeight;
          return (
            <circle
              key={`revenue-${i}`}
              cx={x}
              cy={y}
              r={hoveredPoint === i ? 6 : 4}
              fill="#06b6d4"
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}

        {series1.map((_, i) => {
          const x = padding + (i / (series1.length - 1)) * chartWidth;
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={height - 10}
              textAnchor="middle"
              className={`text-xs ${
                isDark ? "fill-gray-500" : "fill-gray-400"
              }`}
            >
              {series1[i].timestamp}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
