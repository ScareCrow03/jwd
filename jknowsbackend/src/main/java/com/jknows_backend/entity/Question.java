package com.jknows_backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "question_t", schema = "jknows", catalog = "")
public class Question implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "question_id")
    private int questionId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "content")
    private String content;
    @Basic
    @Column(name = "time")
    private Timestamp time;
    @Basic
    @Column(name = "tag1")
    private String tag1;
    @Basic
    @Column(name = "tag2")
    private String tag2;
    @Basic
    @Column(name = "tag3")
    private String tag3;
    @Basic
    @Column(name = "tag4")
    private String tag4;
    @Basic
    @Column(name = "tag5")
    private String tag5;
    @Basic
    @Column(name = "follow")
    private int follow;
    @Basic
    @Column(name = "liked")
    private int liked;
    @Basic
    @Column(name = "answer")
    private int answer;

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getTag1() {
        return tag1;
    }

    public void setTag1(String tag1) {
        this.tag1 = tag1;
    }

    public String getTag2() {
        return tag2;
    }

    public void setTag2(String tag2) {
        this.tag2 = tag2;
    }

    public String getTag3() {
        return tag3;
    }

    public void setTag3(String tag3) {
        this.tag3 = tag3;
    }

    public String getTag4() {
        return tag4;
    }

    public void setTag4(String tag4) {
        this.tag4 = tag4;
    }

    public String getTag5() {
        return tag5;
    }

    public void setTag5(String tag5) {
        this.tag5 = tag5;
    }

    public int getFollow() {
        return follow;
    }

    public void setFollow(int follow) {
        this.follow = follow;
    }

    public int getLiked() {
        return liked;
    }

    public void setLiked(int liked) {
        this.liked = liked;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Question question = (Question) o;

        if (questionId != question.questionId) return false;
        if (userId != question.userId) return false;
        if (follow != question.follow) return false;
        if (liked != question.liked) return false;
        if (answer != question.answer) return false;
        if (title != null ? !title.equals(question.title) : question.title != null) return false;
        if (content != null ? !content.equals(question.content) : question.content != null) return false;
        if (time != null ? !time.equals(question.time) : question.time != null) return false;
        if (tag1 != null ? !tag1.equals(question.tag1) : question.tag1 != null) return false;
        if (tag2 != null ? !tag2.equals(question.tag2) : question.tag2 != null) return false;
        if (tag3 != null ? !tag3.equals(question.tag3) : question.tag3 != null) return false;
        if (tag4 != null ? !tag4.equals(question.tag4) : question.tag4 != null) return false;
        if (tag5 != null ? !tag5.equals(question.tag5) : question.tag5 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = questionId;
        result = 31 * result + userId;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (tag1 != null ? tag1.hashCode() : 0);
        result = 31 * result + (tag2 != null ? tag2.hashCode() : 0);
        result = 31 * result + (tag3 != null ? tag3.hashCode() : 0);
        result = 31 * result + (tag4 != null ? tag4.hashCode() : 0);
        result = 31 * result + (tag5 != null ? tag5.hashCode() : 0);
        result = 31 * result + follow;
        result = 31 * result + liked;
        result = 31 * result + answer;
        return result;
    }
}
