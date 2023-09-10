package com.jknows_backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LikeQuestionControllerTest {

    @Autowired
    private LikeQuestionController likeQuestionController;

    @Test
    void getLikeQuestion() throws Exception {
        likeQuestionController.getLikeQuestion(2);
    }

    @Test
    void saveLikeQuestion() {
        likeQuestionController.saveLikeQuestion(2, 3, 1);
        likeQuestionController.saveLikeQuestion(2, 3, 0);
        likeQuestionController.saveLikeQuestion(2, 3, 0);
        likeQuestionController.saveLikeQuestion(2, 3, 1);
    }

    @Test
    void isLikeQuestion() {
        likeQuestionController.isLikeQuestion(2, 1);
        likeQuestionController.isLikeQuestion(2, 4);
    }
}