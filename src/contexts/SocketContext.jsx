import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!user || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/sra";
    const socketUrl = API_URL.replace(/\/sra\/?$/, "");

    console.log("🔌 [Admin] Connecting to socket server at:", socketUrl);
    const newSocket = io(socketUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("⚡ [Socket Admin] Kết nối thành công, ID:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ [Socket Admin] Lỗi kết nối:", error.message);
    });

    // Lắng nghe thông báo cá nhân
    newSocket.on("notification:new", (data) => {
      toast.success(
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sm">{data.title}</p>
          <p className="text-xs text-muted-foreground leading-snug">{data.content}</p>
        </div>,
        { duration: 6000 }
      );
    });

    // Lắng nghe thông báo hệ thống dành riêng cho ADMIN từ các schedules chạy ngầm
    newSocket.on("notification:admin_new", (data) => {
      toast.info(
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sm text-blue-600 dark:text-blue-400">🛡️ Hệ thống: {data.title}</p>
          <p className="text-xs text-muted-foreground leading-snug font-medium">{data.content}</p>
        </div>,
        {
          duration: 7000,
          action: {
            label: "Chi tiết",
            onClick: () => {
              console.log("Admin log details:", data);
            },
          },
        }
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
