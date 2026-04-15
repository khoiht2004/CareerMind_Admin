import { useState } from "react";
import { Shield, ShieldOff, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PaginationControl from "@/components/shared/Pagination";
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
  ADMIN: {
    label: "Admin",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  RECRUITER: {
    label: "Nhà tuyển dụng",
    className: "bg-secondary/10 text-secondary border-secondary/20",
  },
  CANDIDATE: {
    label: "Ứng viên",
    className: "bg-primary/10 text-primary border-primary/20",
  },
};

function UserTable({ search, role }) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetAdminUsersQuery({
    page,
    limit,
    search,
    role,
  });
  const [updateRole, { isLoading: updatingRole }] = useUpdateUserRoleMutation();
  const [toggleActive, { isLoading: togglingActive }] =
    useToggleUserActiveMutation();

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
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground py-10 text-center"
                >
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
                        <div className="bg-muted text-foreground flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold">
                          {user.profile?.avatarUrl ? (
                            <img
                              src={user.profile.avatarUrl}
                              alt={displayName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            displayName[0]?.toUpperCase()
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {displayName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge className={`border text-xs ${roleCfg?.className}`}>
                        {roleCfg?.label ?? user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border text-xs ${
                          user.isActive
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-muted text-muted-foreground border-border"
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
                          onValueChange={(val) =>
                            updateRole({ id: user.id, role: val })
                          }
                        >
                          <SelectTrigger className="h-7 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CANDIDATE">Ứng viên</SelectItem>
                            <SelectItem value="RECRUITER">
                              Nhà tuyển dụng
                            </SelectItem>
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
                            <ShieldOff className="text-destructive size-3.5" />
                          ) : (
                            <Shield className="text-primary size-3.5" />
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
      <PaginationControl
        page={page}
        totalPages={totalPages}
        total={totalItems}
        itemLabel="người dùng"
        onPageChange={setPage}
      />
    </div>
  );
}

export default UserTable;
