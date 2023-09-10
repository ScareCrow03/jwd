package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.AnswerDao;
import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.Comment;
import com.jknows_backend.entity.Question;
import com.jknows_backend.repository.*;
import org.aspectj.lang.annotation.SuppressAjWarnings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

@Repository
public class AnswerDaoImpl implements AnswerDao {

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    LikeAnswerRepository likeAnswerRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    LikeCommentRepository likeCommentRepository;

    @Autowired
    QuestionRepository questionRepository;


    @Override
    public List<Answer> getAnswer(int questionId) {
        return answerRepository.findAnswersByQuestionId(questionId);
    }

    @Override
    public List<Answer> getAnswers(int questionId, int start, int end) {
        return answerRepository.findAnswerByQuestionIdAndLimit(questionId, start - 1, end - start + 1);
    }

    @Override
    public List<Answer> getUserAnswer(int userId) {
        List<Answer> a = answerRepository.findAnswersByUserId(userId);
        Collections.reverse(a);
        return a;
    }

    @Override
    public Answer saveAnswer(int answerId, int userId, int questionId, String content) {
        Answer a = new Answer();
        if (answerId == 0) {
            a.setLiked(0);
            Question q = questionRepository.findQuestionByQuestionId(questionId);
            q.setAnswer(q.getAnswer() + 1);
            questionRepository.save(q);
        } else {
            a.setAnswerId(answerId);
        }
        a.setUserId(userId);
        a.setAnswerId(answerId);
        a.setQuestionId(questionId);
        a.setContent(content);
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        a.setTime(ts);
        return answerRepository.save(a);
    }

    @Override
    public int deleteAnswer(int answerId) {
        Answer a = answerRepository.findAnswerByAnswerId(answerId);
        Question q = questionRepository.findQuestionByQuestionId(a.getQuestionId());
        q.setAnswer(q.getAnswer() - 1);
        questionRepository.save(q);
        List<Comment> c = commentRepository.findCommentsByAnswerId(answerId);
        for (Comment x:c) {
            likeCommentRepository.deleteLikeCommentsByCommentId(x.getCommentId());
        }
        commentRepository.deleteCommentByAnswerId(answerId);
        likeAnswerRepository.deleteLikeAnswersByAnswerId(answerId);
        answerRepository.deleteAnswerByAnswerId(answerId);
        return 1;
    }

    @Override
    public Answer getMyAnswer(int questionId, int userId) {
        return answerRepository.findAnswerByQuestionIdAndUserId(questionId, userId);
    }
}

