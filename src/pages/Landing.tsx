import { Link } from "react-router-dom";
import GreenSparkLogo from "@/components/GreenSparkLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen" style={{ background: "hsl(150 30% 9%)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <GreenSparkLogo variant="light" size="md" />
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-[hsl(210_17%_85%)] hover:text-white hover:bg-white/10">
              Sign in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-28 max-w-3xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <Zap size={12} />
          Now launching in Oklahoma
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
          Cannabis Compliance,{" "}
          <span className="text-primary">Simplified</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl" style={{ color: "hsl(220 9% 65%)" }}>
          Stay ahead of METRC, OMMA, and state regulations with automated tracking, real-time alerts, and AI-powered compliance guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12">
              Start Free Trial <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-[hsl(150_20%_25%)] bg-transparent text-[hsl(210_17%_85%)] hover:bg-white/5 h-12 px-8"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Shield,
            title: "Automated Compliance",
            description: "Auto-sync with METRC and state systems. Waste logs, transfers, and harvest records — handled.",
          },
          {
            icon: BarChart3,
            title: "Real-Time Monitoring",
            description: "Compliance scores, license health, and inspection readiness at a glance across all your facilities.",
          },
          {
            icon: Zap,
            title: "AI-Powered Guidance",
            description: "Get instant answers to compliance questions from an AI assistant trained on state cannabis regulations.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl p-6 border"
            style={{ background: "hsl(150 20% 12%)", borderColor: "hsl(150 20% 18%)" }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(220 9% 65%)" }}>
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8" style={{ borderColor: "hsl(150 20% 18%)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <GreenSparkLogo variant="light" size="sm" />
          <p className="text-xs" style={{ color: "hsl(220 9% 46%)" }}>
            © {new Date().getFullYear()} GreenSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
