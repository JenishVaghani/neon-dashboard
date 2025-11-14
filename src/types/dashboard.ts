export interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  sparklineData: number[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  series?: string;
}

export interface HeatMapCell {
  x: number;
  y: number;
  value: number;
}
