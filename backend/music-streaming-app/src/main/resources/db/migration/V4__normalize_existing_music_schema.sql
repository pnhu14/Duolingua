-- V4: Normalize the existing music schema before community features are added.
-- Keep BIGINT ids for roles/genres to match the current JPA entities and V1 schema.

BEGIN;

DROP TABLE IF EXISTS playlist_songs CASCADE;

ALTER TABLE users DROP CONSTRAINT IF EXISTS ck_users_status;
ALTER TABLE users
    ADD CONSTRAINT ck_users_status
    CHECK (status IN ('ACTIVE', 'DISABLED', 'PENDING', 'DELETED'));

ALTER TABLE artists DROP CONSTRAINT IF EXISTS ck_artists_status;
ALTER TABLE artists
    ADD CONSTRAINT ck_artists_status
    CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED', 'DELETED'));

ALTER TABLE albums DROP CONSTRAINT IF EXISTS ck_albums_type;
ALTER TABLE albums
    ADD CONSTRAINT ck_albums_type
    CHECK (album_type IN ('SINGLE', 'EP', 'ALBUM', 'COMPILATION'));

ALTER TABLE albums DROP CONSTRAINT IF EXISTS ck_albums_status;
ALTER TABLE albums
    ADD CONSTRAINT ck_albums_status
    CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));

ALTER TABLE songs DROP CONSTRAINT IF EXISTS ck_songs_status;
ALTER TABLE songs
    ADD CONSTRAINT ck_songs_status
    CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));

ALTER TABLE songs DROP CONSTRAINT IF EXISTS ck_songs_duration;
ALTER TABLE songs DROP CONSTRAINT IF EXISTS ck_songs_duration_positive;
ALTER TABLE songs
    ADD CONSTRAINT ck_songs_duration_positive
    CHECK (duration_seconds > 0);

ALTER TABLE song_artists DROP CONSTRAINT IF EXISTS ck_song_artists_role;
ALTER TABLE song_artists
    ADD CONSTRAINT ck_song_artists_role
    CHECK (role IN ('MAIN', 'FEATURED', 'PRODUCER', 'COMPOSER', 'LYRICIST'));

ALTER TABLE play_history DROP CONSTRAINT IF EXISTS ck_play_history_source;
ALTER TABLE play_history
    ADD CONSTRAINT ck_play_history_source
    CHECK (source IN ('DIRECT', 'SEARCH', 'PLAYLIST', 'HOME', 'RECOMMENDATION', 'RADIO'));

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'ck_playlist_tracks_position'
    ) THEN
        ALTER TABLE playlist_tracks
            ADD CONSTRAINT ck_playlist_tracks_position CHECK (position > 0);
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS media_assets (
    media_asset_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID,
    uploaded_by_user_id UUID,
    asset_type VARCHAR(32) NOT NULL,
    storage_provider VARCHAR(64) NOT NULL DEFAULT 'EXTERNAL_URL',
    storage_key VARCHAR(512),
    public_url VARCHAR(1024) NOT NULL,
    mime_type VARCHAR(120),
    file_size_bytes BIGINT,
    checksum VARCHAR(128),
    duration_seconds INTEGER,
    width INTEGER,
    height INTEGER,
    status VARCHAR(32) NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_media_assets_owner_user
        FOREIGN KEY (owner_user_id)
        REFERENCES users (user_id)
        ON DELETE SET NULL,
    CONSTRAINT fk_media_assets_uploaded_by_user
        FOREIGN KEY (uploaded_by_user_id)
        REFERENCES users (user_id)
        ON DELETE SET NULL,
    CONSTRAINT ck_media_assets_type
        CHECK (asset_type IN ('AUDIO', 'IMAGE', 'VIDEO', 'LYRICS', 'OTHER')),
    CONSTRAINT ck_media_assets_status
        CHECK (status IN ('PROCESSING', 'AVAILABLE', 'FAILED', 'DELETED')),
    CONSTRAINT ck_media_assets_file_size
        CHECK (file_size_bytes IS NULL OR file_size_bytes >= 0),
    CONSTRAINT ck_media_assets_duration
        CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
    CONSTRAINT ck_media_assets_width
        CHECK (width IS NULL OR width > 0),
    CONSTRAINT ck_media_assets_height
        CHECK (height IS NULL OR height > 0)
);

CREATE INDEX IF NOT EXISTS idx_media_assets_owner_user_id ON media_assets (owner_user_id);
CREATE INDEX IF NOT EXISTS idx_media_assets_uploaded_by_user_id ON media_assets (uploaded_by_user_id);
CREATE INDEX IF NOT EXISTS idx_media_assets_asset_type ON media_assets (asset_type);
CREATE INDEX IF NOT EXISTS idx_media_assets_status ON media_assets (status);
CREATE INDEX IF NOT EXISTS idx_media_assets_created_at ON media_assets (created_at DESC);

ALTER TABLE songs ADD COLUMN IF NOT EXISTS audio_asset_id UUID;
ALTER TABLE songs ADD COLUMN IF NOT EXISTS cover_asset_id UUID;
ALTER TABLE albums ADD COLUMN IF NOT EXISTS cover_asset_id UUID;
ALTER TABLE artists ADD COLUMN IF NOT EXISTS image_asset_id UUID;
ALTER TABLE artists ADD COLUMN IF NOT EXISTS banner_asset_id UUID;
ALTER TABLE playlists ADD COLUMN IF NOT EXISTS cover_asset_id UUID;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_songs_audio_asset') THEN
        ALTER TABLE songs
            ADD CONSTRAINT fk_songs_audio_asset
            FOREIGN KEY (audio_asset_id)
            REFERENCES media_assets (media_asset_id)
            ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_songs_cover_asset') THEN
        ALTER TABLE songs
            ADD CONSTRAINT fk_songs_cover_asset
            FOREIGN KEY (cover_asset_id)
            REFERENCES media_assets (media_asset_id)
            ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_albums_cover_asset') THEN
        ALTER TABLE albums
            ADD CONSTRAINT fk_albums_cover_asset
            FOREIGN KEY (cover_asset_id)
            REFERENCES media_assets (media_asset_id)
            ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_artists_image_asset') THEN
        ALTER TABLE artists
            ADD CONSTRAINT fk_artists_image_asset
            FOREIGN KEY (image_asset_id)
            REFERENCES media_assets (media_asset_id)
            ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_artists_banner_asset') THEN
        ALTER TABLE artists
            ADD CONSTRAINT fk_artists_banner_asset
            FOREIGN KEY (banner_asset_id)
            REFERENCES media_assets (media_asset_id)
            ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_playlists_cover_asset') THEN
        ALTER TABLE playlists
            ADD CONSTRAINT fk_playlists_cover_asset
            FOREIGN KEY (cover_asset_id)
            REFERENCES media_assets (media_asset_id)
            ON DELETE SET NULL;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_songs_audio_asset_id ON songs (audio_asset_id);
CREATE INDEX IF NOT EXISTS idx_songs_cover_asset_id ON songs (cover_asset_id);
CREATE INDEX IF NOT EXISTS idx_albums_cover_asset_id ON albums (cover_asset_id);
CREATE INDEX IF NOT EXISTS idx_artists_image_asset_id ON artists (image_asset_id);
CREATE INDEX IF NOT EXISTS idx_artists_banner_asset_id ON artists (banner_asset_id);
CREATE INDEX IF NOT EXISTS idx_playlists_cover_asset_id ON playlists (cover_asset_id);

COMMIT;
