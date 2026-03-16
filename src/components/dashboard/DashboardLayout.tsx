import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FacilityProvider } from "@/contexts/FacilityContext";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { MessageCircle } from "lucide-react";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/alerts": "Live Alerts",
  "/dashboard/inspection": "Inspection Readiness",
  "/dashboard/activity": "Activity Log",
  "/dashboard/documents": "Documents & Compliance Library",
  "/dashboard/sops": "SOPs",
  "/dashboard/training": "Training",
  "/dashboard/tasks": "Task Manager",
  "/dashboard/logs": "Log Sheets",
  "/dashboard/plants": "Plants & Batches",
  "/dashboard/lab-tests": "Lab Tests",
  "/dashboard/staff": "Staff Management",
  "/dashboard/integrations": "Integrations",
  "/dashboard/billing": "Billing",
  "/dashboard/settings": "Settings",
  "/dashboard/help": "Help Center",
  "/dashboard/compliance": "Compliance",
  "/dashboard/batches": "Batches",
  "/dashboard/employees": "Employees",
};

export function DashboardLayout() {
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <FacilityProvider>
      <div className="min-h-screen flex">
        {/* Fixed sidebar */}
        <DashboardSidebar />

        {/* Main content area */}
        <div className="flex-1 ml-[240px] min-h-screen" style={{ background: "#F8F9FA" }}>
          {/* Fixed header */}
          <DashboardHeader pageTitle={pageTitle} />

          {/* Page content */}
          <main className="pt-16 p-6">
            <Outlet />
          </main>
        </div>

        {/* Green floating chat bubble */}
        <button
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ background: "#1A6B3A" }}
          aria-label="Open compliance assistant"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      </div>
    </FacilityProvider>
  );
}
