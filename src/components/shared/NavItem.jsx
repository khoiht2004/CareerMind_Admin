import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

const navLinkClass = (isActive, isCollapsed) =>
  cn(
    "flex items-center rounded-lg text-sm font-medium transition-colors cursor-pointer",
    isCollapsed ? "justify-center px-0 py-2.5 w-full" : "gap-3 px-3 py-2.5",
    isActive
      ? "bg-zinc-800 text-white"
      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
  );

// eslint-disable-next-line no-unused-vars
function NavItem({ to, end, icon: Icon, label, isCollapsed }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => navLinkClass(isActive, isCollapsed)}
    >
      <Icon className="size-4 shrink-0" />
      {!isCollapsed && label}
    </NavLink>
  );
}

export default NavItem;
