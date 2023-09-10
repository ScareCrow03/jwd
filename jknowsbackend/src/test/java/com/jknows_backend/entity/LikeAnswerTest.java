package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
class LikeAnswerTest {


    static Answer u;
    static LikeAnswer a, b;

    @BeforeEach
    void setUp() {
        u = new Answer();
        a = new LikeAnswer();
        a.setLikeAnswerId(1);
        a.setUserId(1);
        a.setAnswerInfo(u);
        a.setAnswerId(1);
        a.setLiked(1);
        b = new LikeAnswer();
        b.setLikeAnswerId(1);
        b.setUserId(1);
        b.setAnswerInfo(u);
        b.setAnswerId(1);
        b.setLiked(1);
    }
    @Test
    void getAnswerInfo() {
        assertEquals(a.getAnswerInfo(), u);
    }

    @Test
    void setAnswerInfo() {
        a.setAnswerInfo(u);
    }

    @Test
    void getLikeAnswerId() {
        assertEquals(a.getLikeAnswerId(), 1);
    }

    @Test
    void setLikeAnswerId() {
        a.setLikeAnswerId(1);
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
    void getAnswerId() {
        assertEquals(a.getAnswerId(), 1);
    }

    @Test
    void setAnswerId() {
        a.setAnswerId(1);
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