package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
class UserTest {

    static User a, b;

    @BeforeEach
    void setUp() {
        a = new User();
        a.setUserId(1);
        a.setFollower(1);
        a.setFollowee(1);
        a.setAddress("");
        a.setAvatar("");
        a.setEmail("");
        a.setDescription("");
        a.setQq("");
        a.setNickname("");
        a.setTelephone("");
        a.setMessageFlag(1);
        b = new User();
        b.setUserId(1);
        b.setFollower(1);
        b.setFollowee(1);
        b.setAddress("");
        b.setAvatar("");
        b.setEmail("");
        b.setDescription("");
        b.setQq("");
        b.setNickname("");
        b.setTelephone("");
        b.setMessageFlag(1);
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
    void getNickname() {
        assertEquals(a.getNickname(), "");
    }

    @Test
    void setNickname() {
        a.setNickname("");
    }

    @Test
    void getTelephone() {
        assertEquals(a.getTelephone(), "");
    }

    @Test
    void setTelephone() {
        a.setTelephone("");
    }

    @Test
    void getEmail() {
        assertEquals(a.getEmail(), "");
    }

    @Test
    void setEmail() {
        a.setEmail("");
    }

    @Test
    void getAddress() {
        assertEquals(a.getAddress(), "");
    }

    @Test
    void setAddress() {
        a.setAddress("");
    }

    @Test
    void getAvatar() {
        assertEquals(a.getAvatar(), "");
    }

    @Test
    void setAvatar() {
        a.setAvatar("");
    }

    @Test
    void getQq() {
        assertEquals(a.getQq(), "");
    }

    @Test
    void setQq() {
        a.setQq("");
    }

    @Test
    void getDescription() {
        assertEquals(a.getDescription(), "");
    }

    @Test
    void setDescription() {
        a.setDescription("");
    }

    @Test
    void getFollower() {
        assertEquals(a.getFollower(), 1);
    }

    @Test
    void setFollower() {
        a.setFollower(1);
    }

    @Test
    void getFollowee() {
        assertEquals(a.getFollowee(), 1);
    }

    @Test
    void setFollowee() {
        a.setFollowee(1);
    }

    @Test
    void getMessageFlag() {
        assertEquals(a.getMessageFlag(), 1);
    }

    @Test
    void setMessageFlag() {
        a.setMessageFlag(1);
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