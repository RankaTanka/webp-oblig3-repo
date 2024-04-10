/* Creates table Movies, it's a table for movies, filled when the app is started */

CREATE TABLE Movies (
    movie VARCHAR(255),
    PRIMARY KEY (movie)
);

/* Creates table Purchases, which mimics the Purchase class when the app is activated */
/* The Movies table is referenced here */

CREATE TABLE Purchases (
    id INTEGER AUTO_INCREMENT,
    movie VARCHAR(255),
    ticketAmount INTEGER NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (movie) REFERENCES Movies(movie)
);