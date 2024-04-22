
/* ALL GET, POST, DELETE AND PUT FUNCTIONS ARE BELOW */


// A function that saves a purchase on the server
function savePurchase(ticketAmountValidity, firstNameValidity, lastNameValidity, phoneNumberValidity, mailValidity,
                      inputId) {

    // the error field, in case something goes wrong
    const errorField = $("#error");


    // All input elements are given names for easier access
    const ticketAmountInput = $("#ticket-amount-" + inputId);
    const firstNameInput = $("#first-name-" + inputId);
    const lastNameInput = $("#last-name-" + inputId);
    const phoneNumberInput = $("#phone-number-" + inputId);
    const mailInput = $("#mail-" + inputId);


    // If all the validation functions have returned false, everything is valid and the purchase can be saved
    if (!ticketAmountValidity && !firstNameValidity && !lastNameValidity && !phoneNumberValidity && !mailValidity) {

        // a javascript object matching the custom java object Purchase, but without id
        const purchase = {
            movie: $("#movie-" + inputId).val(),
            ticketAmount: ticketAmountInput.val(),
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            phoneNumber: phoneNumberInput.val(),
            mail: mailInput.val()
        };

        // posts a purchase, writes all purchases into their table and resets input fields
        $.post("/savePurchase", purchase, function() {

            // writes all Purchases into the registered purchases table and then resets the input fields
            writeAllPurchases().then(() => {

                ticketAmountInput.val(1);
                firstNameInput.val(null);
                lastNameInput.val(null);
                phoneNumberInput.val(null);
                mailInput.val(null);

            });

        }).fail(function(jqXHR) {
            // if something goes wrong info about the error gets logged, while an error message is shown on the page

            console.log(JSON.parse(jqXHR.responseText).message);

            errorField.text("Oh dear. Something went wrong, try again later");
            errorField.show();

        });

    }

}


// writes all saved registered purchases
function writeAllPurchases() {

    // the error field, in case something goes wrong
    const errorField = $("#error");


    // returns a Promise so that writeAllPurchases can be awaited for completion when necessary
    return new Promise((resolve,reject) => {

        // retrieves a list of all registered purchases and writes them
        $.get("/getAllPurchases", function(registeredPurchases) {

            // Upon success the error field is hidden
            errorField.hide();


            let purchaseTable = "";

            // formats each registered purchase into a table row with an Update and a Delete button
            for (const purchase of registeredPurchases) {

                purchaseTable += "<tr id='" + purchase.id + "'>" +

                        // Purchase information
                        "<td class='align-middle'>" + purchase.movie + "</td>" +
                        "<td class='align-middle'>" + purchase.ticketAmount + "</td>" +
                        "<td class='align-middle'>" + purchase.firstName + "</td>" +
                        "<td class='align-middle'>" + purchase.lastName + "</td>" +
                        "<td class='align-middle'>" + purchase.phoneNumber + "</td>" +
                        "<td class='align-middle'>" + purchase.mail + "</td>" +

                        // A button that takes info from the input fields and updates its assigned Purchase
                        "<td class='text-center'><button class='btn btn-primary' " +
                        "onclick='getPurchaseEditor(" + purchase.id + ")'>Edit</button></td>" +

                        // A button that deletes its assigned Purchase
                        "<td class='text-center'><button class='btn btn-danger' " +
                        "onclick='deletePurchase(" + purchase.id + ")'>Delete</button></td>"+

                    "</tr>";

            }

            // writes all the rows into the registered purchases table
            $("#registered-purchases").html(purchaseTable);


            // resolves the function after success
            resolve();

        }).fail(function(jqXHR) {
            // if something goes wrong info about the error gets logged, while an error message is shown on the page

            console.log(JSON.parse(jqXHR.responseText).message);

            errorField.text("Oh dear. Something went wrong, try again later");
            errorField.show();

            // rejects the function after failure
            reject();

        });
    });
}


// Function for turning a selected row in the Registered purchases table into a row for editing its assigned Purchase
async function getPurchaseEditor(id) {

    // Restores all Purchases in the purchases table so that only one can be edited at a time
    await writeAllPurchases();

    // the error field, in case something goes wrong
    const errorField = $("#error");


    const url = "/getPurchase?id=" + id;

    // Turns the row containing the selected Purchase into a row for Purchase editing
    $.get(url, function(purchase) {

        // Select and input elements for editing of Purchase information
        const purchaseEditor = "<td>" +
                "<select class='form-control form-control-sm' id='movie-" + id + "'>" +
                    // Makes sure the first movie in the select element is the current movie
                    "<option>" + purchase.movie + "</option>" +
                "</select>" +
            "</td>" +
            "<td>" +
                "<input type='number'  class='form-control form-control-sm' id='ticket-amount-" + id + "' " +
                "value='" + purchase.ticketAmount + "' min='1'/>" +
                "<small class='text-danger' id='invalid-ticket-amount-" + id + "'></small>" +
            "</td>" +
            "<td>" +
                "<input type='text' class='form-control form-control-sm' id='first-name-" + id + "' " +
                "value='" + purchase.firstName + "' pattern='[a-zæøåA-ZÆØÅ]{2,}'/>" +
                "<small class='text-danger' id='invalid-first-name-" + id + "'></small>" +
            "</td>" +
            "<td>" +
                "<input type='text' class='form-control form-control-sm' id='last-name-" + id + "' " +
                "value='" + purchase.lastName + "' pattern='[a-zæøåA-ZÆØÅ]{2,}'/>" +
                "<small class='text-danger' id='invalid-last-name-" + id + "'></small>" +
            "</td>" +
            "<td>" +
                "<input type='tel' class='form-control form-control-sm' id='phone-number-" + id + "' " +
                "value='" + purchase.phoneNumber + "' pattern='[1-9]{1}[\\d]{7}'/>" +
                "<small class='text-danger' id='invalid-phone-number-" + id + "'></small>" +
            "</td>" +
            "<td>" +
                "<input type='email' class='form-control form-control-sm' id='mail-" + id + "' " +
                "value='" + purchase.mail + "' pattern='[a-z0-9.]+@[a-z0-9.]+\\.[a-z]{2,3}'/>" +
                "<small class='text-danger' id='invalid-mail-" + id + "'></small>" +
            "</td>" +

            // Update button. Lets you update a selected purchase if all the values are valid
            "<td class='text-center'>" +
                "<button class='btn btn-secondary' onClick='updatePurchase(ticketAmountValidation(" + purchase.id + "), " +
                "firstNameValidation(" + purchase.id + "), lastNameValidation(" + purchase.id + "), " +
                "phoneNumberValidation(" + purchase.id + "), mailValidation(" + purchase.id + "), " +
            "   " + purchase.id + ")'>Update</button>" +
            "</td>" +

            // Delete button
            "<td class='text-center'>" +
                "<button class='btn btn-danger' onclick='deletePurchase(" + purchase.id + ")'>Delete</button>" +
            "</td>";

        // All the XXXValidation() functions above are located in input-validation.js

        $("#" + id).html(purchaseEditor);


        // Retrieves the remaining movies
        getMoviesForEditor(id);

    }).fail(function(jqHXR) {
        // if something goes wrong info about the error gets logged, while an error message is shown on the page

        console.log(JSON.parse(jqHXR.responseText).message);

        errorField.text("Oh dear. Something went wrong, try again later");
        errorField.show();

    });

}


// Function that restarts the Registered purchases table
function deleteAllPurchases() {

    // the error field, in case something goes wrong
    const errorField = $("#error");


    // deletes all purchases and then runs writePurchases() so the table is emptied
    $.ajax({

        url: "/deleteAllPurchases",
        type: "DELETE",

    }).done(function() {

        writeAllPurchases();

    }).fail(function(jqXHR) {
        // if something goes wrong info about the error gets logged, while an error message is shown on the page

        console.log(JSON.parse(jqXHR.responseText).message);

        errorField.text("Oh dear. Something went wrong, try again later");
        errorField.show();

    });

}


// Function that deletes a selected purchase
function deletePurchase(id) {

    // the error field, in case something goes wrong
    const errorField = $("#error");


    const url = "/deletePurchase?id=" + id;

    // Deletes selected purchase and runs writePurchases
    $.ajax({

        url: url,
        type: "DELETE"

    }).done(function() {

        writeAllPurchases();

    }).fail(function(jqXHR) {
        // if something goes wrong info about the error gets logged, while an error message is shown on the page

        console.log(JSON.parse(jqXHR.responseText).message);

        errorField.text("Oh dear. Something went wrong, try again later");
        errorField.show();

    });

}


// function that updates a selected Purchase
function updatePurchase(ticketAmountValidity, firstNameValidity, lastNameValidity, phoneNumberValidity, mailValidity,
                        id) {

    // All input elements are given names for easier access
    const ticketAmountInput = $("#ticket-amount-" + id);
    const firstNameInput = $("#first-name-" + id);
    const lastNameInput = $("#last-name-" + id);
    const phoneNumberInput = $("#phone-number-" + id);
    const mailInput = $("#mail-" + id);


    // If all the validation functions have returned false, everything is valid and the purchase can be saved
    if (!ticketAmountValidity && !firstNameValidity && !lastNameValidity && !phoneNumberValidity && !mailValidity) {


        // the error field, in case something goes wrong
        const errorField = $("#error");

        // a javascript object matching the custom java object Purchase
        const purchase = {
            id: id,
            movie: $("#movie-" + id).val(),
            ticketAmount: ticketAmountInput.val(),
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            phoneNumber: phoneNumberInput.val(),
            mail: mailInput.val()
        };

        // updates a purchase, writes all purchases into their table and resets input fields
        $.ajax({

            url: "/updatePurchase",
            type: "PUT",
            data: purchase

        }).done(function() {

            writeAllPurchases();

        }).fail(function(jqXHR) {
            // if something goes wrong info about the error gets logged, while an error message is shown on the page

            console.log(JSON.parse(jqXHR.responseText).message);

            errorField.text("Oh dear. Something went wrong, try again later");
            errorField.show();

        });

    }
}



// Function that initializes the select element for movies
function getMoviesForInit() {


    // the error field, in case something goes wrong
    const errorField = $("#error");


    // retrieves a list of all movies and writes them
    $.get("/getMoviesForInit", function(movieList) {

        let movieSelect = "";

        for (const movie of movieList) {

            movieSelect += "<option>" + movie + "</option>";

        }

        $("#movie-default").html(movieSelect);

    }).fail(function(jqXHR) {
        // if something goes wrong info about the error gets logged, while an error message is shown on the page

        console.log(JSON.parse(jqXHR.responseText).message);

        errorField.text("Oh dear. Something went wrong on page initialization, try refreshing the page")
        errorField.show();

    });

}


// function that fills in the rest of the editor movie selectors
function getMoviesForEditor(id) {


    // the error field, in case something goes wrong
    const errorField = $("#error");


    const url = "/getMoviesForEditor?id=" + id;

    // Retrieves a list of movies not including the one corresponding to the current id and writes them
    $.get(url, function(movieList) {

        const movieSelector = $("#movie-" + id)

        let movieSelect = "";

        for (const movie of movieList) {

            movieSelect += "<option>" + movie + "</option>";

        }

        movieSelector.html(movieSelector.html() + movieSelect);

    }).fail(function(jqXHR) {
        // if something goes wrong info about the error gets logged, while an error message is shown on the page

        console.log(JSON.parse(jqXHR.responseText).message);

        errorField.text("Oh dear. Something went wrong, try again later");
        errorField.show();

    });

}
