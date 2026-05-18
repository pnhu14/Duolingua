-- V11: Correct V10 by assigning deterministic fallback covers by song slug.

UPDATE songs
SET cover_url = CASE slug
    WHEN 'tinh-dau-qua-chen' THEN 'https://picsum.photos/seed/tinh-dau-qua-chen-soft-pop/900/900'
    WHEN 'mang-tien-ve-cho-me' THEN 'https://picsum.photos/seed/mang-tien-ve-cho-me-road-home/900/900'
    WHEN 'uoc-gi' THEN 'https://picsum.photos/seed/uoc-gi-ballad-night/900/900'
    WHEN 'nguoi-hay-quen-em-di' THEN 'https://picsum.photos/seed/nguoi-hay-quen-em-di-city-lights/900/900'
    WHEN 'dung-hoi-em' THEN 'https://picsum.photos/seed/dung-hoi-em-piano-ballad/900/900'
    WHEN 'bua-yeu' THEN 'https://picsum.photos/seed/bua-yeu-bright-pop/900/900'
    WHEN 'mot-cu-lua' THEN 'https://picsum.photos/seed/mot-cu-lua-neon-pop/900/900'
    WHEN 'di-du-dua-di' THEN 'https://picsum.photos/seed/di-du-dua-di-dance-night/900/900'
    WHEN 'ngu-mot-minh' THEN 'https://picsum.photos/seed/ngu-mot-minh-late-night-rnb/900/900'
    WHEN 'tron-tim' THEN 'https://picsum.photos/seed/tron-tim-rap-night/900/900'
    WHEN 'de-mi-noi-cho-ma-nghe' THEN 'https://picsum.photos/seed/de-mi-noi-cho-ma-nghe-folk-stage/900/900'
    WHEN 'ke-cap-gap-ba-gia' THEN 'https://picsum.photos/seed/ke-cap-gap-ba-gia-folk-pop/900/900'
    WHEN 'la-lung' THEN 'https://picsum.photos/seed/la-lung-indie-evening/900/900'
    WHEN 'buoc-qua-nhau' THEN 'https://picsum.photos/seed/buoc-qua-nhau-rainy-street/900/900'
    WHEN 'dong-kiem-em' THEN 'https://picsum.photos/seed/dong-kiem-em-winter-indie/900/900'
    ELSE cover_url
END,
updated_at = CURRENT_TIMESTAMP
WHERE slug IN (
    'tinh-dau-qua-chen',
    'mang-tien-ve-cho-me',
    'uoc-gi',
    'nguoi-hay-quen-em-di',
    'dung-hoi-em',
    'bua-yeu',
    'mot-cu-lua',
    'di-du-dua-di',
    'ngu-mot-minh',
    'tron-tim',
    'de-mi-noi-cho-ma-nghe',
    'ke-cap-gap-ba-gia',
    'la-lung',
    'buoc-qua-nhau',
    'dong-kiem-em'
);
