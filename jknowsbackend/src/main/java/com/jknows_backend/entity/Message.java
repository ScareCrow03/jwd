package com.jknows_backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "message_t", schema = "jknows", catalog = "")
public class Message implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "message_id")
    private int messageId;
    @Basic
    @Column(name = "sender")
    private int sender;
    @Basic
    @Column(name = "receiver")
    private int receiver;
    @Basic
    @Column(name = "question_id")
    private int questionId;

    @ManyToOne
    @JoinColumn(name = "sender", insertable=false, updatable=false)
    private User senderInfo;

    public User getSenderInfo() {
        return senderInfo;
    }

    public void setSenderInfo(User senderInfo) {
        this.senderInfo = senderInfo;
    }

    @ManyToOne
    @JoinColumn(name = "question_id", insertable=false, updatable=false)
    private Question questionInfo;

    public Question getQuestionInfo() {
        return questionInfo;
    }

    public void setQuestionInfo(Question questionInfo) {
        this.questionInfo = questionInfo;
    }

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public int getSender() {
        return sender;
    }

    public void setSender(int sender) {
        this.sender = sender;
    }

    public int getReceiver() {
        return receiver;
    }

    public void setReceiver(int receiver) {
        this.receiver = receiver;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return messageId == message.messageId && sender == message.sender && receiver == message.receiver && questionId == message.questionId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageId, sender, receiver, questionId);
    }
}
