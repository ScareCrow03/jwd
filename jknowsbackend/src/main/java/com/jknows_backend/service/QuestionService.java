package com.jknows_backend.service;

import com.jknows_backend.entity.Question;
import com.jknows_backend.entity.User;

import java.util.List;


public interface QuestionService {


    Question getQuestion(int questionId);

    List<Question> getQuestions(int start, int end);

    List<Question> getUserQuestion(int userId);

    Question saveQuestion(int questionId, int userId, String title, String content, String tag1, String tag2, String tag3, String tag4, String tag5);

    List<Question> getUnansweredQuestion(int n);

    int deleteQuestion(int questionId);

    List<User> inviteUser(int questionId, int start, int end);

    List<Question> searchQuestion(String x);

    List<Question> searchQuestions(String x, int start, int end);
}
