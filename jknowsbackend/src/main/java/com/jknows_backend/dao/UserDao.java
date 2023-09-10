package com.jknows_backend.dao;

import com.jknows_backend.entity.User;

import java.util.List;

public interface UserDao {

    User getUser(int userId);

    User saveUser(int userId, String nickname, String telephone, String email, String address, String avatar, String qq, String description);

    User manageUser(int userId, int type);

    List<User> getUsers(int start, int end);
}
