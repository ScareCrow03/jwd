package com.jknows_backend.repository;

import com.jknows_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findUserByUserId(int userId);

    List<User> findUserByUserIdBetween(int l, int r);

    @Transactional
    void deleteUserByUserId(int userId);

}