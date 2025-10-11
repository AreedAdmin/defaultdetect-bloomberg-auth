import { motion } from "framer-motion";
import { Activity, Brain, Shield } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Activity,
    title: "Real-time Risk Analysis",
    description: "Monitor default probabilities across your portfolio",
    progress: 100,
    color: "from-accent/20 to-accent/5",
    glowColor: "rgba(30, 201, 232, 0.3)",
    iconColor: "text-accent",
    progressColor: "from-accent to-accent/50",
  },
  {
    icon: Brain,
    title: "Advanced Analytics",
    description: "Leverage machine learning for predictive insights",
    progress: 100,
    color: "from-blue-600/20 to-blue-900/5",
    glowColor: "rgba(37, 99, 235, 0.4)",
    iconColor: "text-blue-400",
    progressColor: "from-blue-500 to-blue-400",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security for your financial data",
    progress: 100,
    color: "from-indigo-700/20 to-indigo-900/5",
    glowColor: "rgba(67, 56, 202, 0.4)",
    iconColor: "text-indigo-400",
    progressColor: "from-indigo-600 to-indigo-400",
  },
];

const ParticleEffect = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export function FeatureCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 pt-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isHovered = hoveredIndex === index;

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
            className="relative group"
          >
            <motion.div
              className={`relative overflow-hidden rounded-lg border border-border/50 backdrop-blur-sm bg-gradient-to-br ${feature.color} p-4`}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: isHovered ? `0 20px 40px -10px ${feature.glowColor}` : "none",
              }}
            >
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-card/30 backdrop-blur-md" />

              {/* Particle effects */}
              <ParticleEffect color={feature.glowColor} />

              {/* Content */}
              <div className="relative flex items-start gap-4">
                {/* Animated icon */}
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-background/50 to-background/30 flex items-center justify-center flex-shrink-0 border border-border/50"
                  animate={
                    isHovered
                      ? {
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </motion.div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>

                  {/* Progress indicator */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Status</span>
                      <motion.span
                        className="font-medium text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        {feature.progress}%
                      </motion.span>
                    </div>
                    <div className="h-1 bg-background/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${feature.progressColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.progress}%` }}
                        transition={{
                          duration: 1,
                          delay: index * 0.2 + 0.3,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${feature.glowColor}, transparent 70%)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
