import { useEffect, useState } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Facility {
  id: string;
  name: string;
  license_number: string;
  facility_type: string | null;
  state: string;
  status: string | null;
}

export function FacilitySelector() {
  const { profile } = useAuth();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selected, setSelected] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      const { data } = await supabase
        .from("facilities")
        .select("id, name, license_number, facility_type, state, status")
        .eq("status", "active")
        .order("name");

      if (data && data.length > 0) {
        setFacilities(data);
        const defaultFac = profile?.default_facility_id
          ? data.find((f) => f.id === profile.default_facility_id)
          : null;
        setSelected(defaultFac || data[0]);
      }
      setLoading(false);
    };

    fetchFacilities();
  }, [profile?.default_facility_id]);

  if (loading) {
    return (
      <div className="h-9 w-48 animate-pulse rounded-lg bg-muted" />
    );
  }

  if (facilities.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Building2 className="h-4 w-4" />
        <span>No facilities</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 gap-2 border-border bg-card text-foreground hover:bg-muted"
        >
          <Building2 className="h-4 w-4 text-primary" />
          <span className="max-w-[180px] truncate text-sm font-medium">
            {selected?.name || "Select facility"}
          </span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
            {selected?.state}
          </span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        {facilities.map((facility) => (
          <DropdownMenuItem
            key={facility.id}
            onClick={() => setSelected(facility)}
            className={`flex flex-col items-start gap-0.5 ${
              selected?.id === facility.id ? "bg-muted" : ""
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-medium text-sm">{facility.name}</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
                {facility.state}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {facility.license_number}
              {facility.facility_type && ` · ${facility.facility_type}`}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
