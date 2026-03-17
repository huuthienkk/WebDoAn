# Hướng dẫn Hệ thống Quản trị - Quà Đà Nẵng

Chào bạn, đây là tài liệu Hướng dẫn sử dụng cho tính năng Quản trị (Admin) vừa được thiết lập thêm vào dự án.

## 🔥 1. Tính năng nổi bật
*   **Quản lý phiên đăng nhập (Frontend-based Auth):** Đăng nhập đơn giản qua Zustand store được tích hợp middleware persist để lưu trữ trạng thái đăng nhập trên `localStorage`.
*   **Quản lý Sản phẩm (CRUD):** Admin có quyền Thêm, Sửa, Xoá sản phẩm trực tiếp. Thay đổi sẽ ngay lập tức được phản chiếu trên tất cả các trang Client (Trang chủ, Sản phẩm, Chi tiết sản phẩm).
*   **Mô phỏng Database qua Zustand Persist:** Mặc định hệ thống cung cấp dữ liệu mẫu nhưng mọi tương tác mới của bạn đều được đồng bộ tự động vào Local Storage của trình duyệt một cách mượt mà.
*   **Bảo vệ Route cơ bản:** Tự động chuyển hướng về `/admin/login` nếu người dùng truy cập trực tiếp các route admin mà chưa đăng nhập. 
*   **Linh hoạt với Hình ảnh rỗng (Placeholder Image):** Vì tôi đã *xoá hoàn toàn các hình ảnh tạo sẵn lúc đầu*, bạn có thể chèn link (URL) ảnh của mình hoặc bỏ trống trường URL. Hệ thống vẫn hiển thị giao diện cực kỳ xịn với Placeholder mặc định.

## 🔗 2. Các Đường Dẫn Admin Mới

1.  **Trang Đăng Nhập:** `/admin/login`
    *   **Mật khẩu khởi tạo:** `admin123`
2.  **Bảng Điều Khiển Tổng Quan:** `/admin`
3.  **Quản lý Sản Phẩm:** `/admin/products`
4.  **Quản lý Danh Mục:** `/admin/categories`

## 🛒 3. Quy trình Thêm Sản Phẩm Mới

1. Truy cập `http://localhost:3000/admin/login` 
2. Nhập mật khẩu: `admin123`
3. Chọn Tab **Sản phẩm** trên menu bên trái, và điền đầy đủ các thông tin của form.
4. (Tùy chọn) Chọn ô **Đánh dấu sản phẩm nổi bật (Best Seller)** để sản phẩm tự động xuất hiện tại Trang chủ.
5. Click **Thêm Sản phẩm**.
6. Ấn vào nút **Về Trang Chủ** trên thanh Sidebar, bạn sẽ thấy sản phẩm hiển thị ngay lập tức nhờ giao thức React Re-hydration kết nối đồng bộ State!

---
> [!NOTE] 
> Do yêu cầu không sử dụng hình ảnh tạo sẵn, nếu bạn không chèn link ảnh vào trường *URL Hình ảnh*, hệ thống sẽ hiển thị Placeholder box xám nhằm giữ vững cấu trúc Layout xịn xò.
