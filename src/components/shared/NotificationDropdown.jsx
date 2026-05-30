import { useEffect } from "react";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from "@/services/notification.service";
import { useSocket } from "@/contexts/SocketContext";
import { cn } from "@/lib/utils";

function formatRelativeTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngày trước`;
}

function NotificationDropdown() {
  const socket = useSocket();
  const { data: response, isLoading, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = response?.data?.notifications ?? [];
  const unreadCount = response?.data?.unreadCount ?? 0;

  // Realtime refetch when new notification arrives
  useEffect(() => {
    if (!socket) return;

    const handleNewNoti = () => {
      refetch();
    };

    socket.on("notification:new", handleNewNoti);
    socket.on("notification:admin_new", handleNewNoti); // Listen to admin logs too!
    return () => {
      socket.off("notification:new", handleNewNoti);
      socket.off("notification:admin_new", handleNewNoti);
    };
  }, [socket, refetch]);

  const handleMarkAllRead = async (e) => {
    e.stopPropagation();
    try {
      await markAllAsRead().unwrap();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="bg-muted/70 hover:bg-muted relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors outline-none"
          aria-label="Thông báo"
        >
          <Bell className="size-5 text-slate-700" />
          {unreadCount > 0 && (
            <span className="ring-background absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="shadow-popover-soft w-[360px] overflow-hidden rounded-xl p-0 sm:w-[400px]"
      >
        {/* Header */}
        <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">
            Thông báo
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-primary hover:text-primary/80 flex cursor-pointer items-center gap-1 text-xs font-semibold"
            >
              <CheckCheck className="size-3.5" />
              Đọc tất cả
            </button>
          )}
        </div>

        {/* Content list */}
        <ScrollArea className="h-[360px]">
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center">
              <Loader2 className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-muted-foreground flex h-[300px] flex-col items-center justify-center gap-2 p-6 text-center text-sm">
              <Bell className="size-8 opacity-20" />
              <p>Bạn không có thông báo nào</p>
            </div>
          ) : (
            <div className="divide-border divide-y">
              {notifications.map((noti) => (
                <div
                  key={noti.id}
                  onClick={() => handleMarkRead(noti.id)}
                  className={cn(
                    "hover:bg-muted/40 flex cursor-pointer flex-col gap-1 p-4 transition-colors",
                    !noti.isRead && "bg-primary/5 font-medium",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-snug font-bold text-slate-800 dark:text-white">
                      {noti.title}
                    </p>
                    {!noti.isRead && (
                      <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {noti.content}
                  </p>
                  <span className="text-muted-foreground/60 mt-1 text-[10px]">
                    {formatRelativeTime(noti.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationDropdown;
