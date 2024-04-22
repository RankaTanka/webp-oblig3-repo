
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

            writeAllPurchases();

            // resets all input elements
            ticketAmountInput.val(1);
            firstNameInput.val(null);
            lastNameInput.val(null);
            phoneNumberInput.val(null);
            mailInput.val(null);

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
                "onclick='getPurchaseEditor(" + purchase.id + ")'" +
                ">Update</button></td>" +

                // A button that deletes its assigned Purchase
                "<td class='text-center'><button class='btn btn-danger' " +
                "onclick='deletePurchase(" + purchase.id + ")'>Delete</button></td>"+

                "</tr>";

            // All the XXXValidation() functions above are located in input-validation.js

        }

        // writes all the rows into the registered purchases table
        $("#registered-purchases").html(purchaseTable);

    }).fail(function(jqXHR) {
        // if something goes wrong info about the error gets logged, while an error message is shown on the page

        console.log(JSON.parse(jqXHR.responseText).message);

        errorField.text("Oh dear. Something went wrong, try again later");
        errorField.show();

    });
}


// Function
function getPurchaseEditor(id) {


    const url = "/getPurchase?id=" + id;

    //
    $.get(url, function(purchase) {

        let purchaseEditor = "<td class='align-middle' type='" + purchase.id + "'>" + purchase.movie + "</td>";



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
    const ticketAmountInput = $("#ticket-amount");
    const firstNameInput = $("#first-name");
    const lastNameInput = $("#last-name");
    const phoneNumberInput = $("#phone-number");
    const mailInput = $("#mail");


    // If all the validation functions have returned false, everything is valid and the purchase can be saved
    if (!ticketAmountValidity && !firstNameValidity && !lastNameValidity && !phoneNumberValidity && !mailValidity) {


        // the error field, in case something goes wrong
        const errorField = $("#error");

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
            type: "PUT",
            data: purchase

        }).done(function() {

            writeAllPurchases();

            // resets all input elements
            ticketAmountInput.val(1);
            firstNameInput.val(null);
            lastNameInput.val(null);
            phoneNumberInput.val(null);
            mailInput.val(null);

        }).fail(function(jqXHR) {
            // if something goes wrong info about the error gets logged, while an error message is shown on the page

            console.log(JSON.parse(jqXHR.responseText).message);

            errorField.text("Oh dear. Something went wrong, try again later");
            errorField.show();

        });

    }
}



// Function that initializes the select element for movies
function getMovies(selectorId) {


    // the error field, in case something goes wrong
    const errorField = $("#error");


    // retrieves a list of all movies and writes them
    $.get("/getMovies", function(movieList) {

        let movieSelect = "";

        for (const movie of movieList) {

            movieSelect += "<option>" + movie + "</option>";

        }

        $("#movie-" + selectorId).html(movieSelect);

    }).fail(function(jqXHR) {
        // if something goes wrong info about the error gets logged, while an error message is shown on the page

        console.log(JSON.parse(jqXHR.responseText).message);

        errorField.text("Oh dear. Something went wrong on page initialization, try refreshing the page")
        errorField.show();

    });

}
