package com.example.webpoblig3repo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class MovieController {

    // send a list of movies to view
    @GetMapping("/getMovies")
    public List<String> getMovies() {

        List<String> movieList = new ArrayList<>();

        String movie1 = "Shrek";
        String movie2 = "Shrek 2";
        String movie3 = "Shrek the Third";
        String movie4 = "Shrek Forever After";

        movieList.add(movie1);
        movieList.add(movie2);
        movieList.add(movie3);
        movieList.add(movie4);

        return movieList;

    }

}
