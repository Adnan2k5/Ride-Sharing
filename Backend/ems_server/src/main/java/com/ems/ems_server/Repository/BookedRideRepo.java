package com.ems.ems_server.Repository;

import com.ems.ems_server.Model.BookedRide;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookedRideRepo extends MongoRepository<BookedRide, String> {
    Optional<BookedRide> findByCaptainId(String captainId);

}
