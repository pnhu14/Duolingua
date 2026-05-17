-- V6: Add social follows, playlist collaboration, and playlist saves.

BEGIN;

ALTER TABLE playlists DROP CONSTRAINT IF EXISTS uk_playlists_slug;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uk_playlists_user_slug'
    ) THEN
        ALTER TABLE playlists
            ADD CONSTRAINT uk_playlists_user_slug UNIQUE (user_id, slug);
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS playlist_collaborators (
    playlist_id UUID NOT NULL,
    user_id UUID NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'EDITOR',
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    invited_by_user_id UUID,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (playlist_id, user_id),
    CONSTRAINT fk_playlist_collaborators_playlist
        FOREIGN KEY (playlist_id)
        REFERENCES playlists (playlist_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_playlist_collaborators_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_playlist_collaborators_invited_by_user
        FOREIGN KEY (invited_by_user_id)
        REFERENCES users (user_id)
        ON DELETE SET NULL,
    CONSTRAINT ck_playlist_collaborators_role CHECK (role IN ('EDITOR', 'VIEWER')),
    CONSTRAINT ck_playlist_collaborators_status CHECK (status IN ('INVITED', 'ACTIVE', 'REMOVED'))
);

CREATE TABLE IF NOT EXISTS playlist_saves (
    user_id UUID NOT NULL,
    playlist_id UUID NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, playlist_id),
    CONSTRAINT fk_playlist_saves_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_playlist_saves_playlist
        FOREIGN KEY (playlist_id)
        REFERENCES playlists (playlist_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_followed_users (
    follower_user_id UUID NOT NULL,
    followed_user_id UUID NOT NULL,
    followed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_user_id, followed_user_id),
    CONSTRAINT fk_user_followed_users_follower
        FOREIGN KEY (follower_user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_followed_users_followed
        FOREIGN KEY (followed_user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT ck_user_followed_users_not_self CHECK (follower_user_id <> followed_user_id)
);

CREATE INDEX IF NOT EXISTS idx_playlists_user_slug ON playlists (user_id, slug);
CREATE INDEX IF NOT EXISTS idx_playlist_collaborators_user_id ON playlist_collaborators (user_id);
CREATE INDEX IF NOT EXISTS idx_playlist_collaborators_status ON playlist_collaborators (status);
CREATE INDEX IF NOT EXISTS idx_playlist_saves_playlist_id ON playlist_saves (playlist_id);
CREATE INDEX IF NOT EXISTS idx_playlist_saves_saved_at ON playlist_saves (saved_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_followed_users_followed_user_id ON user_followed_users (followed_user_id);
CREATE INDEX IF NOT EXISTS idx_user_followed_users_followed_at ON user_followed_users (followed_at DESC);

COMMIT;
