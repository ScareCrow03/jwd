package com.jknows_backend.controller;

import com.jknows_backend.entity.FollowQuestion;
import com.jknows_backend.service.FollowQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class FollowQuestionController {

    @Autowired
    private FollowQuestionService followQuestionService;

    @RequestMapping(value = "/getFollowQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public List<FollowQuestion> getFollowQuestion(@RequestParam("userId") int userId) {
        System.out.println("getFollowQuestion");
        return followQuestionService.getFollowQuestion(userId);
    }

    @RequestMapping(value = "/saveFollowQuestion", method = {RequestMethod.GET,RequestMethod.POST})
    public int saveFollowQuestion(@RequestParam("userId") int userId, @RequestParam("questionId") int questionId, @RequestParam("follow") int follow) {
        System.out.println("saveFollowQuestion");
        followQuestionService.saveFollowQuestion(userId, questionId, follow);
        return 1;
    }

    @RequestMapping(value = "/isFollowQuestion", method = {RequestMethod.GET,RequestMethod.POST})
    public int isFollowQuestion(@RequestParam("userId") int userId, @RequestParam("questionId") int questionId) {
        System.out.println("isFollowQuestion");
        return followQuestionService.isFollowQuestion(userId, questionId);
    }
}
