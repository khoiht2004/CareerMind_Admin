import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { path } from "./path";
import { LayoutDashboard, Users, Building2, BriefcaseBusiness, FileText, Bot, Settings } from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { to: path.admin.root, icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: path.admin.users, icon: Users, label: "Người dùng" },
  { to: path.admin.companies, icon: Building2, label: "Công ty" },
  { to: path.admin.jobs, icon: BriefcaseBusiness, label: "Việc làm" },
  { to: path.admin.applications, icon: FileText, label: "Đơn ứng tuyển" },
  { to: path.admin.ai, icon: Bot, label: "Cấu hình AI" },
  { to: path.admin.settings, icon: Settings, label: "Cài đặt" },
];

export const PROFILE_TABS = [
  { key: "profile", label: "Hồ sơ của tôi" },
  { key: "chatbot", label: "Chatbot của tôi" },
  { key: "settings", label: "Cài đặt" },
];

export const APPLICATION_STATUS_CONFIG = {
  PENDING: {
    icon: Clock,
    className: "bg-gray-100 text-gray-600 border-gray-200",
    label: "Chờ xét duyệt",
  },
  REVIEWING: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    label: "Đang xem xét",
  },
  INTERVIEW: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200",
    label: "Phỏng vấn",
  },
  ACCEPTED: {
    icon: CheckCircle2,
    className: "bg-blue-100 text-blue-700 border-blue-200",
    label: "Đã nhận",
  },
  REJECTED: {
    icon: XCircle,
    className: "bg-red-100 text-red-700 border-red-200",
    label: "Từ chối",
  },
};

export const JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};

export const PERIODS = [
  { label: "7 ngày qua", value: 7 },
  { label: "1 tháng qua", value: 30 },
  { label: "3 tháng qua", value: 90 },
];

export const JOB_STATUS_CONFIG = {
  PUBLISHED: {
    label: "Đang tuyển",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  DRAFT: {
    label: "Nháp",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  CLOSED: {
    label: "Đã đóng",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};
