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
      <div 
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-lg backdrop-blur-xl bg-[hsl(217_33%_7%/0.7)] border border-[hsl(187_85%_48%/0.2)] shadow-[0_8px_32px_0_hsl(0_0%_0%/0.37)] transition-all duration-300 hover:bg-[hsl(217_33%_7%/0.85)] hover:border-[hsl(187_85%_48%/0.4)] hover:-translate-y-1"
      >
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(217_33%_25%)] to-[hsl(187_85%_48%)] bg-clip-text text-transparent">
            Financial Risk Assessment Form
          </h1>
          <LastSavedIndicator />
        </div>
        <Button
          onClick={handleSaveAndExit}
          className="gap-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent-foreground backdrop-blur-sm transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          Save & Exit
        </Button>
      </div>
    </div>
  );
};
