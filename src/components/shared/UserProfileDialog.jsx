import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  FileText,
  Download,
  Loader2,
  Code,
  User,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetProfileViewQuery } from "@/services/profile.service";
import { formatVN } from "@/utils/helper";

function UserProfileDialog({ userId, open, onOpenChange }) {
  const { data, isLoading, isError, error } = useGetProfileViewQuery(userId, {
    skip: !open || !userId,
  });

  const user = data?.data;

  const renderBadge = (role) => {
    const styles =
      "text-center rounded-full border px-2 py-1 text-xs font-semibold truncate max-w-28";
    switch (role) {
      case "CANDIDATE":
        return (
          <span
            className={`border-primary/20 bg-primary/10 text-primary ${styles}`}
          >
            Ứng viên
          </span>
        );
      case "RECRUITER":
        return (
          <span
            className={`border-recruiter/20 bg-recruiter-container text-recruiter ${styles}`}
          >
            Nhà tuyển dụng
          </span>
        );
      case "ADMIN":
        return (
          <span
            className={`border-destructive/20 bg-destructive/10 text-destructive ${styles}`}
          >
            Quản trị viên
          </span>
        );
      default:
        return null;
    }
  };

  const renderInfo = (user, role) => {
    let styles = "size-5 shrink-0 rounded-md border p-0.5 ";
    switch (role) {
      case "CANDIDATE":
        styles += "border-primary/20 bg-primary/10 text-primary";
        break;
      case "RECRUITER":
        styles += "border-recruiter/20 bg-recruiter-container text-recruiter";
        break;
      case "ADMIN":
        styles += "border-destructive/20 bg-destructive/10 text-destructive";
        break;
    }

    return (
      <>
        {/* Full name */}
        <h3 className="text-foreground text-lg font-bold tracking-tight">
          {user.profile?.fullName || "Chưa cập nhật tên"}{" "}
        </h3>
        <div className="flex flex-col gap-1">
          {/* Email */}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Mail className={`${styles}`} />
            <a
              href={`mailto:${user.email}`}
              className="text-foreground truncate hover:underline"
            >
              {user.email}
            </a>
          </div>
          {/* Phone */}
          {user.profile?.phone && (
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <Phone className={`${styles}`} />
              <a
                href={`tel:${user.profile.phone}`}
                className="text-foreground truncate hover:underline"
              >
                {user.profile.phone}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Calendar className={`${styles}`} />
            <span className="text-muted-foreground">
              Tham gia từ:{" "}
              <span className="text-foreground font-medium">
                {formatVN(user.createdAt)}
              </span>
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="border-border bg-card text-card-foreground shadow-popover w-full overflow-hidden rounded-2xl border p-0 md:max-w-md"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Thông tin chi tiết người dùng</DialogTitle>
          <DialogDescription>
            Hiển thị thông tin hồ sơ của người dùng bao gồm kỹ năng và liên hệ.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex h-64 w-full flex-col items-center justify-center gap-3">
            <Loader2 className="text-primary size-8 animate-spin" />
            <p className="text-muted-foreground animate-pulse text-sm font-medium">
              Đang tải thông tin hồ sơ...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex h-64 w-full flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="text-destructive mb-3 size-10" />
            <p className="text-foreground text-sm font-semibold">
              Đã xảy ra lỗi khi tải hồ sơ
            </p>
            <p className="text-muted-foreground mt-1 max-w-[280px] text-xs">
              {error?.data?.message || "Vui lòng thử lại sau giây lát."}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="mt-4 rounded-xl"
            >
              Đóng
            </Button>
          </div>
        )}

        {!isLoading && !isError && user && (
          <div className="relative">
            {/* Header Background Theme Overlay */}
            <div
              className={`h-18 w-full transition-all duration-300 ${
                user.role === "RECRUITER"
                  ? "from-recruiter/20 to-recruiter/5 bg-linear-to-r"
                  : user.role === "ADMIN"
                    ? "from-destructive/20 to-destructive/5 bg-linear-to-r"
                    : "from-primary/20 to-primary/5 bg-linear-to-r"
              }`}
            />

            {/* Profile Content Container */}
            <div className="px-6 pt-0 pb-6">
              {/* Profile Main Header Block */}
              <div className="-mt-12 flex gap-6">
                <section className="relative">
                  <img
                    src={
                      user.profile?.avatarUrl ||
                      "https://www.gravatar.com/avatar/?d=mp"
                    }
                    alt={user.profile?.fullName || "User Avatar"}
                    className={`border-card bg-muted size-24 rounded-xl border-4 object-cover object-top shadow-md transition-all duration-300 ${
                      user.role === "RECRUITER"
                        ? "ring-recruiter/20 ring-2"
                        : "ring-primary/20 ring-2"
                    }`}
                  />
                  <div className="absolute right-1/2 -bottom-3 flex translate-x-1/2 rounded-lg">
                    {renderBadge(user.role)}
                  </div>
                </section>
                {/* User Info Container */}
                <section className="flex flex-col">
                  {renderInfo(user, user.role)}
                </section>
              </div>

              {/* Bio Block */}
              {user.profile?.bio && (
                <div className="border-border bg-muted/30 mt-5 rounded-xl border p-3 text-center">
                  <p className="text-muted-foreground text-xs leading-relaxed italic">
                    "{user.profile.bio}"
                  </p>
                </div>
              )}

              {/* Candidate Info (Skills, CV) */}
              {user.role === "CANDIDATE" && (
                <div className="border-border mt-5 space-y-4 border-t pt-4">
                  {/* Skills tags */}
                  {user.profile?.skills &&
                    Array.isArray(user.profile.skills) &&
                    user.profile.skills.length > 0 && (
                      <div>
                        <h4 className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                          <Code className="size-3.5" />
                          Kỹ năng chuyên môn
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {user.profile.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-secondary-container text-on-secondary-container border-border rounded-lg border px-2.5 py-1 text-xs font-semibold"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* CV Download Card */}
                  {user.defaultCv && (
                    <div>
                      <h4 className="text-muted-foreground mb-2 text-xs font-bold tracking-wider uppercase">
                        Hồ sơ đính kèm (CV)
                      </h4>
                      <div className="border-border bg-card flex items-center justify-between gap-3 rounded-xl border p-3 shadow-sm transition-all hover:shadow-md">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="bg-primary/10 text-primary rounded-lg p-2">
                            <FileText className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-foreground truncate text-xs font-bold">
                              {user.defaultCv.name}
                            </p>
                            <p className="text-muted-foreground text-[10px]">
                              {user.defaultCv.fileSize
                                ? `${(
                                    user.defaultCv.fileSize /
                                    (1024 * 1024)
                                  ).toFixed(2)} MB`
                                : "PDF Document"}
                            </p>
                          </div>
                        </div>
                        <a
                          href={user.defaultCv.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="border-border bg-muted text-mutemute-foreground hover:bg-primary/10 hover:text-primary flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors"
                          title="Tải CV xuống"
                        >
                          <Download className="size-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recruiter Info (Company Card Integration) */}
              {user.role === "RECRUITER" && user.company && (
                <div className="border-border mt-5 border-t pt-4">
                  <h4 className="text-muted-foreground mb-2 text-xs font-bold tracking-wider uppercase">
                    Công ty đại diện
                  </h4>
                  <div className="border-border bg-muted/20 rounded-xl border p-3 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          user.company.logoUrl ||
                          "https://www.gravatar.com/avatar/?d=mp"
                        }
                        alt={user.company.name}
                        className="border-border bg-card size-11 rounded-lg border object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-foreground truncate text-sm font-bold">
                          {user.company.name}
                        </h5>
                        {user.company.industry && (
                          <p className="text-muted-foreground text-xs">
                            {user.company.industry}
                          </p>
                        )}
                        {user.company.address && (
                          <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
                            {user.company.address}
                          </p>
                        )}
                      </div>
                    </div>
                    {user.company.description && (
                      <p className="text-muted-foreground border-border mt-2 line-clamp-2 border-t border-dashed pt-2 text-xs leading-relaxed">
                        {user.company.description}
                      </p>
                    )}
                    <Link
                      to={`/companies/${user.company.id}`}
                      onClick={() => onOpenChange(false)}
                      className="bg-recruiter text-recruiter-foreground mt-3 flex w-full items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-center text-xs font-bold shadow-sm transition-all hover:opacity-90"
                    >
                      <span>Ghé thăm trang tuyển dụng</span>
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="border-border bg-muted/40 flex justify-end gap-2 border-t p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="rounded-xl"
              >
                Đóng
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UserProfileDialog;
