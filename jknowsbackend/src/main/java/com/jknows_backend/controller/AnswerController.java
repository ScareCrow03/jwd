package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @RequestMapping(value = "/getAnswer",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Answer> getAnswer(@RequestParam("questionId") int questionId) {
        System.out.println("getAnswer");
        return answerService.getAnswer(questionId);
    }

    @RequestMapping(value = "/getAnswers",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Answer> getAnswers(@RequestParam("questionId") int questionId, @RequestParam("start") int start, @RequestParam("end") int end) {
        System.out.println("getAnswers");
        return answerService.getAnswers(questionId, start, end);
    }

    @RequestMapping(value = "/getUserAnswer",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Answer> getUserAnswer(@RequestParam("userId") int userId) {
        System.out.println("getUserAnswer");
        return answerService.getUserAnswer(userId);
    }

    @RequestMapping(value = "/getMyAnswer",method = {RequestMethod.GET,RequestMethod.POST})
    public Answer getMyAnswer(@RequestParam("questionId") int questionId, @RequestParam("userId") int userId) {
        System.out.println("getMyAnswer");
        return answerService.getMyAnswer(questionId, userId);
    }

    @RequestMapping(value = "/saveAnswer",method = {RequestMethod.GET,RequestMethod.POST})
    public Answer saveAnswer(
            @RequestParam("answerId") int answerId, @RequestParam("userId") int userId,
            @RequestParam("questionId") int questionId, @RequestParam("content") String content) {
        System.out.println("saveAnswer");
        return answerService.saveAnswer(answerId, userId, questionId, content);
    }

    @RequestMapping(value = "/deleteAnswer",method = {RequestMethod.GET,RequestMethod.POST})
    public int deleteAnswer(@RequestParam("answerId") int answerId) {
        System.out.println("deleteAnswer");
        return answerService.deleteAnswer(answerId);
    }
}
