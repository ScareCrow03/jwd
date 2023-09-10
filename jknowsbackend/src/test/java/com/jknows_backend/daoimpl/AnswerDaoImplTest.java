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
@WebMvcTest(AnswerDaoImpl.class)
class AnswerDaoImplTest {

    @MockBean
    AnswerRepository answerRepository;

    @MockBean
    LikeAnswerRepository likeAnswerRepository;

    @MockBean
    CommentRepository commentRepository;

    @MockBean
    LikeCommentRepository likeCommentRepository;

    @MockBean
    QuestionRepository questionRepository;

    @Autowired
    AnswerDaoImpl answerDao;

    static Answer a1, a2, a3;
    static Question q;
    static Comment c;
    static List<Answer> l;
    static List<Comment> lc;

    @BeforeAll
    public static void setUp() {
        a1 = new Answer();
        a1.setAnswerId(1);
        a1.setUserId(4);
        a1.setQuestionId(2);
        a1.setContent("很显然包括上海交通大学。");
        a1.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        a1.setLiked(4);
        a1.setComment(6);
//        String s1 = toJSONString(a1);
        a2 = new Answer();
        a2.setAnswerId(2);
        a2.setUserId(6);
        a2.setQuestionId(2);
        a2.setContent("我认为有西北工业大学。");
        a2.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        a2.setLiked(-3);
        a2.setComment(0);
        a3 = new Answer();
        a3.setAnswerId(3);
        a3.setUserId(5);
        a3.setQuestionId(2);
        a3.setContent("我认为不包括复旦大学。");
        a3.setTime(Timestamp.valueOf("2023-6-28 09:00:00.00"));
        a3.setLiked(1);
        a3.setComment(1);
        q = new Question();
        q.setQuestionId(2);
        q.setUserId(2);
        q.setTitle("中国top3高校是哪几所？");
        q.setContent("众所周知，中国有近十所top3高校。");
        q.setTime(Timestamp.valueOf("2023-6-22 10:00:00.00"));
        q.setTag1("大学");
        q.setTag2("教育");
        q.setTag3("985");
        q.setTag4("大学排名");
        q.setTag5("");
        q.setFollow(2);
        q.setLiked(2);
        q.setAnswer(3);
        c = new Comment();
        c.setCommentId(1);
        c.setUserId(5);
        c.setAnswerId(1);
        c.setResponseId(1);
        c.setContent("支持臧院长");
        c.setTime(Timestamp.valueOf("2023-6-28 10:00:00.00"));
        c.setLiked(2);
    }

    @Test
    public void getAnswer() throws Exception {
        l = new ArrayList<>(); l.add(a1); l.add(a2); l.add(a3);
        when(answerRepository.findAnswersByQuestionId(2)).thenReturn(l);
        assertEquals(answerDao.getAnswer(2), l);
    }

    @Test
    public void getAnswers() throws Exception {
        l = new ArrayList<>(); l.add(a1); l.add(a3);
        when(answerRepository.findAnswerByQuestionIdAndLimit(2, 0, 2)).thenReturn(l);
        assertEquals(answerDao.getAnswers(2, 1, 2), l);
    }

    @Test
    public void getUserAnswer() throws Exception {
        l = new ArrayList<>(); l.add(a1);
        when(answerRepository.findAnswersByUserId(4)).thenReturn(l);
        assertEquals(answerDao.getUserAnswer(4), l);
    }

    @Test
    public void getMyAnswer() throws Exception {
        when(answerRepository.findAnswerByQuestionIdAndUserId(2, 4)).thenReturn(a1);
        assertEquals(answerDao.getMyAnswer(2, 4), a1);
    }

    @Test
    public void saveAnswer1() throws Exception {
        when(answerRepository.save(any())).thenReturn(a1);
        when(questionRepository.findQuestionByQuestionId(2)).thenReturn(q);
        assertEquals(answerDao.saveAnswer(1, 4, 2, "很显然包括上海交通大学。").getAnswerId(), a1.getAnswerId());
    }

    @Test
    public void saveAnswer2() throws Exception {
        when(answerRepository.save(any())).thenReturn(a1);
        when(questionRepository.findQuestionByQuestionId(2)).thenReturn(q);
        assertEquals(answerDao.saveAnswer(0, 4, 2, "很显然包括上海交通大学。").getAnswerId(), a1.getAnswerId());
    }

    @Test
    public void deleteAnswer() throws Exception {
        when(answerRepository.findAnswerByAnswerId(1)).thenReturn(a1);
        when(questionRepository.findQuestionByQuestionId(2)).thenReturn(q);
        lc = new ArrayList<>(); lc.add(c);
        when(commentRepository.findCommentsByAnswerId(1)).thenReturn(lc);
        assertEquals(answerDao.deleteAnswer(1), 1);
    }

}