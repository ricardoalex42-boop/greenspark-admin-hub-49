import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import GreenSparkLogo from "@/components/GreenSparkLogo";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen" style={{ background: "hsl(210 17% 98%)" }}>
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <GreenSparkLogo variant="dark" size="sm" />
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {profile?.full_name || "User"}
          </span>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut size={16} />
          </Button>
        </div>
      </header>
      <main className="flex items-center justify-center p-12">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Dashboard content coming soon.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
