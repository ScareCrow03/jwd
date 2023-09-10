package com.jknows_backend.repository;

import com.jknows_backend.entity.FollowUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

public interface FollowUserRepository extends JpaRepository<FollowUser, Integer> {

    List<FollowUser> findFollowUsersByUserId(int userId);

    List<FollowUser> findFollowUsersByFollowee(int userId);

    FollowUser findFollowUserByUserIdAndFollowee(int userId, int followee);

    @Transactional
    void deleteFollowUserByUserIdAndFollowee(int userId, int followee);

    @Transactional
    void deleteFollowUsersByUserId(int userId);

    @Transactional
    void deleteFollowUsersByFollowee(int followee);

    int countFollowUsersByFollowee(int followee);

    int countFollowUsersByUserId(int userId);
}