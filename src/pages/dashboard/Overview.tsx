import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFacility } from "@/contexts/FacilityContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Bell,
  X,
  AlertTriangle,
  Clock,
  Calendar,
  ArrowRight,
  Package,
  Trash2,
  FlaskConical,
  ClipboardCheck,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Edit,
  Shield,
  Activity,
} from "lucide-react";

/* ---------- helpers ---------- */
function formatRelativeTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  if (isToday) return `Today, ${time}`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const actionTypeColors: Record<string, string> = {
  sync: "#3B82F6",
  warning: "#F59E0B",
  success: "#1A6B3A",
  correction: "#6B7280",
};

const actionTypeIcons: Record<string, React.ElementType> = {
  sync: RefreshCw,
  warning: AlertTriangle,
  success: CheckCircle2,
  correction: Edit,
};

/* ---------- Skeleton ---------- */
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-muted ${className}`} />;
}

/* ---------- Component ---------- */
const Overview = () => {
  const { facilityId, facilityType, refreshKey } = useFacility();
  const { user } = useAuth();

  // Data states
  const [ommaBanner, setOmmaBanner] = useState<any>(null);
  const [compliance, setCompliance] = useState<any>(null);
  const [pendingTransfers, setPendingTransfers] = useState<number>(0);
  const [wasteStatus, setWasteStatus] = useState<{ overdue: boolean; date: string | null }>({ overdue: true, date: null });
  const [labCount, setLabCount] = useState<number>(0);
  const [inspection, setInspection] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!facilityId) { setLoading(false); return; }
    setLoading(true);

    const fetchAll = async () => {
      // All queries in parallel
      const [bannerRes, compRes, transferRes, wasteRes, labRes, inspRes, actRes] = await Promise.all([
        supabase
          .from("live_alerts")
          .select("*")
          .eq("facility_id", facilityId)
          .eq("category", "omma_update")
          .eq("dismissed", false)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("compliance_scores")
          .select("*")
          .eq("facility_id", facilityId)
          .order("calculated_at", { ascending: false })
          .limit(1),
        supabase
          .from("batch_transfers")
          .select("id", { count: "exact", head: true })
          .or(`from_facility_id.eq.${facilityId},to_facility_id.eq.${facilityId}`)
          .not("status", "in", '("completed","cancelled")'),
        supabase
          .from("waste_disposal_logs")
          .select("disposal_date")
          .eq("facility_id", facilityId)
          .order("disposal_date", { ascending: false })
          .limit(1),
        supabase
          .from("lab_tests")
          .select("id", { count: "exact", head: true })
          .eq("facility_id", facilityId)
          .in("status", ["submitted", "in_lab"]),
        supabase
          .from("inspection_readiness")
          .select("*")
          .eq("facility_id", facilityId)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("activity_log")
          .select("*")
          .eq("facility_id", facilityId)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setOmmaBanner(bannerRes.data?.[0] ?? null);
      setCompliance(compRes.data?.[0] ?? null);
      setPendingTransfers(transferRes.count ?? 0);

      // Waste status
      const lastWaste = wasteRes.data?.[0]?.disposal_date ?? null;
      if (lastWaste) {
        const daysDiff = (Date.now() - new Date(lastWaste).getTime()) / (1000 * 60 * 60 * 24);
        setWasteStatus({ overdue: daysDiff > 7, date: lastWaste });
      } else {
        setWasteStatus({ overdue: true, date: null });
      }

      setLabCount(labRes.count ?? 0);
      setInspection(inspRes.data?.[0] ?? null);
      setActivities(actRes.data ?? []);
      setLoading(false);
    };

    fetchAll();
  }, [facilityId, refreshKey]);

  const dismissBanner = async () => {
    if (!ommaBanner || !user) return;
    await supabase
      .from("live_alerts")
      .update({ dismissed: true, dismissed_by: user.id, dismissed_at: new Date().toISOString() })
      .eq("id", ommaBanner.id);
    setOmmaBanner(null);
  };

  const score = compliance?.score ?? 0;
  const scoreRadius = 60;
  const scoreCircumference = 2 * Math.PI * scoreRadius;
  const scoreOffset = scoreCircumference - (score / 100) * scoreCircumference;

  const statusBadge = (status: string | null) => {
    switch (status) {
      case "good_standing":
        return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: "#1A6B3A" }}>Good Standing</span>;
      case "attention_needed":
        return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: "#F59E0B" }}>Attention Needed</span>;
      case "at_risk":
        return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: "#DC2626" }}>At Risk</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-muted text-muted-foreground">No Data</span>;
    }
  };

  if (!facilityId) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card p-16">
        <div className="text-center space-y-2">
          <Shield className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">No facility selected. Join an organization to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* OMMA Update Banner */}
      {ommaBanner && (
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3"
          style={{ background: "hsl(160 40% 94%)", border: "1px solid hsl(160 40% 80%)" }}
        >
          <Bell className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#1A6B3A" }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{ommaBanner.title}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{ommaBanner.message}</p>
          </div>
          <button onClick={dismissBanner} className="shrink-0 rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Compliance Score Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-36 w-36 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* SVG Gauge */}
            <div className="relative">
              <svg width="160" height="160" className="-rotate-90">
                <circle cx="80" cy="80" r={scoreRadius} fill="none" stroke="hsl(220 9% 91%)" strokeWidth="10" />
                <circle
                  cx="80"
                  cy="80"
                  r={scoreRadius}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="10"
                  strokeDasharray={scoreCircumference}
                  strokeDashoffset={scoreOffset}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{score}</span>
                <span className="text-xs text-muted-foreground">out of 100</span>
              </div>
            </div>

            {statusBadge(compliance?.status)}

            {/* Mini stat cards */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-2">
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background p-3">
                <AlertTriangle className="h-4 w-4" style={{ color: "#F59E0B" }} />
                <span className="text-lg font-bold text-foreground">{compliance?.active_risks ?? 0}</span>
                <span className="text-[11px] text-muted-foreground text-center">Active Risks</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background p-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground text-center">{formatRelativeTime(compliance?.last_sync_at)}</span>
                <span className="text-[11px] text-muted-foreground text-center">Last Sync</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background p-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground text-center">{formatDate(compliance?.next_check_date)}</span>
                <span className="text-[11px] text-muted-foreground text-center">Next Check</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Cards */}
      <div className={`grid gap-4 ${facilityType === "dispensary" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {/* Pending Transfers */}
        <Link to="/dashboard/logs" className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
          {loading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: pendingTransfers > 0 ? "hsl(30 95% 95%)" : "hsl(220 9% 96%)" }}>
                  <Package className="h-4 w-4" style={{ color: pendingTransfers > 0 ? "#F59E0B" : "#6B7280" }} />
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">{pendingTransfers}</p>
                <p className="text-sm text-muted-foreground">Pending Transfers</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </Link>

        {/* Waste Log Status — hide for dispensary */}
        {facilityType !== "dispensary" && (
          <Link to="/dashboard/logs" className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: wasteStatus.overdue ? "hsl(0 80% 95%)" : "hsl(145 50% 95%)" }}
                  >
                    <Trash2 className="h-4 w-4" style={{ color: wasteStatus.overdue ? "#DC2626" : "#1A6B3A" }} />
                  </div>
                  <p className="mt-3 text-sm font-bold text-foreground">
                    {wasteStatus.overdue ? "Waste Log Overdue" : "Waste Log Current"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {wasteStatus.date ? `Last: ${formatDate(wasteStatus.date)}` : "No records"}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </Link>
        )}

        {/* Lab Tests In Progress */}
        <Link to="/dashboard/lab-tests" className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
          {loading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "hsl(210 80% 95%)" }}>
                  <FlaskConical className="h-4 w-4" style={{ color: "#3B82F6" }} />
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">{labCount}</p>
                <p className="text-sm text-muted-foreground">
                  {facilityType === "dispensary" ? "COAs to Review" : "Tests In Progress"}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </Link>
      </div>

      {/* Inspection Readiness Mini Card */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Inspection Readiness</h3>
          </div>
          <Link to="/dashboard/inspection" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
            View Full Report <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : inspection ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${inspection.overall_score ?? 0}%`, background: "#1A6B3A" }}
                />
              </div>
              <span className="text-sm font-bold text-foreground">{inspection.overall_score ?? 0}%</span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>{inspection.open_issues ?? 0} open issues</span>
              <span>Last audit: {formatDate(inspection.last_mock_audit_date)}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No inspection data yet.</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-2">
            {activities.map((act) => {
              const IconComp = actionTypeIcons[act.action_type] ?? Activity;
              const color = actionTypeColors[act.action_type] ?? "#6B7280";
              return (
                <div key={act.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: `${color}15` }}>
                    <IconComp className="h-3.5 w-3.5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{act.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{formatRelativeTime(act.created_at)}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
