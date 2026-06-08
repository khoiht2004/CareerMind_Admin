import { Link } from "react-router";
import { useSelector } from "react-redux";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserMenu from "./UserMenu";
import { useSidebar } from "@/contexts/SidebarContext";
import { path } from "@/config/path";

function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-9 cursor-pointer"
        asChild
      >
        <Link to={path.login}>Đăng nhập</Link>
      </Button>
      <Button size="sm" className="h-9 cursor-pointer" asChild>
        <Link to={path.register}>Đăng ký</Link>
      </Button>
    </div>
  );
}

function AppHeader() {
  const { isCollapsed, toggle } = useSidebar();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b px-2 backdrop-blur sm:px-3">
      {/* Sidebar toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-9 w-9 cursor-pointer sm:h-10 sm:w-10"
          >
            <PanelLeft className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        </TooltipContent>
      </Tooltip>

      {/* Right */}
      {user ? <UserMenu /> : <AuthButtons />}
    </header>
  );
}

export default AppHeader;
