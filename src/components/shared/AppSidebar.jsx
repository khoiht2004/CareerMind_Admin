import { Link } from "react-router";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  Users,
  FileText,
  Bot,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { path } from "@/config/path";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavItem from "./NavItem";
import SectionHeader from "./SectionHeader";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

const adminNavItems = [
  { to: path.admin.root, icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: path.admin.users, icon: Users, label: "Người dùng" },
  { to: path.admin.jobs, icon: BriefcaseBusiness, label: "Việc làm" },
  { to: path.admin.applications, icon: FileText, label: "Đơn ứng tuyển" },
  { to: path.admin.ai, icon: Bot, label: "Cấu hình AI" },
  { to: path.admin.settings, icon: Settings, label: "Cài đặt" },
];

function AppSidebar() {
  const { user } = useSelector((state) => state.auth);
  const { isCollapsed } = useSidebar();

  const [sectionOpen, setSectionOpen] = useState(true);

  return (
    <div className="flex h-full flex-col py-4">
      {/* Logo */}
      <div className="border-b border-zinc-800 px-3 pb-4">
        <Link
          to={path.admin.root}
          className={cn(
            "flex min-w-0 cursor-pointer items-center gap-3 rounded-lg p-1 transition-opacity hover:opacity-75",
            isCollapsed && "justify-center",
          )}
          title="Trang chủ"
        >
          <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold">
            SRA
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm leading-tight font-bold text-white">
                Smart Recruit
              </p>
              <p className="text-[10px] text-zinc-500">Admin Area</p>
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
          label="Quản trị"
          isCollapsed={isCollapsed}
          open={sectionOpen}
          onToggle={() => setSectionOpen((isOpen) => !isOpen)}
        />
        {(isCollapsed || sectionOpen) && (
          <div className="space-y-0.5">
            {adminNavItems.map((item) => (
              <NavItem key={item.to} {...item} isCollapsed={isCollapsed} />
            ))}
          </div>
        )}
      </nav>

      {/* User info */}
      {user && (
        <div
          className={cn(
            "border-t border-zinc-800 pt-3",
            isCollapsed ? "px-1" : "px-3",
          )}
        >
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex cursor-default justify-center py-1">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-zinc-700 text-xs font-bold text-white">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      (user.name?.[0]?.toUpperCase() ?? "U")
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                {user.name ?? user.email}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-700 text-xs font-bold text-white">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.name?.[0]?.toUpperCase()
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-200">
                  {user.name}
                </p>
                <p className="truncate text-[11px] text-zinc-500">
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Theme toggle */}
      <ThemeToggle isCollapsed={isCollapsed} />
    </div>
  );
}

export default AppSidebar;
