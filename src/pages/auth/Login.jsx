import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { path } from "@/config/path";
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/config/constants";
import { useLoginMutation } from "@/services/auth.service";
import { setUser } from "@/store/slice/authSlice";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      const result = res?.data;

      const isAdmin = result?.role === "ADMIN";
      const isCompanyManager =
        result?.canCompanyManage === true && result?.companyId != null;

      if (!isAdmin && !isCompanyManager) {
        toast.error("Bạn không có quyền truy cập trang quản trị");
        return;
      }

      const accessToken = result?.accessToken;
      const refreshToken = result?.refreshToken;
      if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
      if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      dispatch(setUser(res?.data));

      toast.success("Đăng nhập thành công!");
      navigate(isAdmin ? path.admin.root : path.company.root);
    } catch (err) {
      toast.error(err?.data?.message ?? "Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 pb-4 text-center">
        <div className="flex justify-center">
          <div className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold">
            SRA
          </div>
        </div>
        <CardTitle className="text-2xl">Trang dành cho Quản trị viên</CardTitle>
        <CardDescription>Đăng nhập để vào trang quản trị</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link
                to="/forgot-password"
                className="text-muted-foreground hover:text-primary text-xs transition-colors"
                tabIndex={-1}
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 w-full text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Đăng nhập
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
