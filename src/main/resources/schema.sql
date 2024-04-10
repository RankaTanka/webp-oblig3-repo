/* Creates table Purchases, which mimics the Purchase class when the app is activated */

CREATE TABLE Purchases (
    id INTEGER AUTO_INCREMENT,
    movie VARCHAR(255) NOT NULL,
    ticketAmount INTEGER NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);