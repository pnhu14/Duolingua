INSERT INTO artists (artist_id, name, slug, bio, image_url, created_at, updated_at) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Sơn Tùng M-TP', 'son-tung-mtp', 'Ca sĩ, nhạc sĩ, rapper người Việt Nam. Anh được coi là một trong những ca sĩ có ảnh hưởng nhất tại Việt Nam.', 'https://i.scdn.co/image/ab6761610000e5eb4e8a7e14e2f602eb9af24e31', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000002', 'Hòa Minzy', 'hoa-minzy', 'Ca sĩ Việt Nam, từng là thành viên nhóm nhạc The Bells. Giọng ca nội lực với nhiều bản hit đình đám.', 'https://i.scdn.co/image/ab6761610000e5eb8c3b9b9b5c5e5e5e5e5e5e5e', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000003', 'Đen Vâu', 'den-vau', 'Rapper, nhạc sĩ Việt Nam. Phong cách âm nhạc độc đáo, gần gũi với đời sống thường ngày.', 'https://i.scdn.co/image/ab6761610000e5eb1c1c1c1c1c1c1c1c1c1c1c1c', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000004', 'Mỹ Tâm', 'my-tam', 'Ca sĩ, nhạc sĩ Việt Nam. Được mệnh danh là "Họa mi tóc nâu" của làng nhạc Việt.', 'https://i.scdn.co/image/ab6761610000e5eb2a2a2a2a2a2a2a2a2a2a2a2a', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000005', 'Bích Phương', 'bich-phuong', 'Ca sĩ Việt Nam với nhiều bản hit viral trên mạng xã hội.', 'https://i.scdn.co/image/ab6761610000e5eb3b3b3b3b3b3b3b3b3b3b3b3b', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000006', 'HIEUTHUHAI', 'hieuthuhai', 'Rapper, ca sĩ Việt Nam. Quán quân Rap Việt mùa 3.', 'https://i.scdn.co/image/ab6761610000e5eb4c4c4c4c4c4c4c4c4c4c4c4c', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000007', 'Hoàng Thùy Linh', 'hoang-thuy-linh', 'Ca sĩ, diễn viên Việt Nam. Phong cách âm nhạc hiện đại, kết hợp yếu tố truyền thống.', 'https://i.scdn.co/image/ab6761610000e5eb5d5d5d5d5d5d5d5d5d5d5d5d', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000008', 'Vũ.', 'vu', 'Ca sĩ, nhạc sĩ Việt Nam. Phong cách indie, ballad nhẹ nhàng.', 'https://i.scdn.co/image/ab6761610000e5eb6e6e6e6e6e6e6e6e6e6e6e6e', NOW(), NOW());

INSERT INTO users (user_id, username, email, password_hash, registration_date, display_name, status, created_at, updated_at) VALUES
    ('10000000-0000-0000-0000-000000000001', 'admin', 'admin@musicapp.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW(), 'Administrator', 'ACTIVE', NOW(), NOW()),
    ('10000000-0000-0000-0000-000000000002', 'nguyenvana', 'nguyenvana@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW(), 'Nguyễn Văn A', 'ACTIVE', NOW(), NOW()),
    ('10000000-0000-0000-0000-000000000003', 'tranthib', 'tranthib@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW(), 'Trần Thị B', 'ACTIVE', NOW(), NOW()),
    ('10000000-0000-0000-0000-000000000004', 'levanc', 'levanc@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW(), 'Lê Văn C', 'ACTIVE', NOW(), NOW());

INSERT INTO playlists (playlist_id, user_id, name, slug, description, cover_url, visibility, collaborative, status, created_at, updated_at) VALUES
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Top Hits Việt Nam', 'top-hits-viet-nam', 'Những bài hát hot nhất hiện nay', NULL, 'PUBLIC', FALSE, 'ACTIVE', NOW(), NOW()),
    ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Nhạc Chill Buổi Tối', 'nhac-chill-buoi-toi', 'Thư giãn sau một ngày làm việc mệt mỏi', NULL, 'PUBLIC', FALSE, 'ACTIVE', NOW(), NOW()),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'Nhạc Tập Gym', 'nhac-tap-gym', 'Playlist năng động cho buổi tập luyện', NULL, 'PRIVATE', FALSE, 'ACTIVE', NOW(), NOW()),
    ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', 'Nhạc Buồn Tâm Trạng', 'nhac-buon-tam-trang', 'Khi cần một chút cảm xúc', NULL, 'PRIVATE', FALSE, 'ACTIVE', NOW(), NOW()),
    ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'Nhạc Indie Việt', 'nhac-indie-viet', 'Những giai điệu indie nhẹ nhàng', NULL, 'PUBLIC', FALSE, 'ACTIVE', NOW(), NOW()),
    ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', 'Rap Việt Hay Nhất', 'rap-viet-hay-nhat', 'Tuyển tập rap Việt đỉnh cao', NULL, 'PUBLIC', FALSE, 'ACTIVE', NOW(), NOW()),
    ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000004', 'Nhạc Lái Xe', 'nhac-lai-xe', 'Playlist cho những chuyến đi dài', NULL, 'UNLISTED', FALSE, 'ACTIVE', NOW(), NOW());

INSERT INTO albums (album_id, title, slug, description, release_date, cover_url, album_type, status, primary_artist_id, created_at, updated_at) VALUES
    ('30000000-0000-0000-0000-000000000001', 'Singles Collection', 'singles-collection-son-tung', 'Tuyển tập single của Sơn Tùng M-TP.', '2021-01-01', NULL, 'COMPILATION', 'PUBLISHED', '00000000-0000-0000-0000-000000000001', NOW(), NOW());

INSERT INTO songs (song_id, title, slug, duration_seconds, release_date, audio_url, cover_url, lyrics, explicit, status, album_id, track_number, disc_number, created_at, updated_at) VALUES
    ('40000000-0000-0000-0000-000000000001', 'Lạc Trôi', 'lac-troi', 240, '2017-01-01', 'https://example.com/audio/lac-troi.mp3', 'https://i.ytimg.com/vi/DrY_K0mT-As/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', '30000000-0000-0000-0000-000000000001', 1, 1, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000002', 'Chúng Ta Của Hiện Tại', 'chung-ta-cua-hien-tai', 280, '2018-05-15', 'https://example.com/audio/ctcht.mp3', 'https://i.ytimg.com/vi/psZ1g9fMfeo/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', '30000000-0000-0000-0000-000000000001', 2, 1, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000003', 'Hãy Trao Cho Anh', 'hay-trao-cho-anh', 260, '2019-07-01', 'https://example.com/audio/htca.mp3', 'https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', '30000000-0000-0000-0000-000000000001', 3, 1, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000004', 'Nơi Này Có Anh', 'noi-nay-co-anh', 245, '2020-04-23', 'https://example.com/audio/nnca.mp3', 'https://i.ytimg.com/vi/FN7ALfpGxiI/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', '30000000-0000-0000-0000-000000000001', 4, 1, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000005', 'Muộn Rồi Mà Sao Còn', 'muon-roi-ma-sao-con', 235, '2021-04-28', 'https://example.com/audio/mrmsc.mp3', 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', '30000000-0000-0000-0000-000000000001', 5, 1, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000006', 'Rời Bỏ', 'roi-bo', 220, '2019-03-20', 'https://example.com/audio/roi-bo.mp3', 'https://i.ytimg.com/vi/bLsm4YJ_dqE/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000007', 'Không Thể Cùng Nhau Suốt Kiếp', 'khong-the-cung-nhau-suot-kiep', 255, '2020-01-15', 'https://example.com/audio/ktcnsk.mp3', 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000008', 'Tình Đầu Quá Chén', 'tinh-dau-qua-chen', 240, '2021-02-10', 'https://example.com/audio/tdqc.mp3', 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000009', 'Anh Đang Ở Đâu Đấy Anh', 'anh-dang-o-dau-day-anh', 250, '2020-01-15', 'https://example.com/audio/adodda.mp3', 'https://i.ytimg.com/vi/s7bKSNZW-Hs/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000010', 'Bài Này Chill Phết', 'bai-nay-chill-phet', 230, '2018-11-20', 'https://example.com/audio/bncp.mp3', 'https://i.ytimg.com/vi/K7NMvDSSY-A/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000011', 'Đưa Nhau Đi Trốn', 'dua-nhau-di-tron', 265, '2019-06-15', 'https://example.com/audio/dndt.mp3', 'https://i.ytimg.com/vi/s9DxWoqKxqU/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000012', 'Mang Tiền Về Cho Mẹ', 'mang-tien-ve-cho-me', 245, '2020-05-20', 'https://example.com/audio/mtvcm.mp3', 'https://i.ytimg.com/vi/abc456/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000013', 'Ước Gì', 'uoc-gi', 270, '2018-03-10', 'https://example.com/audio/uoc-gi.mp3', 'https://i.ytimg.com/vi/abc789/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000014', 'Người Hãy Quên Em Đi', 'nguoi-hay-quen-em-di', 255, '2019-08-25', 'https://example.com/audio/nhqed.mp3', 'https://i.ytimg.com/vi/def123/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000015', 'Đừng Hỏi Em', 'dung-hoi-em', 240, '2020-11-30', 'https://example.com/audio/dhe.mp3', 'https://i.ytimg.com/vi/def456/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000016', 'Bùa Yêu', 'bua-yeu', 225, '2017-09-15', 'https://example.com/audio/bua-yeu.mp3', 'https://i.ytimg.com/vi/ghi123/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000017', 'Một Cú Lừa', 'mot-cu-lua', 210, '2019-04-20', 'https://example.com/audio/mcl.mp3', 'https://i.ytimg.com/vi/ghi456/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000018', 'Đi Đu Đưa Đi', 'di-du-dua-di', 235, '2018-07-10', 'https://example.com/audio/dddd.mp3', 'https://i.ytimg.com/vi/ghi789/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000019', 'Ngủ Một Mình', 'ngu-mot-minh', 200, '2022-01-15', 'https://example.com/audio/nmm.mp3', 'https://i.ytimg.com/vi/jkl123/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000020', 'Trốn Tìm', 'tron-tim', 215, '2022-05-20', 'https://example.com/audio/tron-tim.mp3', 'https://i.ytimg.com/vi/jkl456/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000021', 'Để Mị Nói Cho Mà Nghe', 'de-mi-noi-cho-ma-nghe', 245, '2019-07-25', 'https://example.com/audio/dmnmn.mp3', 'https://i.ytimg.com/vi/mno123/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000022', 'Kẻ Cắp Gặp Bà Già', 'ke-cap-gap-ba-gia', 230, '2020-09-10', 'https://example.com/audio/kcgbg.mp3', 'https://i.ytimg.com/vi/mno456/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000023', 'Lạ Lùng', 'la-lung', 285, '2019-02-14', 'https://example.com/audio/la-lung.mp3', 'https://i.ytimg.com/vi/pqr123/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000024', 'Bước Qua Nhau', 'buoc-qua-nhau', 270, '2020-06-18', 'https://example.com/audio/bqn.mp3', 'https://i.ytimg.com/vi/pqr456/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW()),
    ('40000000-0000-0000-0000-000000000025', 'Đông Kiếm Em', 'dong-kiem-em', 260, '2021-12-01', 'https://example.com/audio/dke.mp3', 'https://i.ytimg.com/vi/pqr789/maxresdefault.jpg', NULL, FALSE, 'PUBLISHED', NULL, NULL, NULL, NOW(), NOW());

INSERT INTO song_artists (song_id, artist_id, role) VALUES
    ('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'MAIN'),
    ('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'MAIN'),
    ('40000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'MAIN');

INSERT INTO playlist_tracks (playlist_id, song_id, position) VALUES
    ('20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 1),
    ('20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000003', 2),
    ('20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000009', 3),
    ('20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000023', 1),
    ('20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000024', 2),
    ('20000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000003', 1);
