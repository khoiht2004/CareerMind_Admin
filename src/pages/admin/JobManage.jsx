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
import JobTable from "@/components/admin/JobTable";

function JobManage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý việc làm</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Xem và quản lý tất cả tin tuyển dụng trong hệ thống
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm theo tên vị trí hoặc công ty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Tất cả loại hình" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả loại hình</SelectItem>
            <SelectItem value="FULL_TIME">Toàn thời gian</SelectItem>
            <SelectItem value="PART_TIME">Bán thời gian</SelectItem>
            <SelectItem value="REMOTE">Remote</SelectItem>
            <SelectItem value="INTERNSHIP">Thực tập</SelectItem>
            <SelectItem value="CONTRACT">Hợp đồng</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
            <SelectItem value="PUBLISHED">Đang tuyển</SelectItem>
            <SelectItem value="DRAFT">Nháp</SelectItem>
            <SelectItem value="CLOSED">Đã đóng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <JobTable search={search} type={type} status={status} />
    </div>
  );
}

export default JobManage;
