import { CreditCard } from "lucide-react";

const Billing = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Billing</h1>
      <p className="text-sm text-muted-foreground">Manage your subscription, invoices, and payment methods.</p>
    </div>
    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
      <div className="text-center space-y-2">
        <CreditCard className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Billing management coming soon</p>
      </div>
    </div>
  </div>
);

export default Billing;
