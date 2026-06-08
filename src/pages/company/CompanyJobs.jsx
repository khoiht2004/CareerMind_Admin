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
import CompanyJobTable from "@/components/company/CompanyJobTable";

function CompanyJobs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Việc làm của công ty</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tất cả tin tuyển dụng thuộc công ty của bạn
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm sm:flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm theo tên vị trí..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-44">
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

      <CompanyJobTable search={search} status={status} />
    </div>
  );
}

export default CompanyJobs;
