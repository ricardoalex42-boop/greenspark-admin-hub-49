import { Activity } from "lucide-react";

const ActivityLog = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
      <p className="text-sm text-muted-foreground">Full audit trail of all actions and events.</p>
    </div>
    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <Activity className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Activity log coming soon</p>
      </div>
    </div>
  </div>
);

export default ActivityLog;
