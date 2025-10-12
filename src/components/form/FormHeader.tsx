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
      <div className="group max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/70 border border-blue-500/20 shadow-lg transition-all duration-500 ease-out hover:bg-white/80 hover:border-blue-600/40 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)]">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300">
            Financial Risk Assessment Form
          </h1>
          <LastSavedIndicator />
        </div>
        <Button
          onClick={handleSaveAndExit}
          className="group/btn relative gap-2 px-6 py-3 bg-white/90 hover:bg-white border border-blue-500/20 text-blue-600 backdrop-blur-sm transition-all duration-300 hover:border-blue-600/40 hover:shadow-[0_8px_20px_-5px_rgba(37,99,235,0.3)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <Save className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
          <span className="relative">Save & Exit</span>
        </Button>
      </div>
    </div>
  );
};
