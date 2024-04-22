
/* PAGE INITIALIZATION FUNCTION IS BELOW */


// When the page is loaded the select list and all purchases are written
$(function() {
    getMoviesForInit();
    writeAllPurchases();
});

// the getMovies and writeAllPurchases are located in server-communication.js
