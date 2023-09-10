package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FollowUserTest {

    static FollowUser a, b;

    static User q;

    @BeforeEach
    void setUp() {
        q = new User();
        a = new FollowUser();
        a.setFollowUserId(1);
        a.setUserId(1);
        a.setFollowee(1);
        a.setFolloweeInfo(q);
        a.setUserInfo(q);
        b = new FollowUser();
        b.setFollowUserId(1);
        b.setUserId(1);
        b.setFollowee(1);
        b.setFolloweeInfo(q);
        b.setUserInfo(q);
    }
    @Test
    void getUserInfo() {
        assertEquals(a.getUserInfo(), q);
    }

    @Test
    void setUserInfo() {
    }

    @Test
    void getFolloweeInfo() {
        assertEquals(a.getFolloweeInfo(), q);
    }

    @Test
    void setFolloweeInfo() {
    }

    @Test
    void getFollowUserId() {
        assertEquals(a.getFollowUserId(), 1);
    }

    @Test
    void setFollowUserId() {
    }

    @Test
    void getUserId() {
        assertEquals(a.getUserId(), 1);
    }

    @Test
    void setUserId() {
    }

    @Test
    void getFollowee() {
        assertEquals(a.getFollowee(), 1);
    }

    @Test
    void setFollowee() {
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