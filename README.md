# Website Đất Cảng Agency (datcanggroup.vn)

Website nhiều trang xây bằng Astro, đăng qua GitHub Pages (GitHub Actions).

## Cách hoạt động

- Gói mã nguồn mới nhất nằm trong thư mục `source/` (file `.zip`; quy trình chọn file có tên đứng cuối theo thứ tự chữ cái).
- Mỗi lần có thay đổi trên nhánh `main`, quy trình trong `.github/workflows/deploy.yml` giải nén gói, build bằng Astro và đăng lên GitHub Pages.
- Trên nhánh khác (ví dụ `website-v2`) quy trình chỉ build để kiểm tra, không đăng.

## Cập nhật website

1. Thêm gói mã nguồn mới vào `source/` (tên có số thứ tự lớn hơn gói cũ).
2. Đẩy lên nhánh, kiểm tra build, rồi gộp vào `main`.

## Bản site cũ

Site một trang cũ được giữ ở nhánh `site-cu-2026-11-09`. Các file cũ vẫn nằm ở gốc nhánh `main` nhưng không còn được đăng.

## Lưu ý

- Tên miền `datcanggroup.vn` cấu hình bằng file `CNAME` trong gói mã nguồn (`public/CNAME`).
- Không lưu hồ sơ khách hay dữ liệu nhạy cảm trong repo này.
