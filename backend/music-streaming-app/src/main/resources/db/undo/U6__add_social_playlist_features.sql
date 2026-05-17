BEGIN;

DROP TABLE IF EXISTS user_followed_users CASCADE;
DROP TABLE IF EXISTS playlist_saves CASCADE;
DROP TABLE IF EXISTS playlist_collaborators CASCADE;

ALTER TABLE playlists DROP CONSTRAINT IF EXISTS uk_playlists_user_slug;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uk_playlists_slug'
    ) THEN
        ALTER TABLE playlists
            ADD CONSTRAINT uk_playlists_slug UNIQUE (slug);
    END IF;
END $$;

COMMIT;
