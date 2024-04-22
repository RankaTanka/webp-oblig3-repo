package com.example.webpoblig3repo.repository;

import com.example.webpoblig3repo.model.Purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.List;


// repository for the Purchases table
@Repository
public class PurchaseRepository {

    // A JdbcTemplate object named database
    @Autowired
    private JdbcTemplate database;

    // A Logger that reports whenever an error happens
    private final Logger logger = LoggerFactory.getLogger(PurchaseRepository.class);


    // Saves inserts information from a Purchase object into the Purchases database
    public boolean savePurchase(Purchase purchase) {

        String sql = "INSERT INTO Purchases (movie, ticketAmount, firstName, lastName, phoneNumber, mail) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        // try catch in case an error happens
        try {

            database.update(sql, purchase.getMovie(), purchase.getTicketAmount(), purchase.getFirstName(),
                    purchase.getLastName(), purchase.getPhoneNumber(), purchase.getMail());

            return true;

        }
        catch(Exception e) {

            logger.error("Error in savePurchase: " + e);

            return false;

        }

    }


    // returns a list of all rows in the Purchases database as Purchase objects sorted by lastName
    public List<Purchase> getAllPurchases() {

        String sql = "SELECT * FROM Purchases ORDER BY lastName";

        // try catch in case an error happens
        try {

            return database.query(sql, new BeanPropertyRowMapper<>(Purchase.class));

        }
        catch(Exception e) {

            logger.error("Error in getAllPurchases: " + e);

            return null;

        }

    }


    // retrieves a selected Purchase
    public Purchase getPurchase(Long id) {

        String sql = "SELECT * FROM Purchases WHERE id = ?";

        // try catch in case an error happens
        try {

            return database.queryForObject(sql, Purchase.class, id);

        }
        catch (Exception e) {

            logger.error("Error in getPurchase: ");

            return null;

        }
    }


    // deletes all Purchases from the Purchases database
    public boolean deleteAllPurchases() {

        String sql = "DELETE FROM Purchases";

        // try catch in case an error happens
        try {

            database.update(sql);

            return true;

        }
        catch(Exception e) {

            logger.error("Error in deleteAllPurchases: " + e);

            return false;

        }

    }


    // deletes a Purchase from the Purchases database
    public boolean deletePurchase(Long id) {

        String sql = "DELETE FROM Purchases WHERE id = ?";

        // try catch in case an error happens
        try {

            database.update(sql, id);

            return true;

        }
        catch (Exception e) {

            logger.error("Error in deletePurchase: " + e);

            return false;

        }

    }

    // Updates a selected Purchase in the Purchases database
    public boolean updatePurchase(Purchase purchase) {

        String sql = "UPDATE Purchases SET movie=?, ticketAmount=?, firstName=?, lastName=?, phoneNumber=?, mail=? WHERE id=?";

        // try catch in case an error happens
        try {

            database.update(sql, purchase.getMovie(), purchase.getTicketAmount(), purchase.getFirstName(),
                    purchase.getLastName(), purchase.getPhoneNumber(), purchase.getMail(), purchase.getId());

            return true;

        }
        catch (Exception e) {

            logger.error("Error in updatePurchase: " + e);

            return false;

        }

    }

}
