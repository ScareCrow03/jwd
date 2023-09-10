package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.FollowQuestionDao;
import com.jknows_backend.entity.FollowQuestion;
import com.jknows_backend.entity.Question;
import com.jknows_backend.repository.FollowQuestionRepository;
import com.jknows_backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowQuestionDaoImpl implements FollowQuestionDao {

    @Autowired
    FollowQuestionRepository followQuestionRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Override
    public List<FollowQuestion> getFollowQuestion(int userId) {
        return followQuestionRepository.findFollowQuestionsByUserId(userId);
    }

    @Override
    public void saveFollowQuestion(int userId, int questionId, int follow) {
        FollowQuestion l = followQuestionRepository.findFollowQuestionByUserIdAndQuestionId(userId, questionId);
        Question q = questionRepository.findQuestionByQuestionId(questionId);
        if (l == null) {
            if (follow == 0) return;
            FollowQuestion f = new FollowQuestion();
            f.setUserId(userId);
            f.setQuestionId(questionId);
            followQuestionRepository.save(f);
            q.setFollow(q.getFollow() + 1);
        } else {
            if (follow == 1) return;
            followQuestionRepository.deleteFollowQuestionByUserIdAndQuestionId(userId, questionId);
            q.setFollow(q.getFollow() - 1);
        }
        questionRepository.save(q);
    }

    @Override
    public int isFollowQuestion(int userId, int questionId) {
        FollowQuestion f = followQuestionRepository.findFollowQuestionByUserIdAndQuestionId(userId, questionId);
        return f == null ? 0 : 1;
    }
}

