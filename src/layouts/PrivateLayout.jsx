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
  const { isCollapsed } = useSidebar();
  const mainRef = useRef(null);
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "sticky top-0 h-screen shrink-0 overflow-y-auto border-r border-zinc-800 bg-zinc-950 transition-all duration-200",
          isCollapsed ? "w-14" : "w-60",
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
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={path.login} replace />;
  }

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}

export default PrivateLayout;
