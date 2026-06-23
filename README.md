# Smart Recruit Assistant (CareerMind) - Admin

## 🚀 Giới thiệu dự án

Đây là trang quản trị (Admin Dashboard) thuộc hệ thống **Smart Recruit Assistant (CareerMind)**. Giao diện này được thiết kế dành riêng cho quản trị viên (Admin) để theo dõi, thống kê, kiểm duyệt dữ liệu, quản lý người dùng và giám sát toàn bộ hoạt động của hệ thống.

## 🛠️ Công nghệ sử dụng

Hệ thống Admin được tối ưu hóa cho tốc độ và khả năng mở rộng:

- **Core Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (Build tool cực nhanh).
- **Routing:** [React Router v7](https://reactrouter.com/) để quản lý các tuyến đường.
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & React Redux.
- **Styling & UI Components:**
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/) (Hệ thống component tái sử dụng)
  - [Radix UI](https://www.radix-ui.com/)
  - `next-themes` (Hỗ trợ Dark/Light mode)
- **Form & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) đảm bảo dữ liệu đầu vào chuẩn xác.
- **Data Visualization & Tiện ích:**
  - `recharts` (Vẽ biểu đồ thống kê trực quan)
  - `socket.io-client` (Giám sát và nhận thông báo theo thời gian thực)
  - `sonner` (Hệ thống thông báo Toast)
  - `axios` (Giao tiếp với Backend API)

## 📦 Cài đặt và Khởi chạy

### Yêu cầu môi trường

- Node.js (khuyến nghị bản 18+ hoặc 20+)
- npm hoặc yarn/pnpm

### Các bước chạy dự án

1. **Di chuyển vào thư mục admin:**

   ```bash
   cd admin
   ```

2. **Cài đặt các gói phụ thuộc (dependencies):**

   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường**:Tạo một file `.env` (tham khảo `.env.example`) để thiết lập URL của Backend API.

4. **Chạy server Development:**

   ```bash
   npm run dev
   ```

   Admin Dashboard sẽ khả dụng tại: `http://localhost:5173` (hoặc cổng khác tuỳ cấu hình Vite).

### Build cho Production

Khi cần triển khai (deploy) hệ thống lên máy chủ:

```bash
npm run build
```

Xem trước bản build ở môi trường local:

```bash
npm run preview
```

## 📐 Cấu trúc thư mục (Tham khảo)

- `/src/components`: Các component giao diện chung (bao gồm Shadcn UI).
- `/src/pages`: Các màn hình quản trị (Dashboard, Quản lý User, Thống kê...).
- `/src/store`: Quản lý trạng thái (Redux Store, Slices).
- `/src/assets`: Resource tĩnh (icons, styles).
