import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Users, Activity } from "lucide-react";

interface RotatingCardProps {
  isDark: boolean;
}

const cards = [
  {
    icon: DollarSign,
    title: "Revenue Growth",
    value: "+42.5%",
    subtitle: "vs last quarter",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Users,
    title: "New Users",
    value: "12,894",
    subtitle: "this month",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Activity,
    title: "Engagement",
    value: "94.2%",
    subtitle: "satisfaction rate",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: TrendingUp,
    title: "Market Share",
    value: "28.7%",
    subtitle: "industry leading",
    gradient: "from-orange-500 to-red-600",
  },
];

export default function RotatingCard({ isDark }: RotatingCardProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      // setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setIsFlipping(false);
      // }, 0);
    }, 820000);

    return () => clearInterval(interval);
  }, []);

  const currentCard = cards[currentIndex];
  const Icon = currentCard.icon;

  return (
    <div className="perspective-1000">
      <div
        className={`shadow-md relative ${
          isDark ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-xl rounded-2xl p-8 border ${
          isDark ? "border-gray-700/50" : "border-gray-200/50"
        } transition-all duration-500 transform-gpu ${
          isFlipping ? "rotate-y-180 scale-95" : "rotate-y-0 scale-100"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentCard.gradient} opacity-10 blur-xl`}
        />

        <div className="relative z-10">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${currentCard.gradient} text-white mb-6 shadow-lg`}
          >
            <Icon size={28} />
          </div>

          <h3
            className={`text-lg font-semibold mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {currentCard.title}
          </h3>

          <div
            className={`text-4xl font-bold mb-2 bg-gradient-to-br ${currentCard.gradient} bg-clip-text text-transparent`}
          >
            {currentCard.value}
          </div>

          <p
            className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            {currentCard.subtitle}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `w-8 bg-gradient-to-r ${currentCard.gradient}`
                  : `w-1 ${isDark ? "bg-gray-700" : "bg-gray-300"}`
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
