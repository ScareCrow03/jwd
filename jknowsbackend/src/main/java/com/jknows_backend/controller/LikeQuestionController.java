package com.jknows_backend.controller;

import com.jknows_backend.entity.LikeQuestion;
import com.jknows_backend.service.LikeQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class LikeQuestionController {

    @Autowired
    private LikeQuestionService likeQuestionService;

    @RequestMapping(value = "/getLikeQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public List<LikeQuestion> getLikeQuestion(@RequestParam("userId") int userId){
        System.out.println("getLikeQuestion");
        return likeQuestionService.getLikeQuestion(userId);
    }

    @RequestMapping(value = "/saveLikeQuestion", method = {RequestMethod.GET,RequestMethod.POST})
    public int saveLikeQuestion(@RequestParam("userId") int userId, @RequestParam("questionId") int questionId, @RequestParam("liked") int liked) {
        System.out.println("saveLikeQuestion");
        likeQuestionService.saveLikeQuestion(userId, questionId, liked);
        return 1;
    }

    @RequestMapping(value = "/isLikeQuestion", method = {RequestMethod.GET,RequestMethod.POST})
    public int isLikeQuestion(@RequestParam("userId") int userId, @RequestParam("questionId") int questionId) {
        System.out.println("isLikeQuestion");
        return likeQuestionService.isLikeQuestion(userId, questionId);
    }
}
