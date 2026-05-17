import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useUserPermissionSheet } from "@/hooks/useUserPermissionSheet";

function UserPermissionSheet({ user, open, onOpenChange }) {
  const {
    grouped,
    localState,
    isFetching,
    isSaving,
    hasChanges,
    getPermMeta,
    toggle,
    save,
  } = useUserPermissionSheet(open ? user?.id : null);

  const displayName = user?.profile?.fullName ?? user?.email ?? "";

  const handleSave = async () => {
    await save();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-[90vw] flex-col sm:max-w-xl md:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Phân quyền người dùng</SheetTitle>
          <SheetDescription>
            Quản lý quyền riêng cho{" "}
            <span className="text-foreground font-medium">{displayName}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isFetching ? (
            <div className="flex justify-center py-12">
              <Loader2 className="text-muted-foreground size-5 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {grouped.map(({ group, perms }) => (
                <div key={group.value}>
                  <h4 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                    {group.label}
                  </h4>
                  <div className="space-y-2">
                    {perms.map((perm) => {
                      const { isFromRole, isOverridden } = getPermMeta(perm.id);
                      const isChecked = localState[perm.id] ?? false;
                      return (
                        <div
                          key={perm.id}
                          className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                        >
                          <div className="min-w-0 flex-1 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-medium">
                                {perm.name}
                              </span>
                              {isOverridden && (
                                <Badge
                                  variant="outline"
                                  className="border-orange-300 bg-orange-50 text-[10px] text-orange-600 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-400"
                                >
                                  Tùy chỉnh
                                </Badge>
                              )}
                              {isFromRole && !isOverridden && (
                                <Badge
                                  variant="outline"
                                  className="border-blue-300 bg-blue-50 text-[10px] text-blue-600 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-400"
                                >
                                  Từ vai trò
                                </Badge>
                              )}
                            </div>
                            {perm.description && (
                              <p className="text-muted-foreground mt-0.5 text-xs wrap-break-word whitespace-normal">
                                {perm.description}
                              </p>
                            )}
                          </div>
                          <Switch
                            checked={isChecked}
                            onCheckedChange={() => toggle(perm.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}

              {grouped.length === 0 && (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  Không có quyền nào trong hệ thống
                </p>
              )}
            </div>
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            Lưu thay đổi
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default UserPermissionSheet;
