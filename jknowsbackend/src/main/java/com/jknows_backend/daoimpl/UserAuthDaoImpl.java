package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.UserAuthDao;
import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.repository.UserAuthRepository;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.apache.commons.codec.digest.DigestUtils;

@Repository
public class UserAuthDaoImpl implements UserAuthDao {

    @Autowired
    UserAuthRepository userAuthRepository;

    @Override
    public UserAuth checkUserAuth(String username, String password) {
        UserAuth u = userAuthRepository.findUserAuthByUsername(username);
        if (u == null) return null;
        if (u.getPassword().equals(DigestUtils.md5Hex(password + u.getSalt()))) return u;
        return null;
    }
    @Override
    public boolean checkUsernameValid(String username) {
        UserAuth u = userAuthRepository.findUserAuthByUsername(username);
        return userAuthRepository.findUserAuthByUsername(username) == null;
    }
    @Override
    public UserAuth saveUserAuth(String username, String password) {
        UserAuth u = userAuthRepository.findUserAuthByUsername(username);
        if (u == null) {
            u = new UserAuth();
            u.setUsername(username);
        }
        String salt = RandomStringUtils.randomAlphabetic(10);
        u.setSalt(salt);
        u.setPassword(DigestUtils.md5Hex(password + salt));
        return userAuthRepository.save(u);
    }

    @Override
    public int changePassword(int userId, String password) {
        UserAuth u = userAuthRepository.findUserAuthByUserId(userId);
        String salt = RandomStringUtils.randomAlphabetic(10);
        u.setSalt(salt);
        u.setPassword(DigestUtils.md5Hex(password + salt));
        userAuthRepository.save(u);
        return 1;
    }
}
