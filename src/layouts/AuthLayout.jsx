import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
