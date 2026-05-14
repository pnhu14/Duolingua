DELETE FROM playlist_songs
WHERE playlist_song_id BETWEEN 1 AND 37;

DELETE FROM playlists
WHERE playlist_id BETWEEN 1 AND 7;

DELETE FROM users
WHERE user_id BETWEEN 1 AND 4;

DELETE FROM songs
WHERE song_id BETWEEN 1 AND 25;

DELETE FROM artists
WHERE artist_id BETWEEN 1 AND 8;
