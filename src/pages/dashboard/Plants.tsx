import { Navigate } from "react-router-dom";
import { useFacility } from "@/contexts/FacilityContext";
import { Leaf } from "lucide-react";

const Plants = () => {
  const { facilityType } = useFacility();

  // Dispensary cannot access Plants & Batches
  if (facilityType === "dispensary") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Plants & Batches</h1>
        <p className="text-sm text-muted-foreground">Monitor plant inventory, growth stages, and METRC tags.</p>
      </div>
      <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
        <div className="text-center space-y-2">
          <Leaf className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">Plant & batch tracking coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Plants;
