import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";
import { ChevronLeft, ChevronRight, CheckCircle, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SectionNavButtons = () => {
  const { currentSection, setCurrentSection, markSectionVisited, formData } = useFormContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLastSection = currentSection === 8;

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'SK_ID_CURR', 'CODE_GENDER', 'NAME_EDUCATION_TYPE', 'NAME_FAMILY_STATUS',
      'NAME_HOUSING_TYPE', 'OCCUPATION_TYPE', 'ORGANIZATION_TYPE', 'AMT_INCOME_TOTAL',
      'NAME_INCOME_TYPE', 'AMT_CREDIT_x', 'DAYS_BIRTH', 'DAYS_EMPLOYED',
      'NAME_CONTRACT_TYPE_x', 'NAME_TYPE_SUITE_x', 'WEEKDAY_APPR_PROCESS_START_x'
    ];

    const missingFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return value === null || value === '' || value === undefined;
    });

    return missingFields;
  };

  const handleSubmit = async () => {
    // Validate form
    const missingFields = validateForm();
    
    if (missingFields.length > 0) {
      toast.error("Incomplete Form", {
        description: `Please complete all required fields. Missing: ${missingFields.slice(0, 3).join(', ')}${missingFields.length > 3 ? '...' : ''}`,
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate report data
      const reportId = `FR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const userName = formData.CODE_GENDER === 'M' ? 'John Doe' : formData.CODE_GENDER === 'F' ? 'Jane Doe' : 'Client';
      const submissionTime = new Date().toISOString();
      
      // Calculate mock risk score (in real app, this would come from ML model)
      const riskScore = Math.random() * 0.6 + 0.2; // Random between 0.2 and 0.8
      const riskLevel = riskScore > 0.7 ? 'HIGH RISK' : riskScore > 0.4 ? 'MEDIUM RISK' : 'LOW RISK';
      const totalFields = 109;

      // Navigate to success page with data
      navigate('/form-success', {
        state: {
          formData,
          reportId,
          userName,
          submissionTime,
          riskScore,
          riskLevel,
          totalFields
        }
      });

      toast.success("Form Submitted Successfully!", {
        description: "Your report is ready for download",
        duration: 3000,
      });

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission Failed", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentSection < 8) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      markSectionVisited(nextSection);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <Button
        onClick={handlePrevious}
        disabled={currentSection === 1}
        variant="outline"
        className="gap-2 bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      {isLastSection ? (
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          size="lg"
          className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground border-0 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 active:scale-95 text-base px-8 py-6"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Form
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={handleNext}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
