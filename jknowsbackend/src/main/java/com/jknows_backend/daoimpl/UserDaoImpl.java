package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.UserDao;
import com.jknows_backend.entity.User;
import com.jknows_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userInfoRepository;

    @Override
    public User getUser(int userId) {
        return userInfoRepository.findUserByUserId(userId);
    }
    @Override
    public User saveUser(int userId, String nickname, String telephone, String email, String address, String avatar, String qq, String description) {
        User u = userInfoRepository.findUserByUserId(userId);
        if (u == null) {
            u = new User();
            u.setFollower(0);
            u.setFollowee(0);
            u.setMessageFlag(0);
            u.setType(0);
        }

        while (true) {
            u.setUserId(userId);
            u.setNickname(nickname);
            u.setTelephone(telephone);
            u.setEmail(email);
            u.setAddress(address);
            u.setAvatar(avatar);
            u.setQq(qq);
            u.setDescription(description);
            u = userInfoRepository.save(u);
            if (u.getUserId() != userId) {
                u.setNickname("");
                u.setTelephone("");
                u.setEmail("");
                u.setAddress("");
                u.setAvatar("");
                u.setQq("");
                u.setDescription("");
                userInfoRepository.save(u);
                u = new User();
//                userInfoRepository.deleteUserByUserId(u.getUserId());
            } else break;
        }
        return u;
    }

    @Override
    public User manageUser(int userId, int type) {
        User u = userInfoRepository.findUserByUserId(userId);
        if (u != null) {
            u.setType(type);
            u = userInfoRepository.save(u);
        }
        return u;
    }

    @Override
    public List<User> getUsers(int start, int end) {
        return userInfoRepository.findUserByUserIdBetween(start, end);
    }

}
