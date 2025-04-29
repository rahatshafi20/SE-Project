package com.example.easypark.DB_Handler;
import com.example.easypark.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDBHandler extends JpaRepository<User, Long> {
}
