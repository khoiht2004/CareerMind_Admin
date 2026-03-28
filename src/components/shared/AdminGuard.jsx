import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { path } from "@/config/path";

function AdminGuard() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "ADMIN") return <Navigate to={path.login} replace />;
  return <Outlet />;
}

export default AdminGuard;
