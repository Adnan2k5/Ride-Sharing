package com.ems.ems_server.Model;

import org.springframework.data.annotation.Id;

public class UserModel {
    @Id
    private String id;
    private String email;
    private String password;
    private String first_name;
    private String last_name;


    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getName() { return first_name + " " + last_name; }
    public void setFirst_name(String name) { this.first_name = name; }
    public void setLast_name(String name) { this.last_name = name; }
}
