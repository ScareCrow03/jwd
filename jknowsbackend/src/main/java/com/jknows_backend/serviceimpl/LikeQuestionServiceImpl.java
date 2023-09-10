package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.LikeQuestionDao;
import com.jknows_backend.entity.LikeQuestion;
import com.jknows_backend.service.LikeQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeQuestionServiceImpl implements LikeQuestionService {

    @Autowired
    private LikeQuestionDao likeQuestionDao;

    @Override
    public List<LikeQuestion> getLikeQuestion(int userId) {
        return likeQuestionDao.getLikeQuestion(userId);
    }

    @Override
    public void saveLikeQuestion(int userId, int questionId, int liked) {
        likeQuestionDao.saveLikeQuestion(userId, questionId, liked);
    }

    @Override
    public int isLikeQuestion(int userId, int questionId) {
        return likeQuestionDao.isLikeQuestion(userId, questionId);
    }
}
