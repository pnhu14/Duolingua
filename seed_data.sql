-- ========================================
-- COMPLETE DATABASE SETUP & SEED DATA
-- Music Streaming App
-- ========================================
-- File này bao gồm:
-- 1. Tạo database
-- 2. Tạo tất cả các bảng
-- 3. Import dữ liệu mẫu
-- 
-- Cách chạy:
-- 1. Mở HeidiSQL
-- 2. Kết nối với MySQL (root)
-- 3. File → Load SQL file → Chọn file này
-- 4. Execute (F9)
-- ========================================

-- ========================================
-- 1. TẠO DATABASE
-- ========================================
CREATE DATABASE IF NOT EXISTS music_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE music_db;

-- ========================================
-- 2. XÓA CÁC BẢNG CŨ (NẾU CÓ)
-- ========================================
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS playlist_songs;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ========================================
-- 3. TẠO CÁC BẢNG
-- ========================================

-- Bảng ARTISTS (Nghệ sĩ)
CREATE TABLE artists (
    artist_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    image_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_artist_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng SONGS (Bài hát)
CREATE TABLE songs (
    song_id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    duration INT,
    release_date DATE,
    audio_url VARCHAR(512),
    image_url VARCHAR(512),
    artist_id BIGINT,
    INDEX idx_song_title (title),
    INDEX idx_song_artist (artist_id),
    CONSTRAINT fk_song_artist 
        FOREIGN KEY (artist_id) 
        REFERENCES artists(artist_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng USERS (Người dùng)
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_username (username),
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng PLAYLISTS (Danh sách phát)
CREATE TABLE playlists (
    playlist_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_playlist_user (user_id),
    INDEX idx_playlist_name (name),
    CONSTRAINT fk_playlist_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng PLAYLIST_SONGS (Bảng trung gian - Bài hát trong playlist)
CREATE TABLE playlist_songs (
    playlist_song_id BIGINT PRIMARY KEY,
    playlist_id BIGINT NOT NULL,
    song_id BIGINT NOT NULL,
    song_order INT,
    INDEX idx_ps_playlist (playlist_id),
    INDEX idx_ps_song (song_id),
    CONSTRAINT fk_ps_playlist 
        FOREIGN KEY (playlist_id) 
        REFERENCES playlists(playlist_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_ps_song 
        FOREIGN KEY (song_id) 
        REFERENCES songs(song_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- ARTISTS (Nghệ sĩ) - 8 nghệ sĩ
-- ========================================
INSERT INTO artists (artist_id, name, bio, image_url, created_at) VALUES
(1, 'Sơn Tùng M-TP', 'Ca sĩ, nhạc sĩ, rapper người Việt Nam. Anh được coi là một trong những ca sĩ có ảnh hưởng nhất tại Việt Nam.', 'https://i.scdn.co/image/ab6761610000e5eb4e8a7e14e2f602eb9af24e31', NOW()),
(2, 'Hòa Minzy', 'Ca sĩ Việt Nam, từng là thành viên nhóm nhạc The Bells. Giọng ca nội lực với nhiều bản hit đình đám.', 'https://i.scdn.co/image/ab6761610000e5eb8c3b9b9b5c5e5e5e5e5e5e5e', NOW()),
(3, 'Đen Vâu', 'Rapper, nhạc sĩ Việt Nam. Phong cách âm nhạc độc đáo, gần gũi với đời sống thường ngày.', 'https://i.scdn.co/image/ab6761610000e5eb1c1c1c1c1c1c1c1c1c1c1c1c', NOW()),
(4, 'Mỹ Tâm', 'Ca sĩ, nhạc sĩ Việt Nam. Được mệnh danh là "Họa mi tóc nâu" của làng nhạc Việt.', 'https://i.scdn.co/image/ab6761610000e5eb2a2a2a2a2a2a2a2a2a2a2a2a', NOW()),
(5, 'Bích Phương', 'Ca sĩ Việt Nam với nhiều bản hit viral trên mạng xã hội.', 'https://i.scdn.co/image/ab6761610000e5eb3b3b3b3b3b3b3b3b3b3b3b3b', NOW()),
(6, 'HIEUTHUHAI', 'Rapper, ca sĩ Việt Nam. Quán quân Rap Việt mùa 3.', 'https://i.scdn.co/image/ab6761610000e5eb4c4c4c4c4c4c4c4c4c4c4c4c', NOW()),
(7, 'Hoàng Thùy Linh', 'Ca sĩ, diễn viên Việt Nam. Phong cách âm nhạc hiện đại, kết hợp yếu tố truyền thống.', 'https://i.scdn.co/image/ab6761610000e5eb5d5d5d5d5d5d5d5d5d5d5d5d', NOW()),
(8, 'Vũ.', 'Ca sĩ, nhạc sĩ Việt Nam. Phong cách indie, ballad nhẹ nhàng.', 'https://i.scdn.co/image/ab6761610000e5eb6e6e6e6e6e6e6e6e6e6e6e6e', NOW());

-- ========================================
-- SONGS (Bài hát) - 25 bài hát
-- ========================================
INSERT INTO songs (song_id, title, duration, release_date, audio_url, image_url, artist_id) VALUES
-- Sơn Tùng M-TP (5 bài)
(1, 'Lạc Trôi', 240, '2017-01-01', 'https://example.com/audio/lac-troi.mp3', 'https://i.ytimg.com/vi/DrY_K0mT-As/maxresdefault.jpg', 1),
(2, 'Chúng Ta Của Hiện Tại', 280, '2018-05-15', 'https://example.com/audio/ctcht.mp3', 'https://i.ytimg.com/vi/psZ1g9fMfeo/maxresdefault.jpg', 1),
(3, 'Hãy Trao Cho Anh', 260, '2019-07-01', 'https://example.com/audio/htca.mp3', 'https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg', 1),
(4, 'Nơi Này Có Anh', 245, '2020-04-23', 'https://example.com/audio/nnca.mp3', 'https://i.ytimg.com/vi/FN7ALfpGxiI/maxresdefault.jpg', 1),
(5, 'Muộn Rồi Mà Sao Còn', 235, '2021-04-28', 'https://example.com/audio/mrmsc.mp3', 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg', 1),

-- Hòa Minzy (3 bài)
(6, 'Rời Bỏ', 220, '2019-03-20', 'https://example.com/audio/roi-bo.mp3', 'https://i.ytimg.com/vi/bLsm4YJ_dqE/maxresdefault.jpg', 2),
(7, 'Không Thể Cùng Nhau Suốt Kiếp', 255, '2020-01-15', 'https://example.com/audio/ktcnsk.mp3', 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg', 2),
(8, 'Tình Đầu Quá Chén', 240, '2021-02-10', 'https://example.com/audio/tdqc.mp3', 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg', 2),

-- Đen Vâu (4 bài)
(9, 'Anh Đang Ở Đâu Đấy Anh', 250, '2020-01-15', 'https://example.com/audio/adodda.mp3', 'https://i.ytimg.com/vi/s7bKSNZW-Hs/maxresdefault.jpg', 3),
(10, 'Bài Này Chill Phết', 230, '2018-11-20', 'https://example.com/audio/bncp.mp3', 'https://i.ytimg.com/vi/K7NMvDSSY-A/maxresdefault.jpg', 3),
(11, 'Đưa Nhau Đi Trốn', 265, '2019-06-15', 'https://example.com/audio/dndt.mp3', 'https://i.ytimg.com/vi/s9DxWoqKxqU/maxresdefault.jpg', 3),
(12, 'Mang Tiền Về Cho Mẹ', 245, '2020-05-20', 'https://example.com/audio/mtvcm.mp3', 'https://i.ytimg.com/vi/abc456/maxresdefault.jpg', 3),

-- Mỹ Tâm (3 bài)
(13, 'Ước Gì', 270, '2018-03-10', 'https://example.com/audio/uoc-gi.mp3', 'https://i.ytimg.com/vi/abc789/maxresdefault.jpg', 4),
(14, 'Người Hãy Quên Em Đi', 255, '2019-08-25', 'https://example.com/audio/nhqed.mp3', 'https://i.ytimg.com/vi/def123/maxresdefault.jpg', 4),
(15, 'Đừng Hỏi Em', 240, '2020-11-30', 'https://example.com/audio/dhe.mp3', 'https://i.ytimg.com/vi/def456/maxresdefault.jpg', 4),

-- Bích Phương (3 bài)
(16, 'Bùa Yêu', 225, '2017-09-15', 'https://example.com/audio/bua-yeu.mp3', 'https://i.ytimg.com/vi/ghi123/maxresdefault.jpg', 5),
(17, 'Một Cú Lừa', 210, '2019-04-20', 'https://example.com/audio/mcl.mp3', 'https://i.ytimg.com/vi/ghi456/maxresdefault.jpg', 5),
(18, 'Đi Đu Đưa Đi', 235, '2018-07-10', 'https://example.com/audio/dddd.mp3', 'https://i.ytimg.com/vi/ghi789/maxresdefault.jpg', 5),

-- HIEUTHUHAI (2 bài)
(19, 'Ngủ Một Mình', 200, '2022-01-15', 'https://example.com/audio/nmm.mp3', 'https://i.ytimg.com/vi/jkl123/maxresdefault.jpg', 6),
(20, 'Trốn Tìm', 215, '2022-05-20', 'https://example.com/audio/tron-tim.mp3', 'https://i.ytimg.com/vi/jkl456/maxresdefault.jpg', 6),

-- Hoàng Thùy Linh (2 bài)
(21, 'Để Mị Nói Cho Mà Nghe', 245, '2019-07-25', 'https://example.com/audio/dmnmn.mp3', 'https://i.ytimg.com/vi/mno123/maxresdefault.jpg', 7),
(22, 'Kẻ Cắp Gặp Bà Già', 230, '2020-09-10', 'https://example.com/audio/kcgbg.mp3', 'https://i.ytimg.com/vi/mno456/maxresdefault.jpg', 7),

-- Vũ. (3 bài)
(23, 'Lạ Lùng', 285, '2019-02-14', 'https://example.com/audio/la-lung.mp3', 'https://i.ytimg.com/vi/pqr123/maxresdefault.jpg', 8),
(24, 'Bước Qua Nhau', 270, '2020-06-18', 'https://example.com/audio/bqn.mp3', 'https://i.ytimg.com/vi/pqr456/maxresdefault.jpg', 8),
(25, 'Đông Kiếm Em', 260, '2021-12-01', 'https://example.com/audio/dke.mp3', 'https://i.ytimg.com/vi/pqr789/maxresdefault.jpg', 8);

-- ========================================
-- USERS (Người dùng) - 4 users
-- ========================================
-- Password mặc định: "password123" (đã hash bằng BCrypt)
INSERT INTO users (user_id, username, email, password_hash, registration_date) VALUES
(1, 'admin', 'admin@musicapp.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW()),
(2, 'nguyenvana', 'nguyenvana@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW()),
(3, 'tranthib', 'tranthib@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW()),
(4, 'levanc', 'levanc@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW());

-- ========================================
-- PLAYLISTS (Danh sách phát) - 7 playlists
-- ========================================
INSERT INTO playlists (playlist_id, user_id, name, description, created_at) VALUES
(1, 1, 'Top Hits Việt Nam', 'Những bài hát hot nhất hiện nay', NOW()),
(2, 1, 'Nhạc Chill Buổi Tối', 'Thư giãn sau một ngày làm việc mệt mỏi', NOW()),
(3, 2, 'Nhạc Tập Gym', 'Playlist năng động cho buổi tập luyện', NOW()),
(4, 2, 'Nhạc Buồn Tâm Trạng', 'Khi cần một chút cảm xúc', NOW()),
(5, 3, 'Nhạc Indie Việt', 'Những giai điệu indie nhẹ nhàng', NOW()),
(6, 3, 'Rap Việt Hay Nhất', 'Tuyển tập rap Việt đỉnh cao', NOW()),
(7, 4, 'Nhạc Lái Xe', 'Playlist cho những chuyến đi dài', NOW());

-- ========================================
-- PLAYLIST_SONGS (Bài hát trong playlist)
-- ========================================
INSERT INTO playlist_songs (playlist_song_id, playlist_id, song_id, song_order) VALUES
-- Playlist 1: Top Hits Việt Nam (6 bài)
(1, 1, 1, 1),   -- Lạc Trôi
(2, 1, 3, 2),   -- Hãy Trao Cho Anh
(3, 1, 9, 3),   -- Anh Đang Ở Đâu Đấy Anh
(4, 1, 16, 4),  -- Bùa Yêu
(5, 1, 19, 5),  -- Ngủ Một Mình
(6, 1, 21, 6),  -- Để Mị Nói Cho Mà Nghe

-- Playlist 2: Nhạc Chill Buổi Tối (5 bài)
(7, 2, 23, 1),  -- Lạ Lùng
(8, 2, 24, 2),  -- Bước Qua Nhau
(9, 2, 10, 3),  -- Bài Này Chill Phết
(10, 2, 11, 4), -- Đưa Nhau Đi Trốn
(11, 2, 25, 5), -- Đông Kiếm Em

-- Playlist 3: Nhạc Tập Gym (5 bài)
(12, 3, 3, 1),  -- Hãy Trao Cho Anh
(13, 3, 4, 2),  -- Nơi Này Có Anh
(14, 3, 19, 3), -- Ngủ Một Mình
(15, 3, 20, 4), -- Trốn Tìm
(16, 3, 22, 5), -- Kẻ Cắp Gặp Bà Già

-- Playlist 4: Nhạc Buồn Tâm Trạng (6 bài)
(17, 4, 6, 1),  -- Rời Bỏ
(18, 4, 7, 2),  -- Không Thể Cùng Nhau Suốt Kiếp
(19, 4, 13, 3), -- Ước Gì
(20, 4, 14, 4), -- Người Hãy Quên Em Đi
(21, 4, 23, 5), -- Lạ Lùng
(22, 4, 24, 6), -- Bước Qua Nhau

-- Playlist 5: Nhạc Indie Việt (4 bài)
(23, 5, 23, 1), -- Lạ Lùng
(24, 5, 24, 2), -- Bước Qua Nhau
(25, 5, 25, 3), -- Đông Kiếm Em
(26, 5, 10, 4), -- Bài Này Chill Phết

-- Playlist 6: Rap Việt Hay Nhất (6 bài)
(27, 6, 9, 1),  -- Anh Đang Ở Đâu Đấy Anh
(28, 6, 10, 2), -- Bài Này Chill Phết
(29, 6, 11, 3), -- Đưa Nhau Đi Trốn
(30, 6, 12, 4), -- Mang Tiền Về Cho Mẹ
(31, 6, 19, 5), -- Ngủ Một Mình
(32, 6, 20, 6), -- Trốn Tìm

-- Playlist 7: Nhạc Lái Xe (5 bài)
(33, 7, 1, 1),  -- Lạc Trôi
(34, 7, 2, 2),  -- Chúng Ta Của Hiện Tại
(35, 7, 11, 3), -- Đưa Nhau Đi Trốn
(36, 7, 16, 4), -- Bùa Yêu
(37, 7, 18, 5); -- Đi Đu Đưa Đi

-- ========================================
-- Kiểm tra dữ liệu đã insert
-- ========================================
SELECT '✅ Data seeding completed successfully!' AS status;
SELECT '' AS '';
SELECT 'Thống kê dữ liệu:' AS info;
SELECT COUNT(*) AS total_artists FROM artists;
SELECT COUNT(*) AS total_songs FROM songs;
SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(*) AS total_playlists FROM playlists;
SELECT COUNT(*) AS total_playlist_songs FROM playlist_songs;

-- ========================================
-- Xem dữ liệu mẫu
-- ========================================
SELECT '' AS '';
SELECT '📊 Top 5 bài hát mới nhất:' AS info;
SELECT 
    s.title AS 'Tên bài hát',
    a.name AS 'Nghệ sĩ',
    s.release_date AS 'Ngày phát hành'
FROM songs s
JOIN artists a ON s.artist_id = a.artist_id
ORDER BY s.release_date DESC
LIMIT 5;

SELECT '' AS '';
SELECT '📊 Số bài hát của mỗi nghệ sĩ:' AS info;
SELECT 
    a.name AS 'Nghệ sĩ',
    COUNT(s.song_id) AS 'Số bài hát'
FROM artists a
LEFT JOIN songs s ON a.artist_id = s.artist_id
GROUP BY a.artist_id
ORDER BY COUNT(s.song_id) DESC;

SELECT '' AS '';
SELECT '📊 Top 3 playlist có nhiều bài hát nhất:' AS info;
SELECT 
    p.name AS 'Tên playlist',
    u.username AS 'Người tạo',
    COUNT(ps.song_id) AS 'Số bài hát'
FROM playlists p
JOIN users u ON p.user_id = u.user_id
LEFT JOIN playlist_songs ps ON p.playlist_id = ps.playlist_id
GROUP BY p.playlist_id
ORDER BY COUNT(ps.song_id) DESC
LIMIT 3;

-- ========================================
-- HOÀN TẤT!
-- ========================================
-- Bây giờ bạn có thể:
-- 1. Test API: http://localhost:8080/api/search
-- 2. Tìm kiếm: http://localhost:8080/api/search?title=Lạc
-- 3. Xem dữ liệu trong HeidiSQL
-- ========================================
