import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FormData, defaultFormData } from "@/types/formData";
import { toast } from "sonner";

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  currentSection: number;
  setCurrentSection: (section: number) => void;
  visitedSections: Set<number>;
  markSectionVisited: (section: number) => void;
  lastSaved: Date | null;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => boolean;
  clearDraft: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentSection, setCurrentSection] = useState(1);
  const [visitedSections, setVisitedSections] = useState<Set<number>>(new Set([1]));
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const markSectionVisited = (section: number) => {
    setVisitedSections((prev) => new Set(prev).add(section));
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem("defaultdetect_draft", JSON.stringify(formData));
      localStorage.setItem("defaultdetect_draft_timestamp", new Date().toISOString());
      setLastSaved(new Date());
      toast.success("Draft saved ✓", {
        duration: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  const loadFromLocalStorage = (): boolean => {
    try {
      const saved = localStorage.getItem("defaultdetect_draft");
      if (saved) {
        setFormData(JSON.parse(saved));
        const timestamp = localStorage.getItem("defaultdetect_draft_timestamp");
        if (timestamp) {
          setLastSaved(new Date(timestamp));
        }
        return true;
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
    return false;
  };

  const clearDraft = () => {
    localStorage.removeItem("defaultdetect_draft");
    localStorage.removeItem("defaultdetect_draft_timestamp");
    setFormData(defaultFormData);
    setLastSaved(null);
  };

  // Auto-save every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveToLocalStorage();
    }, 20000);

    return () => clearInterval(interval);
  }, [formData]);

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentSection,
        setCurrentSection,
        visitedSections,
        markSectionVisited,
        lastSaved,
        saveToLocalStorage,
        loadFromLocalStorage,
        clearDraft,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
