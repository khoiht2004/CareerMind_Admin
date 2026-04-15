import { useState } from "react";
import { Loader2, ShieldCheck, Power } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PaginationControl from "@/components/shared/Pagination";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAdminCompaniesQuery,
  useVerifyCompanyMutation,
  useToggleCompanyActiveMutation,
} from "@/services/admin.service";

function CompanyTable({ search }) {
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isFetching } = useGetAdminCompaniesQuery({
    page,
    limit,
    search,
  });
  const [verify, { isLoading: verifying }] = useVerifyCompanyMutation();
  const [toggleActive, { isLoading: toggling }] =
    useToggleCompanyActiveMutation();

  const responseData = data?.data;
  const companies = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Công ty</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead className="text-center">Việc làm</TableHead>
              <TableHead>Xác minh</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : companies.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-muted-foreground py-10 text-center"
                >
                  Không có công ty nào
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg text-xs font-bold">
                        {company.logoUrl ? (
                          <img
                            src={company.logoUrl}
                            alt={company.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          company.name?.[0]
                        )}
                      </div>
                      <p className="text-sm font-medium">{company.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {company.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-36 truncate text-sm">
                    {company.address ?? "—"}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {company._count?.jobs ?? company.totalJobs ?? 0}
                  </TableCell>
                  <TableCell>
                    {company.isVerified ? (
                      <Badge className="border-primary/20 bg-primary/10 text-primary">
                        <ShieldCheck className="mr-1 size-3" /> Đã xác minh
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        Chưa xác minh
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        company.isActive
                          ? "border-primary/20 bg-primary/10 text-primary"
                          : "border-destructive/20 bg-destructive/10 text-destructive"
                      }
                    >
                      {company.isActive ? "Hoạt động" : "Đã khóa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      {!company.isVerified && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          disabled={verifying}
                          onClick={() => verify(company.id)}
                        >
                          <ShieldCheck className="mr-1 size-3" />
                          Xác minh
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn(
                          "h-7 text-xs",
                          company.isActive
                            ? "text-destructive hover:text-destructive"
                            : "text-primary hover:text-primary",
                        )}
                        disabled={toggling}
                        onClick={() => toggleActive(company.id)}
                      >
                        <Power className="mr-1 size-3" />
                        {company.isActive ? "Khóa" : "Mở khóa"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControl
        page={page}
        totalPages={totalPages}
        total={totalItems}
        itemLabel="công ty"
        onPageChange={setPage}
      />
    </div>
  );
}

export default CompanyTable;
