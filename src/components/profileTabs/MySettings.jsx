import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChangePasswordMutation } from "@/services/auth.service";

const pwSchema = z
  .object({
    oldPassword: z.string().min(1, "Nhập mật khẩu hiện tại"),
    newPassword: z.string().min(6, "Mật khẩu mới ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });

function MySettings() {
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(pwSchema) });

  const onSubmit = async (data) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      toast.success("Đã đổi mật khẩu thành công");
      reset();
    } catch (err) {
      toast.error(err?.data?.message ?? "Đổi mật khẩu thất bại");
    }
  };

  const toggleShow = (field) =>
    setShow((s) => ({ ...s, [field]: !s[field] }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Đổi mật khẩu</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm space-y-4"
        >
          {[
            { id: "oldPassword", label: "Mật khẩu hiện tại" },
            { id: "newPassword", label: "Mật khẩu mới" },
            { id: "confirmPassword", label: "Xác nhận mật khẩu mới" },
          ].map(({ id, label }) => (
            <div key={id} className="space-y-1.5">
              <Label htmlFor={id}>{label}</Label>
              <div className="relative">
                <Input
                  id={id}
                  type={show[id] ? "text" : "password"}
                  className="pr-10"
                  {...register(id)}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(id)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  tabIndex={-1}
                >
                  {show[id] ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors[id] && (
                <p className="text-destructive text-xs">
                  {errors[id].message}
                </p>
              )}
            </div>
          ))}

          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Cập nhật mật khẩu
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default MySettings;
