BEGIN;

WITH playlist_seed(playlist_slug, song_slug, position) AS (
    VALUES
        ('top-hits-viet-nam', 'bai-nay-chill-phet', 4),
        ('top-hits-viet-nam', 'di-du-dua-di', 5),
        ('nhac-chill-buoi-toi', 'bai-nay-chill-phet', 3),
        ('nhac-chill-buoi-toi', 'noi-nay-co-anh', 4),
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
DELETE FROM playlist_tracks pt
USING playlist_seed seed, playlists p, songs s
WHERE p.slug = seed.playlist_slug
  AND s.slug = seed.song_slug
  AND pt.playlist_id = p.playlist_id
  AND pt.song_id = s.song_id
  AND pt.position = seed.position;

DELETE FROM song_genres sg
USING songs s, genres g
WHERE sg.song_id = s.song_id
  AND sg.genre_id = g.genre_id
  AND s.slug IN (
      'lac-troi',
      'chung-ta-cua-hien-tai',
      'hay-trao-cho-anh',
      'noi-nay-co-anh',
      'muon-roi-ma-sao-con',
      'roi-bo',
      'khong-the-cung-nhau-suot-kiep',
      'tinh-dau-qua-chen',
      'anh-dang-o-dau-day-anh',
      'bua-yeu',
      'mot-cu-lua',
      'di-du-dua-di',
      'bai-nay-chill-phet',
      'dua-nhau-di-tron',
      'mang-tien-ve-cho-me',
      'uoc-gi',
      'nguoi-hay-quen-em-di',
      'dung-hoi-em',
      'ngu-mot-minh',
      'tron-tim',
      'de-mi-noi-cho-ma-nghe',
      'ke-cap-gap-ba-gia',
      'la-lung',
      'buoc-qua-nhau',
      'dong-kiem-em'
  )
  AND g.slug IN (
      'v-pop',
      'pop-ballad',
      'rap-viet',
      'indie-viet',
      'dance-pop',
      'folk-pop',
      'rnb-viet'
  );

DELETE FROM genres
WHERE slug IN (
    'v-pop',
    'pop-ballad',
    'rap-viet',
    'indie-viet',
    'dance-pop',
    'folk-pop',
    'rnb-viet'
)
AND NOT EXISTS (
    SELECT 1
    FROM song_genres sg
    WHERE sg.genre_id = genres.genre_id
);

DELETE FROM song_artists sa
USING songs s, artists a
WHERE sa.song_id = s.song_id
  AND sa.artist_id = a.artist_id
  AND sa.role = 'MAIN'
  AND s.slug IN (
      'noi-nay-co-anh',
      'muon-roi-ma-sao-con',
      'roi-bo',
      'khong-the-cung-nhau-suot-kiep',
      'tinh-dau-qua-chen',
      'anh-dang-o-dau-day-anh',
      'bua-yeu',
      'mot-cu-lua',
      'di-du-dua-di',
      'bai-nay-chill-phet',
      'dua-nhau-di-tron',
      'mang-tien-ve-cho-me',
      'uoc-gi',
      'nguoi-hay-quen-em-di',
      'dung-hoi-em',
      'ngu-mot-minh',
      'tron-tim',
      'de-mi-noi-cho-ma-nghe',
      'ke-cap-gap-ba-gia',
      'la-lung',
      'buoc-qua-nhau',
      'dong-kiem-em'
  )
  AND a.slug IN (
      'son-tung-mtp',
      'hoa-minzy',
      'den-vau',
      'my-tam',
      'bich-phuong',
      'hieuthuhai',
      'hoang-thuy-linh',
      'vu'
  );

UPDATE artists
SET country = NULL,
    verified = FALSE,
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

COMMIT;
