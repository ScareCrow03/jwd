package com.jknows_backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LikeCommentControllerTest {

    @Autowired
    private LikeCommentController likeCommentController;

    @Test
    void getLikeComment() throws Exception {
        likeCommentController.getLikeComment(2);
    }

    @Test
    void saveLikeComment() {
        likeCommentController.saveLikeComment(2, 3, 1);
        likeCommentController.saveLikeComment(2, 3, 0);
        likeCommentController.saveLikeComment(2, 3, 0);
        likeCommentController.saveLikeComment(2, 3, 1);
    }

    @Test
    void isLikeComment() {
        likeCommentController.isLikeComment(2, 1);

    }
}