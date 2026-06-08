import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = [
  { value: "ADMIN", label: "Admin" },
  { value: "RECRUITER", label: "Recruiter" },
  { value: "CANDIDATE", label: "Candidate" },
];

const NEW_GROUP_VALUE = "__new__";

function EditPermissionDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  permission,
  groups = [],
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      group: "",
      customGroupValue: "",
      customGroupLabel: "",
      description: "",
      roles: [],
    },
  });

  const groupValue = watch("group");
  const isCustomGroup = groupValue === NEW_GROUP_VALUE;

  useEffect(() => {
    if (permission && open) {
      const existingGroup = groups.find(
        (g) => g.value === permission.group?.value,
      );
      reset({
        name: permission.name ?? "",
        description: permission.description ?? "",
        group: existingGroup ? permission.group.value : NEW_GROUP_VALUE,
        customGroupValue: existingGroup ? "" : (permission.group?.value ?? ""),
        customGroupLabel: existingGroup ? "" : (permission.group?.label ?? ""),
        roles: permission.rolePermissions?.map((rp) => rp.role) ?? [],
      });
    }
  }, [permission, open, reset, groups]);

  const handleClose = (val) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const onValid = (data) => {
    const groupObj =
      data.group === NEW_GROUP_VALUE
        ? {
            value: data.customGroupValue.trim().toLowerCase(),
            label: data.customGroupLabel.trim(),
          }
        : groups.find((g) => g.value === data.group);

    onSubmit({
      id: permission.id,
      name: data.name,
      description: data.description,
      group: groupObj,
      roles: data.roles,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa quyền</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onValid)} className="space-y-4">
          {/* Name + Group select */}
          <section className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="w-full space-y-1.5">
              <Label htmlFor="edit-perm-name">
                Tên quyền <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-perm-name"
                placeholder="vd: post:job, view:report"
                {...register("name", { required: "Tên quyền là bắt buộc" })}
              />
              {errors.name && (
                <p className="text-destructive text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>
                Nhóm <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="group"
                control={control}
                rules={{ required: "Nhóm là bắt buộc" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Chọn nhóm quyền" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                      <SelectItem value={NEW_GROUP_VALUE}>
                        + Tạo nhóm mới...
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.group && (
                <p className="text-destructive text-xs">
                  {errors.group.message}
                </p>
              )}
            </div>
          </section>

          {/* New group: value + label side by side */}
          {isCustomGroup && (
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="edit-custom-group-value">
                  Định danh nhóm (value){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-custom-group-value"
                  placeholder="vd: report, analytics"
                  {...register("customGroupValue", {
                    validate: (v) =>
                      !isCustomGroup ||
                      v.trim().length > 0 ||
                      "Định danh không được để trống",
                  })}
                />
                {errors.customGroupValue && (
                  <p className="text-destructive text-xs">
                    {errors.customGroupValue.message}
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  Dùng để lọc, không dấu, chữ thường.
                </p>
              </div>

              <div className="flex-1 space-y-1.5">
                <Label htmlFor="edit-custom-group-label">
                  Tên hiển thị (label){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-custom-group-label"
                  placeholder="vd: Báo cáo & Thống kê"
                  {...register("customGroupLabel", {
                    validate: (v) =>
                      !isCustomGroup ||
                      v.trim().length > 0 ||
                      "Tên hiển thị không được để trống",
                  })}
                />
                {errors.customGroupLabel && (
                  <p className="text-destructive text-xs">
                    {errors.customGroupLabel.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <section className="space-y-1.5">
            <Label htmlFor="edit-perm-desc">Mô tả</Label>
            <Textarea
              id="edit-perm-desc"
              placeholder="Mô tả ngắn về quyền này..."
              rows={3}
              {...register("description")}
            />
          </section>

          {/* Default roles */}
          <section className="space-y-2">
            <Label>Vai trò mặc định</Label>
            <p className="text-muted-foreground text-xs">
              Chọn các vai trò sẽ tự động có quyền này.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <>
                    {ROLES.map((role) => {
                      const checked = field.value.includes(role.value);
                      return (
                        <div
                          key={role.value}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`role-${role.value}`}
                            checked={checked}
                            onCheckedChange={(val) => {
                              field.onChange(
                                val
                                  ? [...field.value, role.value]
                                  : field.value.filter((r) => r !== role.value),
                              );
                            }}
                          />
                          <label
                            htmlFor={`role-${role.value}`}
                            className="cursor-pointer text-sm select-none"
                          >
                            {role.label}
                          </label>
                        </div>
                      );
                    })}
                  </>
                )}
              />
            </div>
          </section>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPermissionDialog;
