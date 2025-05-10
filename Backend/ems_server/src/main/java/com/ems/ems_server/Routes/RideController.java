package com.ems.ems_server.Routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.ems.ems_server.Repository.BookedRideRepo;
import com.ems.ems_server.Repository.Riderepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.ems.ems_server.Model.BookedRide;
import com.ems.ems_server.Model.RideModel;
import com.ems.ems_server.WebSocket.RideBooking;


@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    Riderepository rideRepository;

    @Autowired
    BookedRideRepo bookedRideRepo;

    @Autowired
    RideBooking RideBookingHandler;

    public RideController(RideBooking rideBooking) {
        this.RideBookingHandler = rideBooking;
    }
    private final Gson gson = new Gson();

    @PostMapping("/book")
    public ResponseEntity<?> bookRide(@RequestBody String ride) throws IOException {
        JsonObject rideJson = gson.fromJson(ride, JsonObject.class);
        String key = rideJson.get("key").getAsString();
        Optional<RideModel> optionalRideModel = rideRepository.findById(key);
        if (!optionalRideModel.isPresent()) {
            return ResponseEntity.status(404).body("Ride not found");
        }
        RideModel rideModel = optionalRideModel.get();
        rideModel.setStatus("booked");
        RideModel savedRide = rideRepository.save(rideModel);
        BookedRide bookedRide = new BookedRide(rideJson);
        bookedRideRepo.save(bookedRide);
        return ResponseEntity.ok(bookedRide);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addRide(@RequestBody String entity) {
        try{
            JsonObject rideJson = gson.fromJson(entity, JsonObject.class);
            System.out.println(rideJson);
            RideModel rideModel = new RideModel(rideJson);
            System.out.println(rideModel);
            rideRepository.save(rideModel);
            return ResponseEntity.status(200).body("Ride added successfully");
        }
        catch(Exception e){
            return ResponseEntity.status(400).body(e);
        }
    }

    @GetMapping("/{captain_id}")
    public ResponseEntity<?> GetCaptainRides(@PathVariable String captain_id) {
        List<RideModel> rides = rideRepository.findByCaptainId(captain_id);
        if(rides.isEmpty()){
            return ResponseEntity.ok().body("No rides found");
        }
        return ResponseEntity.ok(rides);
    }

    @PutMapping("/updates/{id}")
    public ResponseEntity<?> UpdateRide(@PathVariable String id, @RequestBody String entity) {
        Optional<RideModel> rides = rideRepository.findById(id);
        if(rides.isPresent()){
            RideModel ride = rides.get();
            JsonObject rideJson = gson.fromJson(entity, JsonObject.class);
            ride.updateFromJson(rideJson);
            rideRepository.save(ride);
            return ResponseEntity.ok().body("Ride updated successfully");
        }
        return ResponseEntity.status(404).body("Ride not found");
    }

    @GetMapping("/fetchRides")
    public ResponseEntity<?> fetchRides() {
        List<RideModel> rides = rideRepository.findByStatusNot("booked");
        if(rides.isEmpty()){
            return ResponseEntity.ok().body("No rides found");
        }
        return ResponseEntity.ok(rides);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRide(@PathVariable String id) {
        Optional<RideModel> ride = rideRepository.findById(id);
        if(ride.isPresent()){
            rideRepository.delete(ride.get());
            return ResponseEntity.status(200).body("Ride deleted successfully");
        }
        return ResponseEntity.status(404).body("Ride not found");
    }
}