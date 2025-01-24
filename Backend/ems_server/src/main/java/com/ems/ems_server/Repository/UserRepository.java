package com.ems.ems_server.Repository;

import com.ems.ems_server.Model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserModel, String> {
    UserModel findByEmail(String email);
}
