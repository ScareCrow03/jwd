package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
class LikeQuestionTest {


    static Question u;
    static LikeQuestion a, b;

    @BeforeEach
    void setUp() {
        u = new Question();
        a = new LikeQuestion();
        a.setLikeQuestionId(1);
        a.setUserId(1);
        a.setQuestionInfo(u);
        a.setQuestionId(1);
        a.setLiked(1);
        b = new LikeQuestion();
        b.setLikeQuestionId(1);
        b.setUserId(1);
        b.setQuestionInfo(u);
        b.setQuestionId(1);
        b.setLiked(1);
    }
    @Test
    void getQuestionInfo() {
        assertEquals(a.getQuestionInfo(), u);
    }

    @Test
    void setQuestionInfo() {
        a.setQuestionInfo(u);
    }

    @Test
    void getLikeQuestionId() {
        assertEquals(a.getLikeQuestionId(), 1);
    }

    @Test
    void setLikeQuestionId() {
        a.setLikeQuestionId(1);
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
    void getQuestionId() {
        assertEquals(a.getQuestionId(), 1);
    }

    @Test
    void setQuestionId() {
        a.setQuestionId(1);
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
    void testEquals() {
        assertEquals(a, b);
    }

    @Test
    void testHashCode() {
        a.hashCode();
    }
}