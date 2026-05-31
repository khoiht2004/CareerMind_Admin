import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PaginationControl from "@/components/shared/Pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  useDeleteAdminJobMutation,
  useGetAdminJobsQuery,
  useUpdateJobStatusMutation,
} from "@/services/admin.service";
import { JOB_STATUS_CONFIG, JOB_TYPE_LABELS } from "@/config/admin.constants";

function JobTable({ search, type, status }) {
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const limit = 10;

  const { data, isFetching } = useGetAdminJobsQuery({
    page,
    limit,
    search,
    type,
    status,
  });
  const [updateStatus, { isLoading: updating }] = useUpdateJobStatusMutation();
  const [deleteJob, { isLoading: deleting }] = useDeleteAdminJobMutation();

  const responseData = data?.data;
  const jobs = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  const handleUpdateStatus = async (id, nextStatus) => {
    try {
      await updateStatus({ id, status: nextStatus }).unwrap();
      toast.success("Cập nhật trạng thái công việc thành công");
    } catch (error) {
      toast.error(error?.data?.message ?? "Không thể cập nhật trạng thái");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteJob(deleteTarget.id).unwrap();
      toast.success("Đã xóa công việc");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error?.data?.message ?? "Không thể xóa công việc");
    }
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[960px]">
          <TableHeader>
            <TableRow>
              <TableHead>Vị trí</TableHead>
              <TableHead>Công ty</TableHead>
              <TableHead>Loại hình</TableHead>
              <TableHead>Đơn ứng tuyển</TableHead>
              <TableHead>Đăng bởi</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Trạng thái</TableHead>
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
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-muted-foreground py-10 text-center"
                >
                  Không có công việc nào
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const statusCfg = JOB_STATUS_CONFIG[job.status];
                const poster =
                  job.postedBy?.profile?.fullName ?? job.postedBy?.email ?? "-";

                return (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {job.location}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {job.company?.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-center text-[13px]"
                      >
                        {JOB_TYPE_LABELS[job.type] ?? job.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {job._count?.applications ?? 0}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {poster}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        defaultValue={job.status}
                        disabled={updating}
                        onValueChange={(val) => handleUpdateStatus(job.id, val)}
                      >
                        <SelectTrigger className="h-7 w-32 text-xs">
                          <Badge
                            className={`border text-xs ${statusCfg?.className}`}
                          >
                            {statusCfg?.label ?? job.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PUBLISHED">Đang tuyển</SelectItem>
                          <SelectItem value="DRAFT">Nháp</SelectItem>
                          <SelectItem value="CLOSED">Đã đóng</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                        disabled={deleting}
                        onClick={() => setDeleteTarget(job)}
                        title="Xóa công việc"
                      >
                        <Trash2 className="size-4" />
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
        itemLabel="công việc"
        onPageChange={setPage}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa công việc?</AlertDialogTitle>
            <AlertDialogDescription>
              Công việc "{deleteTarget?.title}" sẽ bị xóa khỏi hệ thống. Các đơn
              ứng tuyển và lưu việc liên quan cũng sẽ bị xóa theo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Đang xóa..." : "Xóa công việc"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default JobTable;
