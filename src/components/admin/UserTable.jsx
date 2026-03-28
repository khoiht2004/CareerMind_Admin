import { useState } from "react";
import { Shield, ShieldOff, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserActiveMutation,
} from "@/services/admin.service";

const ROLE_CONFIG = {
  ADMIN: { label: "Admin", className: "bg-red-100 text-red-700 border-red-200" },
  RECRUITER: { label: "Nhà tuyển dụng", className: "bg-blue-100 text-blue-700 border-blue-200" },
  CANDIDATE: { label: "Ứng viên", className: "bg-green-100 text-green-700 border-green-200" },
};

function UserTable({ search, role }) {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isFetching } = useGetAdminUsersQuery({ page, limit, search, role });
  const [updateRole, { isLoading: updatingRole }] = useUpdateUserRoleMutation();
  const [toggleActive, { isLoading: togglingActive }] = useToggleUserActiveMutation();

  const responseData = data?.data;
  const users = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  <Loader2 className="mx-auto size-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground py-10 text-center">
                  Không có người dùng nào
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const roleCfg = ROLE_CONFIG[user.role];
                const displayName = user.profile?.fullName ?? user.email;
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-xs font-bold text-zinc-700">
                          {user.profile?.avatarUrl ? (
                            <img src={user.profile.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                          ) : (
                            displayName[0]?.toUpperCase()
                          )}
                        </div>
                        <span className="text-sm font-medium">{displayName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={`border text-xs ${roleCfg?.className}`}>
                        {roleCfg?.label ?? user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border text-xs ${
                          user.isActive
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {user.isActive ? "Hoạt động" : "Tạm khóa"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Select
                          defaultValue={user.role}
                          disabled={updatingRole}
                          onValueChange={(val) => updateRole({ id: user.id, role: val })}
                        >
                          <SelectTrigger className="h-7 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CANDIDATE">Ứng viên</SelectItem>
                            <SelectItem value="RECRUITER">Nhà tuyển dụng</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          disabled={togglingActive}
                          onClick={() => toggleActive(user.id)}
                          title={user.isActive ? "Khóa tài khoản" : "Mở khóa"}
                        >
                          {user.isActive ? (
                            <ShieldOff className="size-3.5 text-red-500" />
                          ) : (
                            <Shield className="size-3.5 text-green-500" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Trang {page} / {totalPages} — {totalItems} người dùng
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Trước
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTable;
