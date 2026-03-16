import { Shield } from "lucide-react";

const Compliance = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Compliance</h1>
      <p className="text-sm text-muted-foreground">Monitor compliance scores, risks, and regulatory requirements.</p>
    </div>
    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <Shield className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Compliance dashboard coming soon</p>
      </div>
    </div>
  </div>
);

export default Compliance;
