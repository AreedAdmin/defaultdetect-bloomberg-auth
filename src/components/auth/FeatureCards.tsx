import { motion, AnimatePresence } from "framer-motion";
import { Activity, Brain, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Activity,
    title: "Real-time Risk Analysis",
    description: "Monitor default probabilities across your portfolio",
    metric: 1247,
    metricLabel: "portfolios monitored",
    progress: 87,
    color: "from-[#1e293b] to-[#0f172a]",
    glowColor: "rgba(6, 182, 212, 0.4)",
    accentColor: "#06b6d4",
    sparklineData: [45, 52, 48, 65, 72, 68, 87],
  },
  {
    icon: Brain,
    title: "Advanced Analytics",
    description: "Leverage machine learning for predictive insights",
    metric: 94.3,
    metricLabel: "prediction accuracy",
    progress: 94,
    color: "from-[#1e293b] to-[#0f172a]",
    glowColor: "rgba(59, 130, 246, 0.4)",
    accentColor: "#3b82f6",
    sparklineData: [62, 68, 75, 82, 88, 91, 94],
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security for your financial data",
    metric: 100,
    metricLabel: "uptime guarantee",
    progress: 100,
    color: "from-[#1e293b] to-[#0f172a]",
    glowColor: "rgba(16, 185, 129, 0.4)",
    accentColor: "#10b981",
    sparklineData: [98, 99, 100, 100, 100, 100, 100],
  },
];

const ParticleEffect = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const CircularProgress = ({ progress, color, size = 60 }: { progress: number; color: string; size?: number }) => {
  const circumference = 2 * Math.PI * (size / 2 - 4);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        stroke="#334155"
        strokeWidth="3"
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          strokeDasharray: circumference,
          filter: `drop-shadow(0 0 4px ${color})`,
        }}
      />
    </svg>
  );
};

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 20 - (value / max) * 15;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="20" className="opacity-60">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
};

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono font-bold">
      {typeof value === 'number' && value % 1 !== 0 
        ? count.toFixed(1) 
        : count.toLocaleString()}
      {suffix}
    </span>
  );
};

export function FeatureCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 pt-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isHovered = hoveredIndex === index;
        const isExpanded = expandedIndex === index;

        // Icon-specific animations
        const getIconAnimation = () => {
          if (!isHovered) return {};
          
          switch (index) {
            case 0: // Heartbeat for Risk Analysis
              return {
                scale: [1, 1.2, 1, 1.1, 1],
              };
            case 1: // Brain pulse
              return {
                scale: [1, 1.15, 1.05, 1.15, 1],
                rotate: [0, -5, 5, -5, 0],
              };
            case 2: // Shield rotation
              return {
                rotate: [0, 15, -15, 15, 0],
                scale: [1, 1.1, 1.1, 1],
              };
            default:
              return {};
          }
        };

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative group cursor-pointer"
            onClick={() => setExpandedIndex(isExpanded ? null : index)}
          >
            <motion.div
              className={`relative overflow-hidden rounded-xl border border-[#334155]/50 backdrop-blur-sm bg-gradient-to-br ${feature.color} p-5`}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: isHovered
                  ? `0 20px 50px -10px ${feature.glowColor}, 0 0 30px ${feature.glowColor}`
                  : "0 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Shimmer loading effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />

              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-md" />
              
              {/* Particle effects */}
              <ParticleEffect color={feature.glowColor} />

              {/* Content */}
              <div className="relative flex items-start gap-4">
                {/* Animated icon with circular progress */}
                <div className="relative flex-shrink-0">
                  <CircularProgress 
                    progress={feature.progress} 
                    color={feature.accentColor}
                    size={64}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={getIconAnimation()}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: feature.accentColor }}
                    />
                  </motion.div>
                  
                  {/* Live pulse indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: feature.accentColor }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                        {feature.title}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#334155]/50 text-[#94a3b8]">
                          LIVE
                        </span>
                      </h3>
                      <p className="text-sm text-[#94a3b8]">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Metrics display */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold" style={{ color: feature.accentColor }}>
                        <AnimatedCounter 
                          value={feature.metric} 
                          suffix={index === 1 ? "%" : index === 2 ? "%" : ""}
                        />
                      </div>
                      <div className="text-xs text-[#64748b] mt-0.5">
                        {feature.metricLabel}
                      </div>
                    </div>
                    
                    {/* Mini sparkline */}
                    <div className="flex flex-col items-end gap-1">
                      <MiniSparkline data={feature.sparklineData} color={feature.accentColor} />
                      <div className="text-xs text-[#64748b]">7-day trend</div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-[#334155]/50"
                      >
                        <div className="text-sm text-[#94a3b8] space-y-2">
                          <div className="flex justify-between">
                            <span>Response Time:</span>
                            <span className="text-white font-mono">24ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Active Users:</span>
                            <span className="text-white font-mono">
                              {index === 0 ? "342" : index === 1 ? "89" : "1,247"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Updated:</span>
                            <span className="text-white font-mono">Just now</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${feature.glowColor}, transparent 70%)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.6 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
