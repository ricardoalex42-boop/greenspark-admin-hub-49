import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useFacility } from "@/contexts/FacilityContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import GreenSparkLogo from "@/components/GreenSparkLogo";
import {
  LayoutDashboard,
  Bell,
  ClipboardCheck,
  Activity,
  FolderOpen,
  BookOpen,
  GraduationCap,
  CheckSquare,
  FileText,
  Users,
  Plug,
  CreditCard,
  Settings,
  Leaf,
  FlaskConical,
  FileSearch,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
  showFor?: string[]; // facility_types that see this item. undefined = all
  hideFor?: string[]; // facility_types that DON'T see this
  badge?: number;
}

export function DashboardSidebar() {
  const location = useLocation();
  const { facilityType } = useFacility();
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

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

  const mainNav: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Live Alerts", icon: Bell, path: "/dashboard/alerts", badge: unreadCount },
    { title: "Inspection Readiness", icon: ClipboardCheck, path: "/dashboard/inspection" },
    { title: "Activity Log", icon: Activity, path: "/dashboard/activity" },
    { title: "Documents", icon: FolderOpen, path: "/dashboard/documents" },
    { title: "SOPs", icon: BookOpen, path: "/dashboard/sops" },
    { title: "Training", icon: GraduationCap, path: "/dashboard/training" },
    { title: "Task Manager", icon: CheckSquare, path: "/dashboard/tasks" },
    { title: "Log Sheets", icon: FileText, path: "/dashboard/logs" },
    // Plants & Batches – cultivation + processing only
    { title: "Plants & Batches", icon: Leaf, path: "/dashboard/plants", showFor: ["cultivation", "processing"] },
    // Lab Tests – cultivation + processing show full; dispensary shows as "Product COAs"
    ...(facilityType === "dispensary"
      ? [{ title: "Product COAs", icon: FileSearch as React.ElementType, path: "/dashboard/lab-tests" }]
      : [{ title: "Lab Tests", icon: FlaskConical as React.ElementType, path: "/dashboard/lab-tests", showFor: ["cultivation", "processing"] as string[] }]),
    { title: "Staff Management", icon: Users, path: "/dashboard/staff" },
    { title: "Integrations", icon: Plug, path: "/dashboard/integrations" },
    { title: "Billing", icon: CreditCard, path: "/dashboard/billing" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const isVisible = (item: NavItem) => {
    if (!item.showFor && !item.hideFor) return true;
    if (item.showFor && facilityType) return item.showFor.includes(facilityType);
    if (item.hideFor && facilityType) return !item.hideFor.includes(facilityType);
    return true;
  };

  const isActive = (path: string) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-[240px] flex flex-col z-40 overflow-y-auto"
      style={{ background: "#0D1F14" }}
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-2">
        <GreenSparkLogo variant="light" size="sm" />
        <p className="mt-1 text-[11px]" style={{ color: "hsl(220 9% 46%)" }}>
          Compliance Platform
        </p>
      </div>

      <div className="mx-4 my-2 h-px" style={{ background: "hsl(150 20% 18%)" }} />

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {mainNav.filter(isVisible).map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative"
              style={
                active
                  ? { background: "#1A6B3A", color: "white" }
                  : { color: "hsl(210 17% 70%)" }
              }
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "hsl(150 20% 14%)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.title}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto">
        <div className="px-3 pb-1">
          <Link
            to="/dashboard/help"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ color: "hsl(210 17% 70%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(150 20% 14%)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help Center</span>
          </Link>
        </div>
        <div className="mx-4 my-2 h-px" style={{ background: "hsl(150 20% 18%)" }} />
        <div className="px-5 pb-4 space-y-0.5">
          <p className="text-[11px]" style={{ color: "hsl(220 9% 35%)" }}>
            Version 1.0.0
          </p>
          <p className="text-[11px]" style={{ color: "hsl(220 9% 35%)" }}>
            © 2025 GreenSpark
          </p>
        </div>
      </div>
    </aside>
  );
}
