
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