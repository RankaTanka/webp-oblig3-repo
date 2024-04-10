package com.example.webpoblig3repo.controllers;

import com.example.webpoblig3repo.model.Purchase;
import com.example.webpoblig3repo.repository.PurchaseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class PurchaseController {

    // Makes PurchaseRepository callable by the name repository
    @Autowired
    PurchaseRepository repository;

    // saves a Purchase to registeredPurchases
    @PostMapping("/savePurchase")
    public void savePurchase(Purchase purchase) {

        repository.savePurchase(purchase);

    }

    // deletes all registered purchases
    @PostMapping("/deletePurchases")
    public void deletePurchases() {

        repository.deletePurchases();

    }

    // sends all registered purchases back to the view-side
    @GetMapping("/getPurchases")
    public List<Purchase> getPurchases() {

        return repository.getPurchases();

    }

}
