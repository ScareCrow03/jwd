package com.jknows_backend.controller;

import com.jknows_backend.entity.LikeAnswer;
import com.jknows_backend.service.LikeAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class LikeAnswerController {

    @Autowired
    private LikeAnswerService likeAnswerService;

    @RequestMapping(value = "/getLikeAnswer",method = {RequestMethod.GET,RequestMethod.POST})
    public List<LikeAnswer> getLikeAnswer(@RequestParam("userId") int userId){
        System.out.println("getLikeAnswer");
        return likeAnswerService.getLikeAnswer(userId);
    }

    @RequestMapping(value = "/saveLikeAnswer", method = {RequestMethod.GET,RequestMethod.POST})
    public int saveLikeAnswer(@RequestParam("userId") int userId, @RequestParam("answerId") int answerId, @RequestParam("liked") int liked) {
        System.out.println("saveLikeAnswer");
        likeAnswerService.saveLikeAnswer(userId, answerId, liked);
        return 1;
    }

    @RequestMapping(value = "/isLikeAnswer", method = {RequestMethod.GET,RequestMethod.POST})
    public String isLikeAnswer(@RequestParam("userId") int userId, @RequestParam("answerId") int answerId) {
        System.out.println("isLikeAnswer");
        return likeAnswerService.isLikeAnswer(userId, answerId);
    }

}
