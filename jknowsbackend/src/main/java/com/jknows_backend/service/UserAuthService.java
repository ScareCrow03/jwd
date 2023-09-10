package com.jknows_backend.service;

import com.jknows_backend.entity.UserAuth;


public interface UserAuthService {

    UserAuth checkUserAuth(String username, String password);
    boolean checkUsernameValid(String username);
    UserAuth saveUserAuth(String username, String password);

    int changePassword(int userId, String password);
}
