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
import PostManage from "@/pages/admin/PostManage";
import ApplicationManage from "@/pages/admin/ApplicationManage";
import CompanyManage from "@/pages/admin/CompanyManage";
import ChatBotManage from "@/pages/admin/ChatBotManage";
import SystemManage from "@/pages/admin/SystemManage";
import PermissionManage from "@/pages/admin/PermissionManage";
import Profile from "@/pages/admin/Profile";

// Pages - Company
import CompanyDashboard from "@/pages/company/Dashboard";
import CompanyJobs from "@/pages/company/CompanyJobs";
import CompanyApplications from "@/pages/company/CompanyApplications";
import CompanyRecruiters from "@/pages/company/CompanyRecruiters";

import { useGetMeQuery } from "@/services/auth.service";

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

        {/* Private routes — Admin + Company */}
        <Route element={<PrivateLayout />}>
          {/* Admin pages */}
          <Route path={path.admin.root} element={<Dashboard />} />
          <Route path={path.admin.users} element={<UserManage />} />
          <Route path={path.admin.companies} element={<CompanyManage />} />
          <Route path={path.admin.jobs} element={<JobManage />} />
          <Route path={path.admin.posts} element={<PostManage />} />
          <Route path={path.admin.applications} element={<ApplicationManage />} />
          <Route path={path.admin.ai} element={<ChatBotManage />} />
          <Route path={path.admin.settings} element={<SystemManage />} />
          <Route path={path.admin.permissions} element={<PermissionManage />} />

          {/* Company manager pages */}
          <Route path={path.company.root} element={<CompanyDashboard />} />
          <Route path={path.company.jobs} element={<CompanyJobs />} />
          <Route path={path.company.applications} element={<CompanyApplications />} />
          <Route path={path.company.recruiters} element={<CompanyRecruiters />} />

          <Route path={path.profile} element={<Profile />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={path.admin.root} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
