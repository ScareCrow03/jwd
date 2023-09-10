package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.UserDao;
import com.jknows_backend.entity.User;
import com.jknows_backend.service.UserService;
import com.jknows_backend.utils.jedisutils.JedisUtil;
import com.jknows_backend.utils.serializeutils.SerializeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;


    @Override
    public User getUser(int userId) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        String key = "getUser" + userId;
        if (jedis.exists(key.getBytes())) {
//            System.out.println("jedis: getUser");
            byte[] x = jedis.get(key.getBytes());
            jedis.close();
            return (User) SerializeUtil.unserialize(x);
        }
        User q = userDao.getUser(userId);
//        System.out.println(q.getUserId());
        jedis.setex(key.getBytes(), 180, SerializeUtil.serialize(q));
        jedis.close();
        return q;
//        return userDao.getUser(userId);
    }

    @Override
    public User saveUser(int userId, String nickname, String telephone, String email, String address, String avatar, String qq, String description) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        jedis.del("getUser" + userId);
        jedis.close();
        return userDao.saveUser(userId, nickname, telephone, email, address, avatar, qq, description);
    }

    @Override
    public User manageUser(int userId, int type) {
        return userDao.manageUser(userId, type);
    }

    @Override
    public List<User> getUsers(int start, int end) {
        return userDao.getUsers(start, end);
    }


}
