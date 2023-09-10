package com.jknows_backend.dao;

import com.jknows_backend.entity.LikeAnswer;

import java.util.List;

public interface LikeAnswerDao {

    List<LikeAnswer> getLikeAnswer(int userId);

    void saveLikeAnswer(int userId, int answerId, int liked);

    String isLikeAnswer(int userId, int answerId);
}
