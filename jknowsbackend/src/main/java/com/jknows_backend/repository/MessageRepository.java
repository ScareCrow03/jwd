package com.jknows_backend.repository;

import com.jknows_backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findMessagesByReceiver(int receiver);

    @Query(value = "select * from message_t a where receiver = ?1 order by message_id DESC limit ?2, ?3", nativeQuery = true)
            List<Message> findMessagesByReceiverAndLimit(int receiver, int l, int len);

    @Transactional
    void deleteMessageByQuestionId(int questionId);

    @Transactional
    void deleteMessageBySenderAndReceiverAndQuestionId(int sender, int receiver, int questionId);
}