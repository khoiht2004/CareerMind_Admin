import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserTable from "@/components/admin/UserTable";

function UserManage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Xem và quản lý tất cả tài khoản trong hệ thống
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Tất cả vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả vai trò</SelectItem>
            <SelectItem value="CANDIDATE">Ứng viên</SelectItem>
            <SelectItem value="RECRUITER">Nhà tuyển dụng</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UserTable search={search} role={role} />
    </div>
  );
}

export default UserManage;
