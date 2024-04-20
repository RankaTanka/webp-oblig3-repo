
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

            writeAllPurchases();

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
function writeAllPurchases() {

    // retrieves a list of all registered purchases and writes them
    $.get("/getAllPurchases", function(registeredPurchases) {

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

            // All the XXXValidation() functions above are located in input-validation.js

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

        writeAllPurchases();

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

        writeAllPurchases();

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

            writeAllPurchases();

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