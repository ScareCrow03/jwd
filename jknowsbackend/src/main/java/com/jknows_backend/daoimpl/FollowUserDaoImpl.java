package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.FollowUserDao;
import com.jknows_backend.entity.FollowUser;
import com.jknows_backend.entity.User;
import com.jknows_backend.repository.FollowUserRepository;
import com.jknows_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowUserDaoImpl implements FollowUserDao {

    @Autowired
    FollowUserRepository followUserRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<FollowUser> getFollowee(int userId) {
        return followUserRepository.findFollowUsersByUserId(userId);
    }

    @Override
    public List<FollowUser> getFollower(int userId) {
        return followUserRepository.findFollowUsersByFollowee(userId);
    }

    @Override
    public void saveFollowUser(int userId, int followee, int follow) {
        FollowUser l = followUserRepository.findFollowUserByUserIdAndFollowee(userId, followee);
        User p = userRepository.findUserByUserId(userId);
        User q = userRepository.findUserByUserId(followee);
        if (l == null) {
            if (follow == 0) return;
            FollowUser f = new FollowUser();
            f.setUserId(userId);
            f.setFollowee(followee);
            followUserRepository.save(f);
            p.setFollowee(p.getFollowee() + 1);
            q.setFollower(q.getFollower() + 1);
        } else {
            if (follow == 1) return;
            followUserRepository.deleteFollowUserByUserIdAndFollowee(userId, followee);
            p.setFollowee(p.getFollowee() - 1);
            q.setFollower(q.getFollower() - 1);
        }
        userRepository.save(p);
        userRepository.save(q);
    }

    @Override
    public int isFollowUser(int userId, int followee) {
        FollowUser f = followUserRepository.findFollowUserByUserIdAndFollowee(userId, followee);
        return f == null ? 0 : 1;
    }

}

