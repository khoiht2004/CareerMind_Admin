import { Plus, Trash2, Loader2, Pencil } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatePermissionDialog from "./CreatePermissionDialog";
import EditPermissionDialog from "./EditPermissionDialog";
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
    uniqueGroups,
    grouped,
    filterGroup,
    setFilterGroup,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    createOpen,
    setCreateOpen,
    editTarget,
    setEditTarget,
    deleteTarget,
    setDeleteTarget,
    handleCreate,
    handleUpdate,
    handleDeleteConfirm,
  } = usePermissionManage();

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-sm">
            Tổng cộng{" "}
            <span className="text-foreground font-medium">
              {permissions.length}
            </span>{" "}
            quyền trong hệ thống
          </p>

          {/* Group filter — dynamic từ permissions hiện có */}
          <Select value={filterGroup} onValueChange={setFilterGroup}>
            <SelectTrigger className="h-8 w-full text-sm sm:w-52">
              <SelectValue placeholder="Lọc theo nhóm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Tất cả nhóm</SelectItem>
              {uniqueGroups.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          size="sm"
          onClick={() => setCreateOpen(true)}
          className="w-full sm:w-auto"
        >
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
          {Object.entries(grouped).map(([groupValue, perms]) => {
            const groupLabel = perms[0]?.group?.label ?? groupValue;

            return (
              <div key={groupValue}>
                <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                  {groupLabel}
                </h3>
                <div className="overflow-x-auto rounded-md border">
                  <Table className="min-w-[760px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-52">Tên quyền</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead className="w-44">Vai trò mặc định</TableHead>
                        <TableHead className="w-32 text-right">
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
                            <RoleBadges
                              rolePermissions={perm.rolePermissions}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2.5"
                                onClick={() => setEditTarget(perm)}
                              >
                                <Pencil className="mr-1.5 size-3.5" />
                                Sửa
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 px-2.5"
                                onClick={() => setDeleteTarget(perm)}
                              >
                                <Trash2 className="mr-1.5 size-3.5" />
                                Xóa
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            );
          })}

          {Object.keys(grouped).length === 0 && (
            <div className="text-muted-foreground py-12 text-center text-sm">
              {filterGroup === "__all__"
                ? "Chưa có quyền nào. Thêm quyền mới để bắt đầu."
                : "Không có quyền nào trong nhóm này."}
            </div>
          )}
        </div>
      )}

      <CreatePermissionDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isLoading={isCreating}
        groups={uniqueGroups}
      />

      <EditPermissionDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
        permission={editTarget}
        groups={uniqueGroups}
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
