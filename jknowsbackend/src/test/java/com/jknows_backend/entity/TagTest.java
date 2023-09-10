package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.*;

class TagTest {

    static Tag a, b;

    @BeforeEach
    void setUp() {
        a = new Tag();
        a.setTagId(1);
        a.setContent("");
        b = new Tag();
        b.setTagId(1);
        b.setContent("");
    }
    @Test
    void getTagId() {
        assertEquals(a.getTagId(), 1);
    }

    @Test
    void setTagId() {
        a.setTagId(1);
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
    void testEquals() {
        assertEquals(a, b);
    }

    @Test
    void testHashCode() {
        a.hashCode();
    }
}