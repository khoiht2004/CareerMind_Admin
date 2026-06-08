import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAdminChatSessionsQuery } from "@/services/admin.service";

function ChatSessionsTable() {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isFetching } = useGetAdminChatSessionsQuery({ page, limit });

  const responseData = data?.data;
  const sessions = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề phiên</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Số tin nhắn</TableHead>
              <TableHead>Tạo lúc</TableHead>
              <TableHead>Hoạt động gần nhất</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : sessions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground py-10 text-center"
                >
                  Chưa có phiên chat nào
                </TableCell>
              </TableRow>
            ) : (
              sessions.map((session) => {
                const userName =
                  session.user?.profile?.fullName ?? session.user?.email ?? "—";
                return (
                  <TableRow key={session.id}>
                    <TableCell className="text-sm font-medium">
                      {session.title ?? "Chưa đặt tên"}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{userName}</p>
                        <p className="text-muted-foreground text-xs">
                          {session.user?.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {session._count?.messages ?? 0}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(session.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(session.updatedAt).toLocaleString("vi-VN")}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-muted-foreground">
            Trang {page} / {totalPages} — {totalItems} phiên
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSessionsTable;
