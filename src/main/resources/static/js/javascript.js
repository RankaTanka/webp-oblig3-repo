// javascript for all functions used in index.html


/* PAGE INITIALIZATION FUNCTION IS BELOW */

// When the page is loaded the select list and all purchases are written
$(function() {
    getMovies();
    writePurchases();
});

// Look below at the getMovies() and writePurchases() functions for more details about the functions



/* INPUT VALIDATION FUNCTION IS BELOW */

// function that validates the ticket-amount input field and returns a boolean value
function ticketAmountValidation() {

    const ticketAmountInput = $("#ticket-amount");

    // boolean validation check, if valid it's set to false
    let ticketAmountValidation = document.getElementById("ticket-amount").validity.rangeUnderflow;

    // Checking if the Tickets input value is valid,
    // if not ticketValidation is set to true and a message is shown
    if (ticketAmountInput.val() === "" || Math.round(Number(ticketAmountInput.val())) !== Number(ticketAmountInput.val()) ||
        ticketAmountValidation === true) {

        ticketAmountValidation = true;

        ticketAmountInput.val(1);
        $("#invalid-ticket-amount").show();
    }
    // Every time the input is valid the message gets removed
    else {
        $("#invalid-ticket-amount").hide();
    }


    return ticketAmountValidation;

}

// function that validates the first-name input field and returns a boolean value
function firstNameValidation() {

    const firstNameInput = $("#first-name");

    // boolean validation check, if valid it's set to false
    let firstNameValidation = document.getElementById("first-name").validity.patternMismatch;

    // Checking if the First name input value is valid,
    // if not firstNameValidation is forcefully set to true and a message is shown
    if (firstNameInput.val() === "" || firstNameValidation === true) {

        firstNameValidation = true;

        firstNameInput.val(null);
        $("#invalid-first-name").show();

    }
    else {
        $("#invalid-first-name").hide();
    }


    return firstNameValidation;

}

// function that validates the last-name input field and returns a boolean value
function lastNameValidation() {

    const lastNameInput = $("#last-name");

    // boolean validation check, if valid it's set to false
    let lastNameValidation = document.getElementById("last-name").validity.patternMismatch;

    // Checking if the Last name input value is valid,
    // if not lastNameValidation is forcefully set to true and a message is shown
    if (lastNameInput.val() === "" || lastNameValidation === true) {

        lastNameValidation = true;

        lastNameInput.val(null);
        $("#invalid-last-name").show();

    }
    else {
        $("#invalid-last-name").hide();
    }


    return lastNameValidation;

}

// function that validates the phone-number input field and returns a boolean value
function phoneNumberValidation() {

    const phoneNumberInput = $("#phone-number");

    // boolean validation check, if valid it's set to false
    let phoneNumberValidation = document.getElementById("phone-number").validity.patternMismatch;

    // Checking if the Phone number input value is valid,
    // if not phoneNumberValidation is forcefully set to true and a message is shown
    if (phoneNumberInput.val() === "" || phoneNumberValidation === true) {

        phoneNumberValidation = true;

        phoneNumberInput.val(null);
        $("#invalid-phone-number").show();

    }
    else {
        $("#invalid-phone-number").hide();
    }


    return phoneNumberValidation;

}

// function that validates the mail input field and returns a boolean value
function mailValidation() {

    const mailInput = $("#mail");

    // boolean validation check, if valid it's set to false
    // (I wanted to just use typeMismatch to validate the Mail input, but it accepted values like "bob@gmail")
    let mailValidation = document.getElementById("mail").validity.patternMismatch;

    // Checking if the Mail input value is valid,
    // if not mailValidation is forcefully set to true and a message is shown
    if (mailInput.val() === "" || mailValidation === true) {

        mailValidation = true;

        mailInput.val(null);
        $("#invalid-mail").show();
    }
    else {
        $("#invalid-mail").hide();
    }


    return mailValidation;

}
/*
// Function that retrieves information, then writes it into the Registered purchases table
function inputValidation() {

    // JQuery document objects
    const ticketInput = $("#tickets");
    const firstNameInput = $("#first-name");
    const lastNameInput = $("#last-name");
    const phoneNumberInput = $("#phone-number");
    const mailInput = $("#mail");


    // A bunch of boolean validation checks, if one is true it is invalid and if one is false it is valid
    let ticketValidation = document.getElementById("tickets").validity.rangeUnderflow;
    let firstNameValidation = document.getElementById("first-name").validity.patternMismatch;
    let lastNameValidation = document.getElementById("last-name").validity.patternMismatch;
    let phoneNumberValidation = document.getElementById("phone-number").validity.patternMismatch;
    // I wanted to just use typeMismatch to validate the Mail input, but it accepted values like "bob@gmail"
    let mailValidation = document.getElementById("mail").validity.patternMismatch;


    // Checking if the Tickets input value is valid,
    // if not ticketValidation is set to true and a message is shown
    if (ticketInput.val() === "" || Math.round(Number(ticketInput.val())) !== Number(ticketInput.val()) ||
        ticketValidation === true) {

        ticketValidation = true;

        ticketInput.val(1);
        $("#invalid-ticket").show();
    }
    // Every time the input is valid the message gets removed
    else {
        $("#invalid-ticket").hide();
    }


    // Checking if the First name input value is valid,
    // if not firstNameValidation is forcefully set to true and a message is shown
    if (firstNameInput.val() === "" || firstNameValidation === true) {

        firstNameValidation = true;

        firstNameInput.val(null);
        $("#invalid-first-name").show();

    }
    else {
        $("#invalid-first-name").hide();
    }

    // Checking if the Last name input value is valid,
    // if not lastNameValidation is forcefully set to true and a message is shown
    if (lastNameInput.val() === "" || lastNameValidation === true) {

        lastNameValidation = true;

        lastNameInput.val(null);
        $("#invalid-last-name").show();

    }
    else {
        $("#invalid-last-name").hide();
    }

    // Checking if the Phone number input value is valid,
    // if not phoneNumberValidation is forcefully set to true and a message is shown
    if (phoneNumberInput.val() === "" || phoneNumberValidation === true) {

        phoneNumberValidation = true;

        phoneNumberInput.val(null);
        $("#invalid-phone-number").show();

    }
    else {
        $("#invalid-phone-number").hide();
    }

    // Checking if the Mail input value is valid,
    // if not mailValidation is forcefully set to true and a message is shown
    if (mailInput.val() === "" || mailValidation === true) {

        mailValidation = true;

        mailInput.val(null);
        $("#invalid-mail").show();
    }
    else {
        $("#invalid-mail").hide();
    }


    // if all the validations are false the saveInfo-function is activated
    if (!ticketValidation && !firstNameValidation && !lastNameValidation && !phoneNumberValidation && !mailValidation) {

        saveInfo(ticketInput, firstNameInput, lastNameInput, phoneNumberInput, mailInput);

    }
}



/* ALL GET, POST AND DELETE FUNCTIONS ARE BELOW */

// A function that saves a purchase on the server
function savePurchase(ticketAmountValidation, firstNameValidation, lastNameValidation,
                      phoneNumberValidation, mailValidation) {


    // All input elements are given names for easier access
    const ticketAmountInput = $("#ticket-amount");
    const firstNameInput = $("#first-name");
    const lastNameInput = $("#last-name");
    const phoneNumberInput = $("#phone-number");
    const mailInput = $("#mail");


    // If all the validation functions return false, everything is valid and the purchase can be saved
    if (!ticketAmountValidation && !firstNameValidation && !lastNameValidation &&
        !phoneNumberValidation && !mailValidation) {

        // a javascript object matching the custom java object of Purchase
        const purchase = {
            movie: $("#movie").val(),
            ticketAmount: ticketAmountInput.val(),
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            phoneNumber: phoneNumberInput.val(),
            mail: mailInput.val()
        };

        // posts purchase so that it gets converted to a Purchase object and saved
        $.post("/savePurchase", purchase, function () {
            writePurchases();
        });


        // resets all input elements
        ticketAmountInput.val(1);
        firstNameInput.val(null);
        lastNameInput.val(null);
        phoneNumberInput.val(null);
        mailInput.val(null);

    }

}


// writes all saved registered purchases
function writePurchases() {

    // retrieves a list of all registered purchases and writes them
    $.get("/getPurchases", function(registeredPurchases) {

        let purchaseTable = "";

        // formats each registered purchase into a table row
        for (const purchase of registeredPurchases) {

            purchaseTable += "<tr>" +
                "<td>" + purchase.movie + "</td>" +
                "<td>" + purchase.ticketAmount + "</td>" +
                "<td>" + purchase.firstName + "</td>" +
                "<td>" + purchase.lastName + "</td>" +
                "<td>" + purchase.phoneNumber + "</td>" +
                "<td>" + purchase.mail + "</td>" +
                "<td><button class='btn btn-danger' value='" + purchase.id +
                "' onclick='deletePurchase(this.value)'>Delete</button></td>"+
                "</tr>";

        }

        // writes all the rows into the registered purchases table
        $("#registered-purchases").html(purchaseTable);

    });
}


// Function that restarts the Registered purchases table
function deleteAllPurchases() {

    // deletes all purchases and then runs writePurchases() so the table is emptied
    $.ajax({

        url: "/deleteAllPurchases",
        type: "DELETE",

    }).done(function() {

        writePurchases();

    });

}

// Function that deletes a chosen purchase
function deletePurchase(id) {

    const url = "/deletePurchase?id=" + id;

    // Deletes selected purchase and runs writePurchases
    $.ajax({

        url: url,
        type: "DELETE"

    }).done(function() {

        writePurchases();

    });

}


// Function that initializes the select element for movies
function getMovies() {

    // retrieves a list of all movies and writes them
    $.get("/getMovies", function(movieList) {

        let movieSelect = "";

        for (const movie of movieList) {

            movieSelect += "<option>" + movie + "</option>";

        }

        $("#movie").html(movieSelect);

    });

}