package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.FollowUser;
import com.jknows_backend.entity.User;
import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.repository.FollowUserRepository;
import com.jknows_backend.repository.UserRepository;
import com.jknows_backend.service.AnswerService;
import com.jknows_backend.service.FollowUserService;
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
class FollowUserControllerTest {

    @Autowired
    private FollowUserController followUserController;

    @Test
    void getFollowUser() throws Exception {
        followUserController.getFollower(2);
        followUserController.getFollowee(2);
    }

    @Test
    void saveFollowUser() {
        followUserController.saveFollowUser(2, 3, 1);
        followUserController.saveFollowUser(2, 3, 1);
        followUserController.saveFollowUser(2, 3, 0);
        followUserController.saveFollowUser(2, 3, 0);
        followUserController.saveFollowUser(2, 3, 1);
    }

    @Test
    void isFollowUser() {
        followUserController.isFollowUser(2, 1);

    }

    @Autowired
    FollowUserRepository followUserRepository;

    @Autowired
    UserRepository userRepository;
    @Test
    void test() {
        for (int i = 1; i <= 1010; i++) {
            User u = userRepository.findUserByUserId(i);
            u.setFollower(followUserRepository.countFollowUsersByFollowee(i));
            u.setFollowee(followUserRepository.countFollowUsersByUserId(i));
            userRepository.save(u);
        }
    }
}