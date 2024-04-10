package com.example.webpoblig3repo.controllers;

import com.example.webpoblig3repo.repository.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MovieController {

    // Makes MovieRepository callable by the name repository
    @Autowired
    MovieRepository repository;

    // send a list of movies to the view side
    @GetMapping("/getMovies")
    public List<String> getMovies() {

        return repository.sendMovies();

    }

}
