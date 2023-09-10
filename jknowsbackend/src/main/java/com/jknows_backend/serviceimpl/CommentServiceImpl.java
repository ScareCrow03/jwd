package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.CommentDao;
import com.jknows_backend.entity.Comment;
import com.jknows_backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao commentDao;

    @Override
    public List<Comment> getComment(int answerId) {
        return commentDao.getComment(answerId);
    }

    @Override
    public Comment saveComment(int commentId, int userId, int answerId, int responseId, String content) {
        return commentDao.saveComment(commentId, userId, answerId, responseId, content);
    }

    @Override
    public int deleteComment(int commentId) {
        return commentDao.deleteComment(commentId);
    }
}
