
/* INPUT VALIDATION FUNCTIONS ARE BELOW */


// function that validates the ticket-amount input field and returns a boolean value
function ticketAmountValidation(inputId) {

    const ticketAmountInput = $("#ticket-amount-" + inputId);

    // boolean validation check, if valid it's set to false
    let ticketAmountValidity = document.getElementById("ticket-amount-" + inputId).validity.rangeUnderflow;

    // Checking if the Tickets input value is valid,
    // if not ticketValidation is set to true and a message is shown
    if (ticketAmountInput.val() === "" || Math.round(Number(ticketAmountInput.val())) !== Number(ticketAmountInput.val()) ||
        ticketAmountValidity === true) {

        ticketAmountValidity = true;


        // Makes sure the correct "invalid input" message is displayed and thing happens depending on which input is wrong
        if (inputId === "default") {

            $("#invalid-ticket-amount-" + inputId).text("Please enter a valid amount");

            ticketAmountInput.val(1);

        }
        else {

            $("#invalid-ticket-amount-" + inputId).text("Invalid input");

        }
    }
    // Every time the input is valid the message gets removed
    else {
        $("#invalid-ticket-amount-" + inputId).text(null);
    }


    return ticketAmountValidity;

}

// function that validates the first-name input field and returns a boolean value
function firstNameValidation(inputId) {

    const firstNameInput = $("#first-name-" + inputId);

    // boolean validation check, if valid it's set to false
    let firstNameValidity = document.getElementById("first-name-" + inputId).validity.patternMismatch;

    // Checking if the First name input value is valid,
    // if not firstNameValidation is forcefully set to true and a message is shown
    if (firstNameInput.val() === "" || firstNameValidity === true) {

        firstNameValidity = true;


        // Makes sure the correct "invalid input" message is displayed and thing happens depending on which input is wrong
        if (inputId === "default") {

            $("#invalid-first-name-" + inputId).text("Please enter a valid first name");

            firstNameInput.val(null);

        }
        else {

            $("#invalid-first-name-" + inputId).text("Invalid input");

        }

    }
    else {
        $("#invalid-first-name-" + inputId).text(null);
    }


    return firstNameValidity;

}

// function that validates the last-name input field and returns a boolean value
function lastNameValidation(inputId) {

    const lastNameInput = $("#last-name-" + inputId);

    // boolean validation check, if valid it's set to false
    let lastNameValidity = document.getElementById("last-name-" + inputId).validity.patternMismatch;

    // Checking if the Last name input value is valid,
    // if not lastNameValidation is forcefully set to true and a message is shown
    if (lastNameInput.val() === "" || lastNameValidity === true) {

        lastNameValidity = true;


        // Makes sure the correct "invalid input" message is displayed and thing happens depending on which input is wrong
        if (inputId === "default") {

            $("#invalid-last-name-" + inputId).text("Please enter a valid last name");

            lastNameInput.val(null);

        }
        else {

            $("#invalid-last-name-" + inputId).text("Invalid input");

        }

    }
    else {
        $("#invalid-last-name-" + inputId).text(null);
    }


    return lastNameValidity;

}

// function that validates the phone-number input field and returns a boolean value
function phoneNumberValidation(inputId) {

    const phoneNumberInput = $("#phone-number-" + inputId);

    // boolean validation check, if valid it's set to false
    let phoneNumberValidity = document.getElementById("phone-number-" + inputId).validity.patternMismatch;

    // Checking if the Phone number input value is valid,
    // if not phoneNumberValidation is forcefully set to true and a message is shown
    if (phoneNumberInput.val() === "" || phoneNumberValidity === true) {

        phoneNumberValidity = true;


        // Makes sure the correct "invalid input" message is displayed and thing happens depending on which input is wrong
        if (inputId === "default") {

            $("#invalid-phone-number-" + inputId).text("Please enter a valid phone number");

            phoneNumberInput.val(null);

        }
        else {

            $("#invalid-phone-number-" + inputId).text("Invalid input");

        }

    }
    else {
        $("#invalid-phone-number-" + inputId).text(null);
    }


    return phoneNumberValidity;

}

// function that validates the mail input field and returns a boolean value
function mailValidation(inputId) {

    const mailInput = $("#mail-" + inputId);

    // boolean validation check, if valid it's set to false
    // (I wanted to just use typeMismatch to validate the Mail input, but it accepted values like "bob@gmail")
    let mailValidity = document.getElementById("mail-" + inputId).validity.patternMismatch;

    // Checking if the Mail input value is valid,
    // if not mailValidation is forcefully set to true and a message is shown
    if (mailInput.val() === "" || mailValidity === true) {

        mailValidity = true;


        // Makes sure the correct "invalid input" message is displayed and thing happens depending on which input is wrong
        if (inputId === "default") {

            $("#invalid-mail-" + inputId).text("Please enter a valid email");

            mailInput.val(null);

        }
        else {
            $("#invalid-mail-" + inputId).text("Invalid input");
        }

    }
    else {
        $("#invalid-mail-" + inputId).text(null);
    }


    return mailValidity;

}