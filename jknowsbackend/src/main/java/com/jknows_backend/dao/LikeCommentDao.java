package com.jknows_backend.dao;

import com.jknows_backend.entity.LikeComment;

import java.util.List;

public interface LikeCommentDao {

    void saveLikeComment(int userId, int commentId, int liked);

    int isLikeComment(int userId, int commentId);

    List<LikeComment> getLikeComment(int userId);
}
