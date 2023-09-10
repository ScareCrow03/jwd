package com.jknows_backend.service;

import com.jknows_backend.entity.FollowUser;

import java.util.List;


public interface FollowUserService {

    List<FollowUser> getFollowee(int userId);

    List<FollowUser> getFollower(int userId);

    void saveFollowUser(int userId, int followee, int follow);

    int isFollowUser(int userId, int followee);

}
