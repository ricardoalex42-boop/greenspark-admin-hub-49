import { Plug, AlertTriangle } from "lucide-react";

const Integrations = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
      <p className="text-sm text-muted-foreground">Connect METRC and third-party services to your facility.</p>
    </div>

    {/* METRC Coming Soon Banner */}
    <div
      className="flex items-start gap-3 rounded-xl px-4 py-3"
      style={{ background: "hsl(45 93% 94%)", border: "1px solid hsl(45 90% 75%)" }}
    >
      <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#F59E0B" }} />
      <div>
        <p className="text-sm font-semibold text-foreground">METRC sync is coming soon</p>
        <p className="text-sm text-muted-foreground mt-0.5">
          We are finalizing our vendor API access. Your credentials are saved and sync will activate automatically once live.
        </p>
      </div>
    </div>

    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <Plug className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Integration management coming soon</p>
      </div>
    </div>
  </div>
);

export default Integrations;
