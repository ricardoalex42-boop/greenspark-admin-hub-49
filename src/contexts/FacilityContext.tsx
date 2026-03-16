import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Facility {
  id: string;
  name: string;
  license_number: string;
  facility_type: string | null;
  state: string;
  status: string | null;
  metrc_connected: boolean | null;
  last_synced_at: string | null;
  organization_id: string | null;
}

interface FacilityContextType {
  facilities: Facility[];
  selected: Facility | null;
  setSelectedId: (id: string) => void;
  loading: boolean;
  /** shorthand for selected fields */
  facilityId: string | null;
  facilityName: string | null;
  facilityType: string | null;
  facilityState: string | null;
  /** increments every time the facility changes – use as a react-query key segment */
  refreshKey: number;
}

const FacilityContext = createContext<FacilityContextType | undefined>(undefined);

export const FacilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selected, setSelected] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user) {
      setFacilities([]);
      setSelected(null);
      setLoading(false);
      return;
    }

    const fetch = async () => {
      setLoading(true);

      // Get user's org memberships first
      const { data: memberships } = await supabase
        .from("organization_members")
        .select("organization_id")
        .eq("user_id", user.id);

      if (!memberships || memberships.length === 0) {
        setFacilities([]);
        setSelected(null);
        setLoading(false);
        return;
      }

      const orgIds = memberships.map((m) => m.organization_id).filter(Boolean) as string[];

      const { data } = await supabase
        .from("facilities")
        .select("id, name, license_number, facility_type, state, status, metrc_connected, last_synced_at, organization_id")
        .in("organization_id", orgIds)
        .eq("status", "active")
        .order("name");

      const list = (data ?? []) as Facility[];
      setFacilities(list);

      if (list.length > 0) {
        const defaultFac = profile?.default_facility_id
          ? list.find((f) => f.id === profile.default_facility_id)
          : null;
        setSelected(defaultFac || list[0]);
      } else {
        setSelected(null);
      }
      setLoading(false);
    };

    fetch();
  }, [user, profile?.default_facility_id]);

  const setSelectedId = useCallback(
    (id: string) => {
      const fac = facilities.find((f) => f.id === id);
      if (fac) {
        setSelected(fac);
        setRefreshKey((k) => k + 1);
      }
    },
    [facilities],
  );

  return (
    <FacilityContext.Provider
      value={{
        facilities,
        selected,
        setSelectedId,
        loading,
        facilityId: selected?.id ?? null,
        facilityName: selected?.name ?? null,
        facilityType: selected?.facility_type ?? null,
        facilityState: selected?.state ?? null,
        refreshKey,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacility = () => {
  const ctx = useContext(FacilityContext);
  if (!ctx) throw new Error("useFacility must be used within FacilityProvider");
  return ctx;
};
