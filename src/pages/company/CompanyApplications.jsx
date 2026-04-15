import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CompanyAppTable from "@/components/company/CompanyAppTable";

function CompanyApplications() {
  const [status, setStatus] = useState("ALL");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Đơn ứng tuyển</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tất cả đơn ứng tuyển vào công ty của bạn
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
            <SelectItem value="PENDING">Chờ xét duyệt</SelectItem>
            <SelectItem value="REVIEWING">Đang xem xét</SelectItem>
            <SelectItem value="INTERVIEW">Phỏng vấn</SelectItem>
            <SelectItem value="ACCEPTED">Đã nhận</SelectItem>
            <SelectItem value="REJECTED">Từ chối</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CompanyAppTable status={status} />
    </div>
  );
}

export default CompanyApplications;
