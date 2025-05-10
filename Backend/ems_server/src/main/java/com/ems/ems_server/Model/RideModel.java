package com.ems.ems_server.Model;

import org.springframework.data.annotation.Id;

import com.google.gson.JsonObject;

public class RideModel {
    @Id
    private String id;
    private String captainId;
    private String captainName;
    private String source;
    private String destination;
    private String date;
    private String time;
    private String status;
    private String price;
    private String bookedBy;

    public RideModel() {}

    public RideModel(JsonObject rideJson) {
        this.captainId = rideJson.get("captain_id").getAsString();
        this.source = rideJson.get("source").getAsString();
        this.destination = rideJson.get("destination").getAsString();
        this.date = rideJson.get("date").getAsString();
        this.time = rideJson.get("time").getAsString();
        this.price = rideJson.get("price").getAsString();
        this.captainName = rideJson.get("captainName").getAsString();
        this.bookedBy = "";
        this.status = "active";
    }
    public RideModel(String captain_id, String captainName, String source2, String destination2, String date2, String time2, String price2,
            String status2) {
        this.captainId = captain_id;
        this.source = source2;
        this.destination = destination2;
        this.date = date2;
        this.time = time2;
        this.price = price2;
        this.status = status2;
        this.captainName = captainName;
    }

    public String getId() { return id; }
    public String getCaptainId() { return captainId; }
    public void setCaptainId(String captainId) { this.captainId = captainId; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public void setCaptainName(String captainName) { this.captainName = captainName; }
    public String getCaptainName() { return captainName; }
    public String getBookedBy() { return bookedBy; }
    public void setBookedBy(String bookedBy) { this.bookedBy = bookedBy; }
    public String getDetails() {
        return String.format(
            "Captain ID: %s\n Captain Name: %s\nFrom: %s\nTo: %s\nDate: %s\nTime: %s\nStatus: %s\nPrice: %s",
             captainId, captainName, source, destination, date, time, status, price
        );
    }

    public void updateFromJson(JsonObject rideJson) {
        if (rideJson.has("source") && !rideJson.get("source").isJsonNull()) {
            this.source = rideJson.get("source").getAsString();
        }
        if (rideJson.has("destination") && !rideJson.get("destination").isJsonNull()) {
            this.destination = rideJson.get("destination").getAsString();
        }
        if (rideJson.has("date") && !rideJson.get("date").isJsonNull()) {
            this.date = rideJson.get("date").getAsString();
        }
        if (rideJson.has("time") && !rideJson.get("time").isJsonNull()) {
            this.time = rideJson.get("time").getAsString();
        }
        if (rideJson.has("status") && !rideJson.get("status").isJsonNull()) {
            this.status = rideJson.get("status").getAsString();
        }
        if (rideJson.has("price") && !rideJson.get("price").isJsonNull()) {
            this.price = rideJson.get("price").getAsString();
        }
        if(rideJson.has("bookedBy") && !rideJson.get("bookedBy").isJsonNull()) {
            this.bookedBy = rideJson.get("bookedBy").getAsString();
        }
    }
}
