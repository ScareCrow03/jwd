package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.User;
import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.controller.AnswerController;
import com.jknows_backend.controller.UserAuthController;
import com.jknows_backend.controller.UserController;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class MessageControllerTest {

    @Autowired
    MessageController messageController;

    @Test
    void getMessage() {
        messageController.getMessage(4);
    }

    @Test
    void getMessages() {
        messageController.getMessages(4, 1, 3);
    }

    @Test
    void addMessage() {
        messageController.addMessage(2, 4, 2);
    }
}