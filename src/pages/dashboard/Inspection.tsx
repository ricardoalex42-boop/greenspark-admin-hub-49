import { ClipboardCheck } from "lucide-react";

const Inspection = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Inspection Readiness</h1>
      <p className="text-sm text-muted-foreground">Prepare for state inspections with checklists and mock audits.</p>
    </div>
    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <ClipboardCheck className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Inspection readiness coming soon</p>
      </div>
    </div>
  </div>
);

export default Inspection;
