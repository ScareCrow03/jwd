package com.jknows_backend.repository;

import com.jknows_backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Comment findCommentByCommentId(int commentId);

    List<Comment> findCommentsByAnswerId(int answerId);

    Comment findCommentByUserIdAndAnswerId(int userId, int answerId);

    @Transactional
    void deleteCommentByCommentId(int commentId);

    @Transactional
    void deleteCommentByAnswerId(int answerId);

    int countCommentsByAnswerId(int answerId);
}