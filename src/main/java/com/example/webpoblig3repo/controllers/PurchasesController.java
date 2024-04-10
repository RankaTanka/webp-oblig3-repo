package com.example.webpoblig3repo.controllers;

import com.example.webpoblig3repo.model.Purchase;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class PurchasesController {
    // A list over registered purchases
    List<Purchase> registeredPurchases = new ArrayList<>();

    // saves a Purchase to registeredPurchases
    @PostMapping("/savePurchase")
    public void savePurchase(Purchase purchase) {

        registeredPurchases.add(purchase);

    }

    // deletes all registered purchases
    @PostMapping("/deletePurchases")
    public void deletePurchases() {

        registeredPurchases.clear();

    }

    // sends all registered purchases back to the client-side
    @GetMapping("/getPurchases")
    public List<Purchase> getPurchases() {

        return registeredPurchases;

    }

}
