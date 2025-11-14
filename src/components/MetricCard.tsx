import { TrendingUp, TrendingDown } from 'lucide-react';
import { MetricCard as MetricCardType } from '../types/dashboard';
import Sparkline from './Sparkline';

interface MetricCardProps {
  metric: MetricCardType;
  isDark: boolean;
  delay: number;
}

export default function MetricCard({ metric, isDark, delay }: MetricCardProps) {
  return (
    <div
      className={`group relative ${
        isDark
          ? 'bg-gray-800/50 hover:bg-gray-800/70'
          : 'bg-white/50 hover:bg-white/70'
      } backdrop-blur-xl rounded-2xl p-6 border ${
        isDark ? 'border-gray-700/50' : 'border-gray-200/50'
      } transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-md cursor-pointer animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          } mb-1`}>
            {metric.title}
          </p>
          <h3 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {metric.value}
          </h3>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
          metric.trend === 'up'
            ? isDark
              ? 'bg-green-500/20 text-green-400'
              : 'bg-green-50 text-green-600'
            : isDark
            ? 'bg-red-500/20 text-red-400'
            : 'bg-red-50 text-red-600'
        }`}>
          {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="text-xs font-semibold">{Math.abs(metric.change)}%</span>
        </div>
      </div>

      <Sparkline data={metric.sparklineData} isDark={isDark} trend={metric.trend} />

      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5'
          : 'bg-gradient-to-br from-cyan-50/50 to-blue-50/50'
      }`} />
    </div>
  );
}
