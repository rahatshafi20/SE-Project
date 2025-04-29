package com.example.easypark.logic_layer;

import com.example.easypark.DB_Handler.UserDBHandler;
import com.example.easypark.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDBHandler userDBHandler;

    public List<User> getAllUsers() {
        return userDBHandler.findAll();
    }

    public User getUserById(Long id) {
        return userDBHandler.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return userDBHandler.save(user);
    }

    public void deleteUser(Long id) {
        userDBHandler.deleteById(id);
    }
}
