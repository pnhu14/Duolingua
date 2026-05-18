UPDATE songs
SET cover_url = CASE slug
    WHEN 'tinh-dau-qua-chen' THEN 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg'
    WHEN 'mang-tien-ve-cho-me' THEN 'https://i.ytimg.com/vi/abc456/maxresdefault.jpg'
    WHEN 'uoc-gi' THEN 'https://i.ytimg.com/vi/abc789/maxresdefault.jpg'
    WHEN 'nguoi-hay-quen-em-di' THEN 'https://i.ytimg.com/vi/def123/maxresdefault.jpg'
    WHEN 'dung-hoi-em' THEN 'https://i.ytimg.com/vi/def456/maxresdefault.jpg'
    WHEN 'bua-yeu' THEN 'https://i.ytimg.com/vi/ghi123/maxresdefault.jpg'
    WHEN 'mot-cu-lua' THEN 'https://i.ytimg.com/vi/ghi456/maxresdefault.jpg'
    WHEN 'di-du-dua-di' THEN 'https://i.ytimg.com/vi/ghi789/maxresdefault.jpg'
    WHEN 'ngu-mot-minh' THEN 'https://i.ytimg.com/vi/jkl123/maxresdefault.jpg'
    WHEN 'tron-tim' THEN 'https://i.ytimg.com/vi/jkl456/maxresdefault.jpg'
    WHEN 'de-mi-noi-cho-ma-nghe' THEN 'https://i.ytimg.com/vi/mno123/maxresdefault.jpg'
    WHEN 'ke-cap-gap-ba-gia' THEN 'https://i.ytimg.com/vi/mno456/maxresdefault.jpg'
    WHEN 'la-lung' THEN 'https://i.ytimg.com/vi/pqr123/maxresdefault.jpg'
    WHEN 'buoc-qua-nhau' THEN 'https://i.ytimg.com/vi/pqr456/maxresdefault.jpg'
    WHEN 'dong-kiem-em' THEN 'https://i.ytimg.com/vi/pqr789/maxresdefault.jpg'
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
