package com.jknows_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "like_question", schema = "jknows", catalog = "")
public class LikeQuestion {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "like_question_id")
    private int likeQuestionId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "question_id")
    private int questionId;
    @Basic
    @Column(name = "liked")
    private int liked;

    @ManyToOne
    @JoinColumn(name = "question_id", insertable=false, updatable=false)
    private Question questionInfo;

    public Question getQuestionInfo() {
        return questionInfo;
    }

    public void setQuestionInfo(Question questionInfo) {
        this.questionInfo = questionInfo;
    }

    public int getLikeQuestionId() {
        return likeQuestionId;
    }

    public void setLikeQuestionId(int likeQuestionId) {
        this.likeQuestionId = likeQuestionId;
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

        LikeQuestion that = (LikeQuestion) o;

        if (likeQuestionId != that.likeQuestionId) return false;
        if (userId != that.userId) return false;
        if (questionId != that.questionId) return false;
        if (liked != that.liked) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = likeQuestionId;
        result = 31 * result + userId;
        result = 31 * result + questionId;
        result = 31 * result + liked;
        return result;
    }
}
