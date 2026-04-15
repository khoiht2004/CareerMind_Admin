import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import AppSidebar from "@/components/shared/AppSidebar";
import AppHeader from "@/components/shared/AppHeader";
import AppFooter from "@/components/shared/AppFooter";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { path } from "@/config/path";
import { cn } from "@/lib/utils";

function LayoutContent() {
  const { isCollapsed, isMobile, mobileOpen, closeMobile } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    closeMobile();
  }, [location.pathname, closeMobile]);

  return (
    <div className="flex min-h-screen">
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "border-r border-zinc-800 bg-zinc-950 transition-all duration-200",
          !isMobile && "sticky top-0 h-screen shrink-0 overflow-y-auto",
          !isMobile && (isCollapsed ? "w-14" : "w-60"),
          isMobile && "fixed inset-y-0 left-0 z-50 h-full w-64 overflow-y-auto",
          isMobile && (mobileOpen ? "translate-x-0" : "-translate-x-full"),
        )}
      >
        <AppSidebar />
      </aside>
      
      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] pb-25">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}

function PrivateLayout() {
  const { user, isChecked } = useSelector((state) => state.auth);

  if (!isChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  const isAdmin = user?.role === "ADMIN";
  const isCompanyManager =
    user?.canCompanyManage === true && user?.companyId != null;
  if (!user || (!isAdmin && !isCompanyManager)) {
    return <Navigate to={path.login} replace />;
  }

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}

export default PrivateLayout;
