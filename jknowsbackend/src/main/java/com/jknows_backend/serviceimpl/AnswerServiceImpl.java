package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.AnswerDao;
import com.jknows_backend.entity.Answer;
import com.jknows_backend.service.AnswerService;
import com.jknows_backend.utils.jedisutils.JedisUtil;
import com.jknows_backend.utils.serializeutils.SerializeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    AnswerDao answerDao;

    @Override
    public List<Answer> getAnswer(int questionId) {
        return answerDao.getAnswer(questionId);
    }

    @Override
    public List<Answer> getAnswers(int questionId, int start, int end) {
//        if (end > 20) return answerDao.getAnswers(questionId, start, end);
//        Jedis jedis = JedisUtil.getJedis();
//        jedis.auth("123456");
//        String key = "getAnswers" + questionId + ' ' + start + ' ' + end;
//        if (jedis.exists(key)) {
////            System.out.println("jedis: getQuestion");
//            byte[] x = jedis.get(key.getBytes());
//            jedis.close();
//            return (List<Answer>) SerializeUtil.unserialize(x);
//        }
//        List<Answer> q = answerDao.getAnswers(questionId, start, end);
//        jedis.setex(key.getBytes(), 120, SerializeUtil.serialize(q));
//        jedis.close();
//        return q;
        return answerDao.getAnswers(questionId, start, end);
    }

    @Override
    public List<Answer> getUserAnswer(int userId) {
        return answerDao.getUserAnswer(userId);
    }

    @Override
    public Answer saveAnswer(int answerId, int userId, int questionId, String content) {
        return answerDao.saveAnswer(answerId, userId, questionId, content);
    }

    @Override
    public int deleteAnswer(int answerId) {
        return answerDao.deleteAnswer(answerId);
    }

    @Override
    public Answer getMyAnswer(int questionId, int userId) {
        return answerDao.getMyAnswer(questionId, userId);
    }
}
