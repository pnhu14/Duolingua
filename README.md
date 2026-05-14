# 🎵 Music Streaming App

Ứng dụng nghe nhạc được thiết kế để bạn có thể **duyệt bài hát, tìm kiếm nhanh, xem thông tin nghệ sĩ và tạo playlist** theo một cách đơn giản, trực quan. 

Dự án hiện phù hợp cho nhu cầu sử dụng của người thân, bạn bè, đồng thời đã được xây dựng với tư duy mở rộng để sau này có thể phát triển thành một nền tảng phục vụ nhiều người dùng hơn.

## ✨ Ứng dụng này có gì?

### 🎧 Dành cho người nghe nhạc
- Xem danh sách bài hát theo dạng thẻ đẹp mắt
- Tìm kiếm bài hát theo tên
- Xem ảnh bài hát, ngày phát hành và nghệ sĩ liên quan
- Bấm phát nhạc theo luồng UI hiện tại

### 🔎 Dành cho khám phá âm nhạc
- Gắn bài hát với nghệ sĩ
- Hỗ trợ playlist để sắp xếp nhạc theo chủ đề
- Sẵn sàng cho các tính năng như yêu thích, theo dõi nghệ sĩ, lịch sử nghe và thể loại nhạc

### 🚀 Dành cho mở rộng về sau
- Thiết kế dữ liệu theo hướng production
- Có nền tảng để mở rộng sang album, genre, roles, audit log, refresh token
- Backend theo kiến trúc nhiều lớp để dễ bảo trì và phát triển thêm tính năng

## 💡 Tính năng chính

- Duyệt catalog bài hát
- Tìm kiếm bài hát
- Hiển thị thông tin nghệ sĩ
- Quản lý playlist
- Thiết kế sẵn cho tương tác người dùng như like, follow, lịch sử nghe
- Quản lý database bằng Flyway
- Giao diện frontend responsive, hiện đại

## 🧩 Các khu vực chức năng chính

### 📚 Catalog âm nhạc
Backend quản lý kho nhạc với bài hát và nghệ sĩ, đồng thời đã sẵn sàng cho album và thể loại nhạc trong tương lai.

### 📝 Playlist
Người dùng có thể tạo và sắp xếp playlist theo thứ tự mong muốn. Schema hiện tại đã hỗ trợ lưu vị trí bài hát trong playlist.

### ❤️ Tương tác người dùng
Thiết kế dữ liệu đã chuẩn bị cho các tính năng như:
- yêu thích bài hát
- theo dõi nghệ sĩ
- lịch sử nghe nhạc
- token đăng nhập

### 🛡️ Quản trị và ghi log
Hệ thống cũng có sẵn nền tảng cho:
- phân quyền
- audit log
- theo dõi thao tác hệ thống

## 📁 Cấu trúc dự án

```text
backend/music/                 Spring Boot backend
frontend/music/music-streaming-app/  React frontend
```

## 🎼 Trải nghiệm hiện tại

Frontend đang sử dụng các API bài hát từ backend:

- `GET /api/songs`
- `GET /api/songs?title=...`

Hiện tại người dùng có thể:
- mở ứng dụng
- xem danh sách nhạc
- tìm kiếm bài hát
- xem thông tin nghệ sĩ đi kèm

## 📝 Ghi chú

- Ứng dụng hiện tập trung vào trải nghiệm duyệt và tìm nhạc.
- Database đã được thiết kế theo hướng mở rộng cho một nền tảng âm nhạc cộng đồng lớn hơn.
- Giao diện frontend được xây dựng tối giản nhưng hiện đại để dễ phát triển tiếp.

## 📄 License

Dự án này được phát hành theo giấy phép [MIT License](./LICENSE).
