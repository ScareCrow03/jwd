package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.FollowQuestion;
import com.jknows_backend.entity.User;
import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.service.AnswerService;
import com.jknows_backend.service.FollowQuestionService;
import com.jknows_backend.service.UserAuthService;
import com.jknows_backend.service.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class FollowQuestionControllerTest {

    @Autowired
    private FollowQuestionController followQuestionController;

    @Test
    void getFollowQuestion() throws Exception {
        followQuestionController.getFollowQuestion(2);
    }

    @Test
    void saveFollowQuestion() {
        followQuestionController.saveFollowQuestion(2, 3, 1);
        followQuestionController.saveFollowQuestion(2, 3, 1);
        followQuestionController.saveFollowQuestion(2, 3, 0);
        followQuestionController.saveFollowQuestion(2, 3, 0);
        followQuestionController.saveFollowQuestion(2, 3, 1);
    }

    @Test
    void isFollowQuestion() {
        followQuestionController.isFollowQuestion(2, 1);

    }
}