package com.example.webpoblig3repo.controller;

import com.example.webpoblig3repo.model.Purchase;
import com.example.webpoblig3repo.repository.PurchaseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;


@RestController
public class PurchaseController {

    // Makes PurchaseRepository callable by the name repository
    @Autowired
    PurchaseRepository repository;


    // saves a Purchase to registeredPurchases
    @PostMapping("/savePurchase")
    public void savePurchase(Purchase purchase, HttpServletResponse response) throws IOException {

        // If an error occurs the contents of this statement activates.
        if (!repository.savePurchase(purchase)) {

            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Something went wrong with the Purchases DB - try again later");

        }

    }


    // sends all registered purchases back to the view-side
    @GetMapping("/getAllPurchases")
    public List<Purchase> getAllPurchases(HttpServletResponse response) throws IOException {

        List<Purchase> purchaseList = repository.getAllPurchases();

        // In case an error has occurred
        if (purchaseList == null) {

            response.sendError(HttpStatus.INSUFFICIENT_STORAGE.value(),
                    "Something went wrong with the Purchases DB - try again later");

        }

        return purchaseList;

    }


    // deletes all registered purchases
    @DeleteMapping("/deleteAllPurchases")
    public void deleteAllPurchases(HttpServletResponse response) throws IOException {

        // If an error occurs the contents of this statement activates.
        if (!repository.deleteAllPurchases()) {

            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Something went wrong with the Purchases DB - try again later");

        }

    }

    // deletes selected purchase
    @DeleteMapping("/deletePurchase")
    public void deletePurchase(Long id, HttpServletResponse response) throws IOException {

        // If an error occurs the contents of this statement activates.
        if (!repository.deletePurchase(id)) {

            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Something went wrong with the Purchases DB - try again later");

        }

    }

    // updates selected purchase
    @PutMapping("/updatePurchase")
    public void updatePurchase(Purchase purchase, HttpServletResponse response) throws IOException {

        // If an error occurs the contents of this statement activates.
        if (!repository.updatePurchase(purchase)) {

            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Something went wrong with the Purchases DB - try again later");

        }

    }

}
