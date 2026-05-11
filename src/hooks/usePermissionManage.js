import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  useGetAllPermissionsQuery,
  useCreatePermissionMutation,
  useDeletePermissionMutation,
} from "@/services/admin.service";

export function usePermissionManage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useGetAllPermissionsQuery();
  const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation();
  const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

  const permissions = data?.data ?? [];

  const grouped = permissions.reduce((acc, perm) => {
    if (!acc[perm.group]) acc[perm.group] = [];
    acc[perm.group].push(perm);
    return acc;
  }, {});

  const handleCreate = useCallback(
    async (values) => {
      try {
        await createPermission(values).unwrap();
        toast.success("Tạo quyền thành công");
        setCreateOpen(false);
      } catch (err) {
        toast.error(err?.data?.message || "Có lỗi xảy ra");
      }
    },
    [createPermission],
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deletePermission(deleteTarget.id).unwrap();
      toast.success("Đã xóa quyền");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.data?.message || "Có lỗi xảy ra");
    }
  }, [deletePermission, deleteTarget]);

  return {
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
  };
}
