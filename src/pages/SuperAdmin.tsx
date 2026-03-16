import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";

const SuperAdmin = () => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">GreenSpark Admin</span>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut size={16} />
        </Button>
      </header>
      <main className="flex items-center justify-center p-12">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Super Admin Panel</h1>
          <p className="text-muted-foreground">Admin panel content coming soon.</p>
        </div>
      </main>
    </div>
  );
};

export default SuperAdmin;
