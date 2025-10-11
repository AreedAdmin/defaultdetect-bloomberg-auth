import { useFormContext } from "@/contexts/FormContext";
import { motion } from "framer-motion";

export const ProgressBar = () => {
  const { currentSection } = useFormContext();
  const progress = (currentSection / 12) * 100;
  const estimatedMinutes = Math.max(1, Math.ceil((12 - currentSection) * 2));

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Section {currentSection}/12 - {Math.round(progress)}% Complete
          </span>
          <span className="text-sm text-muted-foreground">
            ~{estimatedMinutes} minutes remaining
          </span>
        </div>
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};
