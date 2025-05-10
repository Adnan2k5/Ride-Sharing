package com.ems.ems_server.Repository;
import com.ems.ems_server.Model.RideModel;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface Riderepository extends MongoRepository<RideModel, String> {
    List<RideModel> findByCaptainId(String captain_id);
    List<RideModel> findByStatusNot(String status);
}
