package com.jknows_backend.repository;

import com.jknows_backend.entity.LikeAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikeAnswerRepository extends JpaRepository<LikeAnswer, Integer> {

    List<LikeAnswer> findLikeAnswersByUserId(int userId);

    LikeAnswer findLikeAnswerByUserIdAndAnswerId(int userId, int answerId);

    @Transactional
    void deleteLikeAnswerByUserIdAndAnswerId(int userId, int answerId);

    @Transactional
    void deleteLikeAnswersByAnswerId(int answerId);

    @Transactional
    void deleteLikeAnswersByUserId(int userId);

}