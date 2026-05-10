package com.musicapp.backend.controller;

import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.model.Song;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.musicapp.backend.services.SongService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class SongController {
    //@Autowired
    private SongService songService;

    @GetMapping("/search")
    public List<SongDto> findSongByTitle(@RequestParam(name = "title", required = false) String title) {
        return songService.findSongByTitle(title);
    }

}
