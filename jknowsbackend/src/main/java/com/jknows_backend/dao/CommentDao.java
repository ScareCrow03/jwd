package com.jknows_backend.dao;

import com.jknows_backend.entity.Comment;

import java.util.List;

public interface CommentDao {

    List<Comment> getComment(int answerId);

    Comment saveComment(int commentId, int userId, int answerId, int responseId, String content);

    int deleteComment(int commentId);
}
