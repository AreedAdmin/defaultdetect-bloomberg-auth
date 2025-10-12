import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FormProvider, useFormContext } from "@/contexts/FormContext";
import { ProgressBar } from "@/components/form/ProgressBar";
import { SectionNavigation } from "@/components/form/SectionNavigation";
import { FormHeader } from "@/components/form/FormHeader";
import Section1 from "@/components/form/sections/Section1";
import { Section2 } from "@/components/form/sections/Section2";
import { Section3 } from "@/components/form/sections/Section3";
import { Section4 } from "@/components/form/sections/Section4";
import { Section5 } from "@/components/form/sections/Section5";
import { SectionNavButtons } from "@/components/form/SectionNavButtons";
import { SectionTitle } from "@/components/form/SectionTitle";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const FormContent = () => {
  const { currentSection, loadFromLocalStorage, clearDraft } = useFormContext();
  const [showResumeDialog, setShowResumeDialog] = useState(false);

  useEffect(() => {
    const hasDraft = loadFromLocalStorage();
    if (hasDraft) {
      setShowResumeDialog(true);
    }
  }, []);

  const handleResume = () => {
    setShowResumeDialog(false);
  };

  const handleStartFresh = () => {
    clearDraft();
    setShowResumeDialog(false);
  };

  const sectionMetadata = [
    { title: "Client Identification", description: "Basic identification information" },
    { title: "Personal Information", description: "Personal and demographic details" },
    { title: "Income & Financial", description: "Financial status and income details" },
    { title: "Age & Employment", description: "Employment and age information" },
    { title: "Contact Information", description: "Contact details and preferences" },
    { title: "Regional & Location", description: "Location and regional data" },
    { title: "Current Application", description: "Current application details" },
    { title: "External Data Sources", description: "External verification data" },
    { title: "Social Circle & Bureau", description: "Social and credit bureau information" },
    { title: "Documents Provided", description: "Required documentation" },
    { title: "Previous Application", description: "Historical application data" },
    { title: "Derived Metrics", description: "Calculated risk metrics" },
  ];

  const renderSection = () => {
    const metadata = sectionMetadata[currentSection - 1];
    
    return (
      <>
        <SectionTitle 
          number={currentSection}
          title={metadata.title}
          description={metadata.description}
        />
        {(() => {
          switch (currentSection) {
            case 1:
              return <Section1 />;
            case 2:
              return <Section2 />;
            case 3:
              return <Section3 />;
            case 4:
              return <Section4 />;
            case 5:
              return <Section5 />;
            case 6:
              return <div className="text-center text-muted-foreground py-12">Section 6 coming soon...</div>;
            case 7:
              return <div className="text-center text-muted-foreground py-12">Section 7 coming soon...</div>;
            case 8:
              return <div className="text-center text-muted-foreground py-12">Section 8 coming soon...</div>;
            case 9:
              return <div className="text-center text-muted-foreground py-12">Section 9 coming soon...</div>;
            case 10:
              return <div className="text-center text-muted-foreground py-12">Section 10 coming soon...</div>;
            case 11:
              return <div className="text-center text-muted-foreground py-12">Section 11 coming soon...</div>;
            case 12:
              return <div className="text-center text-muted-foreground py-12">Section 12 coming soon...</div>;
            default:
              return <Section1 />;
          }
        })()}
      </>
    );
  };

  return (
    <DashboardLayout>
      {showResumeDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">Resume Previous Draft?</h3>
            <p className="text-muted-foreground mb-6">
              We found a saved draft. Would you like to continue where you left off?
            </p>
            <div className="flex gap-3">
              <Button onClick={handleResume} className="flex-1 bg-accent hover:bg-accent/90">
                Resume Draft
              </Button>
              <Button onClick={handleStartFresh} variant="outline" className="flex-1">
                Start Fresh
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <FormHeader />
        <ProgressBar />
        
        <div className="flex flex-1 overflow-hidden">
          <SectionNavigation />
          
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-12 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  {renderSection()}
                  <SectionNavButtons />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Form = () => {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
};

export default Form;
