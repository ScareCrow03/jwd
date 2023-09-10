package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CommentTest {

    static Comment a, b;
    static User u;

    @BeforeEach
    void setUp() {
        u = new User();
        a = new Comment();
        a.setUserInfo(u);
        a.setResponseInfo(u);
        a.setUserId(1);
        a.setResponseId(1);
        a.setCommentId(1);
        a.setLiked(1);
        a.setContent("");
        a.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        a.setAnswerId(1);
        b = new Comment();
        b.setUserInfo(u);
        b.setResponseInfo(u);
        b.setUserId(1);
        b.setResponseId(1);
        b.setCommentId(1);
        b.setLiked(1);
        b.setContent("");
        b.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        b.setAnswerId(1);
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
    void getResponseInfo() {
        assertEquals(a.getResponseInfo(), u);
    }

    @Test
    void setResponseInfo() {
        a.setResponseInfo(u);
    }

    @Test
    void getCommentId() {
        assertEquals(a.getCommentId(), 1);
    }

    @Test
    void setCommentId() {
        a.setCommentId(1);
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
    void getResponseId() {
        assertEquals(a.getResponseId(), 1);
    }

    @Test
    void setResponseId() {
        a.setResponseId(1);
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
        a.setTime(Timestamp.valueOf("2023-6-22 10:00:00.00"));
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