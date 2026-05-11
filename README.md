# 🎵 Music Streaming App

> Ứng dụng nghe nhạc trực tuyến full-stack với Spring Boot + React + MySQL

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)

---

## 📋 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng](#-tính-năng)
- [Tech Stack](#-tech-stack)
- [Cài Đặt](#-cài-đặt)
- [Chạy Dự Án](#-chạy-dự-án)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Giới Thiệu

**Music Streaming App** là một ứng dụng web full-stack cho phép người dùng:
- 🎵 Nghe nhạc trực tuyến
- 🔍 Tìm kiếm bài hát
- 📱 Responsive trên mọi thiết bị
- 🎨 Giao diện đẹp với Tailwind CSS v4

### **Đặc điểm nổi bật:**
- ✅ **Backend:** REST API với Spring Boot + MySQL
- ✅ **Frontend:** Modern UI với React + TypeScript + Vite
- ✅ **Database:** 25 bài hát seed data (Việt Nam + Quốc tế)
- ✅ **Responsive:** Mobile-first design
- ✅ **Type-safe:** TypeScript cho frontend
- ✅ **Documentation:** Đầy đủ và chi tiết

---

## ✨ Tính Năng

### **✅ Đã Hoàn Thành (Phase 1)**

- [x] **Hiển thị bài hát:** Grid responsive với 1-5 columns
- [x] **Tìm kiếm:** Real-time search theo tên bài hát
- [x] **Loading states:** Spinner khi đang tải dữ liệu
- [x] **Error handling:** Thông báo lỗi + nút retry
- [x] **Empty states:** Thông báo khi không có kết quả
- [x] **Hover effects:** Play button xuất hiện khi hover
- [x] **Responsive design:** Mobile, tablet, desktop
- [x] **CORS enabled:** Frontend ↔ Backend communication

### **⏳ Đang Phát Triển (Phase 2)**

- [ ] **Audio Player:** Play/Pause, Progress bar, Volume control
- [ ] **Playlists:** Tạo và quản lý playlist
- [ ] **User Authentication:** Login/Register
- [ ] **Favorites:** Lưu bài hát yêu thích
- [ ] **Admin Panel:** Upload và quản lý bài hát

---

## 🛠️ Tech Stack

### **Backend**
- **Framework:** Spring Boot 3.5.6
- **Language:** Java 17
- **Database:** MySQL 8.0
- **ORM:** JPA/Hibernate
- **Build Tool:** Maven
- **Libraries:** Lombok

### **Frontend**
- **Framework:** React 19
- **Language:** TypeScript 6
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Heroicons
- **HTTP Client:** Fetch API

### **Tools**
- **Database Manager:** Laragon (MySQL)
- **IDE:** VS Code
- **Version Control:** Git

---

## 📦 Cài Đặt

### **Yêu Cầu Hệ Thống**

- ✅ Java 17 hoặc cao hơn
- ✅ Node.js (v16+)
- ✅ MySQL 8.0 (qua Laragon hoặc standalone)
- ✅ Maven (đã có sẵn - mvnw)

### **Clone Repository**

```bash
git clone https://github.com/yourusername/music-streaming-app.git
cd music-streaming-app
```

### **Setup Database**

#### **Option A: Sử dụng Laragon (Khuyến nghị)**

1. Mở **Laragon** → Click **Start All**
2. Click **Database** → **Open** (HeidiSQL/phpMyAdmin)
3. Execute file `seed_data.sql`

#### **Option B: MySQL Command Line**

```bash
mysql -u root -p < seed_data.sql
```

✅ Database `music_streaming_db` được tạo với 25 bài hát

---

## 🚀 Chạy Dự Án

### **Quick Start (3 phút)**

#### **1. Backend (Terminal 1)**

```bash
cd backend/music
.\mvnw.cmd spring-boot:run
```

Hoặc double-click: `backend/music/run.bat`

✅ Backend: `http://localhost:8080`

#### **2. Frontend (Terminal 2)**

```bash
cd frontend/music/music-streaming-app
npm run dev
```

Hoặc double-click: `frontend/music/music-streaming-app/run-dev.bat`

✅ Frontend: `http://localhost:5173`

#### **3. Mở Browser**

```
http://localhost:5173
```

🎉 **Xong!** Bạn sẽ thấy 25 bài hát hiển thị trong grid.

---

## 📡 API Documentation

### **Base URL**
```
http://localhost:8080/api
```

### **Endpoints**

#### **1. Get All Songs**
```http
GET /api/songs
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Lạc Trôi",
    "audioUrl": "https://example.com/audio/lac-troi.mp3",
    "imageUrl": "https://i.ytimg.com/vi/DrY_K0mT-As/maxresdefault.jpg",
    "releaseDate": "2017-01-01",
    "artist": {
      "id": 1,
      "name": "Sơn Tùng M-TP",
      "bio": "Ca sĩ, nhạc sĩ...",
      "imageUrl": "https://...",
      "createdAt": "2024-05-11T..."
    }
  }
]
```

#### **2. Search Songs**
```http
GET /api/songs?title={title}
```

**Parameters:**
- `title` (string, optional): Tên bài hát cần tìm

**Example:**
```http
GET /api/songs?title=Lạc Trôi
```

**Response:** Tương tự Get All Songs, nhưng chỉ trả về bài hát khớp với `title`

---

## 📸 Screenshots

### **Desktop View**
```
┌─────────────────────────────────────────────────────────┐
│  🎵 Music Streaming                    25 bài hát       │
│  ┌───────────────────────────────────────────────────┐  │
│  │  🔍  Tìm kiếm bài hát...                      ✕  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ 🖼️   │ │ 🖼️   │ │ 🖼️   │ │ 🖼️   │ │ 🖼️   │
│      │ │      │ │      │ │      │ │      │
│ Song │ │ Song │ │ Song │ │ Song │ │ Song │
│Artist│ │Artist│ │Artist│ │Artist│ │Artist│
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

### **Mobile View**
```
┌─────────────────┐
│ 🎵 Music        │
│ 25 bài hát      │
│ ┌─────────────┐ │
│ │ 🔍 Search   │ │
│ └─────────────┘ │
├─────────────────┤
│ ┌─────────────┐ │
│ │   🖼️ Song   │ │
│ │   Artist    │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │   🖼️ Song   │ │
│ │   Artist    │ │
│ └─────────────┘ │
└─────────────────┘
```

---

## 📁 Cấu Trúc Dự Án

```
music-streaming-app/
├── backend/music/                          # Spring Boot Backend
│   ├── src/main/java/com/musicapp/backend/
│   │   ├── controller/                    # REST Controllers
│   │   │   └── SongController.java
│   │   ├── service/                       # Business Logic
│   │   │   └── SongService.java
│   │   ├── repository/                    # JPA Repositories
│   │   │   ├── SongRepository.java
│   │   │   └── ArtistRepository.java
│   │   ├── model/                         # Entities
│   │   │   ├── Song.java
│   │   │   ├── Artist.java
│   │   │   ├── User.java
│   │   │   ├── Playlist.java
│   │   │   └── PlaylistSong.java
│   │   ├── dto/                           # Data Transfer Objects
│   │   │   └── SongDto.java
│   │   └── config/                        # Configuration
│   │       ├── WebConfig.java             # CORS
│   │       └── DataSeeder.java            # Seed data (disabled)
│   ├── src/main/resources/
│   │   └── application.properties         # Database config
│   ├── pom.xml                            # Maven dependencies
│   └── run.bat                            # Quick start script
│
├── frontend/music/music-streaming-app/    # React Frontend
│   ├── src/
│   │   ├── components/                    # React Components
│   │   │   ├── SongCard.tsx              # Song display card
│   │   │   ├── SearchBar.tsx             # Search input
│   │   │   ├── Loading.tsx               # Loading spinner
│   │   │   ├── ErrorMessage.tsx          # Error display
│   │   │   └── EmptyState.tsx            # Empty state
│   │   ├── services/
│   │   │   └── api.ts                    # API service
│   │   ├── types/
│   │   │   └── index.ts                  # TypeScript types
│   │   ├── App.tsx                       # Main component
│   │   ├── main.tsx                      # Entry point
│   │   └── input.css                     # Tailwind CSS
│   ├── vite.config.ts                    # Vite config
│   ├── package.json                      # Dependencies
│   └── run-dev.bat                       # Quick start script
│
├── seed_data.sql                          # Database seed data
├── DATABASE_SCHEMA.md                     # Database documentation
├── ARCHITECTURE.md                        # Architecture diagram
├── HUONG_DAN_CHAY_DU_AN.md               # Setup guide (Vietnamese)
├── TONG_KET_DU_AN.md                     # Project summary
├── QUICK_START.md                        # Quick start guide
└── README.md                             # This file
```

---

## 🎯 Roadmap

### **Phase 1: Basic Features** ✅ (COMPLETED)
- [x] Display songs in grid
- [x] Search functionality
- [x] Loading states
- [x] Error handling
- [x] Responsive design

### **Phase 2: Audio Player** (IN PROGRESS)
- [ ] Audio player component
- [ ] Play/Pause controls
- [ ] Progress bar
- [ ] Volume control
- [ ] Next/Previous buttons
- [ ] Shuffle & Repeat

### **Phase 3: Playlists**
- [ ] Display user playlists
- [ ] Create new playlist
- [ ] Add/Remove songs from playlist
- [ ] Edit playlist details
- [ ] Delete playlist

### **Phase 4: User Authentication**
- [ ] Login/Register pages
- [ ] JWT authentication
- [ ] Protected routes
- [ ] User profile page
- [ ] Logout functionality

### **Phase 5: Advanced Features**
- [ ] Favorites/Liked songs
- [ ] Recently played
- [ ] Listening history
- [ ] Recommendations
- [ ] Share songs/playlists
- [ ] Comments/Reviews

### **Phase 6: Admin Panel**
- [ ] Upload songs
- [ ] Manage artists
- [ ] Manage users
- [ ] Analytics dashboard
- [ ] Content moderation

---

## 🐛 Troubleshooting

### **Backend không chạy?**

**Lỗi:** `Port 8080 already in use`

```bash
# Tìm process đang dùng port 8080
netstat -ano | findstr :8080

# Kill process
taskkill /PID <PID> /F
```

**Lỗi:** `Cannot connect to database`

1. Kiểm tra MySQL đã chạy chưa (Laragon → Start All)
2. Kiểm tra database đã tạo chưa: `SHOW DATABASES;`
3. Kiểm tra username/password trong `application.properties`

### **Frontend không load data?**

**Lỗi:** `Failed to fetch` hoặc `Network Error`

1. Kiểm tra backend đã chạy: `http://localhost:8080/api/songs`
2. Mở Console (F12) để xem lỗi
3. Kiểm tra CORS configuration

**Lỗi:** `CORS policy blocked`

→ Đã fix! Backend cho phép `localhost:5173`

### **Tailwind CSS không hoạt động?**

1. Kiểm tra `vite.config.ts` có plugin `tailwindcss()`
2. Kiểm tra `main.tsx` có import `'./input.css'`
3. Restart dev server: `Ctrl + C` → `npm run dev`

---

## 📚 Documentation

- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [HUONG_DAN_CHAY_DU_AN.md](HUONG_DAN_CHAY_DU_AN.md) - Chi tiết setup
- [TONG_KET_DU_AN.md](TONG_KET_DU_AN.md) - Tổng kết dự án
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture diagram
- [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) - Database schema

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [React](https://react.dev/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Heroicons](https://heroicons.com/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/music-streaming-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/music-streaming-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/music-streaming-app)
![GitHub license](https://img.shields.io/github/license/yourusername/music-streaming-app)

---

<div align="center">

**Made with ❤️ and ☕**

[⬆ Back to Top](#-music-streaming-app)

</div>
