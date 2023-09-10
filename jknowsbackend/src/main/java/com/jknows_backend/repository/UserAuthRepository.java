package com.jknows_backend.repository;

import com.jknows_backend.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepository extends JpaRepository<UserAuth, Integer> {

    UserAuth findUserAuthByUsernameAndPassword(String username, String password);

    UserAuth findUserAuthByUsername(String username);

    UserAuth findUserAuthByUserId(int userId);
}