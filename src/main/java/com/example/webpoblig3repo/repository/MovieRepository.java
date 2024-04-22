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


    // Returns a list of all movies to the controller
    public List<String> getMovies() {

        String sql = "SELECT * FROM Movies";

        // try catch in case an error happens
        try {

            return database.queryForList(sql, String.class);

        }
        catch(Exception e) {

            logger.error("Error in getMovies: " + e);

            return null;

        }

    }
}
