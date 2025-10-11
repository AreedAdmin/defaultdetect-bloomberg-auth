import { motion } from "framer-motion";
import { useMemo } from "react";

export const HeroSection = () => {
  // Generate random particles with unique properties
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 2,
    }));
  }, []);

  return (
    <section className="relative overflow-hidden px-8 py-24 md:px-12 lg:px-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(217,33%,10%)] via-[hsl(217,33%,7%)] to-[hsl(217,33%,12%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-accent/40"
            style={{
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our mission: detect risk before it becomes reality
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Leverage cutting-edge artificial intelligence to assess credit risk with 
          unparalleled accuracy. Join thousands of financial institutions protecting 
          their future through our advanced predictive analytics.
        </motion.p>
      </div>
    </section>
  );
};
