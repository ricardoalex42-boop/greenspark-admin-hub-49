import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GreenSparkLogo from "@/components/GreenSparkLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const Signup = () => {
  const { session, loading, signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    const result = await signUp(email, password, fullName);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4" style={{ background: "hsl(150 30% 9%)" }}>
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-3">
          <GreenSparkLogo variant="light" size="lg" />
          <p className="text-sm" style={{ color: "hsl(220 9% 65%)" }}>
            Create your GreenSpark account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium" style={{ color: "hsl(210 17% 85%)" }}>
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border-0 bg-[hsl(150_20%_14%)] text-[hsl(210_17%_96%)] placeholder:text-[hsl(220_9%_46%)] focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium" style={{ color: "hsl(210 17% 85%)" }}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-0 bg-[hsl(150_20%_14%)] text-[hsl(210_17%_96%)] placeholder:text-[hsl(220_9%_46%)] focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium" style={{ color: "hsl(210 17% 85%)" }}>
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-0 bg-[hsl(150_20%_14%)] pr-10 text-[hsl(210_17%_96%)] placeholder:text-[hsl(220_9%_46%)] focus-visible:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_9%_46%)] hover:text-[hsl(210_17%_85%)] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11"
          >
            {submitting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-sm" style={{ color: "hsl(220 9% 46%)" }}>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
