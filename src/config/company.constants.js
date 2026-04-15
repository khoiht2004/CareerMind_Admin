import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  Users,
  User,
} from "lucide-react";
import { path } from "./path";

export const COMPANY_NAV_ITEMS = [
  { to: path.company.root, icon: LayoutDashboard, label: "Tổng quan", end: true },
  { to: path.company.jobs, icon: BriefcaseBusiness, label: "Việc làm" },
  { to: path.company.applications, icon: FileText, label: "Đơn ứng tuyển" },
  { to: path.company.recruiters, icon: Users, label: "Nhân sự" },
  { to: path.profile, icon: User, label: "Hồ sơ" },
];

export const COMPANY_APP_STATUS_CONFIG = {
  PENDING: { label: "Chờ xét duyệt", className: "bg-gray-100 text-gray-600 border-gray-200" },
  REVIEWING: { label: "Đang xem xét", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  INTERVIEW: { label: "Phỏng vấn", className: "bg-blue-100 text-blue-700 border-blue-200" },
  ACCEPTED: { label: "Đã nhận", className: "bg-green-100 text-green-700 border-green-200" },
  REJECTED: { label: "Từ chối", className: "bg-red-100 text-red-700 border-red-200" },
};

export const COMPANY_JOB_STATUS_CONFIG = {
  PUBLISHED: { label: "Đang tuyển", className: "bg-green-100 text-green-700 border-green-200" },
  DRAFT: { label: "Nháp", className: "bg-gray-100 text-gray-600 border-gray-200" },
  CLOSED: { label: "Đã đóng", className: "bg-red-100 text-red-700 border-red-200" },
};

export const COMPANY_JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};
