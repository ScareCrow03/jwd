package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.service.AnswerService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@WebMvcTest(AnswerController.class)
public class AnswerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    AnswerService answerService;

    static Answer a1, a2, a3;
    static List<Answer> l;

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
        when(answerService.getAnswer(2)).thenReturn(l);
        RequestBuilder request = MockMvcRequestBuilders.post("/getAnswer")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("questionId", "2");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(jsonPath("$[0].answerId").value(1))
                .andExpect(jsonPath("$[1].answerId").value(2))
                .andExpect(jsonPath("$[2].answerId").value(3))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void getAnswers() throws Exception {
        l = new ArrayList<>(); l.add(a1); l.add(a3);
        when(answerService.getAnswers(2, 1, 2)).thenReturn(l);
        RequestBuilder request = MockMvcRequestBuilders.post("/getAnswers")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("questionId", "2")
                .param("start", "1")
                .param("end", "2");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(jsonPath("$[0].answerId").value(1))
                .andExpect(jsonPath("$[1].answerId").value(3))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void saveAnswer() throws Exception {
        when(answerService.saveAnswer(1, 4, 2, "good")).thenReturn(a1);
        RequestBuilder request = MockMvcRequestBuilders.post("/saveAnswer")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("answerId", "1")
                .param("userId", "4")
                .param("questionId", "2")
                .param("content", "good");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(jsonPath("answerId").value(1))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void deleteAnswer() throws Exception {
        when(answerService.deleteAnswer(1)).thenReturn(1);
        RequestBuilder request = MockMvcRequestBuilders.post("/deleteAnswer")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("answerId", "1");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(content().string("1"))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void getUserAnswer() throws Exception {
        l = new ArrayList<>(); l.add(a1);
        when(answerService.getUserAnswer(4)).thenReturn(l);
        RequestBuilder request = MockMvcRequestBuilders.post("/getUserAnswer")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("userId", "4");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(jsonPath("$[0].answerId").value(1))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void getMyAnswer() throws Exception {
        when(answerService.getMyAnswer(2, 4)).thenReturn(a1);
        RequestBuilder request = MockMvcRequestBuilders.post("/getMyAnswer")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("questionId", "2")
                .param("userId", "4");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(jsonPath("answerId").value(1))
                .andExpect(jsonPath("userId").value(4))
                .andExpect(jsonPath("questionId").value(2))
                .andExpect(jsonPath("content").value("很显然包括上海交通大学。"))
                .andExpect(jsonPath("time").value("2023-06-28T01:00:00.000+00:00"))
                .andExpect(jsonPath("liked").value(4))
                .andExpect(jsonPath("comment").value(6))
                .andExpect(status().isOk()).andReturn();
//        String body = mvcResult.getResponse().getContentAsString(Charset.defaultCharset());
//        System.out.println(body);
    }

}

