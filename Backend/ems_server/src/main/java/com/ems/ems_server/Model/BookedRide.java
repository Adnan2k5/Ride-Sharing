package com.ems.ems_server.Model;

import org.springframework.data.annotation.Id;
import com.google.gson.JsonObject;

public class BookedRide {
    @Id
    private String rideid;
    private String captainId;
    private String captainName;
    private String source;
    private String destination;
    private String date;
    private String time;
    private String status;
    private String price;
    private String userID;

    public BookedRide(JsonObject jsonNode) {
        JsonObject captain = jsonNode.get("captain").getAsJsonObject();
        System.out.println(captain);
        this.rideid = jsonNode.get("key").getAsString();
        this.captainId = captain.get("id").getAsString();
        this.captainName = captain.get("name").getAsString();
        this.source = jsonNode.get("from").getAsString();
        this.destination = jsonNode.get("to").getAsString();
        this.date = jsonNode.get("date").getAsString();
        this.time = jsonNode.get("time").getAsString();
        this.status = "booked";
        this.price = jsonNode.get("price").getAsString();
        this.userID = jsonNode.get("userId").getAsString();
    }

    public String getId() {
        return rideid;
    }

    public void setId(String id) {
        this.rideid = id;
    }

    public String getCaptainId() {
        return captainId;
    }

    public void setCaptainId(String captainId) {
        this.captainId = captainId;
    }

    public String getCaptainName() {
        return captainName;
    }

    public void setCaptainName(String captainName) {
        this.captainName = captainName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

}
