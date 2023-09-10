package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.CommentDao;
import com.jknows_backend.entity.Comment;
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

@WebMvcTest(CommentServiceImpl.class)
class CommentServiceImplTest {

    @MockBean
    CommentDao commentDao;

    static Comment c1, a2, a3;
    static List<Comment> l;
    @Autowired
    CommentServiceImpl commentService;

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
    void getComment() {
        l = new ArrayList<>(); l.add(c1);
        when(commentDao.getComment(2)).thenReturn(l);
        assertEquals(commentService.getComment(2), l);
    }

    @Test
    void saveComment() {
        when(commentDao.saveComment(1, 5, 1, 1, "good")).thenReturn(c1);
        assertEquals(commentService.saveComment(1, 5, 1, 1, "good"), c1);
    }

    @Test
    void deleteComment() {
        when(commentDao.deleteComment(1)).thenReturn(1);
        assertEquals(commentService.deleteComment(1), 1);
    }
}