interface RadialProgressChartProps {
  percentage?: number;
  title?: string;
  isDark?: boolean;
  compare_to?: string;
}

interface RadialProgressChartProps {
  percentage?: number;
  title?: string;
  isDark?: boolean;
}

const RadialProgressChart = ({
  percentage = 72,
  title = "Overall Growth",
  isDark,
  compare_to = title,
}: RadialProgressChartProps) => {
  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // 🎨 Color Logic Based on Title + Theme
  const getStrokeColor = () => {
    if (title.includes("Weekly")) return isDark ? "#22c55e" : "#16a34a"; // Green shades
    if (title.includes("Monthly")) return isDark ? "#3b82f6" : "#2563eb"; // Blue shades
    if (title.includes("Yearly")) return isDark ? "#eab308" : "#ca8a04"; // Yellow shades
    return isDark ? "#22c55e" : "#16a34a";
  };

  const strokeColor = getStrokeColor();

  return (
    <div
      className={`flex flex-col justify-center items-center p-6 rounded-2xl shadow-lg h-full ${
        isDark ? "bg-gray-800/50 text-gray-100" : "bg-white/50 text-gray-800"
      }`}
    >
      {/* Title (Top Center) */}
      <h3 className="text-lg font-semibold mb-6 text-center">{title}</h3>

      {/* Chart (Perfectly Centered) */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg
            className="-rotate-90"
            width="150"
            height="150"
            viewBox="0 0 150 150"
          >
            {/* Background Circle */}
            <circle
              cx="75"
              cy="75"
              r={circleRadius}
              stroke={isDark ? "#374151" : "#d1d5db"}
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="75"
              cy="75"
              r={circleRadius}
              stroke={strokeColor}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <span
            className={`absolute text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            style={{ color: strokeColor }}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Footer Text (Bottom Center) */}
      <p className="text-sm opacity-70 text-center mt-4">
        Compared to last {compare_to}
      </p>
    </div>
  );
};

export default RadialProgressChart;
