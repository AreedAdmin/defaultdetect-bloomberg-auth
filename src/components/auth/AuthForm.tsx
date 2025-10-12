import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100),
});

interface AuthFormProps {
  mode: "login" | "signup";
  onToggleMode: () => void;
}

export const AuthForm = ({ mode, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const validatedData = authSchema.parse({ email, password });

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: validatedData.email,
          password: validatedData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
          duration: 4000, // Auto dismiss after 4 seconds
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: validatedData.email,
          password: validatedData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back",
          description: "Successfully logged in to DefaultDetect.",
          duration: 3000, // Auto dismiss after 3 seconds
        });
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
          duration: 5000,
        });
      } else {
        // Handle different types of errors
        let errorMessage = "An error occurred during authentication.";
        
        if (error?.message) {
          errorMessage = error.message;
        } else if (error?.error_description) {
          errorMessage = error.error_description;
        } else if (error?.status === 503 || error?.code === 'ECONNREFUSED') {
          errorMessage = "Unable to connect to authentication service. Please check your internet connection and try again.";
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        // Handle specific Supabase auth errors
        if (errorMessage.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else if (errorMessage.includes("Email not confirmed")) {
          errorMessage = "Please verify your email address before signing in.";
        } else if (errorMessage.includes("User already registered")) {
          errorMessage = "This email is already registered. Please sign in instead.";
        }
        
        toast({
          title: "Authentication Error",
          description: errorMessage,
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700"
      style={{ animationDelay: "0.1s", animationFillMode: "both" }}
    >
      {/* Glass morphism card container matching feature cards */}
      <div
        className="relative overflow-hidden rounded-xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-blue-600/20 to-blue-800/5 p-8 shadow-2xl transition-all duration-500 hover:scale-[1.02] group"
        style={{
          boxShadow: "0 25px 50px -10px rgba(37, 99, 235, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)",
        }}
      >
        {/* Animated top border matching feature cards */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

        {/* Pulse border effect */}
        <div
          className="absolute inset-0 rounded-xl border border-blue-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700"
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        />

        {/* Content */}
        <div className="relative space-y-8">
          {/* Header with staggered animation */}
          <div
            className="space-y-3 text-center animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h1
              className="text-3xl font-bold text-slate-100 transition-all duration-1000 hover:text-blue-300"
              style={{
                textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                filter: focusedField ? "brightness(1.2)" : "brightness(1)",
              }}
            >
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-400 leading-relaxed font-medium">
              {mode === "login"
                ? "Sign in to access your DefaultDetect dashboard"
                : "Sign up to start monitoring default risks"}
            </p>
          </div>

          {/* Form with staggered animations */}
          <div className="space-y-6">
            {/* Email field */}
            <div
              className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-slate-300 transition-colors duration-300"
                style={{ color: focusedField === "email" ? "#60a5fa" : "" }}
              >
                Email
              </Label>
              <div className="relative group/input">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={loading}
                  className="bg-slate-900/60 border-slate-600/40 text-slate-100 placeholder-slate-500 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           transition-all duration-300 backdrop-blur-sm
                           hover:bg-slate-800/60 hover:border-slate-500/60
                           focus:bg-slate-800/80"
                  style={{
                    boxShadow:
                      focusedField === "email"
                        ? "0 0 0 3px rgba(59, 130, 246, 0.15), 0 0 25px rgba(59, 130, 246, 0.25)"
                        : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transform: focusedField === "email" ? "translateY(-2px)" : "translateY(0)",
                  }}
                />
                {/* Floating focus ring */}
                <div
                  className={`absolute inset-0 rounded-lg border-2 border-blue-400/40 pointer-events-none transition-all duration-300 ${
                    focusedField === "email" ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                />
              </div>
            </div>

            {/* Password field */}
            <div
              className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-slate-300 transition-colors duration-300"
                style={{ color: focusedField === "password" ? "#60a5fa" : "" }}
              >
                Password
              </Label>
              <div className="relative group/input">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={loading}
                  className="bg-slate-900/60 border-slate-600/40 text-slate-100 placeholder-slate-500 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           transition-all duration-300 backdrop-blur-sm
                           hover:bg-slate-800/60 hover:border-slate-500/60
                           focus:bg-slate-800/80"
                  style={{
                    boxShadow:
                      focusedField === "password"
                        ? "0 0 0 3px rgba(59, 130, 246, 0.15), 0 0 25px rgba(59, 130, 246, 0.25)"
                        : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transform: focusedField === "password" ? "translateY(-2px)" : "translateY(0)",
                  }}
                />
                {/* Floating focus ring */}
                <div
                  className={`absolute inset-0 rounded-lg border-2 border-blue-400/40 pointer-events-none transition-all duration-300 ${
                    focusedField === "password" ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                />
              </div>
            </div>

            {/* Enhanced Sign In Button matching feature cards style */}
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="relative w-full py-4 px-6 rounded-xl font-semibold text-white overflow-hidden 
                         transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed 
                         hover:scale-[1.02] active:scale-[0.98] group/btn"
                style={{
                  background: loading
                    ? "linear-gradient(135deg, #475569 0%, #334155 100%)"
                    : "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)",
                  boxShadow: loading
                    ? "none"
                    : "0 10px 30px -5px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px -10px rgba(59, 130, 246, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.2)";
                    e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px -5px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }
                }}
              >
                {/* Shimmer effect */}
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                    animation: !loading ? "shimmer 2s infinite" : "none",
                  }}
                />

                {/* Ripple effect container */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                             transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
                  />
                </div>

                <span className="relative z-10 flex items-center justify-center gap-3 text-base">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="animate-pulse">Processing...</span>
                    </>
                  ) : mode === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Toggle Mode Link */}
          <div
            className="text-center text-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <button
              type="button"
              onClick={onToggleMode}
              disabled={loading}
              className="text-blue-400 hover:text-blue-300 transition-all duration-300 disabled:opacity-50 
                       hover:scale-105 active:scale-95 font-medium
                       hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            >
              {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
