package com.jknows_backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LikeAnswerControllerTest {

    @Autowired
    private LikeAnswerController likeAnswerController;

    @Test
    void getLikeAnswer() throws Exception {
        likeAnswerController.getLikeAnswer(2);
    }

    @Test
    void saveLikeAnswer() {
        likeAnswerController.saveLikeAnswer(2, 3, 1);
        likeAnswerController.saveLikeAnswer(2, 3, 0);
        likeAnswerController.saveLikeAnswer(2, 3, 0);
        likeAnswerController.saveLikeAnswer(2, 3, 1);
    }

    @Test
    void isLikeAnswer() {
        likeAnswerController.isLikeAnswer(2, 1);

    }
}