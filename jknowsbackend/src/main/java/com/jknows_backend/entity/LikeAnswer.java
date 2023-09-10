package com.jknows_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "like_answer", schema = "jknows", catalog = "")
public class LikeAnswer {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "like_answer_id")
    private int likeAnswerId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "answer_id")
    private int answerId;
    @Basic
    @Column(name = "liked")
    private int liked;

    @ManyToOne
    @JoinColumn(name = "answer_id", insertable=false, updatable=false)
    private Answer answerInfo;

    public Answer getAnswerInfo() {
        return answerInfo;
    }

    public void setAnswerInfo(Answer answerInfo) {
        this.answerInfo = answerInfo;
    }

    public int getLikeAnswerId() {
        return likeAnswerId;
    }

    public void setLikeAnswerId(int likeAnswerId) {
        this.likeAnswerId = likeAnswerId;
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

        LikeAnswer that = (LikeAnswer) o;

        if (likeAnswerId != that.likeAnswerId) return false;
        if (userId != that.userId) return false;
        if (answerId != that.answerId) return false;
        if (liked != that.liked) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = likeAnswerId;
        result = 31 * result + userId;
        result = 31 * result + answerId;
        result = 31 * result + liked;
        return result;
    }
}
