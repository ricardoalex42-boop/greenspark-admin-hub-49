import { Settings } from "lucide-react";

const DashboardSettings = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground">Account preferences, notifications, and organization settings.</p>
    </div>
    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <Settings className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Settings page coming soon</p>
      </div>
    </div>
  </div>
);

export default DashboardSettings;
