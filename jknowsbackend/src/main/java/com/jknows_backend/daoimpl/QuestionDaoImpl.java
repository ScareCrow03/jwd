package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.AnswerDao;
import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.User;
import com.jknows_backend.repository.*;
import com.jknows_backend.dao.QuestionDao;
import com.jknows_backend.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class QuestionDaoImpl implements QuestionDao {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    LikeQuestionRepository likeQuestionRepository;

    @Autowired
    FollowQuestionRepository followQuestionRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    private AnswerRepository answerRepository;


    @Override
    public Question getQuestion(int questionId) {
        return questionRepository.findQuestionByQuestionId(questionId);
    }

    @Override
    public List<Question> getQuestions(int start, int end) {
        int l = start - 1, r = end - start + 1;
        return questionRepository.findQuestionsByQuestionIdLimit(l, r);
    }

    @Override
    public List<Question> getUserQuestion(int userId) {
        return questionRepository.findQuestionsByUserId(userId);
    }

    @Override
    public Question saveQuestion(int questionId, int userId, String title, String content, String tag1, String tag2, String tag3, String tag4, String tag5) {
        Question q = new Question();
        if (questionId == 0) {
            q.setAnswer(0);
            q.setFollow(0);
            q.setLiked(0);
        } else {
            q.setQuestionId(questionId);
        }
        q.setUserId(userId);
        q.setTitle(title);
        q.setContent(content);
        q.setTag1(tag1);
        q.setTag2(tag2);
        q.setTag3(tag3);
        q.setTag4(tag4);
        q.setTag5(tag5);
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        q.setTime(ts);
        return questionRepository.save(q);
    }

    @Override
    public List<Question> getUnansweredQuestion(int n) {
        Timestamp r = new Timestamp(System.currentTimeMillis());
        Timestamp l = new Timestamp(System.currentTimeMillis() - (long) n * 86400 * 1000);
        List<Question> q = questionRepository.findQuestionsByAnswerAndTimeBetween(0, l, r);
        Collections.reverse(q);
        return q;
    }

    @Autowired
    AnswerDao answerDao;

    @Override
    public int deleteQuestion(int questionId) {
        Question q = questionRepository.findQuestionByQuestionId(questionId);
        if (q == null) return 1;
//        if (q.getAnswer() > 0) return 0;
        List<Answer> a = answerRepository.findAnswersByQuestionId(questionId);
        for (Answer x:a)
            answerDao.deleteAnswer(x.getAnswerId());
        likeQuestionRepository.deleteLikeQuestionsByQuestionId(questionId);
        followQuestionRepository.deleteFollowQuestionsByQuestionId(questionId);
        messageRepository.deleteMessageByQuestionId(questionId);
        questionRepository.deleteQuestionByQuestionId(questionId);
        return 1;
    }

    @Override
    public List<User> inviteUser(int questionId, int start, int end) {
        List<User> u = userRepository.findUserByUserIdBetween(start, end), v = new ArrayList<>();
        for (User x:u)
            if (answerRepository.countAnswersByQuestionIdAndUserId(questionId, x.getUserId()) == 0)
                v.add(x);
        return v;
    }

    @Override
    public List<Question> searchQuestion(String x) {
        return questionRepository.findQuestionsByTitleContainingOrContentContainingOrTag1ContainingOrTag2ContainingOrTag3ContainingOrTag4ContainingOrTag5Containing(x, x, x, x, x, x, x);
    }

    @Override
    public List<Question> searchQuestions(String x, int start, int end) {
        int l = start - 1, r = end - start + 1;
        return questionRepository.findQuestionsByContainingAndLimit('%' + x + '%', l, r);
    }
}

