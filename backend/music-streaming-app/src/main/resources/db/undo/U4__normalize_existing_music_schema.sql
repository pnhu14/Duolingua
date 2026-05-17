BEGIN;

ALTER TABLE playlists DROP CONSTRAINT IF EXISTS fk_playlists_cover_asset;
ALTER TABLE artists DROP CONSTRAINT IF EXISTS fk_artists_banner_asset;
ALTER TABLE artists DROP CONSTRAINT IF EXISTS fk_artists_image_asset;
ALTER TABLE albums DROP CONSTRAINT IF EXISTS fk_albums_cover_asset;
ALTER TABLE songs DROP CONSTRAINT IF EXISTS fk_songs_cover_asset;
ALTER TABLE songs DROP CONSTRAINT IF EXISTS fk_songs_audio_asset;

ALTER TABLE playlists DROP COLUMN IF EXISTS cover_asset_id;
ALTER TABLE artists DROP COLUMN IF EXISTS banner_asset_id;
ALTER TABLE artists DROP COLUMN IF EXISTS image_asset_id;
ALTER TABLE albums DROP COLUMN IF EXISTS cover_asset_id;
ALTER TABLE songs DROP COLUMN IF EXISTS cover_asset_id;
ALTER TABLE songs DROP COLUMN IF EXISTS audio_asset_id;

DROP TABLE IF EXISTS media_assets CASCADE;

ALTER TABLE users DROP CONSTRAINT IF EXISTS ck_users_status;
ALTER TABLE users
    ADD CONSTRAINT ck_users_status
    CHECK (status IN ('ACTIVE', 'DISABLED', 'PENDING'));

ALTER TABLE artists DROP CONSTRAINT IF EXISTS ck_artists_status;
ALTER TABLE artists
    ADD CONSTRAINT ck_artists_status
    CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED'));

ALTER TABLE albums DROP CONSTRAINT IF EXISTS ck_albums_type;
ALTER TABLE albums
    ADD CONSTRAINT ck_albums_type
    CHECK (album_type IN ('ALBUM', 'EP', 'SINGLE', 'COMPILATION'));

ALTER TABLE albums DROP CONSTRAINT IF EXISTS ck_albums_status;
ALTER TABLE albums
    ADD CONSTRAINT ck_albums_status
    CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));

ALTER TABLE songs DROP CONSTRAINT IF EXISTS ck_songs_status;
ALTER TABLE songs
    ADD CONSTRAINT ck_songs_status
    CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));

ALTER TABLE songs DROP CONSTRAINT IF EXISTS ck_songs_duration_positive;
ALTER TABLE songs
    ADD CONSTRAINT ck_songs_duration
    CHECK (duration_seconds > 0);

ALTER TABLE song_artists DROP CONSTRAINT IF EXISTS ck_song_artists_role;
ALTER TABLE song_artists
    ADD CONSTRAINT ck_song_artists_role
    CHECK (role IN ('MAIN', 'FEATURED', 'PRODUCER'));

ALTER TABLE play_history DROP CONSTRAINT IF EXISTS ck_play_history_source;
ALTER TABLE play_history
    ADD CONSTRAINT ck_play_history_source
    CHECK (source IN ('DIRECT', 'PLAYLIST', 'SEARCH', 'RECOMMENDATION', 'RADIO'));

ALTER TABLE playlist_tracks DROP CONSTRAINT IF EXISTS ck_playlist_tracks_position;

COMMIT;
