package com.example.webpoblig3repo.controller;

import com.example.webpoblig3repo.repository.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;


@RestController
public class MovieController {

    // Makes MovieRepository callable by the name repository
    @Autowired
    MovieRepository repository;


    // send a list of movies to the view side
    @GetMapping("/getMoviesForInit")
    public List<String> getMoviesForInit(HttpServletResponse response) throws IOException {

        List<String> movieList = repository.getMoviesForInit();

        // In case an error has happened
        if (movieList == null) {

            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Something went wrong with the Movies DB - try refreshing the page");

        }

        return movieList;

    }

    // retrieves a list of movies not containing the selected movie assigned to the Purchase being edited
    @GetMapping("/getMoviesForEditor")
    public List<String> getMoviesForEditor(Long id, HttpServletResponse response) throws IOException {

        List<String> movieList = repository.getMoviesForEditor(id);

        // In case an error has happened
        if (movieList == null) {

            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Something went wrong with the Movies DB - try again later");

        }

        return movieList;
    }
}
