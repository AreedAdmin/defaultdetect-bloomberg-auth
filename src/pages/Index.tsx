import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading DefaultDetect...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">DD</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Default<span className="text-primary">Detect</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to DefaultDetect
            </h2>
            <p className="text-muted-foreground">
              Your comprehensive default risk monitoring system is ready to use.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-sm text-muted-foreground mb-1">Portfolio Value</div>
              <div className="text-2xl font-bold text-foreground">$0.00</div>
              <div className="text-xs text-success mt-2">+0.00%</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-sm text-muted-foreground mb-1">Risk Score</div>
              <div className="text-2xl font-bold text-foreground">N/A</div>
              <div className="text-xs text-muted-foreground mt-2">No data</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-sm text-muted-foreground mb-1">Active Alerts</div>
              <div className="text-2xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground mt-2">All clear</div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Getting Started</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Connect Data Sources</div>
                  <div className="text-sm text-muted-foreground">
                    Import your portfolio data to begin monitoring
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Configure Risk Parameters</div>
                  <div className="text-sm text-muted-foreground">
                    Set thresholds and alert preferences
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">3</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Monitor & Analyze</div>
                  <div className="text-sm text-muted-foreground">
                    Track real-time risk metrics and trends
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
