package com.jknows_backend.repository;

import com.jknows_backend.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    Answer findAnswerByAnswerId(int answerId);

    List<Answer> findAnswersByUserId(int userId);

    List<Answer> findAnswersByQuestionId(int questionId);

    @Transactional
    void deleteAnswerByAnswerId(int answerId);

    @Transactional
    void deleteAnswersByQuestionId(int questionId);

    @Query(value = "select * from answer a where question_id = ?1 order by liked DESC limit ?2, ?3", nativeQuery = true)
            List<Answer> findAnswerByQuestionIdAndLimit(int questionId, int l, int len);

    Answer findAnswerByQuestionIdAndUserId(int questionId, int userId);

    int countAnswersByQuestionId(int i);

    int countAnswersByQuestionIdAndUserId(int questionId, int userId);
}