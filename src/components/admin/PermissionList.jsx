import { Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import CreatePermissionDialog from "./CreatePermissionDialog";
import { PERMISSION_GROUP_LABELS } from "@/config/admin.constants";
import { usePermissionManage } from "@/hooks/usePermissionManage";

const ROLE_BADGE = {
  ADMIN: "bg-destructive/10 text-destructive border-destructive/20",
  RECRUITER: "bg-primary/10 text-primary border-primary/20",
  CANDIDATE: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const ROLE_LABEL = {
  ADMIN: "Admin",
  RECRUITER: "Recruiter",
  CANDIDATE: "Candidate",
};

function RoleBadges({ rolePermissions = [] }) {
  const roles = [...new Set(rolePermissions.map((rp) => rp.role))];
  if (roles.length === 0)
    return <span className="text-muted-foreground text-xs">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {roles.map((role) => (
        <span
          key={role}
          className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[11px] font-medium ${ROLE_BADGE[role] ?? "bg-muted text-muted-foreground"}`}
        >
          {ROLE_LABEL[role] ?? role}
        </span>
      ))}
    </div>
  );
}

function PermissionList() {
  const {
    permissions,
    grouped,
    isLoading,
    isCreating,
    isDeleting,
    createOpen,
    setCreateOpen,
    deleteTarget,
    setDeleteTarget,
    handleCreate,
    handleDeleteConfirm,
  } = usePermissionManage();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Tổng cộng{" "}
          <span className="text-foreground font-medium">
            {permissions.length}
          </span>{" "}
          quyền trong hệ thống
        </p>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <Plus className="mr-1.5 size-4" />
          Thêm quyền
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="text-muted-foreground size-5 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([group, perms]) => (
            <div key={group}>
              <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                {PERMISSION_GROUP_LABELS[group] ?? group}
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-52">Tên quyền</TableHead>
                      <TableHead>Mô tả</TableHead>
                      <TableHead className="w-44">Vai trò mặc định</TableHead>
                      <TableHead className="w-24 text-right">
                        Hành động
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {perms.map((perm) => (
                      <TableRow key={perm.id}>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {perm.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm whitespace-normal">
                          {perm.description || "—"}
                        </TableCell>
                        <TableCell>
                          <RoleBadges rolePermissions={perm.rolePermissions} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 px-2.5"
                            onClick={() => setDeleteTarget(perm)}
                          >
                            <Trash2 className="mr-1.5 size-3.5" />
                            Xóa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}

          {permissions.length === 0 && (
            <div className="text-muted-foreground py-12 text-center text-sm">
              Chưa có quyền nào. Thêm quyền mới để bắt đầu.
            </div>
          )}
        </div>
      )}

      <CreatePermissionDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa quyền</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa quyền{" "}
              <span className="text-foreground font-mono font-semibold">
                {deleteTarget?.name}
              </span>
              ? Hành động này không thể hoàn tác và sẽ xóa quyền khỏi tất cả vai
              trò và người dùng đang được gán.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Đang xóa..." : "Xóa quyền"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PermissionList;
