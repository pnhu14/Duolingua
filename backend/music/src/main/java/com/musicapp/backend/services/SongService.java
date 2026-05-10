package com.musicapp.backend.services;

import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.model.Artist;
import com.musicapp.backend.model.Song;
import com.musicapp.backend.repository.ArtistRepository;
import com.musicapp.backend.repository.SongRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SongService {
    //@Autowired
    private SongRepository songRepository;
    private ArtistRepository artistRepository;

    public List<SongDto> findSongByTitle(String title) {
        List<Song> songs;
        if (title == null) {
            songs = songRepository.findAll();
        } else {
            songs = songRepository.findSongByTitle(title);
        }

        List<SongDto> songDtos = new ArrayList<>();
        for(Song song : songs) {
            SongDto songDto = new SongDto();
            songDto.setId(song.getId());
            songDto.setTitle(song.getTitle());
            Optional<Artist> artist = artistRepository.findById(song.getArtistId());
            artist.ifPresent(songDto::setArtist);
            songDtos.add(songDto);
        }
        return songDtos;
    }
}

