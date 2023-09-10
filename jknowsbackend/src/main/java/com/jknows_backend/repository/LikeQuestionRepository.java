package com.jknows_backend.repository;

import com.jknows_backend.entity.LikeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikeQuestionRepository extends JpaRepository<LikeQuestion, Integer> {

    List<LikeQuestion> findLikeQuestionsByQuestionId(int questionId);

    List<LikeQuestion> findLikeQuestionsByUserId(int userId);

    LikeQuestion findLikeQuestionByUserIdAndQuestionId(int userId, int questionId);

    @Transactional
    void deleteLikeQuestionByUserIdAndQuestionId(int userId, int questionId);

    @Transactional
    void deleteLikeQuestionsByQuestionId(int questionId);

    @Transactional
    void deleteLikeQuestionsByUserId(int userId);

    int countLikeQuestionsByQuestionId(int i);
}