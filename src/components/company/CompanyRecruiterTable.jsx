import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyCompanyPersonnelQuery } from "@/services/company.service";

const ROLE_CONFIG = {
  COMPANY: { label: "Quản lý", className: "bg-primary/10 text-primary border-primary/20" },
  RECRUITER: { label: "Recruiter", className: "bg-secondary/10 text-secondary border-secondary/20" },
  ADMIN: { label: "Admin", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

function CompanyRecruiterTable() {
  const { data: response, isFetching } = useGetMyCompanyPersonnelQuery();
  const personnel = response?.data ?? [];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nhân sự</TableHead>
            <TableHead>Chức vụ</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Tham gia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center">
                <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
              </TableCell>
            </TableRow>
          ) : personnel.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground py-10 text-center">
                Chưa có nhân sự nào
              </TableCell>
            </TableRow>
          ) : (
            personnel.map((person) => {
              const name = person.profile?.fullName ?? person.email;
              const roleCfg = ROLE_CONFIG[person.role];
              return (
                <TableRow key={person.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold">
                        {person.profile?.avatarUrl
                          ? <img src={person.profile.avatarUrl} alt={name} className="h-full w-full object-cover" />
                          : name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-muted-foreground text-xs">{person.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`border text-xs ${roleCfg?.className}`}>
                      {roleCfg?.label ?? person.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {person.profile?.phone ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge className={person.isActive
                      ? "border-primary/20 bg-primary/10 text-xs text-primary"
                      : "border-destructive/20 bg-destructive/10 text-xs text-destructive"}>
                      {person.isActive ? "Hoạt động" : "Đã khóa"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(person.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompanyRecruiterTable;
