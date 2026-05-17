BEGIN;

DROP TABLE IF EXISTS user_roles CASCADE;

DROP INDEX IF EXISTS idx_user_roles_role_id;
DROP INDEX IF EXISTS idx_artists_verified;
DROP INDEX IF EXISTS idx_albums_type;
DROP INDEX IF EXISTS idx_songs_explicit;
DROP INDEX IF EXISTS idx_playlist_tracks_playlist_id;
DROP INDEX IF EXISTS idx_playlist_tracks_position;

COMMIT;
