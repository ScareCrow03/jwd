package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.LikeCommentDao;
import com.jknows_backend.entity.LikeComment;
import com.jknows_backend.service.LikeCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeCommentServiceImpl implements LikeCommentService {

    @Autowired
    private LikeCommentDao likeCommentDao;

    @Override
    public List<LikeComment> getLikeComment(int userId) {
        return likeCommentDao.getLikeComment(userId);
    }

    @Override
    public void saveLikeComment(int userId, int commentId, int liked) {
        likeCommentDao.saveLikeComment(userId, commentId, liked);
    }

    @Override
    public int isLikeComment(int userId, int commentId) {
        return likeCommentDao.isLikeComment(userId, commentId);
    }
}
