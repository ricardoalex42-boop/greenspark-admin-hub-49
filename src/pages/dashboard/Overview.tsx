import { LayoutDashboard } from "lucide-react";

const Overview = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Welcome to GreenSpark — your compliance overview at a glance.</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {["Compliance Score", "Active Alerts", "Pending Tasks", "METRC Sync"].map((label) => (
        <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">—</p>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <LayoutDashboard className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Dashboard widgets coming soon</p>
      </div>
    </div>
  </div>
);

export default Overview;
