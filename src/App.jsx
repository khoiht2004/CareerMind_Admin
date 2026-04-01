import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { path } from "@/config/path";

// Layouts
import AuthLayout from "@/layouts/AuthLayout";
import PrivateLayout from "@/layouts/PrivateLayout";

// Pages - Auth
import Login from "@/pages/auth/Login";

// Pages - Admin
import Dashboard from "@/pages/admin/Dashboard";
import UserManage from "@/pages/admin/UserManage";
import JobManage from "@/pages/admin/JobManage";
import ApplicationManage from "@/pages/admin/ApplicationManage";
import ChatBotManage from "@/pages/admin/ChatBotManage";
import SystemManage from "@/pages/admin/SystemManage";

import { useGetMeQuery } from "@/services/auth.service";
import Profile from "./pages/admin/Profile";

function AuthInitializer() {
  useGetMeQuery();
  return null;
}

function App() {
  return (
    <Router>
      <AuthInitializer />
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path={path.login} element={<Login />} />
        </Route>

        {/* Private Admin routes */}
        <Route element={<PrivateLayout />}>
          <Route path={path.admin.root} element={<Dashboard />} />
          <Route path={path.admin.users} element={<UserManage />} />
          <Route path={path.admin.jobs} element={<JobManage />} />
          <Route
            path={path.admin.applications}
            element={<ApplicationManage />}
          />
          <Route path={path.admin.ai} element={<ChatBotManage />} />
          <Route path={path.admin.settings} element={<SystemManage />} />

          <Route path={path.profile} element={<Profile />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={path.admin.root} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
