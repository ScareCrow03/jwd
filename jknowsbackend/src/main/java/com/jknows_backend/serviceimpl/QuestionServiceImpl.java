package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.QuestionDao;
import com.jknows_backend.entity.Question;
import com.jknows_backend.entity.User;
import com.jknows_backend.service.QuestionService;
import com.jknows_backend.utils.jedisutils.JedisUtil;
import com.jknows_backend.utils.serializeutils.SerializeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionDao questionDao;
    @Override
    public Question getQuestion(int questionId) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        String key = "getQuestion" + questionId;
        if (jedis.exists(key)) {
//            System.out.println("jedis: getQuestion");
            byte[] x = jedis.get(key.getBytes());
            jedis.close();
            return (Question)SerializeUtil.unserialize(x);
        }
        Question q = questionDao.getQuestion(questionId);
        jedis.setex(key.getBytes(), 120, SerializeUtil.serialize(q));
        jedis.close();
        return q;
//        return questionDao.getQuestion(questionId);
    }

    @Override
    public List<Question> getQuestions(int start, int end) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        String key = "getQuestions" + start + ' ' + end;
        if (jedis.exists(key)) {
//            System.out.println("jedis: getQuestion");
            byte[] x = jedis.get(key.getBytes());
            jedis.close();
            return (List<Question>)SerializeUtil.unserialize(x);
        }
        List<Question> q = questionDao.getQuestions(start, end);
        jedis.setex(key.getBytes(), 120, SerializeUtil.serialize(q));
        jedis.close();
        return q;
//        return questionDao.getQuestions(start, end);
    }

    @Override
    public List<Question> getUserQuestion(int userId) {
        return questionDao.getUserQuestion(userId);
    }

    @Override
    public Question saveQuestion(int questionId, int userId, String title, String content, String tag1, String tag2, String tag3, String tag4, String tag5) {
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        String key = "getQuestion" + questionId;
        jedis.del("getQuestion" + questionId);
        jedis.close();
        return questionDao.saveQuestion(questionId, userId, title, content, tag1, tag2, tag3, tag4, tag5);
    }

    @Override
    public List<Question> getUnansweredQuestion(int n) {
        return questionDao.getUnansweredQuestion(n);
    }

    @Override
    public int deleteQuestion(int questionId) {
        questionDao.deleteQuestion(questionId);
        Jedis jedis = JedisUtil.getJedis();
        jedis.auth("123456");
        Set<String> s = jedis.keys("getQuestions*");
        for (String x:s)
            jedis.del(x);
        jedis.del("getQuestion" + questionId);
        jedis.close();
        return 1;
    }

    @Override
    public List<User> inviteUser(int questionId, int start, int end) {
        return questionDao.inviteUser(questionId, start, end);
    }

    @Override
    public List<Question> searchQuestion(String x) {
        return questionDao.searchQuestion(x);
    }

    @Override
    public List<Question> searchQuestions(String x, int start, int end) {
        return questionDao.searchQuestions(x, start, end);
    }
}
