package com.jknows_backend.dao;

import com.jknows_backend.entity.FollowUser;

import java.util.List;

public interface FollowUserDao {

    List<FollowUser> getFollowee(int userId);

    List<FollowUser> getFollower(int userId);

    void saveFollowUser(int userId, int followee, int follow);

    int isFollowUser(int userId, int followee);

}
