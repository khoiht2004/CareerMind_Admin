import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetAllPermissionsQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} from "@/services/admin.service";

export function usePermissionManage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [filterGroup, setFilterGroup] = useState("__all__");

  const { data, isLoading } = useGetAllPermissionsQuery();
  const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading: isUpdating }] = useUpdatePermissionMutation();
  const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

  const permissions = data?.data ?? [];

  const uniqueGroups = useMemo(() => {
    const seen = new Set();
    return permissions
      .map((p) => p.group)
      .filter((g) => g?.value && !seen.has(g.value) && seen.add(g.value));
  }, [permissions]);

  const filtered = useMemo(
    () =>
      filterGroup === "__all__"
        ? permissions
        : permissions.filter((p) => p.group?.value === filterGroup),
    [permissions, filterGroup],
  );

  const grouped = useMemo(
    () =>
      filtered.reduce((acc, perm) => {
        const key = perm.group?.value ?? "other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(perm);
        return acc;
      }, {}),
    [filtered],
  );

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

  const handleUpdate = useCallback(
    async (values) => {
      try {
        await updatePermission(values).unwrap();
        toast.success("Cập nhật quyền thành công");
        setEditTarget(null);
      } catch (err) {
        toast.error(err?.data?.message || "Có lỗi xảy ra");
      }
    },
    [updatePermission],
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
  };
}
