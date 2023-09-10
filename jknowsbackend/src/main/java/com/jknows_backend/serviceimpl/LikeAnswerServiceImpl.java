package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.LikeAnswerDao;
import com.jknows_backend.entity.LikeAnswer;
import com.jknows_backend.service.LikeAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeAnswerServiceImpl implements LikeAnswerService {

    @Autowired
    private LikeAnswerDao likeAnswerDao;

    @Override
    public List<LikeAnswer> getLikeAnswer(int userId) {
        return likeAnswerDao.getLikeAnswer(userId);
    }

    @Override
    public void saveLikeAnswer(int userId, int answerId, int liked) {
        likeAnswerDao.saveLikeAnswer(userId, answerId, liked);
    }

    @Override
    public String isLikeAnswer(int userId, int answerId) {
        return likeAnswerDao.isLikeAnswer(userId, answerId);
    }
}
