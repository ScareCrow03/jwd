package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserAuthTest {
    static UserAuth a, b;

    @BeforeEach
    void setUp() {
        a = new UserAuth();
        a.setUserId(1);
        a.setUsername("");
        a.setPassword("");
        a.setSalt("");
        b = new UserAuth();
        b.setUserId(1);
        b.setUsername("");
        b.setPassword("");
        b.setSalt("");
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
    void getUsername() {
        assertEquals(a.getUsername(), "");
    }

    @Test
    void setUsername() {
        a.setUsername("");
    }

    @Test
    void getPassword() {
        assertEquals(a.getPassword(), "");
    }

    @Test
    void setPassword() {
        a.setPassword("");
    }

    @Test
    void getSalt() {
        assertEquals(a.getSalt(), "");
    }

    @Test
    void setSalt() {
        a.setSalt("");
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