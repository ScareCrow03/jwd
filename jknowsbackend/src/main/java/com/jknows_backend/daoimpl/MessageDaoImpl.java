package com.jknows_backend.daoimpl;

import com.jknows_backend.repository.MessageRepository;
import com.jknows_backend.dao.MessageDao;
import com.jknows_backend.entity.Message;
import com.jknows_backend.entity.Comment;
import com.jknows_backend.entity.Question;
import com.jknows_backend.entity.User;
import com.jknows_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

@Repository
public class MessageDaoImpl implements MessageDao {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public List<Message> getMessage(int userId) {
        User u = userRepository.findUserByUserId(userId);
        u.setMessageFlag(0);
        userRepository.save(u);
        return messageRepository.findMessagesByReceiver(userId);
    }

    @Override
    public List<Message> getMessages(int userId, int start, int end) {
        User u = userRepository.findUserByUserId(userId);
        u.setMessageFlag(0);
        userRepository.save(u);
        return messageRepository.findMessagesByReceiverAndLimit(userId, start - 1, end - start + 1);
    }

    @Override
    public Message addMessage(int sender, int receiver, int questionId) {

        User u = userRepository.findUserByUserId(receiver);
        u.setMessageFlag(1);
        userRepository.save(u);
        messageRepository.deleteMessageBySenderAndReceiverAndQuestionId(sender, receiver, questionId);
        Message m = new Message();
        m.setSender(sender);
        m.setReceiver(receiver);
        m.setQuestionId(questionId);
        return messageRepository.save(m);
    }


}

