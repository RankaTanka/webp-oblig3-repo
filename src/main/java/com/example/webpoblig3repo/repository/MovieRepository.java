package com.example.webpoblig3repo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;


// repository for the Movies table
@Repository
public class MovieRepository {

    // A JdbcTemplate object named database
    @Autowired
    private JdbcTemplate database;

    // Returns a list of all movies to the controller
    public List<String> sendMovies() {

        String sql = "SELECT * FROM Movies";

        return database.queryForList(sql, String.class);

    }
}
