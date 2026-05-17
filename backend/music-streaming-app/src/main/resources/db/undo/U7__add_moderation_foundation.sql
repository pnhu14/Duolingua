BEGIN;

DROP TABLE IF EXISTS moderation_actions CASCADE;
DROP TABLE IF EXISTS reports CASCADE;

ALTER TABLE songs DROP CONSTRAINT IF EXISTS fk_songs_submitted_by_user;
ALTER TABLE albums DROP CONSTRAINT IF EXISTS fk_albums_submitted_by_user;

ALTER TABLE songs DROP CONSTRAINT IF EXISTS ck_songs_moderation_status;
ALTER TABLE albums DROP CONSTRAINT IF EXISTS ck_albums_moderation_status;
ALTER TABLE artists DROP CONSTRAINT IF EXISTS ck_artists_moderation_status;
ALTER TABLE playlists DROP CONSTRAINT IF EXISTS ck_playlists_moderation_status;

ALTER TABLE songs DROP COLUMN IF EXISTS submitted_by_user_id;
ALTER TABLE songs DROP COLUMN IF EXISTS moderation_status;
ALTER TABLE songs DROP COLUMN IF EXISTS published_at;
ALTER TABLE songs DROP COLUMN IF EXISTS deleted_at;

ALTER TABLE albums DROP COLUMN IF EXISTS submitted_by_user_id;
ALTER TABLE albums DROP COLUMN IF EXISTS moderation_status;
ALTER TABLE albums DROP COLUMN IF EXISTS published_at;
ALTER TABLE albums DROP COLUMN IF EXISTS deleted_at;

ALTER TABLE artists DROP COLUMN IF EXISTS moderation_status;
ALTER TABLE artists DROP COLUMN IF EXISTS deleted_at;

ALTER TABLE playlists DROP COLUMN IF EXISTS moderation_status;
ALTER TABLE playlists DROP COLUMN IF EXISTS deleted_at;

ALTER TABLE users DROP COLUMN IF EXISTS suspended_until;
ALTER TABLE users DROP COLUMN IF EXISTS deleted_at;

ALTER TABLE users DROP CONSTRAINT IF EXISTS ck_users_status;
ALTER TABLE users
    ADD CONSTRAINT ck_users_status
    CHECK (status IN ('ACTIVE', 'DISABLED', 'PENDING', 'DELETED'));

ALTER TABLE songs DROP CONSTRAINT IF EXISTS ck_songs_status;
ALTER TABLE songs
    ADD CONSTRAINT ck_songs_status
    CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));

ALTER TABLE albums DROP CONSTRAINT IF EXISTS ck_albums_status;
ALTER TABLE albums
    ADD CONSTRAINT ck_albums_status
    CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));

ALTER TABLE artists DROP CONSTRAINT IF EXISTS ck_artists_status;
ALTER TABLE artists
    ADD CONSTRAINT ck_artists_status
    CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED', 'DELETED'));

ALTER TABLE playlists DROP CONSTRAINT IF EXISTS ck_playlists_status;
ALTER TABLE playlists
    ADD CONSTRAINT ck_playlists_status
    CHECK (status IN ('ACTIVE', 'ARCHIVED', 'DELETED'));

COMMIT;
