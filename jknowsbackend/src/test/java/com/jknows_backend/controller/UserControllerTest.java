package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.User;
import com.jknows_backend.controller.AnswerController;
import com.jknows_backend.controller.UserController;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.RepeatedTest;
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
class UserControllerTest {

    @Autowired
    UserController userController;

    @RepeatedTest(value = 1000)
    void getUser() {
        for (int i = 1; i <= 6; i++)
            userController.getUser(i);
    }

    @Test
    void saveUser() {
        userController.saveUser(2, "ILoLy", "15017640364", "iloly10@sjtu.edu.cn", "SJTU-X12", "https://i.postimg.cc/Bvz2Tsbp/zyc.jpg", "3440233385", "我是用户zyc！");
    }
}