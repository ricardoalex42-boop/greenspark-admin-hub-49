import { useFacility } from "@/contexts/FacilityContext";
import { FlaskConical, FileSearch } from "lucide-react";

const LabTests = () => {
  const { facilityType } = useFacility();
  const isDispensary = facilityType === "dispensary";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {isDispensary ? "Product COAs" : "Lab Tests"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isDispensary
            ? "View and download Certificates of Analysis for your inventory."
            : "View lab results, COA status, and testing history."}
        </p>
      </div>
      <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
        <div className="text-center space-y-2">
          {isDispensary ? (
            <FileSearch className="mx-auto h-10 w-10 text-muted-foreground/40" />
          ) : (
            <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground/40" />
          )}
          <p className="text-muted-foreground">
            {isDispensary ? "Product COA viewer coming soon" : "Lab test management coming soon"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabTests;
