import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, ArrowLeft, FileText, TrendingUp, Shield, Clock } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { PDFLoadingAnimation } from "@/components/form/PDFLoadingAnimation";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function FormSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const {
    formData,
    reportId,
    userName,
    submissionTime,
    riskScore,
    riskLevel,
    totalFields
  } = location.state || {};

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    if (!formData) {
      toast.error("No form data available");
      return;
    }

    setIsDownloading(true);

    // Minimum 2.5 seconds loading for perceived quality
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2500));

    try {
      const filename = generatePDF(formData, reportId, userName, riskScore, riskLevel);
      await minLoadingTime;
      setHasDownloaded(true);
      toast.success(`Report downloaded: ${filename}`, {
        duration: 5000,
        description: "Your fraud detection report has been saved successfully"
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF report", {
        description: "Please try again or contact support"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/form", { state: { preserveData: true, formData } });
  };

  if (!formData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>No Data Available</CardTitle>
              <CardDescription>Please submit the form first</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/form")} className="w-full">
                Go to Form
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const getRiskColor = (score: number) => {
    if (score > 0.7) return "text-destructive";
    if (score > 0.4) return "text-yellow-500";
    return "text-success";
  };

  const getRiskBgColor = (score: number) => {
    if (score > 0.7) return "bg-destructive/10 border-destructive/20";
    if (score > 0.4) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-success/10 border-success/20";
  };

  return (
    <DashboardLayout>
      {isDownloading && <PDFLoadingAnimation />}
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 py-12 px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Form Submitted Successfully!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your fraud detection report has been generated and is ready for download
            </p>
          </div>

          {/* Report Information Card */}
          <Card className="mb-6 border-2 border-accent/20 shadow-lg">
            <CardHeader className="bg-accent/5">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Report ID</p>
                <p className="text-lg font-mono font-semibold">{reportId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Client Name</p>
                <p className="text-lg font-semibold">{userName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Submission Time</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(submissionTime).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Verification Status</p>
                <p className="text-lg font-semibold text-success flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verified
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className={`mb-6 border-2 ${getRiskBgColor(riskScore)}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Total Fields Submitted</p>
                <p className="text-3xl font-bold text-foreground">{totalFields}</p>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Risk Score</p>
                <p className={`text-3xl font-bold ${getRiskColor(riskScore)}`}>
                  {(riskScore * 100).toFixed(1)}%
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className={`h-full rounded-full transition-all ${
                      riskScore > 0.7 ? 'bg-destructive' : riskScore > 0.4 ? 'bg-yellow-500' : 'bg-success'
                    }`}
                    style={{ width: `${riskScore * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Risk Classification</p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
                  riskScore > 0.7 ? 'bg-destructive/20 text-destructive' :
                  riskScore > 0.4 ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-success/20 text-success'
                }`}>
                  <Shield className="w-4 h-4" />
                  {riskLevel}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
              className="w-full h-auto py-4 gap-2 text-base"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back to Form
            </Button>
            <Button
              onClick={handleDownload}
              size="lg"
              className="w-full h-auto py-4 gap-2 text-base bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              disabled={isDownloading}
            >
              <Download className="w-5 h-5" />
              {hasDownloaded ? 'Download Again' : 'Download Report'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Your data has been saved and can be reviewed or modified at any time.</p>
            <p className="mt-1">The report is generated in professional bank-style PDF format.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
