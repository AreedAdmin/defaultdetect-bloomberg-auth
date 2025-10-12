import { useEffect, useState } from "react";
import { FileText, TrendingUp, Shield, CheckCircle } from "lucide-react";

const loadingSteps = [
  { icon: FileText, text: "Analyzing your data...", duration: 800 },
  { icon: TrendingUp, text: "Compiling report sections...", duration: 800 },
  { icon: Shield, text: "Generating professional document...", duration: 800 },
  { icon: CheckCircle, text: "Preparing download...", duration: 600 },
];

export const PDFLoadingAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = loadingSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;
    
    const progressInterval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update step based on elapsed time
      let cumulativeDuration = 0;
      for (let i = 0; i < loadingSteps.length; i++) {
        cumulativeDuration += loadingSteps[i].duration;
        if (elapsed < cumulativeDuration) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
            <div className="relative bg-accent/10 rounded-full p-6">
              <CurrentIcon className="w-12 h-12 text-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Processing...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Current Step Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground animate-pulse">
            {loadingSteps[currentStep].text}
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'w-8 bg-accent' : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Financial Animation Elements */}
        <div className="mt-6 flex justify-around text-muted-foreground">
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-1 h-8 bg-success rounded animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-12 bg-success rounded animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-6 bg-success rounded animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-1 h-10 bg-accent rounded animate-pulse" style={{ animationDelay: '100ms' }} />
            <div className="w-1 h-14 bg-accent rounded animate-pulse" style={{ animationDelay: '250ms' }} />
            <div className="w-1 h-8 bg-accent rounded animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-1 h-12 bg-primary rounded animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="w-1 h-10 bg-primary rounded animate-pulse" style={{ animationDelay: '350ms' }} />
            <div className="w-1 h-14 bg-primary rounded animate-pulse" style={{ animationDelay: '500ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
