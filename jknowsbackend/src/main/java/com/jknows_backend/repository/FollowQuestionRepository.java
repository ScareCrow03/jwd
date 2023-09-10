package com.jknows_backend.repository;

import com.jknows_backend.entity.FollowQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FollowQuestionRepository extends JpaRepository<FollowQuestion, Integer> {

    List<FollowQuestion> findFollowQuestionsByQuestionId(int questionId);

    List<FollowQuestion> findFollowQuestionsByUserId(int userId);

    FollowQuestion findFollowQuestionByUserIdAndQuestionId(int userId, int questionId);

    @Transactional
    void deleteFollowQuestionByUserIdAndQuestionId(int userId, int questionId);

    @Transactional
    void deleteFollowQuestionsByQuestionId(int questionId);

    @Transactional
    void deleteFollowQuestionsByUserId(int userId);

    int countFollowQuestionsByQuestionId(int i);
}