package com.jknows_backend.service;

import com.jknows_backend.entity.LikeQuestion;

import java.util.List;


public interface LikeQuestionService {


    List<LikeQuestion> getLikeQuestion(int userId);

    void saveLikeQuestion(int userId, int questionId, int liked);

    int isLikeQuestion(int userId, int questionId);
}
