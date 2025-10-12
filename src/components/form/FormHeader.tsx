import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { LastSavedIndicator } from "./LastSavedIndicator";

export const FormHeader = () => {
  const { saveToLocalStorage } = useFormContext();
  const navigate = useNavigate();

  const handleSaveAndExit = () => {
    saveToLocalStorage();
    navigate("/dashboard");
  };

  return (
    <div className="px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Last Saved indicator above */}
        <div className="flex justify-end mb-2">
          <LastSavedIndicator />
        </div>

        {/* Title box and Save button on same row */}
        <div className="flex items-center justify-between gap-4">
          {/* Main title box - fits content */}
          <div className="group relative overflow-hidden px-8 py-6 rounded-xl backdrop-blur-xl bg-gradient-to-br from-blue-600/20 to-blue-800/5 border border-blue-400/30 transition-all duration-500 ease-out hover:border-blue-400/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.15), transparent 70%)",
              }}
            />

            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-card/30 backdrop-blur-md" />

            {/* Content */}
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-cyan-500 bg-clip-text text-transparent whitespace-nowrap">
                Financial Risk Assessment Form
              </h1>
            </div>

            {/* Animated shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                animation: "slideRight 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* Save button */}
          <Button
            onClick={handleSaveAndExit}
            className="group/btn relative gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-blue-400/20 hover:border-blue-400/40 text-slate-700 hover:text-blue-600 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(37,99,235,0.3)] overflow-hidden flex-shrink-0"
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                animation: "shimmer 2s ease-in-out infinite",
              }}
            />

            <Save className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:scale-110" />
            <span className="relative font-semibold">Save & Exit</span>
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
