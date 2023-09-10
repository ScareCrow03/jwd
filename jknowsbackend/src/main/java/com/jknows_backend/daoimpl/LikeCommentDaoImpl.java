package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.LikeCommentDao;
import com.jknows_backend.entity.Comment;
import com.jknows_backend.entity.LikeComment;
import com.jknows_backend.repository.CommentRepository;
import com.jknows_backend.repository.LikeCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LikeCommentDaoImpl implements LikeCommentDao {

    @Autowired
    LikeCommentRepository likeCommentRepository;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public List<LikeComment> getLikeComment(int userId) {
        return likeCommentRepository.findLikeCommentsByUserId(userId);
    }

    @Override
    public void saveLikeComment(int userId, int commentId, int liked) {
        LikeComment l = likeCommentRepository.findLikeCommentByUserIdAndCommentId(userId, commentId);
        if (l == null) {
            l = new LikeComment();
            l.setLiked(0);
            l.setLikeCommentId(0);
        }
        if (l.getLiked() == liked) return;
        Comment q = commentRepository.findCommentByCommentId(commentId);
        q.setLiked(q.getLiked() - l.getLiked());
        if (liked == 0) {
            likeCommentRepository.deleteLikeCommentByUserIdAndCommentId(userId, commentId);
        }
        else {
            LikeComment f = new LikeComment();
            if (l.getLikeCommentId() > 0) f.setLikeCommentId(l.getLikeCommentId());
            f.setUserId(userId);
            f.setCommentId(commentId);
            f.setLiked(liked);
            likeCommentRepository.save(f);
            q.setLiked(q.getLiked() + liked);
        }
        commentRepository.save(q);
    }

    @Override
    public int isLikeComment(int userId, int commentId) {
        LikeComment f = likeCommentRepository.findLikeCommentByUserIdAndCommentId(userId, commentId);
        return f == null ? 0 : f.getLiked();
    }
}

