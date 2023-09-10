package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.User;
import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.controller.AnswerController;
import com.jknows_backend.controller.UserAuthController;
import com.jknows_backend.controller.UserController;
import org.apache.commons.lang.RandomStringUtils;
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
class UserAuthControllerTest {

    @Autowired
    UserAuthController userAuthController;

    @Autowired
    UserController userController;

    @Test
    void checkUserAuth() {
        userAuthController.checkUserAuth("zyc", "123456");
        userAuthController.checkUserAuth("zyc", "1123456");
    }

    @Test
    void saveUserAuth() {

//        userAuthController.saveUserAuth("zyc", "123456");
//        userAuthController.saveUserAuth("zyc3", "123456");
//        int n = 10;
//        for (int i = 1; i <= 1000; i++) {
//            userAuthController.saveUserAuth("robot" + i, "123456");
//            userController.saveUser(i + n,
//                    RandomStringUtils.randomAlphabetic(6),
//                    RandomStringUtils.randomNumeric(11),
//                    RandomStringUtils.randomAlphabetic(11),
//                    RandomStringUtils.randomAlphabetic(11),
//                    "https://i.postimg.cc/Hj0H9nXN/iphone14pro.jpg",
//                    RandomStringUtils.randomNumeric(11),
//                    "我是机器人" + i + "号。"
//                    );
//        }
//        userController.saveUser(1019, "123456", "", "", "", "", "", "");
        userAuthController.saveUserAuth("djw", "123456");
        userAuthController.saveUserAuth("snr", "123456");
        userAuthController.saveUserAuth("jbot", "123456");
        userAuthController.saveUserAuth("jackeylove", "123456");
    }
}