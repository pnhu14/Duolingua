-- V9: Backfill meaningful catalog relationships for seeded Vietnamese music data.

BEGIN;

UPDATE artists
SET country = 'Vietnam',
    verified = TRUE,
    updated_at = CURRENT_TIMESTAMP
WHERE slug IN (
    'son-tung-mtp',
    'hoa-minzy',
    'den-vau',
    'my-tam',
    'bich-phuong',
    'hieuthuhai',
    'hoang-thuy-linh',
    'vu'
);

INSERT INTO genres (name, slug)
VALUES
    ('V-Pop', 'v-pop'),
    ('Pop Ballad', 'pop-ballad'),
    ('Rap Việt', 'rap-viet'),
    ('Indie Việt', 'indie-viet'),
    ('Dance Pop', 'dance-pop'),
    ('Folk Pop', 'folk-pop'),
    ('R&B Việt', 'rnb-viet')
ON CONFLICT (slug) DO NOTHING;

WITH song_artist_seed(song_slug, artist_slug, role) AS (
    VALUES
        ('lac-troi', 'son-tung-mtp', 'MAIN'),
        ('chung-ta-cua-hien-tai', 'son-tung-mtp', 'MAIN'),
        ('hay-trao-cho-anh', 'son-tung-mtp', 'MAIN'),
        ('noi-nay-co-anh', 'son-tung-mtp', 'MAIN'),
        ('muon-roi-ma-sao-con', 'son-tung-mtp', 'MAIN'),
        ('roi-bo', 'hoa-minzy', 'MAIN'),
        ('khong-the-cung-nhau-suot-kiep', 'hoa-minzy', 'MAIN'),
        ('tinh-dau-qua-chen', 'hoa-minzy', 'MAIN'),
        ('anh-dang-o-dau-day-anh', 'bich-phuong', 'MAIN'),
        ('bua-yeu', 'bich-phuong', 'MAIN'),
        ('mot-cu-lua', 'bich-phuong', 'MAIN'),
        ('di-du-dua-di', 'bich-phuong', 'MAIN'),
        ('bai-nay-chill-phet', 'den-vau', 'MAIN'),
        ('dua-nhau-di-tron', 'den-vau', 'MAIN'),
        ('mang-tien-ve-cho-me', 'den-vau', 'MAIN'),
        ('uoc-gi', 'my-tam', 'MAIN'),
        ('nguoi-hay-quen-em-di', 'my-tam', 'MAIN'),
        ('dung-hoi-em', 'my-tam', 'MAIN'),
        ('ngu-mot-minh', 'hieuthuhai', 'MAIN'),
        ('tron-tim', 'hieuthuhai', 'MAIN'),
        ('de-mi-noi-cho-ma-nghe', 'hoang-thuy-linh', 'MAIN'),
        ('ke-cap-gap-ba-gia', 'hoang-thuy-linh', 'MAIN'),
        ('la-lung', 'vu', 'MAIN'),
        ('buoc-qua-nhau', 'vu', 'MAIN'),
        ('dong-kiem-em', 'vu', 'MAIN')
)
INSERT INTO song_artists (song_id, artist_id, role)
SELECT s.song_id, a.artist_id, seed.role
FROM song_artist_seed seed
JOIN songs s ON s.slug = seed.song_slug
JOIN artists a ON a.slug = seed.artist_slug
ON CONFLICT (song_id, artist_id, role) DO NOTHING;

WITH song_genre_seed(song_slug, genre_slug) AS (
    VALUES
        ('lac-troi', 'v-pop'),
        ('lac-troi', 'folk-pop'),
        ('chung-ta-cua-hien-tai', 'v-pop'),
        ('chung-ta-cua-hien-tai', 'pop-ballad'),
        ('hay-trao-cho-anh', 'v-pop'),
        ('hay-trao-cho-anh', 'rnb-viet'),
        ('noi-nay-co-anh', 'v-pop'),
        ('noi-nay-co-anh', 'pop-ballad'),
        ('muon-roi-ma-sao-con', 'v-pop'),
        ('muon-roi-ma-sao-con', 'pop-ballad'),
        ('roi-bo', 'pop-ballad'),
        ('khong-the-cung-nhau-suot-kiep', 'pop-ballad'),
        ('tinh-dau-qua-chen', 'v-pop'),
        ('anh-dang-o-dau-day-anh', 'v-pop'),
        ('anh-dang-o-dau-day-anh', 'pop-ballad'),
        ('bua-yeu', 'v-pop'),
        ('mot-cu-lua', 'v-pop'),
        ('di-du-dua-di', 'dance-pop'),
        ('bai-nay-chill-phet', 'rap-viet'),
        ('bai-nay-chill-phet', 'indie-viet'),
        ('dua-nhau-di-tron', 'rap-viet'),
        ('mang-tien-ve-cho-me', 'rap-viet'),
        ('uoc-gi', 'pop-ballad'),
        ('nguoi-hay-quen-em-di', 'v-pop'),
        ('dung-hoi-em', 'pop-ballad'),
        ('ngu-mot-minh', 'rap-viet'),
        ('ngu-mot-minh', 'rnb-viet'),
        ('tron-tim', 'rap-viet'),
        ('tron-tim', 'rnb-viet'),
        ('de-mi-noi-cho-ma-nghe', 'folk-pop'),
        ('de-mi-noi-cho-ma-nghe', 'v-pop'),
        ('ke-cap-gap-ba-gia', 'folk-pop'),
        ('ke-cap-gap-ba-gia', 'dance-pop'),
        ('la-lung', 'indie-viet'),
        ('buoc-qua-nhau', 'indie-viet'),
        ('dong-kiem-em', 'indie-viet')
)
INSERT INTO song_genres (song_id, genre_id)
SELECT s.song_id, g.genre_id
FROM song_genre_seed seed
JOIN songs s ON s.slug = seed.song_slug
JOIN genres g ON g.slug = seed.genre_slug
ON CONFLICT (song_id, genre_id) DO NOTHING;

WITH playlist_seed(playlist_slug, song_slug, position) AS (
    VALUES
        ('top-hits-viet-nam', 'lac-troi', 1),
        ('top-hits-viet-nam', 'hay-trao-cho-anh', 2),
        ('top-hits-viet-nam', 'anh-dang-o-dau-day-anh', 3),
        ('top-hits-viet-nam', 'bai-nay-chill-phet', 4),
        ('top-hits-viet-nam', 'di-du-dua-di', 5),
        ('nhac-chill-buoi-toi', 'la-lung', 1),
        ('nhac-chill-buoi-toi', 'buoc-qua-nhau', 2),
        ('nhac-chill-buoi-toi', 'bai-nay-chill-phet', 3),
        ('nhac-chill-buoi-toi', 'noi-nay-co-anh', 4),
        ('nhac-tap-gym', 'hay-trao-cho-anh', 1),
        ('nhac-tap-gym', 'di-du-dua-di', 2),
        ('nhac-tap-gym', 'tron-tim', 3),
        ('nhac-tap-gym', 'ke-cap-gap-ba-gia', 4),
        ('nhac-buon-tam-trang', 'khong-the-cung-nhau-suot-kiep', 1),
        ('nhac-buon-tam-trang', 'roi-bo', 2),
        ('nhac-buon-tam-trang', 'uoc-gi', 3),
        ('nhac-buon-tam-trang', 'dong-kiem-em', 4),
        ('nhac-indie-viet', 'la-lung', 1),
        ('nhac-indie-viet', 'buoc-qua-nhau', 2),
        ('nhac-indie-viet', 'dong-kiem-em', 3),
        ('nhac-indie-viet', 'bai-nay-chill-phet', 4),
        ('rap-viet-hay-nhat', 'bai-nay-chill-phet', 1),
        ('rap-viet-hay-nhat', 'dua-nhau-di-tron', 2),
        ('rap-viet-hay-nhat', 'mang-tien-ve-cho-me', 3),
        ('rap-viet-hay-nhat', 'ngu-mot-minh', 4),
        ('rap-viet-hay-nhat', 'tron-tim', 5),
        ('nhac-lai-xe', 'noi-nay-co-anh', 1),
        ('nhac-lai-xe', 'dua-nhau-di-tron', 2),
        ('nhac-lai-xe', 'bai-nay-chill-phet', 3),
        ('nhac-lai-xe', 'muon-roi-ma-sao-con', 4)
)
INSERT INTO playlist_tracks (playlist_id, song_id, position, added_by_user_id)
SELECT p.playlist_id, s.song_id, seed.position, p.user_id
FROM playlist_seed seed
JOIN playlists p ON p.slug = seed.playlist_slug
JOIN songs s ON s.slug = seed.song_slug
ON CONFLICT DO NOTHING;

COMMIT;
