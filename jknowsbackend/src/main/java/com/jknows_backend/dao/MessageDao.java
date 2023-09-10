package com.jknows_backend.dao;

import com.jknows_backend.entity.Message;

import java.util.List;

public interface MessageDao {

    List<Message> getMessage(int questionId);

    List<Message> getMessages(int userId, int start, int end);

    Message addMessage(int sender, int receiver, int questionId);


}
