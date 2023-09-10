package com.jknows_backend.controller;

import com.jknows_backend.entity.Comment;
import com.jknows_backend.service.CommentService;
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

@WebMvcTest(CommentController.class)
class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    CommentService commentService;

    static Comment c1;
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
    }
    @Test
    void getComment() throws Exception {
        l = new ArrayList<>(); l.add(c1);
        when(commentService.getComment(2)).thenReturn(l);
        RequestBuilder request = MockMvcRequestBuilders.post("/getComment")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("answerId", "2");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(jsonPath("$[0].commentId").value(1))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    void saveComment() throws Exception {
        when(commentService.saveComment(1, 2, 1, 0, "good")).thenReturn(c1);
        RequestBuilder request = MockMvcRequestBuilders.post("/saveComment")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("commentId", "1")
                .param("userId", "2")
                .param("answerId", "1")
                .param("responseId", "0")
                .param("content", "good");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(jsonPath("commentId").value(1))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    void deleteComment() throws Exception {
        when(commentService.deleteComment(1)).thenReturn(1);
        RequestBuilder request = MockMvcRequestBuilders.post("/deleteComment")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("commentId", "1");
        MvcResult mvcResult = this.mockMvc.perform(request)
//                .andDo(print())
                .andExpect(content().string("1"))
                .andExpect(status().isOk()).andReturn();
    }
}