package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class QuestionTest {

    static User u;
    static Question a, b;

    @BeforeEach
    void setUp() {
        u = new User();
        a = new Question();
        a.setQuestionId(1);
        a.setUserId(1);
        a.setTitle("");
        a.setContent("");
        a.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        a.setTag1("");
        a.setTag2("");
        a.setTag3("");
        a.setTag4("");
        a.setTag5("");
        a.setFollow(1);
        a.setLiked(1);
        a.setAnswer(1);
        b = new Question();
        b.setQuestionId(1);
        b.setUserId(1);
        b.setTitle("");
        b.setContent("");
        b.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        b.setTag1("");
        b.setTag2("");
        b.setTag3("");
        b.setTag4("");
        b.setTag5("");
        b.setFollow(1);
        b.setLiked(1);
        b.setAnswer(1);
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
    void getUserId() {
        assertEquals(a.getUserId(), 1);
    }

    @Test
    void setUserId() {
        a.setUserId(1);
    }

    @Test
    void getTitle() {
        assertEquals(a.getTitle(), "");
    }

    @Test
    void setTitle() {
        a.setTitle("");
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
    void getTag1() {
        assertEquals(a.getTag1(), "");
    }

    @Test
    void setTag1() {
        a.setTag1("");
    }

    @Test
    void getTag2() {
        assertEquals(a.getTag2(), "");
    }

    @Test
    void setTag2() {
        a.setTag2("");
    }

    @Test
    void getTag3() {
        assertEquals(a.getTag3(), "");
    }

    @Test
    void setTag3() {
        a.setTag3("");
    }

    @Test
    void getTag4() {
        assertEquals(a.getTag4(), "");
    }

    @Test
    void setTag4() {
        a.setTag4("");
    }

    @Test
    void getTag5() {
        assertEquals(a.getTag5(), "");
    }

    @Test
    void setTag5() {
        a.setTag5("");
    }

    @Test
    void getFollow() {
        assertEquals(a.getFollow(), 1);
    }

    @Test
    void setFollow() {
        a.setFollow(1);
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
    void getAnswer() {
        assertEquals(a.getAnswer(), 1);
    }

    @Test
    void setAnswer() {
        a.setAnswer(1);
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