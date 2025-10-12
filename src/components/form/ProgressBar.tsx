import { useFormContext } from "@/contexts/FormContext";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export const ProgressBar = () => {
  const { currentSection } = useFormContext();
  const progress = (currentSection / 12) * 100;
  const estimatedMinutes = Math.max(1, Math.ceil((12 - currentSection) * 2));

  return (
    <div className="px-6 pb-4">
      <div
        className="max-w-7xl mx-auto px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-br from-blue-600/20 to-blue-800/5 border border-blue-400/30 shadow-lg transition-all duration-300 hover:border-blue-400/40"
        style={{
          boxShadow: "0 10px 30px -10px rgba(37, 99, 235, 0.2)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-blue-400">
            Section {currentSection}/12 - {Math.round(progress)}% Complete
          </span>
          <div className="flex items-center gap-2 text-sm text-sky-400/70">
            <Clock className="w-4 h-4" />
            <span>~{estimatedMinutes} min remaining</span>
          </div>
        </div>

        <div className="relative h-3 bg-slate-800/50 rounded-full overflow-hidden border border-blue-400/20">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{
              boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)",
            }}
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};
