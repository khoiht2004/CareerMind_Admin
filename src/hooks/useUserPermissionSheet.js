import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import {
  useGetAllPermissionsQuery,
  useGetUserPermissionDetailsQuery,
  useUpdateUserPermissionMutation,
} from "@/services/admin.service";

export function useUserPermissionSheet(userId) {
  const [localState, setLocalState] = useState({});

  const { data: allPermsData } = useGetAllPermissionsQuery();
  const { data: userPermsData, isFetching } = useGetUserPermissionDetailsQuery(userId, {
    skip: !userId,
  });
  const [updatePerm, { isLoading: isSaving }] = useUpdateUserPermissionMutation();

  const allPerms = allPermsData?.data ?? [];
  const rolePerms = userPermsData?.data?.rolePerms ?? [];
  const userPerms = userPermsData?.data?.userPerms ?? [];

  const rolePermIds = useMemo(
    () => new Set(rolePerms.map((rp) => rp.permissionId)),
    [rolePerms],
  );

  const userPermMap = useMemo(
    () => new Map(userPerms.map((up) => [up.permissionId, up.isGranted])),
    [userPerms],
  );

  const effectiveState = useMemo(() => {
    const state = {};
    for (const perm of allPerms) {
      state[perm.id] = userPermMap.has(perm.id)
        ? userPermMap.get(perm.id)
        : rolePermIds.has(perm.id);
    }
    return state;
  }, [allPerms, rolePermIds, userPermMap]);

  // reset local state when data loads
  useEffect(() => {
    if (!isFetching && userId) {
      setLocalState(effectiveState);
    }
  }, [effectiveState, isFetching, userId]);

  const grouped = useMemo(
    () =>
      allPerms.reduce((acc, perm) => {
        if (!acc[perm.group]) acc[perm.group] = [];
        acc[perm.group].push(perm);
        return acc;
      }, {}),
    [allPerms],
  );

  const getPermMeta = useCallback(
    (permId) => ({
      isFromRole: rolePermIds.has(permId),
      isOverridden: userPermMap.has(permId),
    }),
    [rolePermIds, userPermMap],
  );

  const toggle = useCallback((permId) => {
    setLocalState((prev) => ({ ...prev, [permId]: !prev[permId] }));
  }, []);

  const hasChanges = useMemo(
    () =>
      Object.entries(localState).some(([id, val]) => val !== effectiveState[id]),
    [localState, effectiveState],
  );

  const save = useCallback(async () => {
    const changed = Object.entries(localState).filter(
      ([id, val]) => val !== effectiveState[id],
    );
    try {
      await Promise.all(
        changed.map(([permissionId, isGranted]) =>
          updatePerm({ userId, permissionId, isGranted }).unwrap(),
        ),
      );
      toast.success("Đã cập nhật quyền cho người dùng");
    } catch (err) {
      toast.error(err?.data?.message || "Có lỗi xảy ra khi lưu");
    }
  }, [localState, effectiveState, updatePerm, userId]);

  return {
    grouped,
    localState,
    isFetching,
    isSaving,
    hasChanges,
    getPermMeta,
    toggle,
    save,
  };
}
