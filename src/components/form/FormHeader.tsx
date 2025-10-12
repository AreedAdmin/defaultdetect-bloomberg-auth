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
        {/* Top row: Save button and Last Saved indicator */}
        <div className="flex items-center justify-end gap-4 mb-4">
          <LastSavedIndicator />
          <Button
            onClick={handleSaveAndExit}
            className="group/btn relative gap-2 px-5 py-2.5 bg-gradient-to-br from-sky-500/20 to-sky-800/5 hover:from-sky-500/30 hover:to-sky-800/10 border border-sky-400/30 text-sky-400 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/50 hover:shadow-[0_8px_20px_-5px_rgba(14,165,233,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <Save className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
            <span className="relative font-medium">Save & Exit</span>
          </Button>
        </div>

        {/* Main title box - more compact */}
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
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
      </div>

      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
