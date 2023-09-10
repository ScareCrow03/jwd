package com.jknows_backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MessageTest {

    static Message a, b;
    static User u;
    static Question q;

    @BeforeEach
    void setUp() {
        u = new User();
        q = new Question();
        a = new Message();
        a.setMessageId(1);
        a.setSender(1);
        a.setReceiver(1);
        a.setQuestionId(1);
        a.setSenderInfo(u);
        a.setQuestionInfo(q);
        b = new Message();
        b.setMessageId(1);
        b.setSender(1);
        b.setReceiver(1);
        b.setQuestionId(1);
        b.setSenderInfo(u);
        b.setQuestionInfo(q);
    }
    @Test
    void getMessageId() {
        assertEquals(a.getMessageId(), 1);
    }

    @Test
    void setMessageId() {
        a.setMessageId(1);
    }

    @Test
    void getSender() {
        assertEquals(a.getSender(), 1);
    }

    @Test
    void setSender() {
        a.setSender(1);
    }

    @Test
    void getReceiver() {
        assertEquals(a.getReceiver(), 1);
    }

    @Test
    void setReceiver() {
        a.setReceiver(1);
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
    void getSenderInfo() {
        assertEquals(a.getSenderInfo(), u);
    }

    @Test
    void setSenderInfo() {
        a.setSenderInfo(u);
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
    void testEquals() {
        assertEquals(a, b);
    }

    @Test
    void testHashCode() {
        a.hashCode();
    }
}