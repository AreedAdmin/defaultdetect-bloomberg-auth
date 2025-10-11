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
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financial Risk Assessment Form</h1>
          <LastSavedIndicator />
        </div>
        <Button
          onClick={handleSaveAndExit}
          variant="outline"
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Save & Exit
        </Button>
      </div>
    </div>
  );
};
