import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CompanyTable from "@/components/admin/CompanyTable";

function CompanyManage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý công ty</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Xem, xác minh và quản lý tất cả công ty trong hệ thống
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm sm:flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm theo tên, email, địa chỉ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <CompanyTable search={search} />
    </div>
  );
}

export default CompanyManage;
