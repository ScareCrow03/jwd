package com.jknows_backend.daoimpl;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.Comment;
import com.jknows_backend.entity.Question;
import com.jknows_backend.repository.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
@WebMvcTest(CommentDaoImpl.class)
class CommentDaoImplTest {

    @MockBean
    CommentRepository commentRepository;

    @MockBean
    LikeCommentRepository likeCommentRepository;

    @MockBean
    AnswerRepository answerRepository;

    @Autowired
    CommentDaoImpl commentDao;

    static Comment c1;
    static Answer a1;
    static List<Comment> l;

    @BeforeAll
    public static void setUp() {
        c1 = new Comment();
        c1.setCommentId(1);
        c1.setUserId(5);
        c1.setAnswerId(1);
        c1.setResponseId(1);
        c1.setContent("支持臧院长");
        c1.setTime(Timestamp.valueOf("2023-6-28 10:00:00.00"));
        c1.setLiked(2);
        a1 = new Answer();
        a1.setAnswerId(1);
        a1.setUserId(4);
        a1.setQuestionId(2);
        a1.setContent("很显然包括上海交通大学。");
        a1.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        a1.setLiked(4);
        a1.setComment(6);
    }

    @Test
    void getComment() {
        l = new ArrayList<>(); l.add(c1);
        c1.setResponseId(0);
        when(commentRepository.findCommentsByAnswerId(2)).thenReturn(l);
        c1.setResponseId(1);
        assertEquals(commentDao.getComment(2), l);
        commentDao.getComment(1);
    }

    @Test
    void saveComment() {
        when(commentRepository.save(any())).thenReturn(c1);
        when(answerRepository.findAnswerByAnswerId(1)).thenReturn(a1);
        commentDao.saveComment(1, 5, 1, 1, "支持臧院长");
        commentDao.saveComment(0, 5, 1, 1, "支持臧院长");
    }

    @Test
    void deleteComment() {
        when(commentRepository.findCommentByCommentId(1)).thenReturn(c1);
        when(answerRepository.findAnswerByAnswerId(1)).thenReturn(a1);
        assertEquals(commentDao.deleteComment(1), 1);
    }
}