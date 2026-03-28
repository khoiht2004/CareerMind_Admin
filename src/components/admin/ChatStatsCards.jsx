/* eslint-disable no-unused-vars */
import { MessageSquare, MessagesSquare, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetChatStatsQuery } from "@/services/admin.service";

function ChatStatsCards() {
  const { data: statsResponse } = useGetChatStatsQuery();
  const stats = statsResponse?.data;

  const cards = [
    {
      label: "Tổng phiên chat",
      value: stats?.totalSessions?.toLocaleString() ?? "—",
      icon: MessageSquare,
      desc: "Tất cả người dùng",
    },
    {
      label: "Tổng tin nhắn",
      value: stats?.totalMessages?.toLocaleString() ?? "—",
      icon: MessagesSquare,
      desc: "Tổng số lượt trao đổi",
    },
    {
      label: "Phiên hoạt động 7 ngày",
      value: stats?.recentSessions?.toLocaleString() ?? "—",
      icon: Activity,
      desc: "Cập nhật trong 7 ngày",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map(({ label, value, icon: Icon, desc }) => (
        <Card key={label}>
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-foreground text-sm">{label}</p>
              <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-lg">
                <Icon className="size-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-muted-foreground mt-1 text-xs">{desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ChatStatsCards;
