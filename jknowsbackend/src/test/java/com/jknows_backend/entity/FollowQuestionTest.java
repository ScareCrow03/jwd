package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
class FollowQuestionTest {

    static FollowQuestion a, b;

    static Question q;

    @BeforeEach
    void setUp() {
        q = new Question();
        a = new FollowQuestion();
        a.setFollowQuestionId(1);
        a.setUserId(1);
        a.setQuestionId(1);
        a.setQuestionInfo(q);
        b = new FollowQuestion();
        b.setFollowQuestionId(1);
        b.setUserId(1);
        b.setQuestionId(1);
        b.setQuestionInfo(q);
    }
    @Test
    void getQuestionInfo() {
        assertEquals(a.getQuestionInfo(), q);
    }

    @Test
    void setQuestionInfo() {
        a.setQuestionInfo(q);
    }

    @Test
    void getFollowQuestionId() {
        assertEquals(a.getFollowQuestionId(), 1);
    }

    @Test
    void setFollowQuestionId() {
        a.setFollowQuestionId(1);
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
    void testEquals() {
        assertEquals(a, b);
    }

    @Test
    void testHashCode() {
        a.hashCode();
    }
}