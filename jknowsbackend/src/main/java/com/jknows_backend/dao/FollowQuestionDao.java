package com.jknows_backend.dao;

import com.jknows_backend.entity.FollowQuestion;

import java.util.List;

public interface FollowQuestionDao {

    List<FollowQuestion> getFollowQuestion(int userId);

    void saveFollowQuestion(int userId, int questionId, int follow);

    int isFollowQuestion(int userId, int questionId);
}
