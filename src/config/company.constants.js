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
  PENDING: { label: "Chờ xét duyệt", className: "bg-muted text-muted-foreground border-border" },
  REVIEWING: { label: "Đang xem xét", className: "bg-[color:var(--accent-muted)] text-[color:var(--accent-foreground)] border-[color:var(--accent-border)]" },
  INTERVIEW: { label: "Phỏng vấn", className: "bg-primary/10 text-primary border-primary/20" },
  ACCEPTED: { label: "Đã nhận", className: "bg-secondary/10 text-secondary border-secondary/20" },
  REJECTED: { label: "Từ chối", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export const COMPANY_JOB_STATUS_CONFIG = {
  PUBLISHED: { label: "Đang tuyển", className: "bg-primary/10 text-primary border-primary/20" },
  DRAFT: { label: "Nháp", className: "bg-muted text-muted-foreground border-border" },
  CLOSED: { label: "Đã đóng", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export const COMPANY_JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};
