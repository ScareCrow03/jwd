package com.jknows_backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Entity
public class Answer implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "answer_id")
    private int answerId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "question_id")
    private int questionId;
    @Basic
    @Column(name = "content")
    private String content;
    @Basic
    @Column(name = "time")
    private Timestamp time;
    @Basic
    @Column(name = "liked")
    private int liked;
    @Basic
    @Column(name = "comment")
    private int comment;

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
    @JoinColumn(name = "question_id", insertable=false, updatable=false)
    private Question question;

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public int getAnswerId() {
        return answerId;
    }

    public void setAnswerId(int answerId) {
        this.answerId = answerId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
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

    public int getComment() {
        return comment;
    }

    public void setComment(int comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Answer answer = (Answer) o;

        if (answerId != answer.answerId) return false;
        if (userId != answer.userId) return false;
        if (questionId != answer.questionId) return false;
        if (liked != answer.liked) return false;
        if (comment != answer.comment) return false;
        if (content != null ? !content.equals(answer.content) : answer.content != null) return false;
        if (time != null ? !time.equals(answer.time) : answer.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = answerId;
        result = 31 * result + userId;
        result = 31 * result + questionId;
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + liked;
        result = 31 * result + comment;
        return result;
    }
}
