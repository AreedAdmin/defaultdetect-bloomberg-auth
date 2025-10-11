import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/auth/AuthForm";
import { HelixBackground } from "@/components/auth/HelixBackground";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <HelixBackground />
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Branding Section */}
        <div className="space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary font-semibold text-sm">Financial Intelligence</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground">
              Default<span className="text-primary">Detect</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Advanced default risk detection and monitoring system
            </p>
          </div>

          <div className="space-y-3 pt-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Real-time Risk Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor default probabilities across your portfolio
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage machine learning for predictive insights
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security for your financial data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Form Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 shadow-lg">
            <AuthForm mode={mode} onToggleMode={() => setMode(mode === "login" ? "signup" : "login")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
