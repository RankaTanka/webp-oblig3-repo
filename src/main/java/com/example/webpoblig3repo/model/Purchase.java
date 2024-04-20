package com.example.webpoblig3repo.model;

// A POJO for a Purchase
public class Purchase {
    private Long id;
    private String movie;
    private int ticketAmount;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String mail;

    public Purchase() {}

    // Constructor does not contain id. This is so I can properly post a Purchase and id is decided by AUTO_INCREMENT
    public Purchase(String movie, int ticketAmount, String firstName, String lastName, String phoneNumber, String mail) {
        this.movie = movie;
        this.ticketAmount = ticketAmount;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.mail = mail;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public String getMovie() {
        return movie;
    }

    public void setTicketAmount(int ticketAmount) {
        this.ticketAmount = ticketAmount;
    }

    public int getTicketAmount() {
        return ticketAmount;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getMail() {
        return mail;
    }
}
