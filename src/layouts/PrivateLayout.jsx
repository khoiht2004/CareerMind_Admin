import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import AppSidebar from "@/components/shared/AppSidebar";
import AppHeader from "@/components/shared/AppHeader";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { path } from "@/config/path";
import { cn } from "@/lib/utils";

function LayoutContent() {
  const { isCollapsed, isMobile, mobileOpen, closeMobile } = useSidebar();
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    closeMobile();
  }, [location.pathname, closeMobile]);

  return (
    <div className="flex min-h-screen">
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={closeMobile}
        />
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

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
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

  if (!user || user.role !== "ADMIN") {
    return <Navigate to={path.login} replace />;
  }

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}

export default PrivateLayout;
