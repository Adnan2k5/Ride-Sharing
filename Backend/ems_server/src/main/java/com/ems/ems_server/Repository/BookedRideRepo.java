package com.ems.ems_server.Repository;

import com.ems.ems_server.Model.BookedRide;
import com.ems.ems_server.Model.RideModel;


import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookedRideRepo extends MongoRepository<BookedRide, String> {
    Optional<BookedRide> findByCaptainId(String captainId);
    List<RideModel> findByStatusNot(String status);
    @SuppressWarnings("null")
    List<BookedRide> findAll();

}
