package com.jknows_backend.service;

import com.jknows_backend.entity.Answer;

import java.util.List;


public interface AnswerService {

    List<Answer> getAnswer(int questionId);

    List<Answer> getAnswers(int questionId, int start, int end);

    List<Answer> getUserAnswer(int userId);

    Answer saveAnswer(int answerId, int userId, int questionId, String content);

    int deleteAnswer(int answerId);

    Answer getMyAnswer(int questionId, int userId);
}
