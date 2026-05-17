import { Link } from "react-router";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { path } from "@/config/path";
import { useSidebar } from "@/contexts/SidebarContext";
import NavItem from "./NavItem";
import SectionHeader from "./SectionHeader";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { COMPANY_NAV_ITEMS } from "@/config/company.constants";
import { ADMIN_NAV_ITEMS } from "@/config/admin.constants";

function AppSidebar() {
  const { user } = useSelector((state) => state.auth);
  const { isCollapsed } = useSidebar();
  const [sectionOpen, setSectionOpen] = useState(true);

  const isAdmin = user?.role === "ADMIN";
  const isCompanyManager =
    user?.canCompanyManage === true && user?.companyId != null;

  const navItems = isCompanyManager ? COMPANY_NAV_ITEMS : ADMIN_NAV_ITEMS;
  const sectionLabel = isAdmin ? "Quản trị hệ thống" : "Quản lý công ty";

  return (
    <div className="flex h-full flex-col py-4">
      {/* Logo */}
      <div className="border-sidebar-border border-b px-3 pb-4">
        <Link
          to={path.admin.root}
          className={cn(
            "flex min-w-0 cursor-pointer items-center gap-3 rounded-lg p-1 transition-opacity hover:opacity-75",
            isCollapsed && "justify-center",
          )}
          title="Trang chủ"
        >
          <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm">
            topcv
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sidebar-foreground truncate text-sm leading-tight font-bold">
                Smart Recruit
              </p>
              <p className="text-sidebar-foreground/60 text-[10px]">
                Admin Area
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav
        className={cn(
          "flex-1 overflow-y-auto pt-2",
          isCollapsed ? "px-1" : "px-2",
        )}
      >
        <SectionHeader
          label={sectionLabel}
          isCollapsed={isCollapsed}
          open={sectionOpen}
          onToggle={() => setSectionOpen((isOpen) => !isOpen)}
        />
        {(isCollapsed || sectionOpen) && (
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} isCollapsed={isCollapsed} />
            ))}
          </div>
        )}
      </nav>

      {/* Theme toggle */}
      <ThemeToggle isCollapsed={isCollapsed} />
    </div>
  );
}

export default AppSidebar;
