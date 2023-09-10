package com.jknows_backend.repository;

import com.jknows_backend.entity.LikeComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikeCommentRepository extends JpaRepository<LikeComment, Integer> {

    List<LikeComment> findLikeCommentsByUserId(int userId);
    LikeComment findLikeCommentByUserIdAndCommentId(int userId, int commentId);

    @Transactional
    void deleteLikeCommentByUserIdAndCommentId(int userId, int commentId);

    @Transactional
    void deleteLikeCommentsByCommentId(int commentId);

    @Transactional
    void deleteLikeCommentsByUserId(int userId);

}