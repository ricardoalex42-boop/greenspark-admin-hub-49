import { BookOpen } from "lucide-react";

const SOPs = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">SOPs</h1>
      <p className="text-sm text-muted-foreground">Standard Operating Procedures — version control and review schedules.</p>
    </div>
    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">SOP management coming soon</p>
      </div>
    </div>
  </div>
);

export default SOPs;
