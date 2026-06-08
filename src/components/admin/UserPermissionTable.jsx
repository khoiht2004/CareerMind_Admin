import { useState, useCallback } from "react";
import { Search, ShieldCheck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import PaginationControl from "@/components/shared/Pagination";
import UserPermissionSheet from "./UserPermissionSheet";
import { useGetAdminUsersQuery } from "@/services/admin.service";

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

function UserPermissionTable() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [page, setPage] = useState(1);
  const [sheetUser, setSheetUser] = useState(null);

  const { data, isFetching } = useGetAdminUsersQuery({
    page,
    limit: 10,
    search,
    role,
  });

  const responseData = data?.data;
  const users = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleRoleChange = useCallback((val) => {
    setRole(val);
    setPage(1);
  }, []);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm sm:flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Tất cả vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả vai trò</SelectItem>
            <SelectItem value="CANDIDATE">Ứng viên</SelectItem>
            <SelectItem value="RECRUITER">Nhà tuyển dụng</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead className="text-right">Phân quyền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground py-10 text-center"
                >
                  Không tìm thấy người dùng nào
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
                        <div className="bg-muted flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold">
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
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={() => setSheetUser(user)}
                      >
                        <ShieldCheck className="size-3.5" />
                        Phân quyền
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControl
        page={page}
        totalPages={totalPages}
        total={totalItems}
        itemLabel="người dùng"
        onPageChange={setPage}
      />

      <UserPermissionSheet
        user={sheetUser}
        open={!!sheetUser}
        onOpenChange={(open) => !open && setSheetUser(null)}
      />
    </div>
  );
}

export default UserPermissionTable;
