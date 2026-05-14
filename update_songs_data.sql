-- ========================================
-- UPDATE SONGS DATA
-- Cập nhật dữ liệu cho các bài hát
-- ========================================

USE music_streaming_db;

-- Sơn Tùng M-TP (5 bài)
UPDATE songs SET release_date = '2017-01-01', image_url = 'https://i.ytimg.com/vi/DrY_K0mT-As/maxresdefault.jpg', audio_url = 'https://example.com/audio/lac-troi.mp3' WHERE song_id = 1;
UPDATE songs SET release_date = '2018-05-15', image_url = 'https://i.ytimg.com/vi/psZ1g9fMfeo/maxresdefault.jpg', audio_url = 'https://example.com/audio/ctcht.mp3' WHERE song_id = 2;
UPDATE songs SET release_date = '2019-07-01', image_url = 'https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg', audio_url = 'https://example.com/audio/htca.mp3' WHERE song_id = 3;
UPDATE songs SET release_date = '2020-04-23', image_url = 'https://i.ytimg.com/vi/FN7ALfpGxiI/maxresdefault.jpg', audio_url = 'https://example.com/audio/nnca.mp3' WHERE song_id = 4;
UPDATE songs SET release_date = '2021-04-28', image_url = 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg', audio_url = 'https://example.com/audio/mrmsc.mp3' WHERE song_id = 5;

-- Hòa Minzy (3 bài)
UPDATE songs SET release_date = '2019-03-20', image_url = 'https://i.ytimg.com/vi/bLsm4YJ_dqE/maxresdefault.jpg', audio_url = 'https://example.com/audio/roi-bo.mp3' WHERE song_id = 6;
UPDATE songs SET release_date = '2020-01-15', image_url = 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg', audio_url = 'https://example.com/audio/ktcnsk.mp3' WHERE song_id = 7;
UPDATE songs SET release_date = '2021-02-10', image_url = 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg', audio_url = 'https://example.com/audio/tdqc.mp3' WHERE song_id = 8;

-- Đen Vâu (4 bài)
UPDATE songs SET release_date = '2020-01-15', image_url = 'https://i.ytimg.com/vi/s7bKSNZW-Hs/maxresdefault.jpg', audio_url = 'https://example.com/audio/adodda.mp3' WHERE song_id = 9;
UPDATE songs SET release_date = '2018-11-20', image_url = 'https://i.ytimg.com/vi/K7NMvDSSY-A/maxresdefault.jpg', audio_url = 'https://example.com/audio/bncp.mp3' WHERE song_id = 10;
UPDATE songs SET release_date = '2019-06-15', image_url = 'https://i.ytimg.com/vi/s9DxWoqKxqU/maxresdefault.jpg', audio_url = 'https://example.com/audio/dndt.mp3' WHERE song_id = 11;
UPDATE songs SET release_date = '2020-05-20', image_url = 'https://i.ytimg.com/vi/abc456/maxresdefault.jpg', audio_url = 'https://example.com/audio/mtvcm.mp3' WHERE song_id = 12;

-- Mỹ Tâm (3 bài)
UPDATE songs SET release_date = '2018-03-10', image_url = 'https://i.ytimg.com/vi/abc789/maxresdefault.jpg', audio_url = 'https://example.com/audio/uoc-gi.mp3' WHERE song_id = 13;
UPDATE songs SET release_date = '2019-08-25', image_url = 'https://i.ytimg.com/vi/def123/maxresdefault.jpg', audio_url = 'https://example.com/audio/nhqed.mp3' WHERE song_id = 14;
UPDATE songs SET release_date = '2020-11-30', image_url = 'https://i.ytimg.com/vi/def456/maxresdefault.jpg', audio_url = 'https://example.com/audio/dhe.mp3' WHERE song_id = 15;

-- Bích Phương (3 bài)
UPDATE songs SET release_date = '2017-09-15', image_url = 'https://i.ytimg.com/vi/ghi123/maxresdefault.jpg', audio_url = 'https://example.com/audio/bua-yeu.mp3' WHERE song_id = 16;
UPDATE songs SET release_date = '2019-04-20', image_url = 'https://i.ytimg.com/vi/ghi456/maxresdefault.jpg', audio_url = 'https://example.com/audio/mcl.mp3' WHERE song_id = 17;
UPDATE songs SET release_date = '2018-07-10', image_url = 'https://i.ytimg.com/vi/ghi789/maxresdefault.jpg', audio_url = 'https://example.com/audio/dddd.mp3' WHERE song_id = 18;

-- HIEUTHUHAI (2 bài)
UPDATE songs SET release_date = '2022-01-15', image_url = 'https://i.ytimg.com/vi/jkl123/maxresdefault.jpg', audio_url = 'https://example.com/audio/nmm.mp3' WHERE song_id = 19;
UPDATE songs SET release_date = '2022-05-20', image_url = 'https://i.ytimg.com/vi/jkl456/maxresdefault.jpg', audio_url = 'https://example.com/audio/tron-tim.mp3' WHERE song_id = 20;

-- Hoàng Thùy Linh (2 bài)
UPDATE songs SET release_date = '2019-07-25', image_url = 'https://i.ytimg.com/vi/mno123/maxresdefault.jpg', audio_url = 'https://example.com/audio/dmnmn.mp3' WHERE song_id = 21;
UPDATE songs SET release_date = '2020-09-10', image_url = 'https://i.ytimg.com/vi/mno456/maxresdefault.jpg', audio_url = 'https://example.com/audio/kcgbg.mp3' WHERE song_id = 22;

-- Vũ. (3 bài)
UPDATE songs SET release_date = '2019-02-14', image_url = 'https://i.ytimg.com/vi/pqr123/maxresdefault.jpg', audio_url = 'https://example.com/audio/la-lung.mp3' WHERE song_id = 23;
UPDATE songs SET release_date = '2020-06-18', image_url = 'https://i.ytimg.com/vi/pqr456/maxresdefault.jpg', audio_url = 'https://example.com/audio/bqn.mp3' WHERE song_id = 24;
UPDATE songs SET release_date = '2021-12-01', image_url = 'https://i.ytimg.com/vi/pqr789/maxresdefault.jpg', audio_url = 'https://example.com/audio/dke.mp3' WHERE song_id = 25;

-- Kiểm tra kết quả
SELECT song_id, title, release_date, 
       SUBSTRING(image_url, 1, 50) as image_url_preview,
       SUBSTRING(audio_url, 1, 50) as audio_url_preview
FROM songs
ORDER BY song_id;

-- Thống kê
SELECT 
    COUNT(*) as total_songs,
    COUNT(release_date) as songs_with_date,
    COUNT(image_url) as songs_with_image,
    COUNT(audio_url) as songs_with_audio
FROM songs;
