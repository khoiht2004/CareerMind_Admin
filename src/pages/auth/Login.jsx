import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { path } from "@/config/path";
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/config/constants";
import { useLoginMutation, authService } from "@/services/auth.service";

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
      const accessToken = res?.data?.accessToken ?? res?.accessToken;
      const refreshToken = res?.data?.refreshToken ?? res?.refreshToken;
      if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
      if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      await dispatch(
        authService.endpoints.getMe.initiate(undefined, { forceRefetch: true }),
      ).unwrap();

      toast.success("Đăng nhập thành công!");
      navigate(path.admin.root);
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
        <CardTitle className="text-2xl">Chào mừng trở lại!</CardTitle>
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
