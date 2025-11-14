import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MetricCard from "./components/MetricCard";
import LineChart from "./components/LineChart";
import DonutChart from "./components/DonutChart";
import StackedBarChart from "./components/StackedBarChart";
import AreaChart from "./components/AreaChart";
import HeatMap from "./components/HeatMap";
import RotatingCard from "./components/RotatingCard";
import ParallaxSection from "./components/ParallaxSection";
import {
  metricCards,
  timeSeriesData,
  donutData,
  stackedBarData,
  areaData,
  heatMapData,
} from "./data/mockData";
import RadialProgressChart from "./components/RadialProgressChart";

function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-950 dark" : "bg-gray-100"
      }`}
    >
      <Sidebar isDark={isDark} />
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main className=" pt-16">
        <div className="ml-20 p-8">
          <div className="mb-8">
            <h1
              className={`text-4xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              NeonBoard
            </h1>
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Modern analytics dashboard with 3D motion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricCards.map((metric, index) => (
              <MetricCard
                key={metric.title}
                metric={metric}
                isDark={isDark}
                delay={index * 100}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <LineChart
                data={timeSeriesData}
                isDark={isDark}
                title="Revenue vs Costs"
              />
            </div>
            <div>
              <RotatingCard isDark={isDark} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <DonutChart
                data={donutData}
                isDark={isDark}
                title="Traffic Sources"
              />
              <div className="mt-4">
                <AreaChart
                  data={areaData}
                  isDark={isDark}
                  title="Daily Traffic"
                />
              </div>
            </div>
            <StackedBarChart
              data={stackedBarData}
              isDark={isDark}
              title="Weekly Performance"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-2">
              <HeatMap
                data={heatMapData}
                isDark={isDark}
                title="Activity Heat Map"
              />
            </div>

            {/* 👇 Add This Next to HeatMap */}
            <div className="lg:col-span-1">
              <RadialProgressChart
                percentage={82}
                isDark={isDark}
                title="Weekly Growth"
                compare_to="week"
              />
            </div>
            <div className="lg:col-span-1">
              <RadialProgressChart
                percentage={46}
                isDark={isDark}
                title="Monthly Growth"
                compare_to="month"
              />
            </div>
            <div className="lg:col-span-1">
              <RadialProgressChart
                percentage={58}
                isDark={isDark}
                title="Yearly Growth"
                compare_to="year"
              />
            </div>
          </div>

          <div className="mb-2">
            <ParallaxSection isDark={isDark} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
