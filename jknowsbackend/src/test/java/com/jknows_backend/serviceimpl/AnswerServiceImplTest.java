package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.AnswerDao;
import com.jknows_backend.entity.Answer;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@WebMvcTest(AnswerServiceImpl.class)
public class AnswerServiceImplTest {

    @MockBean
    AnswerDao answerDao;

    static Answer a1, a2, a3;
    static List<Answer> l;
    @Autowired
    AnswerServiceImpl answerService;

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
    }

    @Test
    public void getAnswer() throws Exception {
        l = new ArrayList<>(); l.add(a1); l.add(a2); l.add(a3);
        when(answerDao.getAnswer(2)).thenReturn(l);
        assertEquals(answerService.getAnswer(2), l);
    }

    @Test
    public void getAnswers() throws Exception {
        l = new ArrayList<>(); l.add(a1); l.add(a3);
        when(answerDao.getAnswers(2, 1, 2)).thenReturn(l);
        assertEquals(answerService.getAnswers(2, 1, 2), l);
    }

    @Test
    public void saveAnswer() throws Exception {
        when(answerDao.saveAnswer(1, 4, 2, "good")).thenReturn(a1);
        assertEquals(answerService.saveAnswer(1, 4, 2, "good"), a1);
    }

    @Test
    public void deleteAnswer() throws Exception {
        when(answerDao.deleteAnswer(1)).thenReturn(1);
        assertEquals(answerService.deleteAnswer(1), 1);
    }

    @Test
    public void getUserAnswer() throws Exception {
        l = new ArrayList<>(); l.add(a1);
        when(answerDao.getUserAnswer(4)).thenReturn(l);
        assertEquals(answerService.getUserAnswer(4), l);
    }

    @Test
    public void getMyAnswer() throws Exception {
        when(answerDao.getMyAnswer(2, 4)).thenReturn(a1);
        assertEquals(answerService.getMyAnswer(2, 4), a1);
    }

}

