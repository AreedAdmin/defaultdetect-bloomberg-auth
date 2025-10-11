import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/auth/AuthForm";
import { SubtleBackground } from "@/components/auth/SubtleBackground";
import { FeatureCards } from "@/components/auth/FeatureCards";
import { AnimatedHeader } from "@/components/auth/AnimatedHeader";

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
      <SubtleBackground />
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Branding Section */}
        <div className="space-y-6 text-center md:text-left">
          <AnimatedHeader />
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
