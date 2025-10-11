import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/auth/AuthForm";
import { HelixBackground } from "@/components/auth/HelixBackground";
import { FeatureCards } from "@/components/auth/FeatureCards";

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
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
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

          <FeatureCards />
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
