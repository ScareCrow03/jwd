package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.CommentDao;
import com.jknows_backend.dao.LikeCommentDao;
import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.Comment;
import com.jknows_backend.repository.AnswerRepository;
import com.jknows_backend.repository.CommentRepository;
import com.jknows_backend.repository.LikeCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class CommentDaoImpl implements CommentDao {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    LikeCommentRepository likeCommentRepository;

    @Autowired
    AnswerRepository answerRepository;


    @Override
    public List<Comment> getComment(int answerId) {
        List<Comment> c = commentRepository.findCommentsByAnswerId(answerId);//要按时间顺序，因为有回复
        int len = c.size();
        for (int i = 0; i < len; i++) {
            if (c.get(i).getResponseId() == 1) {
                c.get(i).setResponseId(0);
                c.get(i).setResponseInfo(null);
            }
        }
        if (c.size() == 0) {
            Comment x = new Comment();
            x.setAnswerId(answerId);
            c.add(x);
        }
        return c;
    }

    @Override
    public Comment saveComment(int commentId, int userId, int answerId, int responseId, String content) {
        if (responseId == 0) responseId = 1;
        Comment c = new Comment();
        if (commentId == 0) {
            c.setLiked(0);
            Answer a = answerRepository.findAnswerByAnswerId(answerId);
            a.setComment(a.getComment() + 1);
            answerRepository.save(a);
        } else {
            c.setCommentId(commentId);
        }
        c.setUserId(userId);
        c.setAnswerId(answerId);
        c.setResponseId(responseId);
        c.setContent(content);
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        c.setTime(ts);
        c = commentRepository.save(c);
        c.setResponseId(0);
        c.setResponseInfo(null);
        return c;
    }

    @Override
    public int deleteComment(int commentId) {
        Comment c = commentRepository.findCommentByCommentId(commentId);
        Answer a = answerRepository.findAnswerByAnswerId(c.getAnswerId());
        a.setComment(a.getComment() - 1);
        answerRepository.save(a);
        likeCommentRepository.deleteLikeCommentsByCommentId(commentId);
        commentRepository.deleteCommentByCommentId(commentId);

        return 1;
    }
}

