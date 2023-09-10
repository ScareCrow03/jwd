package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
class LikeCommentTest {


    static Comment u;
    static LikeComment a, b;

    @BeforeEach
    void setUp() {
        u = new Comment();
        a = new LikeComment();
        a.setLikeCommentId(1);
        a.setUserId(1);
        a.setCommentInfo(u);
        a.setCommentId(1);
        a.setLiked(1);
        b = new LikeComment();
        b.setLikeCommentId(1);
        b.setUserId(1);
        b.setCommentInfo(u);
        b.setCommentId(1);
        b.setLiked(1);
    }
    @Test
    void getCommentInfo() {
        assertEquals(a.getCommentInfo(), u);
    }

    @Test
    void setCommentInfo() {
        a.setCommentInfo(u);
    }

    @Test
    void getLikeCommentId() {
        assertEquals(a.getLikeCommentId(), 1);
    }

    @Test
    void setLikeCommentId() {
        a.setLikeCommentId(1);
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
    void getCommentId() {
        assertEquals(a.getCommentId(), 1);
    }

    @Test
    void setCommentId() {
        a.setCommentId(1);
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