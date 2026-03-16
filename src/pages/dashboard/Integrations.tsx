import { Plug } from "lucide-react";

const Integrations = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
      <p className="text-sm text-muted-foreground">Connect METRC and third-party services to your facility.</p>
    </div>
    <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
      <p className="text-sm font-medium text-warning">🔗 METRC sync is coming soon</p>
      <p className="mt-1 text-xs text-muted-foreground">
        We are finalizing our vendor API access. Your credentials are saved and sync will activate automatically.
      </p>
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
