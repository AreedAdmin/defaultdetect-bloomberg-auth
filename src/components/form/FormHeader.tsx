import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

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
              <h1 className="text-3xl font-bold text-cyan-400 whitespace-nowrap">Financial Risk Assessment Form</h1>
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

          {/* Save button - style like "Financial intelligence" */}
          <Button
            onClick={handleSaveAndExit}
            className="group/btn relative gap-2 px-6 py-3 bg-transparent border border-cyan-400/40 text-cyan-400 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] rounded-full flex-shrink-0"
          >
            <Save className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:scale-110" />
            <span className="relative font-medium">Save & Exit</span>
          </Button>
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
