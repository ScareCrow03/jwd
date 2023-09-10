package com.jknows_backend.repository;

import com.jknows_backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    Question findQuestionByQuestionId(int questionId);

    Question findFirstByOrderByQuestionIdDesc();

    List<Question> findQuestionsByQuestionIdBetween(int l, int r);

    List<Question> findQuestionsByUserId(int userId);

    List<Question> findQuestionsByAnswerAndTimeBetween(int answer, Timestamp l, Timestamp r);

    @Query(value = "select * from question_t a order by question_id DESC limit ?1, ?2", nativeQuery = true)
            List<Question> findQuestionsByQuestionIdLimit(int l, int len);

    @Transactional
    void deleteQuestionByQuestionId(int questionId);

    List<Question> findQuestionsByTitleContainingOrContentContainingOrTag1ContainingOrTag2ContainingOrTag3ContainingOrTag4ContainingOrTag5Containing(String x1, String x2, String x3, String x4, String x5, String x6, String x7);

    @Query(value = "select * from question_t a where title like ?1 or content like ?1 or tag1 like ?1 or tag2 like ?1 or tag3 like ?1 or tag4 like ?1 or tag5 like ?1 order by liked desc limit ?2, ?3", nativeQuery = true)
            List<Question> findQuestionsByContainingAndLimit(String x, int l, int len);
}