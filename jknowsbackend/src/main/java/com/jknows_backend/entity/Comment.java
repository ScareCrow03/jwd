package com.jknows_backend.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "comment_t", schema = "jknows", catalog = "")
public class Comment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "comment_id")
    private int commentId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "answer_id")
    private int answerId;
    @Basic
    @Column(name = "response_id")
    private int responseId;
    @Basic
    @Column(name = "content")
    private String content;
    @Basic
    @Column(name = "time")
    private Timestamp time;
    @Basic
    @Column(name = "liked")
    private int liked;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable=false, updatable=false)
    private User userInfo;

    public User getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }

    @ManyToOne
    @JoinColumn(name = "response_id", insertable=false, updatable=false)
    private User responseInfo;

    public User getResponseInfo() {
        return responseInfo;
    }

    public void setResponseInfo(User responseInfo) {
        this.responseInfo = responseInfo;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAnswerId() {
        return answerId;
    }

    public void setAnswerId(int answerId) {
        this.answerId = answerId;
    }

    public int getResponseId() {
        return responseId;
    }

    public void setResponseId(int responseId) {
        this.responseId = responseId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public int getLiked() {
        return liked;
    }

    public void setLiked(int liked) {
        this.liked = liked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Comment comment = (Comment) o;

        if (commentId != comment.commentId) return false;
        if (userId != comment.userId) return false;
        if (answerId != comment.answerId) return false;
        if (responseId != comment.responseId) return false;
        if (liked != comment.liked) return false;
        if (content != null ? !content.equals(comment.content) : comment.content != null) return false;
        if (time != null ? !time.equals(comment.time) : comment.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = commentId;
        result = 31 * result + userId;
        result = 31 * result + answerId;
        result = 31 * result + responseId;
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + liked;
        return result;
    }
}
