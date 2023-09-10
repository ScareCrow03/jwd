package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;


class AnswerTest {

    static Answer a, b;
    static User u;
    static Question q;

    @BeforeEach
    void setUp() {
        u = new User();
        q = new Question();
        a = new Answer();
        a.setQuestion(q);
        a.setLiked(1);
        a.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        a.setComment(1);
        a.setAnswerId(1);
        a.setContent("");
        a.setUserInfo(u);
        a.setUserId(1);
        a.setQuestionId(1);
        b = new Answer();
        b.setQuestion(q);
        b.setLiked(1);
        b.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        b.setComment(1);
        b.setAnswerId(1);
        b.setContent("");
        b.setUserInfo(u);
        b.setUserId(1);
        b.setQuestionId(1);
    }

    @Test
    void getUserInfo() {
        assertEquals(a.getUserInfo(), u);
    }

    @Test
    void setUserInfo() {
        a.setUserInfo(u);
    }

    @Test
    void getQuestion() {
        assertEquals(a.getQuestion(), q);
    }

    @Test
    void setQuestion() {
        a.setQuestion(q);
    }

    @Test
    void getAnswerId() {
        assertEquals(a.getAnswerId(), 1);
    }

    @Test
    void setAnswerId() {
        a.setAnswerId(1);
    }

    @Test
    void getUserId() {
        assertEquals(a.getUserId(), 1);
    }

    @Test
    void setUserId() {
        a.setUserId(4);
    }

    @Test
    void getQuestionId() {
        assertEquals(a.getQuestionId(), 1);
    }

    @Test
    void setQuestionId() {
        a.setQuestionId(1);
    }

    @Test
    void getContent() {
        assertEquals(a.getContent(), "");
    }

    @Test
    void setContent() {
        a.setContent("");
    }

    @Test
    void getTime() {
        assertEquals(a.getTime(), Timestamp.valueOf("2023-6-28 09:00:00.00"));
    }

    @Test
    void setTime() {
        a.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
    }

    @Test
    void getLiked() {
        assertEquals(a.getLiked(), 1);
    }

    @Test
    void setLiked() {
        a.setLiked(1);
    }

    @Test
    void getComment() {
        assertEquals(a.getComment(), 1);
    }

    @Test
    void setComment() {
        a.setComment(1);
    }

    @Test
    void testEquals() {
        assertEquals(a, b);
    }

    @Test
    void testHashCode() {
        a.hashCode();
    }
}