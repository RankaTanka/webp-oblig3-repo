package com.example.webpoblig3repo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


// repository for the Movies table
@Repository
public class MovieRepository {

    // A JdbcTemplate object named database
    @Autowired
    private JdbcTemplate database;

    // A Logger that reports whenever an error happens
    private final Logger logger = LoggerFactory.getLogger(MovieRepository.class);


    // Returns a list of all movies to the controller for page initialization
    public List<String> getMoviesForInit() {

        String sql = "SELECT * FROM Movies";

        // try catch in case an error occurs
        try {

            return database.queryForList(sql, String.class);

        }
        catch(Exception e) {

            logger.error("Error in getMoviesForInit: " + e);

            return null;

        }

    }

    // retrieves a list of movies not containing the selected movie assigned to the Purchase being edited
    public List<String> getMoviesForEditor(Long id) {

        String sql = "SELECT DISTINCT Movies.movie FROM Movies LEFT OUTER JOIN Purchases " +
                "ON Purchases.movie = Movies.movie WHERE id <> ? OR id IS NULL";

        // try catch in case an error occurs
        try {

            return database.queryForList(sql, String.class, id);

        }
        catch (Exception e) {

            logger.error("Error in getMoviesForEditor: " + e);

            return null;

        }

    }

}
