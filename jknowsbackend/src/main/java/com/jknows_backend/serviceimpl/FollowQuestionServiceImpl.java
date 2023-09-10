package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.FollowQuestionDao;
import com.jknows_backend.entity.FollowQuestion;
import com.jknows_backend.service.FollowQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowQuestionServiceImpl implements FollowQuestionService {

    @Autowired
    private FollowQuestionDao followQuestionDao;

    @Override
    public List<FollowQuestion> getFollowQuestion(int userId) {
        return followQuestionDao.getFollowQuestion(userId);
    }

    @Override
    public void saveFollowQuestion(int userId, int questionId, int follow) {
        followQuestionDao.saveFollowQuestion(userId, questionId, follow);
    }

    @Override
    public int isFollowQuestion(int userId, int questionId) {
        return followQuestionDao.isFollowQuestion(userId, questionId);
    }
}
