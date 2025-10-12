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
        className="max-w-7xl mx-auto px-6 py-4 rounded-lg backdrop-blur-md bg-[hsl(217_33%_7%/0.5)] border border-[hsl(187_85%_48%/0.15)] shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">
            Section {currentSection}/12 - {Math.round(progress)}% Complete
          </span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>~{estimatedMinutes} min remaining</span>
          </div>
        </div>
        <div className="relative h-3 bg-secondary/50 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full shimmer-effect"
            style={{
              background: 'linear-gradient(90deg, hsl(187 85% 48%), hsl(25 95% 53%))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  );
};
