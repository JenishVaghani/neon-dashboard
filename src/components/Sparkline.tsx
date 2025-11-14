interface SparklineProps {
  data: number[];
  isDark: boolean;
  trend: 'up' | 'down';
}

export default function Sparkline({ data, trend }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${trend}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={trend === 'up' ? '#10b981' : '#ef4444'} stopOpacity={0.3} />
          <stop offset="100%" stopColor={trend === 'up' ? '#10b981' : '#ef4444'} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${trend})`}
        className="transition-all duration-1000"
      />
      <polyline
        points={points}
        fill="none"
        stroke={trend === 'up' ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-1000"
      />
    </svg>
  );
}
