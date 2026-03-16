import {
  LayoutDashboard,
  Shield,
  Package,
  Leaf,
  FlaskConical,
  FileText,
  BookOpen,
  Users,
  Bell,
  Plug,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GreenSparkLogo from "@/components/GreenSparkLogo";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Compliance", url: "/dashboard/compliance", icon: Shield },
  { title: "Batches", url: "/dashboard/batches", icon: Package },
  { title: "Plants", url: "/dashboard/plants", icon: Leaf },
  { title: "Lab Tests", url: "/dashboard/lab-tests", icon: FlaskConical },
];

const manageNav = [
  { title: "Documents", url: "/dashboard/documents", icon: FileText },
  { title: "SOPs", url: "/dashboard/sops", icon: BookOpen },
  { title: "Employees", url: "/dashboard/employees", icon: Users },
  { title: "Alerts", url: "/dashboard/alerts", icon: Bell },
  { title: "Integrations", url: "/dashboard/integrations", icon: Plug },
];

const systemNav = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const isActive = (path: string) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  const renderItems = (items: typeof mainNav) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.url)}
            tooltip={collapsed ? item.title : undefined}
          >
            <NavLink
              to={item.url}
              end={item.url === "/dashboard"}
              className="hover:bg-sidebar-accent/50"
              activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        {collapsed ? (
          <div className="flex justify-center">
            <GreenSparkLogo variant="light" size="sm" iconOnly />
          </div>
        ) : (
          <GreenSparkLogo variant="light" size="sm" />
        )}
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Main</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(mainNav)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Manage</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(manageNav)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>System</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(systemNav)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={signOut}
              tooltip={collapsed ? "Sign out" : undefined}
              className="hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && (
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium truncate max-w-[140px]">
                    {profile?.full_name || "User"}
                  </span>
                  <span className="text-[10px] text-sidebar-foreground/50">
                    Sign out
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
