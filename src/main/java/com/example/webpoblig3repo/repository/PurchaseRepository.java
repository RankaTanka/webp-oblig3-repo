package com.example.webpoblig3repo.repository;

import com.example.webpoblig3repo.model.Purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;


// repository for the Purchases table
@Repository
public class PurchaseRepository {

    // A JdbcTemplate object named database
    @Autowired
    private JdbcTemplate database;

    // Saves inserts information from a Purchase object into the Purchases database
    public void savePurchase(Purchase purchase) {

        String sql = "INSERT INTO Purchases (movie, ticketAmount, firstName, lastName, phoneNumber, mail) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        database.update(sql, purchase.getMovie(), purchase.getTicketAmount(), purchase.getFirstName(),
                purchase.getLastName(), purchase.getPhoneNumber(), purchase.getMail());

    }

    // returns a list of all rows in the Purchases database as Purchase objects sorted by lastName
    public List<Purchase> getPurchases() {

        String sql = "SELECT * FROM Purchases ORDER BY lastName";

        return database.query(sql, new BeanPropertyRowMapper<>(Purchase.class));

    }

    // deletes all purchases from the Purchases database
    public void deletePurchases() {

        String sql = "DELETE FROM Purchases";

        database.update(sql);

    }

    // deletes all purchases from the Purchases database
    public void deletePurchase(Long id) {

        String sql = "DELETE FROM Purchases WHERE id = ?";

        database.update(sql, id);

    }

}
