// javascript for all functions used in index.html


/* PAGE INITIALIZATION FUNCTION IS BELOW */

// When the page is loaded the select list and all purchases are written
$(function() {
    getMovies();
    writePurchases();
});

// Look below at the getMovies() and writePurchases() functions for more details about the functions



/* INPUT VALIDATION FUNCTIONS ARE BELOW */

// function that validates the ticket-amount input field and returns a boolean value
function ticketAmountValidation() {

    const ticketAmountInput = $("#ticket-amount");

    // boolean validation check, if valid it's set to false
    let ticketAmountValidity = document.getElementById("ticket-amount").validity.rangeUnderflow;

    // Checking if the Tickets input value is valid,
    // if not ticketValidation is set to true and a message is shown
    if (ticketAmountInput.val() === "" || Math.round(Number(ticketAmountInput.val())) !== Number(ticketAmountInput.val()) ||
        ticketAmountValidity === true) {

        ticketAmountValidity = true;

        ticketAmountInput.val(1);
        $("#invalid-ticket-amount").show();
    }
    // Every time the input is valid the message gets removed
    else {
        $("#invalid-ticket-amount").hide();
    }


    return ticketAmountValidity;

}

// function that validates the first-name input field and returns a boolean value
function firstNameValidation() {

    const firstNameInput = $("#first-name");

    // boolean validation check, if valid it's set to false
    let firstNameValidity = document.getElementById("first-name").validity.patternMismatch;

    // Checking if the First name input value is valid,
    // if not firstNameValidation is forcefully set to true and a message is shown
    if (firstNameInput.val() === "" || firstNameValidity === true) {

        firstNameValidity = true;

        firstNameInput.val(null);
        $("#invalid-first-name").show();

    }
    else {
        $("#invalid-first-name").hide();
    }


    return firstNameValidity;

}

// function that validates the last-name input field and returns a boolean value
function lastNameValidation() {

    const lastNameInput = $("#last-name");

    // boolean validation check, if valid it's set to false
    let lastNameValidity = document.getElementById("last-name").validity.patternMismatch;

    // Checking if the Last name input value is valid,
    // if not lastNameValidation is forcefully set to true and a message is shown
    if (lastNameInput.val() === "" || lastNameValidity === true) {

        lastNameValidity = true;

        lastNameInput.val(null);
        $("#invalid-last-name").show();

    }
    else {
        $("#invalid-last-name").hide();
    }


    return lastNameValidity;

}

// function that validates the phone-number input field and returns a boolean value
function phoneNumberValidation() {

    const phoneNumberInput = $("#phone-number");

    // boolean validation check, if valid it's set to false
    let phoneNumberValidity = document.getElementById("phone-number").validity.patternMismatch;

    // Checking if the Phone number input value is valid,
    // if not phoneNumberValidation is forcefully set to true and a message is shown
    if (phoneNumberInput.val() === "" || phoneNumberValidity === true) {

        phoneNumberValidity = true;

        phoneNumberInput.val(null);
        $("#invalid-phone-number").show();

    }
    else {
        $("#invalid-phone-number").hide();
    }


    return phoneNumberValidity;

}

// function that validates the mail input field and returns a boolean value
function mailValidation() {

    const mailInput = $("#mail");

    // boolean validation check, if valid it's set to false
    // (I wanted to just use typeMismatch to validate the Mail input, but it accepted values like "bob@gmail")
    let mailValidity = document.getElementById("mail").validity.patternMismatch;

    // Checking if the Mail input value is valid,
    // if not mailValidation is forcefully set to true and a message is shown
    if (mailInput.val() === "" || mailValidity === true) {

        mailValidity = true;

        mailInput.val(null);
        $("#invalid-mail").show();
    }
    else {
        $("#invalid-mail").hide();
    }


    return mailValidity;

}



/* ALL GET, POST, DELETE AND PUT FUNCTIONS ARE BELOW */

// A function that saves a purchase on the server
function savePurchase(ticketAmountValidity, firstNameValidity, lastNameValidity, phoneNumberValidity, mailValidity) {


    // All input elements are given names for easier access
    const ticketAmountInput = $("#ticket-amount");
    const firstNameInput = $("#first-name");
    const lastNameInput = $("#last-name");
    const phoneNumberInput = $("#phone-number");
    const mailInput = $("#mail");


    // If all the validation functions have returned false, everything is valid and the purchase can be saved
    if (!ticketAmountValidity && !firstNameValidity && !lastNameValidity && !phoneNumberValidity && !mailValidity) {

        // a javascript object matching the custom java object Purchase, but without id
        const purchase = {
            movie: $("#movie").val(),
            ticketAmount: ticketAmountInput.val(),
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            phoneNumber: phoneNumberInput.val(),
            mail: mailInput.val()
        };

        // posts a purchase, writes all purchases into their table and resets input fields
        $.post("/savePurchase", purchase, function () {

            writePurchases();

            // resets all input elements
            ticketAmountInput.val(1);
            firstNameInput.val(null);
            lastNameInput.val(null);
            phoneNumberInput.val(null);
            mailInput.val(null);

        });

    }

}


// writes all saved registered purchases
function writePurchases() {

    // retrieves a list of all registered purchases and writes them
    $.get("/getPurchases", function(registeredPurchases) {

        let purchaseTable = "";

        // formats each registered purchase into a table row with an Update and a Delete button
        for (const purchase of registeredPurchases) {

            purchaseTable += "<tr>" +

                    // Purchase information
                    "<td>" + purchase.movie + "</td>" +
                    "<td>" + purchase.ticketAmount + "</td>" +
                    "<td>" + purchase.firstName + "</td>" +
                    "<td>" + purchase.lastName + "</td>" +
                    "<td>" + purchase.phoneNumber + "</td>" +
                    "<td>" + purchase.mail + "</td>" +

                    // A button that takes info from the input fields and updates its assigned Purchase
                    "<td class='text-center'><button class='btn btn-primary' value='" + purchase.id + "' " +
                           "onclick='updatePurchase(ticketAmountValidation(), firstNameValidation(), " +
                           "lastNameValidation(), phoneNumberValidation(), mailValidation(), this.value)'" +
                           ">Update</button></td>" +

                    // A button that deletes its assigned Purchase
                    "<td class='text-center'><button class='btn btn-danger' value='" + purchase.id +
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
        method: "DELETE",

    }).done(function() {

        writePurchases();

    });

}


// Function that deletes a selected purchase
function deletePurchase(id) {

    const url = "/deletePurchase?id=" + id;

    // Deletes selected purchase and runs writePurchases
    $.ajax({

        url: url,
        method: "DELETE"

    }).done(function() {

        writePurchases();

    });

}


// function that updates a selected Purchase
function updatePurchase(ticketAmountValidity, firstNameValidity, lastNameValidity, phoneNumberValidity, mailValidity,
                        id) {

    // All input elements are given names for easier access
    const ticketAmountInput = $("#ticket-amount");
    const firstNameInput = $("#first-name");
    const lastNameInput = $("#last-name");
    const phoneNumberInput = $("#phone-number");
    const mailInput = $("#mail");


    // If all the validation functions have returned false, everything is valid and the purchase can be saved
    if (!ticketAmountValidity && !firstNameValidity && !lastNameValidity && !phoneNumberValidity && !mailValidity) {

        // a javascript object matching the custom java object Purchase
        const purchase = {
            id: id,
            movie: $("#movie").val(),
            ticketAmount: ticketAmountInput.val(),
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            phoneNumber: phoneNumberInput.val(),
            mail: mailInput.val()
        };

        // updates a purchase, writes all purchases into their table and resets input fields
        $.ajax({

            url: "/updatePurchase",
            method: "PUT",
            data: purchase

        }).done(function() {

            writePurchases();

            // resets all input elements
            ticketAmountInput.val(1);
            firstNameInput.val(null);
            lastNameInput.val(null);
            phoneNumberInput.val(null);
            mailInput.val(null);

        });

    }
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