import {
  MetricCard,
  ChartDataPoint,
  TimeSeriesData,
  HeatMapCell,
} from "../types/dashboard";

export const metricCards: MetricCard[] = [
  {
    title: "Total Revenue",
    value: "$847,392",
    change: 12.5,
    trend: "up",
    sparklineData: [45, 52, 48, 55, 61, 58, 65, 72, 68, 75, 82, 79],
  },
  {
    title: "Active Users",
    value: "24,891",
    change: 8.2,
    trend: "up",
    sparklineData: [120, 132, 128, 145, 151, 148, 165, 172, 168, 185, 192, 188],
  },
  {
    title: "Conversion Rate",
    value: "3.64%",
    change: -2.1,
    trend: "down",
    sparklineData: [
      3.8, 3.7, 3.9, 3.6, 3.5, 3.7, 3.8, 3.6, 3.5, 3.6, 3.7, 3.64,
    ],
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: 5.7,
    trend: "up",
    sparklineData: [240, 245, 252, 258, 265, 260, 268, 270, 272, 275, 270, 272],
  },
];

export const timeSeriesData: TimeSeriesData[] = [
  { timestamp: "Jan", value: 45000, series: "Revenue" },
  { timestamp: "Jan", value: 32000, series: "Costs" },
  { timestamp: "Feb", value: 52000, series: "Revenue" },
  { timestamp: "Feb", value: 35000, series: "Costs" },
  { timestamp: "Mar", value: 48000, series: "Revenue" },
  { timestamp: "Mar", value: 33000, series: "Costs" },
  { timestamp: "Apr", value: 61000, series: "Revenue" },
  { timestamp: "Apr", value: 38000, series: "Costs" },
  { timestamp: "May", value: 55000, series: "Revenue" },
  { timestamp: "May", value: 36000, series: "Costs" },
  { timestamp: "Jun", value: 67000, series: "Revenue" },
  { timestamp: "Jun", value: 40000, series: "Costs" },
  { timestamp: "Jul", value: 72000, series: "Revenue" },
  { timestamp: "Jul", value: 42000, series: "Costs" },
  { timestamp: "Aug", value: 68000, series: "Revenue" },
  { timestamp: "Aug", value: 41000, series: "Costs" },
  { timestamp: "Sep", value: 78000, series: "Revenue" },
  { timestamp: "Sep", value: 45000, series: "Costs" },
  { timestamp: "Oct", value: 82000, series: "Revenue" },
  { timestamp: "Oct", value: 47000, series: "Costs" },
  { timestamp: "Nov", value: 79000, series: "Revenue" },
  { timestamp: "Nov", value: 46000, series: "Costs" },
  { timestamp: "Dec", value: 87000, series: "Revenue" },
  { timestamp: "Dec", value: 49000, series: "Costs" },
];

export const stackedBarData: ChartDataPoint[] = [
  { label: "Mon", value: 320, category: "Sales" },
  { label: "Mon", value: 180, category: "Marketing" },
  { label: "Mon", value: 140, category: "Support" },
  { label: "Tue", value: 160, category: "Sales" },
  { label: "Tue", value: 320, category: "Marketing" },
  { label: "Tue", value: 160, category: "Support" },
  { label: "Wed", value: 420, category: "Sales" },
  { label: "Wed", value: 160, category: "Marketing" },
  { label: "Wed", value: 180, category: "Support" },
  { label: "Thu", value: 360, category: "Sales" },
  { label: "Thu", value: 200, category: "Marketing" },
  { label: "Thu", value: 150, category: "Support" },
  { label: "Fri", value: 60, category: "Sales" },
  { label: "Fri", value: 280, category: "Marketing" },
  { label: "Fri", value: 200, category: "Support" },
  { label: "Sat", value: 280, category: "Sales" },
  { label: "Sat", value: 160, category: "Marketing" },
  { label: "Sat", value: 120, category: "Support" },
  { label: "Sun", value: 240, category: "Sales" },
  { label: "Sun", value: 400, category: "Marketing" },
  { label: "Sun", value: 300, category: "Support" },
];

export const donutData: ChartDataPoint[] = [
  { label: "Direct", value: 42 },
  { label: "Organic", value: 28 },
  { label: "Referral", value: 18 },
  { label: "Social", value: 12 },
];

export const areaData: TimeSeriesData[] = [
  { timestamp: "00:00", value: 2400 },
  { timestamp: "04:00", value: 1800 },
  { timestamp: "08:00", value: 3200 },
  { timestamp: "12:00", value: 4100 },
  { timestamp: "16:00", value: 3800 },
  { timestamp: "20:00", value: 2900 },
  { timestamp: "24:00", value: 2200 },
];

export const heatMapData: HeatMapCell[] = Array.from(
  { length: 7 * 24 },
  (_, i) => ({
    x: i % 24,
    y: Math.floor(i / 24),
    value: Math.random() * 100,
  })
);

export const regionData = [
  { name: "North America", value: 85, color: "#3b82f6" },
  { name: "Europe", value: 78, color: "#10b981" },
  { name: "Asia Pacific", value: 58, color: "#f59e0b" },
  { name: "Latin America", value: 96, color: "#8b5cf6" },
  { name: "Africa", value: 43, color: "#ef4444" },
];
