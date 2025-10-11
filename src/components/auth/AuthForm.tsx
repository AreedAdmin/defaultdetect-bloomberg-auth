import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Authentication Error",
          description: error.message || "An error occurred during authentication.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailValid(null);
      return;
    }
    const isValid = z.string().email().safeParse(value).success;
    setEmailValid(isValid);
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordValid(null);
      return;
    }
    const isValid = value.length >= 6;
    setPasswordValid(isValid);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-muted-foreground">
          {mode === "login"
            ? "Sign in to access your DefaultDetect dashboard"
            : "Sign up to start monitoring default risks"}
        </p>
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email
          </Label>
          <div className="relative group">
            <Mail
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 pointer-events-none ${
                emailFocused ? "text-primary scale-110" : "text-muted-foreground"
              }`}
            />
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => {
                setEmailFocused(false);
                validateEmail(email);
              }}
              required
              disabled={loading}
              className={`pl-10 bg-card border-2 transition-all duration-300 ${
                emailFocused ? "border-primary shadow-lg shadow-primary/20 -translate-y-0.5" : "border-border"
              } ${emailValid === true ? "border-green-500" : emailValid === false ? "border-destructive" : ""}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Password
          </Label>
          <div className="relative group">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 pointer-events-none ${
                passwordFocused ? "text-primary scale-110" : "text-muted-foreground"
              }`}
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => {
                setPasswordFocused(false);
                validatePassword(password);
              }}
              required
              disabled={loading}
              className={`pl-10 pr-10 bg-card border-2 transition-all duration-300 ${
                passwordFocused ? "border-primary shadow-lg shadow-primary/20 -translate-y-0.5" : "border-border"
              } ${passwordValid === true ? "border-green-500" : passwordValid === false ? "border-destructive" : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              disabled={loading}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
          disabled={loading}
        >
          <span className="relative z-10">
            {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </Button>
      </div>

      <div className="text-center text-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-primary hover:text-primary/80 transition-all duration-300 relative group"
          disabled={loading}
        >
          <span className="relative">
            {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </span>
        </button>
      </div>
    </div>
  );
};
