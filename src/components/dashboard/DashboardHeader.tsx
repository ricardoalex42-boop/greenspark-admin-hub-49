import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFacility } from "@/contexts/FacilityContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Bell,
  ChevronDown,
  Building2,
  LogOut,
  Settings,
  User,
  RefreshCw,
} from "lucide-react";

const typeBadgeColors: Record<string, string> = {
  cultivation: "#1A6B3A",
  processing: "#F59E0B",
  dispensary: "#3B82F6",
};

function formatSyncTime(iso: string | null): string {
  if (!iso) return "Never";
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return isToday ? `Today, ${time}` : d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + `, ${time}`;
}

function getInitials(name: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface Props {
  pageTitle: string;
}

export function DashboardHeader({ pageTitle }: Props) {
  const { facilities, selected, setSelectedId } = useFacility();
  const { profile, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [facilityOpen, setFacilityOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const facRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const fetchUnread = async () => {
      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("read", false);
      setUnreadCount(count ?? 0);
    };
    fetchUnread();
  }, [user]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (facRef.current && !facRef.current.contains(e.target as Node)) setFacilityOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="fixed top-0 right-0 z-30 flex h-16 items-center justify-between px-6"
      style={{ left: 240, background: "white", borderBottom: "1px solid #E5E7EB" }}
    >
      {/* Left: page title */}
      <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>

      {/* Center: facility selector */}
      <div ref={facRef} className="relative">
        <button
          onClick={() => setFacilityOpen(!facilityOpen)}
          className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-sm transition-colors hover:bg-muted"
        >
          <Building2 className="h-4 w-4 text-primary" />
          {selected ? (
            <>
              <span className="font-medium text-foreground">{selected.state}</span>
              <span className="text-muted-foreground">•</span>
              <span
                className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white"
                style={{ background: typeBadgeColors[selected.facility_type ?? ""] ?? "#6B7280" }}
              >
                {selected.facility_type ?? "unknown"}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">No facility</span>
          )}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>

        {facilityOpen && (
          <div className="absolute top-full mt-1 left-0 w-72 rounded-xl border border-border bg-white shadow-lg overflow-hidden z-50">
            {facilities.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setSelectedId(f.id);
                  setFacilityOpen(false);
                }}
                className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-muted ${
                  selected?.id === f.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{f.name}</span>
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white"
                    style={{ background: typeBadgeColors[f.facility_type ?? ""] ?? "#6B7280" }}
                  >
                    {f.facility_type}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {f.state} · {f.license_number}
                </span>
              </button>
            ))}
            {facilities.length === 0 && (
              <p className="px-4 py-3 text-sm text-muted-foreground">No facilities found</p>
            )}
          </div>
        )}
      </div>

      {/* Right: sync status, bell, user avatar */}
      <div className="flex items-center gap-4">
        {/* Sync status */}
        {selected?.last_synced_at && (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3" />
            <span>Synced • {formatSyncTime(selected.last_synced_at)}</span>
          </div>
        )}

        {/* Bell */}
        <Link
          to="/dashboard/alerts"
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>

        {/* User avatar dropdown */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "#1A6B3A" }}
          >
            {getInitials(profile?.full_name ?? null)}
          </button>

          {userOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border bg-white shadow-lg overflow-hidden z-50">
              <div className="px-4 py-2.5 border-b border-border">
                <p className="text-sm font-medium text-foreground truncate">{profile?.full_name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{profile?.role || "user"}</p>
              </div>
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                onClick={() => setUserOpen(false)}
              >
                <User className="h-4 w-4" /> Profile
              </Link>
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                onClick={() => setUserOpen(false)}
              >
                <Settings className="h-4 w-4" /> Settings
              </Link>
              <button
                onClick={() => {
                  setUserOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive transition-colors hover:bg-muted"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
