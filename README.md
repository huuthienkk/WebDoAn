# Hướng dẫn Hệ thống Quản trị - Quà Đà Nẵng

Chào bạn, đây là tài liệu Hướng dẫn sử dụng cho toàn bộ kiến trúc hệ thống E-commerce hiện tại của dự án Quà Đà Nẵng. Hệ thống đã được nâng cấp lên **Firebase Cloud (Cơ sở dữ liệu đám mây)** để sẵn sàng bán hàng thực tế.

## 🔥 1. Tính năng nổi bật hiện tại
*   **Bảo vệ Đăng nhập (Firebase Auth):** Bảo mật Admin bằng công nghệ mã hoá chuẩn Google. Không ai có thể hack qua trình duyệt.
*   **Quản lý Khách hàng & Đơn hàng:** Tự động tạo mã đơn, tính tiền, hiển thị real-time ngay khi có khách đặt hàng trên Web.
*   **Kho lưu trữ Đám mây (Firebase Storage):** Upload ảnh sản phẩm, ảnh Banner và tự động lưu viễn viễn trên Google Storage, chống mất ảnh khi triển khai lên Vercel/Render.
*   **Real-time Database (Firestore):** Dữ liệu được đồng bộ trực tiếp hai chiều. Khách hàng không cần F5 vẫn thấy cập nhật danh mục, sản phẩm, và thiết lập giao diện.
*   **SEO & Chia sẻ Xã hội:** Tự động bắt ảnh sản phẩm khi chia sẻ link lên Facebook, Zalo.

---

## 🔐 2. Tài khoản Đăng nhập Admin

Vì hệ thống bây giờ sử dụng bảo mật hàng thật của Google Firebase, nên tài khoản mặc định cũ (`admin123`) đã bị vô hiệu hóa. 
Để đăng nhập vào Admin, bạn cần **1 tài khoản Email & Mật khẩu được tạo trên Firebase**:

**Tài khoản khuyên dùng:**
*   **Email:** `admin@quadanang.vn`
*   **Mật khẩu:** `123456`

> **CÁCH KÍCH HOẠT TÀI KHOẢN NÀY DÀNH CHO BẠN (Chủ Website):**
> 1. Truy cập [Firebase Console](https://console.firebase.google.com/) và mở dự án `webfood-e022b`.
> 2. Chọn menu **Authentication** ở thanh bên trái.
> 3. Click nút **Get Started** (Bắt đầu) nếu đây là lần đầu bạn mở.
> 4. Trong tab **Sign-in method** (Phương thức đăng nhập), bật **Email/Password** lên và nhấn Save.
> 5. Chuyển sang tab **Users** (Người dùng), click nút **Add user** (Thêm người dùng).
> 6. Nhập Email và Mật khẩu như trên (hoặc bất kỳ mail nào bạn muốn) rồi nhấn **Add user**.
> 7. Xong! Bạn đã có thể dùng tài khoản đó đăng nhập vào đường dẫn `http://localhost:3000/admin/login` (hoặc cổng 3001).

---

## 🔗 3. Các Đường Dẫn Admin

1.  **Trang Đăng Nhập:** `/admin/login`
2.  **Bảng Điều Khiển Tổng Quan:** `/admin`
3.  **Quản lý Đơn Hàng:** `/admin/orders` *(Mới)*
4.  **Quản lý Sản Phẩm:** `/admin/products`
5.  **Quản lý Danh Mục:** `/admin/categories`
6.  **Tuỳ Biến Giao Diện Banner/Video:** `/admin/appearance`

---

## 🛒 4. Quy trình Quản lý Bán Hàng

**Thêm Sản Phẩm Mới:**
1. Đăng nhập vào Admin.
2. Chọn Tab **Sản phẩm**, điền đầy đủ tên, giá, danh mục.
3. Kéo thả file ảnh từ máy vào ô Tải Lên (Ảnh sẽ bay thẳng lên máy chủ Google).
4. Click Thêm Sản Phẩm. Máy khách tự động nảy thêm sản phẩm ngoài trang chủ.

**Duyệt Đơn Hàng:**
1. Khi khách thao tác "Xác Nhận Đặt Hàng" ở ngoài trang Thanh Toán.
2. Ở tab **Đơn Hàng** trong Admin, hệ thống sẽ tự nổ TING một đơn hàng mới Trạng thái `Chờ Xử Lý` (Màu Vàng).
3. Đội ngũ chốt sale có thể lấy SĐT để gọi khách, sau đó bấm **Duyệt** (để chuyển màu Xanh) hoặc **Hủy** (Màu Xám).

---
*Chúc dự án Quà Đà Nẵng bùng nổ doanh số!*
