import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const GlitchText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [isGlitching, setIsGlitching] = useState(true);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isGlitching) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, isGlitching]);

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }}>
      {displayText}
    </motion.span>
  );
};

const FloatingParticle = ({ index, mouseX, mouseY }: { index: number; mouseX: any; mouseY: any }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 2;
  const randomDuration = 3 + Math.random() * 2;

  const x = useTransform(mouseX, [0, 1], [-10 * index, 10 * index]);
  const y = useTransform(mouseY, [0, 1], [-10 * index, 10 * index]);

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        x,
        y,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else if (currentIndex === text.length && !isComplete) {
          setIsComplete(true);
        }
      },
      delay + currentIndex * 2,
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, isComplete]);

  return (
    <>
      <span>{displayedText}</span>
      {!isComplete && <span className="type-cursor">▍</span>}
    </>
  );
};

export const AnimatedHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="space-y-6 relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <FloatingParticle key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Badge with animation */}
      <motion.div
        className="inline-block relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="px-4 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full backdrop-blur-sm relative overflow-hidden"
          whileHover={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(6, 182, 212, 0.15)",
            boxShadow: [
              "0 0 20px rgba(6, 182, 212, 0.3)",
              "0 0 30px rgba(6, 182, 212, 0.5)",
              "0 0 20px rgba(6, 182, 212, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)",
            }}
            whileHover={{
              opacity: 1,
              x: ["-100%", "200%"],
            }}
            transition={{
              x: { duration: 2, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.3 },
            }}
          />
          <span className="text-cyan-400 font-semibold text-sm relative z-10">Financial intelligence</span>
        </motion.div>
      </motion.div>

      {/* Main title with glitch and gradient effect */}
      <motion.div
        className="relative"
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          perspective: 1000,
        }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold relative"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* 3D shadow layers */}
          <span className="absolute inset-0 text-cyan-500/20 blur-sm" style={{ transform: "translateZ(-10px)" }}>
            DefaultDetect
          </span>
          <span className="absolute inset-0 text-cyan-400/30 blur-[2px]" style={{ transform: "translateZ(-5px)" }}>
            DefaultDetect
          </span>

          {/* Main text with animated gradient */}
          <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-300 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            <GlitchText text="Default" delay={0.5} />
            <GlitchText text="Detect" delay={0.8} />
          </span>

          {/* Holographic effect overlay */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent bg-clip-text text-transparent"
            animate={{
              x: isHovered ? ["-5%", "16%"] : "-100%",
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            DefaultDetect
          </motion.span>
        </motion.h1>

        {/* Glow effect behind text */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-0"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Subtitle with typewriter effect */}
      {/* Subtitle with typewriter effect */}
      <motion.p
        className="text-xl text-cyan-100/80 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
      >
        <TypewriterText text="Advanced default risk detection and monitoring system" delay={0} />
        <style>{`
    .type-cursor {
      display: inline-block;
      margin-left: 2px;
      animation: blink 0.5s steps(1) infinite;
    }
    @keyframes blink { 0%, 50% { opacity: 1 } 50.01%, 100% { opacity: 0 } }
  `}</style>
      </motion.p>

      {/* Custom gradient animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};
