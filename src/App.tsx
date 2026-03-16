import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import SuperAdminRoute from "@/components/SuperAdminRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Overview from "@/pages/dashboard/Overview";
import Compliance from "@/pages/dashboard/Compliance";
import Batches from "@/pages/dashboard/Batches";
import Plants from "@/pages/dashboard/Plants";
import LabTests from "@/pages/dashboard/LabTests";
import Documents from "@/pages/dashboard/Documents";
import SOPs from "@/pages/dashboard/SOPs";
import Employees from "@/pages/dashboard/Employees";
import Alerts from "@/pages/dashboard/Alerts";
import Integrations from "@/pages/dashboard/Integrations";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";
import SuperAdminLogin from "@/pages/SuperAdminLogin";
import SuperAdmin from "@/pages/SuperAdmin";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard — nested routes with layout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="batches" element={<Batches />} />
              <Route path="plants" element={<Plants />} />
              <Route path="lab-tests" element={<LabTests />} />
              <Route path="documents" element={<Documents />} />
              <Route path="sops" element={<SOPs />} />
              <Route path="employees" element={<Employees />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>

            <Route path="/super-admin/login" element={<SuperAdminLogin />} />
            <Route
              path="/super-admin"
              element={
                <SuperAdminRoute>
                  <SuperAdmin />
                </SuperAdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
