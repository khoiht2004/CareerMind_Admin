export const POST_CATEGORIES = [
  "Định hướng nghề nghiệp",
  "Bí kíp tìm việc",
  "Chế độ lương thưởng",
  "Kiến thức chuyên ngành",
  "Hành trang nghề nghiệp",
  "Thị trường và xu hướng tuyển dụng",
];

export const POST_STATUS_OPTIONS = [
  { label: "Tất cả trạng thái", value: "ALL" },
  { label: "Công khai", value: "PUBLISHED" },
  { label: "Nháp", value: "DRAFT" },
];

export const EMPTY_ADMIN_POST_FORM = {
  title: "",
  excerpt: "",
  content: "",
  coverUrl: "",
  category: POST_CATEGORIES[0],
  authorName: "",
  isPublished: true,
  contentFormat: "HTML",
};
