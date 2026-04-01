import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Bell, Settings, User, KeyRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clearUser } from "@/store/slice/authSlice";
import { path } from "@/config/path";
import { toast } from "sonner";

function UserMenu() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success("Đã đăng xuất");
    navigate(path.login);
  };

  const avatarContent = user.avatarUrl ? (
    <img
      src={user.avatarUrl}
      alt={user.name}
      className="h-full w-full object-cover"
    />
  ) : (
    <span>{user.name?.[0]?.toUpperCase() ?? "U"}</span>
  );

  return (
    <div className="flex items-center gap-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 cursor-pointer"
          >
            <Bell className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Thông báo</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 cursor-pointer"
          >
            <Settings className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Cài đặt</TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:ring-primary ml-1 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-zinc-600 text-sm font-bold text-white transition-all duration-150 hover:ring-2">
            {avatarContent}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          {/* User info */}
          <DropdownMenuLabel className="px-3 py-3 font-normal">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-600 text-base font-bold text-white">
                {avatarContent}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {user.name ?? "Người dùng"}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer gap-2.5 py-2.5"
            onClick={() => navigate(path.profile)}
          >
            <User className="size-4" />
            Trang cá nhân
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer gap-2.5 py-2.5"
            onClick={() => navigate(`${path.profile}?tab=settings`)}
          >
            <KeyRound className="size-4" />
            Đổi mật khẩu
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer gap-2.5 py-2.5 text-red-500 focus:bg-red-50 focus:text-red-500 dark:focus:bg-red-950/30"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserMenu;
