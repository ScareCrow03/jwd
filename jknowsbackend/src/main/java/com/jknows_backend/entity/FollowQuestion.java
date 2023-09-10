package com.jknows_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "follow_question", schema = "jknows", catalog = "")
public class FollowQuestion {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "follow_question_id")
    private int followQuestionId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "question_id")
    private int questionId;

    @ManyToOne
    @JoinColumn(name = "question_id", insertable=false, updatable=false)
    private Question questionInfo;

    public Question getQuestionInfo() {
        return questionInfo;
    }

    public void setQuestionInfo(Question questionInfo) {
        this.questionInfo = questionInfo;
    }

    public int getFollowQuestionId() {
        return followQuestionId;
    }

    public void setFollowQuestionId(int followQuestionId) {
        this.followQuestionId = followQuestionId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FollowQuestion that = (FollowQuestion) o;

        if (followQuestionId != that.followQuestionId) return false;
        if (userId != that.userId) return false;
        if (questionId != that.questionId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = followQuestionId;
        result = 31 * result + userId;
        result = 31 * result + questionId;
        return result;
    }
}
