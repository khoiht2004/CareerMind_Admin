import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  useDeleteAdminApplicationMutation,
  useGetAdminApplicationsQuery,
  useUpdateAdminApplicationStatusMutation,
} from "@/services/admin.service";
import { APPLICATION_STATUS_CONFIG } from "@/config/admin.constants";

function ApplicationTable({ search, status }) {
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const limit = 20;

  const { data, isFetching } = useGetAdminApplicationsQuery({
    page,
    limit,
    search,
    status,
  });
  const [updateStatus, { isLoading: updating }] =
    useUpdateAdminApplicationStatusMutation();
  const [deleteApplication, { isLoading: deleting }] =
    useDeleteAdminApplicationMutation();

  const responseData = data?.data;
  const applications = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  const handleUpdateStatus = async (id, nextStatus) => {
    try {
      await updateStatus({ id, status: nextStatus }).unwrap();
      toast.success("Cập nhật trạng thái đơn ứng tuyển thành công");
    } catch (error) {
      toast.error(error?.data?.message ?? "Không thể cập nhật trạng thái");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteApplication(deleteTarget.id).unwrap();
      toast.success("Đã xóa đơn ứng tuyển");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error?.data?.message ?? "Không thể xóa đơn ứng tuyển");
    }
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[820px]">
          <TableHeader>
            <TableRow>
              <TableHead>Ứng viên</TableHead>
              <TableHead>Vị trí ứng tuyển</TableHead>
              <TableHead>Công ty</TableHead>
              <TableHead>Ngày nộp</TableHead>
              <TableHead className="text-right">Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground py-10 text-center"
                >
                  Không có đơn ứng tuyển nào
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => {
                const cfg = APPLICATION_STATUS_CONFIG[app.status];
                const StatusIcon = cfg?.icon;
                const candidateName =
                  app.user?.profile?.fullName ?? app.user?.email ?? "-";

                return (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{candidateName}</p>
                        <p className="text-muted-foreground text-xs">
                          {app.user?.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {app.job?.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {app.job?.company?.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        defaultValue={app.status}
                        disabled={updating}
                        onValueChange={(val) => handleUpdateStatus(app.id, val)}
                      >
                        <SelectTrigger className="h-7 w-36 text-xs">
                          <Badge
                            className={`gap-1 border text-xs ${cfg?.className}`}
                          >
                            {StatusIcon && <StatusIcon className="size-3" />}
                            {cfg?.label ?? app.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Chờ duyệt</SelectItem>
                          <SelectItem value="REVIEWING">
                            Đang xem xét
                          </SelectItem>
                          <SelectItem value="INTERVIEW">Phỏng vấn</SelectItem>
                          <SelectItem value="ACCEPTED">Đã nhận</SelectItem>
                          <SelectItem value="REJECTED">Từ chối</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                        disabled={deleting}
                        onClick={() => setDeleteTarget(app)}
                        title="Xóa đơn ứng tuyển"
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

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-muted-foreground">
            Trang {page} / {totalPages} - {totalItems} đơn
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      )}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa đơn ứng tuyển?</AlertDialogTitle>
            <AlertDialogDescription>
              Đơn ứng tuyển của "{deleteTarget?.user?.email}" cho vị trí "
              {deleteTarget?.job?.title}" sẽ bị xóa khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Đang xóa..." : "Xóa đơn"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ApplicationTable;
