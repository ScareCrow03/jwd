package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.MessageDao;
import com.jknows_backend.entity.Message;
import com.jknows_backend.service.MessageService;
import com.jknows_backend.utils.jedisutils.JedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageDao messageDao;

    @Override
    public List<Message> getMessage(int userId) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        jedis.del("getUser" + userId);
        jedis.close();
        return messageDao.getMessage(userId);
    }

    @Override
    public List<Message> getMessages(int userId, int start, int end) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        jedis.del("getUser" + userId);
        jedis.close();
        return messageDao.getMessages(userId, start, end);
    }

    @Override
    public Message addMessage(int sender, int receiver, int questionId) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        jedis.del("getUser" + receiver);
        jedis.close();
        return messageDao.addMessage(sender, receiver, questionId);
    }

}
