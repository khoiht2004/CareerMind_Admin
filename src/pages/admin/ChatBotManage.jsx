import ChatStatsCards from "@/components/admin/ChatStatsCards";
import ChatSessionsTable from "@/components/admin/ChatSessionsTable";

function ChatBotManage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trợ lý AI</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Thống kê và giám sát hoạt động chatbot
        </p>
      </div>

      <ChatStatsCards />

      <div>
        <h2 className="mb-3 text-base font-semibold">Lịch sử phiên chat</h2>
        <ChatSessionsTable />
      </div>
    </div>
  );
}

export default ChatBotManage;
