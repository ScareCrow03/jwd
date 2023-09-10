package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.FollowUserDao;
import com.jknows_backend.entity.FollowUser;
import com.jknows_backend.service.FollowUserService;
import com.jknows_backend.utils.jedisutils.JedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.List;

@Service
public class FollowUserServiceImpl implements FollowUserService {

    @Autowired
    private FollowUserDao followUserDao;

    @Override
    public List<FollowUser> getFollowee(int userId) {
        return followUserDao.getFollowee(userId);
    }

    @Override
    public List<FollowUser> getFollower(int userId) {
        return followUserDao.getFollower(userId);
    }

    @Override
    public void saveFollowUser(int userId, int followee, int follow) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        jedis.del("getUser" + userId);
        jedis.close();
        followUserDao.saveFollowUser(userId, followee, follow);
    }

    @Override
    public int isFollowUser(int userId, int followee) {
        return followUserDao.isFollowUser(userId, followee);
    }

}
