import { useEffect, useState } from "react";
import { regionData } from "../data/mockData";

interface ParallaxSectionProps {
  isDark: boolean;
}

export default function ParallaxSection({ isDark }: ParallaxSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0;

  return (
    <div className="relative overflow-hidden">
      <div
        className={`shadow-md ${
          isDark ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-xl rounded-2xl p-8 border ${
          isDark ? "border-gray-700/50" : "border-gray-200/50"
        } transition-all duration-500`}
      >
        <h3
          className={`text-lg font-semibold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Global Distribution
        </h3>

        <div className="relative h-64">
          {regionData.map((region, index) => (
            <div
              key={region.name}
              className="absolute w-full transition-transform duration-300"
              style={{
                top: `${index * 50}px`,
                transform: `translateY(${parallaxOffset * (index * 0.1)}px)`,
                zIndex: regionData.length - index,
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <span
                  className={`text-sm font-medium w-32 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {region.name}
                </span>
                <div className="flex-1 h-10 bg-blue-100 dark:bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all duration-1000 flex items-center justify-end pr-4 text-white font-semibold text-sm shadow-lg"
                    style={{
                      width: `${region.value}%`,
                      backgroundColor: region.color,
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {region.value}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div
          className="absolute -z-10 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            transform: `translate(${parallaxOffset * 0.3}px, ${parallaxOffset * 0.2}px)`
          }}
        /> */}
      </div>
    </div>
  );
}
