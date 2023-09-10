package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.UserAuthDao;
import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.service.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAuthServiceImpl implements UserAuthService {

    @Autowired
    private UserAuthDao userAuthDao;

    @Override
    public UserAuth checkUserAuth(String username, String password){
        return userAuthDao.checkUserAuth(username,password);
    }
    @Override
    public boolean checkUsernameValid(String username) {
        return userAuthDao.checkUsernameValid(username);
    }
    @Override
    public UserAuth saveUserAuth(String username, String password) {
        return userAuthDao.saveUserAuth(username, password);
    }

    @Override
    public int changePassword(int userId, String password) {
        return userAuthDao.changePassword(userId, password);
    }
}
